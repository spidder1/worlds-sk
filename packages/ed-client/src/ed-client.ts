import {
  EDServiceCredentials,
  EDProductListStatus,
  EDSuperCategory,
  EDCategory,
  EDCategoryAttribute,
  EDAttributeValue,
  EDProducer,
  EDCommodity,
  EDIndexTreeItem,
  EDProductRelation,
  EDProductRelationChild,
  EDProductInformation,
  EDRawProductDetail,
  EDNewOrderRequest,
  EDNewOrderCustomerRequest,
  EDResponseNewOrder,
  EDDocumentChangeRequest,
  EDResponseChangeDocument,
  EDOrderTransportation,
} from '@worlds/types';
import { XMLParser } from 'fast-xml-parser';
import { executeSoapCall, escapeXml } from './soap-request.js';

function xmlScalar(value: unknown): unknown {
  if (value && typeof value === 'object' && '#text' in value) {
    return (value as { '#text': unknown })['#text'];
  }
  return value;
}

function xmlString(value: unknown): string | undefined {
  const scalar = xmlScalar(value);
  if (scalar === undefined || scalar === null || scalar === '') return undefined;
  return String(scalar);
}

function xmlBoolean(value: unknown): boolean {
  const scalar = xmlScalar(value);
  return scalar === true || String(scalar).toLowerCase() === 'true';
}

export class EDSystemClient {
  private readonly endpoint: string;
  private readonly login: string;
  private readonly pass: string;

  constructor(credentials: EDServiceCredentials) {
    this.endpoint = credentials.endpointUrl || 'https://private-ws-sk.elinkx.biz/service.asmx';
    this.login = credentials.login;
    this.pass = credentials.password;
  }

  private getSoapNamespace(): string {
    return 'http://www.elinkx.cz/';
  }

  private async getXmlOverUrl(
    method: string,
    parameters: Record<string, string | boolean> = {},
  ): Promise<Record<string, unknown>> {
    const url = new URL(`${this.endpoint.replace(/\/$/, '')}/${method}`);
    url.searchParams.set('login', this.login);
    url.searchParams.set('password', this.pass);
    for (const [name, parameter] of Object.entries(parameters)) {
      url.searchParams.set(name, String(parameter));
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/xml, text/xml, */*' },
      signal: AbortSignal.timeout(180_000),
    });
    const responseText = await response.text();
    if (!response.ok) {
      throw new Error(`eD request failed (${response.status} ${response.statusText})`);
    }

    return new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text',
      parseTagValue: true,
      trimValues: true,
    }).parse(responseText) as Record<string, unknown>;
  }

  /**
   * The catalogue download methods authenticate through URL query parameters.
   * Never log the generated URL because it contains the supplier credentials.
   */
  private async getCatalogueDownloadStatus(
    method: string,
    parameters: Record<string, string | boolean> = {},
  ): Promise<EDProductListStatus> {
    const parsed = await this.getXmlOverUrl(method, parameters);
    const envelope = (parsed.ResponseProductListStatus ?? parsed) as Record<string, unknown>;
    const status = (envelope.Status ?? {}) as Record<string, unknown>;
    const productListStatus = (envelope.ProductListStatus ?? {}) as Record<string, unknown>;
    const statusCode = xmlString(status.StatusCode);

    return {
      Status: {
        StatusCode: statusCode === 'DONE' ? 'DONE' : 'ERROR',
        ErrorText: xmlString(status.ErrorText),
      },
      Url: xmlString(productListStatus.url ?? productListStatus.Url),
      FileName: xmlString(productListStatus.fileName ?? productListStatus.FileName),
      IsReady: xmlBoolean(productListStatus.isReady ?? productListStatus.IsReady),
    };
  }

  /**
   * 3.1. getProductSuperCategoryList
   * Returns list of supercategories and categories.
   */
  async getProductSuperCategoryList(): Promise<EDSuperCategory[]> {
    const action = `${this.getSoapNamespace()}getProductSuperCategoryList`;
    const bodyXml = `<getProductSuperCategoryList xmlns="${this.getSoapNamespace()}">
      <login>${escapeXml(this.login)}</login>
      <password>${escapeXml(this.pass)}</password>
    </getProductSuperCategoryList>`;

    const response = await executeSoapCall<{ getProductSuperCategoryListResponse?: { getProductSuperCategoryListResult?: any } }>({
      endpoint: this.endpoint,
      action,
      bodyXml,
    });

    const result = response?.getProductSuperCategoryListResponse?.getProductSuperCategoryListResult;
    const items = result?.ProductSuperCategoryList?.ProductSuperCategory;
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
  }

  /**
   * 3.2. getProductCategoryList
   * Returns list of categories and their attributes.
   */
  async getProductCategoryList(): Promise<EDCategory[]> {
    const action = `${this.getSoapNamespace()}getProductCategoryList`;
    const bodyXml = `<getProductCategoryList xmlns="${this.getSoapNamespace()}">
      <login>${escapeXml(this.login)}</login>
      <password>${escapeXml(this.pass)}</password>
    </getProductCategoryList>`;

    const response = await executeSoapCall<{ getProductCategoryListResponse?: { getProductCategoryListResult?: any } }>({
      endpoint: this.endpoint,
      action,
      bodyXml,
    });

    const result = response?.getProductCategoryListResponse?.getProductCategoryListResult;
    const items = result?.ProductCategoryList?.ProductCategory;
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
  }

  /**
   * 3.3. getProductCategoryAttributeList
   */
  async getProductCategoryAttributeList(): Promise<EDCategoryAttribute[]> {
    const parsed = await this.getXmlOverUrl('getProductCategoryAttributeList');
    const envelope = (parsed.ResponseProductCategoryAttributeList ?? parsed) as Record<string, any>;
    const status = (envelope.Status ?? {}) as Record<string, unknown>;
    const statusCode = xmlString(status.StatusCode);
    if (statusCode && statusCode !== 'DONE') throw new Error(`eD category attribute list failed: ${xmlString(status.ErrorText) ?? statusCode}`);
    const items = envelope.ProductCategoryAttributeList?.ProductCategoryAttribute;
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
  }

  /**
   * 3.4. getProductCategoryAttributeValueList
   */
  async getProductCategoryAttributeValueList(): Promise<EDAttributeValue[]> {
    const parsed = await this.getXmlOverUrl('getProductCategoryAttributeValueList');
    const envelope = (parsed.ResponseProductCategoryAttributeValueList ?? parsed) as Record<string, any>;
    const status = (envelope.Status ?? {}) as Record<string, unknown>;
    const statusCode = xmlString(status.StatusCode);
    if (statusCode && statusCode !== 'DONE') throw new Error(`eD category attribute values failed: ${xmlString(status.ErrorText) ?? statusCode}`);
    const items = envelope.ProductCategoryAttributeValueList?.ProductCategoryAttributeValue;
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
  }

  /**
   * 3.6. getProductProducerList
   * Returns list of producers (brands/manufacturers)
   */
  async getProductProducerList(): Promise<EDProducer[]> {
    const parsed = await this.getXmlOverUrl('getProductProducerList');
    const envelope = (parsed.ResponseProductProducerList ?? parsed) as Record<string, any>;
    const status = (envelope.Status ?? {}) as Record<string, unknown>;
    const statusCode = xmlString(status.StatusCode);
    if (statusCode && statusCode !== 'DONE') throw new Error(`eD producer list failed: ${xmlString(status.ErrorText) ?? statusCode}`);
    const items = envelope.ProductProducerList?.ProductProducer;
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
  }

  /**
   * 3.7. getProductCommodityList
   */
  async getProductCommodityList(): Promise<EDCommodity[]> {
    const parsed = await this.getXmlOverUrl('getProductCommodityList', {
      onStock: false,
      Comodities: '',
    });
    const envelope = (parsed.ResponseProductCommodityList ?? parsed) as Record<string, unknown>;
    const status = (envelope.Status ?? {}) as Record<string, unknown>;
    const statusCode = xmlString(status.StatusCode);
    if (statusCode && statusCode !== 'DONE') {
      throw new Error(`eD commodity list failed: ${xmlString(status.ErrorText) ?? statusCode}`);
    }
    const list = (envelope.ProductCommodityList ?? {}) as Record<string, unknown>;
    const rawItems = list.ProductCommodity;
    const items = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];
    return items.map((item) => {
      const row = item as Record<string, unknown>;
      return {
        CommodityCode: xmlString(row.CommodityCode) ?? '',
        CommodityName: xmlString(row.CommodityName) ?? '',
        CommodityParentCode: xmlString(row.CommodityParentCode),
      };
    });
  }

  /**
   * 3.8. getProductIndexTree1
   */
  async getProductIndexTree1(): Promise<EDIndexTreeItem[]> {
    const parsed = await this.getXmlOverUrl('getProductIndexTree1');
    const envelope = (parsed.ResponseProductIndexTree ?? parsed) as Record<string, any>;
    const status = (envelope.Status ?? {}) as Record<string, unknown>;
    const statusCode = xmlString(status.StatusCode);
    if (statusCode && statusCode !== 'DONE') throw new Error(`eD index tree 1 failed: ${xmlString(status.ErrorText) ?? statusCode}`);
    const root = (envelope.ProductIndexRoot ?? envelope.ProductIndexTree ?? envelope) as Record<string, any>;
    const items = root.ProductIndexList?.ProductIndexItem ?? root.ProductIndexItem;
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
  }

  /**
   * 3.9. getProductIndexTree2
   * Returns the second independent eD product index tree.
   */
  async getProductIndexTree2(): Promise<EDIndexTreeItem[]> {
    const parsed = await this.getXmlOverUrl('getProductIndexTree2');
    const envelope = (parsed.ResponseProductIndexTree ?? parsed) as Record<string, any>;
    const status = (envelope.Status ?? {}) as Record<string, unknown>;
    const statusCode = xmlString(status.StatusCode);
    if (statusCode && statusCode !== 'DONE') throw new Error(`eD index tree 2 failed: ${xmlString(status.ErrorText) ?? statusCode}`);
    const root = (envelope.ProductIndexRoot ?? envelope.ProductIndexTree ?? envelope) as Record<string, any>;
    const items = root.ProductIndexList?.ProductIndexItem ?? root.ProductIndexItem;
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
  }

  /**
   * 3.18. getProductRelationList
   * Returns directed parent/child product relations. The supplier may wrap
   * singleton values differently from arrays, so both forms are normalized.
   */
  async getProductRelationList(): Promise<EDProductRelation[]> {
    const parsed = await this.getXmlOverUrl('getProductRelationList');
    const envelope = (parsed.ResponseProductRelationList ?? parsed) as Record<string, any>;
    const status = (envelope.Status ?? {}) as Record<string, unknown>;
    const statusCode = xmlString(status.StatusCode);
    if (statusCode && statusCode !== 'DONE') throw new Error(`eD relation list failed: ${xmlString(status.ErrorText) ?? statusCode}`);
    const list = (envelope.ProductRelationList ?? envelope) as Record<string, any>;
    const rawRelations = list?.ProductRelation ?? list?.Relation ?? list?.ProductRelationItem ?? list?.ProductRealationParent;
    const relations = rawRelations ? (Array.isArray(rawRelations) ? rawRelations : [rawRelations]) : [];

    return relations.map((raw: Record<string, any>) => {
      const childContainer = raw.Childs ?? raw.Children;
      const rawChildren = Array.isArray(childContainer)
        ? childContainer
        : childContainer?.ProductRelationChild
          ?? childContainer?.ProductRealationChild
          ?? raw.Child
          ?? raw.ProductRelationChild;
      const children = rawChildren ? (Array.isArray(rawChildren) ? rawChildren : [rawChildren]) : [];
      return {
        ParentProId: xmlString(raw.ParentProId ?? raw.ParentProductId ?? raw.ProId) ?? '',
        ParentCode: xmlString(raw.ParentCode ?? raw.ParentProductCode ?? raw.Code) ?? '',
        Childs: children.map((child: Record<string, any>): EDProductRelationChild => ({
          ProId: xmlString(child.ProId ?? child.ProductProId) ?? '',
          Code: xmlString(child.Code ?? child.ProductCode) ?? '',
          Qty: Number(xmlScalar(child.Qty ?? child.Quantity) ?? 0),
          RelTypeId: xmlString(child.RelTypeId ?? child.RelationTypeId) ?? '',
          RelTypeName: xmlString(child.RelTypeName ?? child.RelationTypeName) ?? '',
        })),
      };
    });
  }

  /**
   * 3.11. getProductInformationList
   * Returns the supplier dictionary for product marketing/status codes.
   */
  async getProductInformationList(): Promise<EDProductInformation[]> {
    const parsed = await this.getXmlOverUrl('getProductInformationList');
    const envelope = (parsed.ResponseProductInformationList ?? parsed) as Record<string, any>;
    const status = (envelope.Status ?? {}) as Record<string, unknown>;
    const statusCode = xmlString(status.StatusCode);
    if (statusCode && statusCode !== 'DONE') throw new Error(`eD information list failed: ${xmlString(status.ErrorText) ?? statusCode}`);
    const list = (envelope.ProductInformationList ?? envelope) as Record<string, any>;
    const rawItems = list?.ProductInformation ?? list?.Information ?? list?.ProductInformationItem;
    const items = rawItems ? (Array.isArray(rawItems) ? rawItems : [rawItems]) : [];
    return items.map((item: Record<string, unknown>) => ({
      InfoCode: xmlString(item.InfoCode ?? item.Code) ?? '',
      InfoName: xmlString(item.InfoName ?? item.Name) ?? '',
    })).filter((item: EDProductInformation) => item.InfoCode !== '');
  }

  /**
   * 3.13. getProductCatalogueStockDownloadXML
   * Generates URL for downloading fast stock/price XML update (12x daily).
   */
  async getProductCatalogueStockDownloadXML(): Promise<EDProductListStatus> {
    return this.getCatalogueDownloadStatus('getProductCatalogueStockDownloadXML');
  }

  async getProductCatalogueDownloadXML(options: { onStock?: boolean } = {}): Promise<EDProductListStatus> {
    return this.getCatalogueDownloadStatus('getProductCatalogueDownloadXML', { onStock: options.onStock ?? false });
  }

  async getProductCatalogueDownloadZIP(options: { onStock?: boolean } = {}): Promise<EDProductListStatus> {
    return this.getCatalogueDownloadStatus('getProductCatalogueDownloadZIP', { onStock: options.onStock ?? false });
  }

  /**
   * Premium catalogue reconciliation endpoint. This is intentionally separate
   * from the primary full import because eD documents it as an audit feed.
   */
  async getProductCatalogueFullPremiumDownloadXML(options: { onStock?: boolean } = {}): Promise<EDProductListStatus> {
    return this.getCatalogueDownloadStatus('getProductCatalogueFullPremiumDownloadXML', {
      onStock: options.onStock ?? false,
    });
  }

  /** Compact secondary reconciliation feed (not the master catalogue). */
  async getProductCatalogueShortDownloadXML(options: { onStock?: boolean } = {}): Promise<EDProductListStatus> {
    return this.getCatalogueDownloadStatus('getProductCatalogueShortDownloadXML', {
      onStock: options.onStock ?? false,
    });
  }

  /**
   * 3.21. getProductCatalogueFullDownloadZIPv1
   * Requests URL for full catalog ZIP (contains complete product details with attributes, prices, stock, etc.).
   */
  async getProductCatalogueFullDownloadZIPv1(options: {
    onStock?: boolean;
    commodities?: string;
    commoditiesTree?: string;
    producers?: string;
    categories?: string;
  } = {}): Promise<EDProductListStatus> {
    return this.getCatalogueDownloadStatus('getProductCatalogueFullDownloadZIPv1', {
      onStock: options.onStock ?? false,
      Comodities: options.commodities ?? '',
      ComoditiesTree: options.commoditiesTree ?? '',
      Producers: options.producers ?? '',
      Categories: options.categories ?? '',
    });
  }

  async getProductCatalogueFullDownloadXML(options: {
    onStock?: boolean;
    commodities?: string;
    commoditiesTree?: string;
    producers?: string;
    categories?: string;
  } = {}): Promise<EDProductListStatus> {
    return this.getCatalogueDownloadStatus('getProductCatalogueFullDownloadXML', {
      onStock: options.onStock ?? false,
      Comodities: options.commodities ?? '',
      ComoditiesTree: options.commoditiesTree ?? '',
      Producers: options.producers ?? '',
      Categories: options.categories ?? '',
    });
  }

  async getProductCatalogueFullDownloadXMLv1(options: {
    onStock?: boolean;
    commoditiesTree?: string;
  } = {}): Promise<EDProductListStatus> {
    return this.getCatalogueDownloadStatus('getProductCatalogueFullDownloadXMLv1', {
      onStock: options.onStock ?? false,
      ComoditiesTree: options.commoditiesTree ?? '',
    });
  }

  async getProductCatalogueFullDownloadXMLExt(options: {
    onStock?: boolean;
    commodities?: string;
    commoditiesTree?: string;
    producers?: string;
    categories?: string;
  } = {}): Promise<EDProductListStatus> {
    return this.getCatalogueDownloadStatus('getProductCatalogueFullDownloadXMLExt', {
      onStock: options.onStock ?? false,
      Comodities: options.commodities ?? '',
      ComoditiesTree: options.commoditiesTree ?? '',
      Producers: options.producers ?? '',
      Categories: options.categories ?? '',
    });
  }

  async getProductCatalogueFullDownloadZIP(options: {
    onStock?: boolean;
    commodities?: string;
    commoditiesTree?: string;
    producers?: string;
    categories?: string;
  } = {}): Promise<EDProductListStatus> {
    return this.getCatalogueDownloadStatus('getProductCatalogueFullDownloadZIP', {
      onStock: options.onStock ?? false,
      Comodities: options.commodities ?? '',
      ComoditiesTree: options.commoditiesTree ?? '',
      Producers: options.producers ?? '',
      Categories: options.categories ?? '',
    });
  }

  async getProductCatalogueFullDownloadZIPExt(options: {
    onStock?: boolean;
    commodities?: string;
    commoditiesTree?: string;
    producers?: string;
    categories?: string;
  } = {}): Promise<EDProductListStatus> {
    return this.getCatalogueDownloadStatus('getProductCatalogueFullDownloadZIPExt', {
      onStock: options.onStock ?? false,
      Comodities: options.commodities ?? '',
      ComoditiesTree: options.commoditiesTree ?? '',
      Producers: options.producers ?? '',
      Categories: options.categories ?? '',
    });
  }

  async getProductCatalogueFullNavFilterDownloadXML(options: {
    onStock?: boolean;
    navigatorFilter?: string;
  } = {}): Promise<EDProductListStatus> {
    return this.getCatalogueDownloadStatus('getProductCatalogueFullNavFilterDownloadXML', {
      onStock: options.onStock ?? false,
      navigatorFilter: options.navigatorFilter ?? '',
    });
  }

  /** Low-level SOAP navigator filter for targeted recovery; not the master import path. */
  async getProductCatalogueFullNavFilterSOAPDownloadXML(filterXml = '', onStock = false): Promise<EDProductListStatus> {
    if (/<\/?(?:soap:)?(?:Envelope|Body|filter)\b|<!DOCTYPE\b|<!ENTITY\b/i.test(filterXml)) {
      throw new Error('Navigator filter expects only the inner filter XML payload');
    }
    const action = `${this.getSoapNamespace()}getProductCatalogueFullNavFilterSOAPDownloadXML`;
    const bodyXml = `<getProductCatalogueFullNavFilterSOAPDownloadXML xmlns="${this.getSoapNamespace()}">
      <login>${escapeXml(this.login)}</login>
      <password>${escapeXml(this.pass)}</password>
      <onStock>${onStock}</onStock>
      <filter>${filterXml}</filter>
    </getProductCatalogueFullNavFilterSOAPDownloadXML>`;
    const response = await executeSoapCall<{ getProductCatalogueFullNavFilterSOAPDownloadXMLResponse?: { getProductCatalogueFullNavFilterSOAPDownloadXMLResult?: any } }>({ endpoint: this.endpoint, action, bodyXml });
    const result = response?.getProductCatalogueFullNavFilterSOAPDownloadXMLResponse?.getProductCatalogueFullNavFilterSOAPDownloadXMLResult;
    return {
      Status: { StatusCode: result?.Status?.StatusCode || 'ERROR', ErrorText: result?.Status?.ErrorText },
      Url: result?.ProductListStatus?.Url || result?.ProductListStatus?.url,
      FileName: result?.ProductListStatus?.FileName || result?.ProductListStatus?.fileName,
      IsReady: xmlBoolean(result?.ProductListStatus?.IsReady ?? result?.ProductListStatus?.isReady),
    };
  }

  /**
   * 3.14. getProductDetail
   * Returns complete details for a single product code.
   */
  async getProductDetail(code: string): Promise<EDRawProductDetail | null> {
    const action = `${this.getSoapNamespace()}getProductDetail`;
    const bodyXml = `<getProductDetail xmlns="${this.getSoapNamespace()}">
      <login>${escapeXml(this.login)}</login>
      <password>${escapeXml(this.pass)}</password>
      <code>${escapeXml(code)}</code>
    </getProductDetail>`;

    const response = await executeSoapCall<{ getProductDetailResponse?: { getProductDetailResult?: any } }>({
      endpoint: this.endpoint,
      action,
      bodyXml,
    });

    const res = response?.getProductDetailResponse?.getProductDetailResult;
    if (!res) return null;
    return res as EDRawProductDetail;
  }

  /**
   * 3.30. getTransportationListCustomer
   * Returns allowed B2C dropship transportation types.
   */
  async getTransportationListCustomer(): Promise<EDOrderTransportation[]> {
    // eD exposes this dictionary through the URL-authenticated XML endpoint.
    // Do not log the generated URL: it contains the supplier credentials.
    const parsed = await this.getXmlOverUrl('getTransportationListCustomer');
    const result = (parsed.ResponseTransportationList ?? parsed) as Record<string, unknown>;
    const status = result?.Status as Record<string, unknown> | undefined;
    const statusCode = xmlString(status?.StatusCode);
    if (statusCode && statusCode !== 'DONE') throw new Error(`eD transport list failed: ${xmlString(status?.ErrorText) ?? statusCode}`);
    const list = result?.TransportationList as Record<string, unknown> | undefined;
    const items = list?.Transportation ?? result?.Transportation ?? list;
    if (!items) return [];
    return (Array.isArray(items) ? items : [items]) as EDOrderTransportation[];
  }

  /**
   * B2B supplier order using the WSDL NewOrderHead contract.
   */
  async createNewOrder(order: EDNewOrderRequest, isTest = true): Promise<EDResponseNewOrder> {
    const action = `${this.getSoapNamespace()}createNewOrder`;
    const ship = order.ShippingAddress;
    const itemsXml = order.NewOrderItems.map((item) => `<NewOrderItem><ProductCode>${escapeXml(item.ProductCode)}</ProductCode><Qty>${item.Qty}</Qty></NewOrderItem>`).join('');
    const bodyXml = `<createNewOrder xmlns="${this.getSoapNamespace()}">
      <login>${escapeXml(this.login)}</login>
      <password>${escapeXml(this.pass)}</password>
      <orderHead>
        ${ship ? `<ShippingAddress><Name>${escapeXml(ship.name)}</Name><Street>${escapeXml(ship.street)}</Street><ZipCode>${escapeXml(ship.zipCode)}</ZipCode><City>${escapeXml(ship.city)}</City><CountryCode>${escapeXml(ship.countryCode || 'SK')}</CountryCode><Contact>${escapeXml(ship.name)}</Contact><ContactEmail>${escapeXml(ship.email || order.email)}</ContactEmail><ContactTel>${escapeXml(ship.phone || order.telephone)}</ContactTel></ShippingAddress>` : ''}
        <NewOrderItems>${itemsXml}</NewOrderItems>
        <OrderNote>${escapeXml(order.OrderNote || '')}</OrderNote>
        <OrderSymbolCustomer>${escapeXml(order.OrderSymbolCustomer || '')}</OrderSymbolCustomer>
        <TransportCode>${order.TransportCode}</TransportCode>
        <telephone>${escapeXml(order.telephone || ship?.phone)}</telephone>
        <email>${escapeXml(order.email || ship?.email)}</email>
      </orderHead>
      <test>${isTest}</test>
    </createNewOrder>`;
    const response = await executeSoapCall<{ createNewOrderResponse?: { createNewOrderResult?: any } }>({ endpoint: this.endpoint, action, bodyXml });
    const result = response?.createNewOrderResponse?.createNewOrderResult;
    return { OrderSymbol: result?.OrderSymbol, Status: { StatusCode: result?.Status?.StatusCode || 'ERROR', ErrorText: result?.Status?.ErrorText } };
  }

  /**
   * Low-level WSDL escape hatch for supplier order XML. The WSDL defines the
   * order node as mixed content; callers own its schema, while credentials and
   * the test flag remain controlled by this client.
   */
  async createNewOrderXML(orderXml: string, options = '', isTest = true): Promise<EDResponseNewOrder> {
    if (!orderXml.trim() || /<\/?(?:soap:)?(?:Envelope|Body|createNewOrderXML)\b|<!DOCTYPE\b|<!ENTITY\b/i.test(orderXml)) {
      throw new Error('createNewOrderXML expects only the inner order XML payload');
    }
    const action = `${this.getSoapNamespace()}createNewOrderXML`;
    const bodyXml = `<createNewOrderXML xmlns="${this.getSoapNamespace()}">
      <login>${escapeXml(this.login)}</login>
      <password>${escapeXml(this.pass)}</password>
      <order>${orderXml}</order>
      <options>${escapeXml(options)}</options>
      <test>${isTest}</test>
    </createNewOrderXML>`;
    const response = await executeSoapCall<{ createNewOrderXMLResponse?: { createNewOrderXMLResult?: any } }>({ endpoint: this.endpoint, action, bodyXml });
    const result = response?.createNewOrderXMLResponse?.createNewOrderXMLResult;
    return { OrderSymbol: result?.OrderSymbol, Status: { StatusCode: result?.Status?.StatusCode || 'ERROR', ErrorText: result?.Status?.ErrorText } };
  }

  /** Apply a documented eD document change, such as deferred invoicing. */
  async changeDocument(change: EDDocumentChangeRequest): Promise<EDResponseChangeDocument> {
    const action = `${this.getSoapNamespace()}changeDocument`;
    const bodyXml = `<changeDocument xmlns="${this.getSoapNamespace()}">
      <login>${escapeXml(this.login)}</login>
      <password>${escapeXml(this.pass)}</password>
      <docChangeDefinition>
        <Id>${change.id}</Id>
        <Code>${escapeXml(change.code || '')}</Code>
        <DocumentType>${escapeXml(change.documentType)}</DocumentType>
        <ChangeType>${escapeXml(change.changeType)}</ChangeType>
        <ChangeParametr>${escapeXml(change.changeParameter || '')}</ChangeParametr>
      </docChangeDefinition>
    </changeDocument>`;
    const response = await executeSoapCall<{ changeDocumentResponse?: { changeDocumentResult?: any } }>({ endpoint: this.endpoint, action, bodyXml });
    const result = response?.changeDocumentResponse?.changeDocumentResult;
    return { Status: { StatusCode: result?.Status?.StatusCode || 'ERROR', ErrorText: result?.Status?.ErrorText } };
  }

  /**
   * 3.25. createNewOrderCustomer (B2C Dropshipping order)
   */
  async createNewOrderCustomer(
    order: EDNewOrderCustomerRequest,
    isTest = true
  ): Promise<EDResponseNewOrder> {
    const action = `${this.getSoapNamespace()}createNewOrderCustomer`;

    let itemsXml = '';
    for (const item of order.NewOrderCustomerItems) {
      itemsXml += `<NewOrderItemCustomer>
        <ProductCode>${escapeXml(item.ProductCode)}</ProductCode>
        <Qty>${item.Qty}</Qty>
        <Price>${item.Price}</Price>
        <PriceVat>${item.PriceVat}</PriceVat>
        <VatRate>${item.VatRate}</VatRate>
      </NewOrderItemCustomer>`;
    }

    const ship = order.ShippingAddress;
    const invoice = order.InvoiceAddress;
    const addressXml = (address: typeof ship | undefined, tag: string) => address ? `<${tag}><City>${escapeXml(address.city)}</City><ZipCode>${escapeXml(address.zipCode)}</ZipCode><Street>${escapeXml(address.street)}</Street><Name>${escapeXml(address.name)}</Name><CountryCode>${escapeXml(address.countryCode || 'SK')}</CountryCode><Contact>${escapeXml(address.name)}</Contact><ContactEmail>${escapeXml(address.email || '')}</ContactEmail><ContactTel>${escapeXml(address.phone || '')}</ContactTel></${tag}>` : '';
    const bodyXml = `<createNewOrderCustomer xmlns="${this.getSoapNamespace()}">
      <login>${escapeXml(this.login)}</login>
      <password>${escapeXml(this.pass)}</password>
      <orderHead>
        ${addressXml(ship, 'ShippingAddress')}
        <OrderNote>${escapeXml(order.OrderNote || '')}</OrderNote>
        <OrderSymbolCustomer>${escapeXml(order.OrderSymbolCustomer)}</OrderSymbolCustomer>
        <TransportCode>${order.TransportCode ?? 0}</TransportCode>
        <telephone>${escapeXml(order.telephone)}</telephone>
        <email>${escapeXml(order.email)}</email>
        ${addressXml(invoice, 'InvoiceAddress')}
        <customerName>${escapeXml(order.customerName)}</customerName>
        <customerOrgNo>${escapeXml(order.customerOrgNo || '')}</customerOrgNo>
        <customerOrgVat>${escapeXml(order.customerOrgVat || '')}</customerOrgVat>
        <created>${escapeXml(order.created || '')}</created>
        <custumerInvoiceCode>${escapeXml(order.custumerInvoiceCode)}</custumerInvoiceCode>
        <price>${order.price}</price>
        <priceVat>${order.priceVat}</priceVat>
        <priceTotal>${Boolean(order.priceTotal)}</priceTotal>
        <customerCurrency>${escapeXml(order.customerCurrency || '')}</customerCurrency>
        <deliveryWithoutInvoice>${Boolean(order.deliveryWithoutInvoice)}</deliveryWithoutInvoice>
        <deliveryWithoutDeliveryNote>${Boolean(order.deliveryWithoutDeliveryNote)}</deliveryWithoutDeliveryNote>
        <noCashOnDelivery>${Boolean(order.noCashOnDelivery)}</noCashOnDelivery>
        <deferredInvoicing>${Boolean(order.deferredInvoicing)}</deferredInvoicing>
        <NewOrderCustomerItems>${itemsXml}</NewOrderCustomerItems>
      </orderHead>
      <isTest>${isTest}</isTest>
    </createNewOrderCustomer>`;

    const response = await executeSoapCall<{ createNewOrderCustomerResponse?: { createNewOrderCustomerResult?: any } }>({
      endpoint: this.endpoint,
      action,
      bodyXml,
    });

    const res = response?.createNewOrderCustomerResponse?.createNewOrderCustomerResult;
    return {
      OrderSymbol: res?.OrderSymbol,
      Status: {
        StatusCode: res?.Status?.StatusCode || 'ERROR',
        ErrorText: res?.Status?.ErrorText,
      },
    };
  }
}
