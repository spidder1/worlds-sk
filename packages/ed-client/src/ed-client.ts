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
  EDNewOrderCustomerRequest,
  EDResponseNewOrder,
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
    const action = `${this.getSoapNamespace()}getProductCategoryAttributeList`;
    const bodyXml = `<getProductCategoryAttributeList xmlns="${this.getSoapNamespace()}">
      <login>${escapeXml(this.login)}</login>
      <password>${escapeXml(this.pass)}</password>
    </getProductCategoryAttributeList>`;

    const response = await executeSoapCall<{ getProductCategoryAttributeListResponse?: { getProductCategoryAttributeListResult?: any } }>({
      endpoint: this.endpoint,
      action,
      bodyXml,
    });

    const result = response?.getProductCategoryAttributeListResponse?.getProductCategoryAttributeListResult;
    const items = result?.ProductCategoryAttributeList?.ProductCategoryAttribute;
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
  }

  /**
   * 3.4. getProductCategoryAttributeValueList
   */
  async getProductCategoryAttributeValueList(): Promise<EDAttributeValue[]> {
    const action = `${this.getSoapNamespace()}getProductCategoryAttributeValueList`;
    const bodyXml = `<getProductCategoryAttributeValueList xmlns="${this.getSoapNamespace()}">
      <login>${escapeXml(this.login)}</login>
      <password>${escapeXml(this.pass)}</password>
    </getProductCategoryAttributeValueList>`;

    const response = await executeSoapCall<{ getProductCategoryAttributeValueListResponse?: { getProductCategoryAttributeValueListResult?: any } }>({
      endpoint: this.endpoint,
      action,
      bodyXml,
    });

    const result = response?.getProductCategoryAttributeValueListResponse?.getProductCategoryAttributeValueListResult;
    const items = result?.ProductCategoryAttributeValueList?.ProductCategoryAttributeValue;
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
  }

  /**
   * 3.6. getProductProducerList
   * Returns list of producers (brands/manufacturers)
   */
  async getProductProducerList(): Promise<EDProducer[]> {
    const action = `${this.getSoapNamespace()}getProductProducerList`;
    const bodyXml = `<getProductProducerList xmlns="${this.getSoapNamespace()}">
      <login>${escapeXml(this.login)}</login>
      <password>${escapeXml(this.pass)}</password>
    </getProductProducerList>`;

    const response = await executeSoapCall<{ getProductProducerListResponse?: { getProductProducerListResult?: any } }>({
      endpoint: this.endpoint,
      action,
      bodyXml,
    });

    const result = response?.getProductProducerListResponse?.getProductProducerListResult;
    const items = result?.ProductProducerList?.ProductProducer;
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
    const action = `${this.getSoapNamespace()}getProductIndexTree1`;
    const bodyXml = `<getProductIndexTree1 xmlns="${this.getSoapNamespace()}">
      <login>${escapeXml(this.login)}</login>
      <password>${escapeXml(this.pass)}</password>
    </getProductIndexTree1>`;

    const response = await executeSoapCall<{ getProductIndexTree1Response?: { getProductIndexTree1Result?: any } }>({
      endpoint: this.endpoint,
      action,
      bodyXml,
    });

    const result = response?.getProductIndexTree1Response?.getProductIndexTree1Result;
    const items = result?.ProductIndexItem;
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
  }

  /**
   * 3.9. getProductIndexTree2
   * Returns the second independent eD product index tree.
   */
  async getProductIndexTree2(): Promise<EDIndexTreeItem[]> {
    const action = `${this.getSoapNamespace()}getProductIndexTree2`;
    const bodyXml = `<getProductIndexTree2 xmlns="${this.getSoapNamespace()}">
      <login>${escapeXml(this.login)}</login>
      <password>${escapeXml(this.pass)}</password>
    </getProductIndexTree2>`;

    const response = await executeSoapCall<{ getProductIndexTree2Response?: { getProductIndexTree2Result?: any } }>({
      endpoint: this.endpoint,
      action,
      bodyXml,
    });

    const result = response?.getProductIndexTree2Response?.getProductIndexTree2Result;
    const items = result?.ProductIndexItem ?? result?.ProductIndexTree?.ProductIndexItem;
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
  }

  /**
   * 3.18. getProductRelationList
   * Returns directed parent/child product relations. The supplier may wrap
   * singleton values differently from arrays, so both forms are normalized.
   */
  async getProductRelationList(): Promise<EDProductRelation[]> {
    const action = `${this.getSoapNamespace()}getProductRelationList`;
    const bodyXml = `<getProductRelationList xmlns="${this.getSoapNamespace()}">
      <login>${escapeXml(this.login)}</login>
      <password>${escapeXml(this.pass)}</password>
    </getProductRelationList>`;

    const response = await executeSoapCall<{ getProductRelationListResponse?: { getProductRelationListResult?: any } }>({
      endpoint: this.endpoint,
      action,
      bodyXml,
    });
    const result = response?.getProductRelationListResponse?.getProductRelationListResult;
    const list = result?.ProductRelationList ?? result;
    const rawRelations = list?.ProductRelation ?? list?.Relation ?? list?.ProductRelationItem;
    const relations = rawRelations ? (Array.isArray(rawRelations) ? rawRelations : [rawRelations]) : [];

    return relations.map((raw: Record<string, any>) => {
      const childContainer = raw.Childs ?? raw.Children;
      const rawChildren = Array.isArray(childContainer)
        ? childContainer
        : childContainer?.ProductRelationChild
          ?? raw.Child
          ?? raw.ProductRelationChild;
      const children = rawChildren ? (Array.isArray(rawChildren) ? rawChildren : [rawChildren]) : [];
      return {
        ParentProId: xmlString(raw.ParentProId ?? raw.ParentProductId) ?? '',
        ParentCode: xmlString(raw.ParentCode ?? raw.ParentProductCode) ?? '',
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
    const action = `${this.getSoapNamespace()}getProductInformationList`;
    const bodyXml = `<getProductInformationList xmlns="${this.getSoapNamespace()}">
      <login>${escapeXml(this.login)}</login>
      <password>${escapeXml(this.pass)}</password>
    </getProductInformationList>`;
    const response = await executeSoapCall<{ getProductInformationListResponse?: { getProductInformationListResult?: any } }>({
      endpoint: this.endpoint,
      action,
      bodyXml,
    });
    const result = response?.getProductInformationListResponse?.getProductInformationListResult;
    const list = result?.ProductInformationList ?? result;
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
    const bodyXml = `<createNewOrderCustomer xmlns="${this.getSoapNamespace()}">
      <login>${escapeXml(this.login)}</login>
      <password>${escapeXml(this.pass)}</password>
      <ord>
        <NewOrderCustomerItems>${itemsXml}</NewOrderCustomerItems>
        <ShippingAddress>
          <City>${escapeXml(ship.city)}</City>
          <ZipCode>${escapeXml(ship.zipCode)}</ZipCode>
          <Street>${escapeXml(ship.street)}</Street>
          <Name>${escapeXml(ship.name)}</Name>
          <CountryCode>${escapeXml(ship.countryCode || 'SK')}</CountryCode>
        </ShippingAddress>
        <OrderNote>${escapeXml(order.OrderNote || '')}</OrderNote>
        <OrderSymbolCustomer>${escapeXml(order.OrderSymbolCustomer)}</OrderSymbolCustomer>
        <customerName>${escapeXml(order.customerName)}</customerName>
        <custumerInvoiceCode>${escapeXml(order.custumerInvoiceCode)}</custumerInvoiceCode>
        <email>${escapeXml(order.email)}</email>
        <price>${order.price}</price>
        <priceVat>${order.priceVat}</priceVat>
        <telephone>${escapeXml(order.telephone)}</telephone>
        <TransportCode>${order.TransportCode ?? 0}</TransportCode>
        <deliveryWithoutInvoice>${Boolean(order.deliveryWithoutInvoice)}</deliveryWithoutInvoice>
        <deliveryWithoutDeliveryNote>${Boolean(order.deliveryWithoutDeliveryNote)}</deliveryWithoutDeliveryNote>
        <noCashOnDelivery>${Boolean(order.noCashOnDelivery)}</noCashOnDelivery>
      </ord>
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
