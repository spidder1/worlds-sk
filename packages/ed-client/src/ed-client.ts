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
  EDRawProductDetail,
  EDNewOrderCustomerRequest,
  EDResponseNewOrder,
  EDOrderTransportation,
} from '@worlds/types';
import { executeSoapCall, escapeXml } from './soap-request.js';

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
    const action = `${this.getSoapNamespace()}getProductCommodityList`;
    const bodyXml = `<getProductCommodityList xmlns="${this.getSoapNamespace()}">
      <login>${escapeXml(this.login)}</login>
      <password>${escapeXml(this.pass)}</password>
    </getProductCommodityList>`;

    const response = await executeSoapCall<{ getProductCommodityListResponse?: { getProductCommodityListResult?: any } }>({
      endpoint: this.endpoint,
      action,
      bodyXml,
    });

    const result = response?.getProductCommodityListResponse?.getProductCommodityListResult;
    const items = result?.ProductCommodityList?.ProductCommodity;
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
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
   * 3.13. getProductCatalogueStockDownloadXML
   * Generates URL for downloading fast stock/price XML update (12x daily).
   */
  async getProductCatalogueStockDownloadXML(): Promise<EDProductListStatus> {
    const action = `${this.getSoapNamespace()}getProductCatalogueStockDownloadXML`;
    const bodyXml = `<getProductCatalogueStockDownloadXML xmlns="${this.getSoapNamespace()}">
      <login>${escapeXml(this.login)}</login>
      <password>${escapeXml(this.pass)}</password>
    </getProductCatalogueStockDownloadXML>`;

    const response = await executeSoapCall<{ getProductCatalogueStockDownloadXMLResponse?: { getProductCatalogueStockDownloadXMLResult?: any } }>({
      endpoint: this.endpoint,
      action,
      bodyXml,
    });

    const res = response?.getProductCatalogueStockDownloadXMLResponse?.getProductCatalogueStockDownloadXMLResult;
    return {
      Status: res?.Status,
      Url: res?.Url,
      FileName: res?.FileName,
      IsReady: res?.IsReady === 'true' || res?.IsReady === true,
    };
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
    const action = `${this.getSoapNamespace()}getProductCatalogueFullDownloadZIPv1`;
    const onStockVal = options.onStock ?? false;
    const bodyXml = `<getProductCatalogueFullDownloadZIPv1 xmlns="${this.getSoapNamespace()}">
      <login>${escapeXml(this.login)}</login>
      <password>${escapeXml(this.pass)}</password>
      <onStock>${onStockVal}</onStock>
      <Comodities>${escapeXml(options.commodities || '')}</Comodities>
      <ComoditiesTree>${escapeXml(options.commoditiesTree || '')}</ComoditiesTree>
      <Producers>${escapeXml(options.producers || '')}</Producers>
      <Categories>${escapeXml(options.categories || '')}</Categories>
    </getProductCatalogueFullDownloadZIPv1>`;

    const response = await executeSoapCall<{ getProductCatalogueFullDownloadZIPv1Response?: { getProductCatalogueFullDownloadZIPv1Result?: any } }>({
      endpoint: this.endpoint,
      action,
      bodyXml,
    });

    const res = response?.getProductCatalogueFullDownloadZIPv1Response?.getProductCatalogueFullDownloadZIPv1Result;
    return {
      Status: res?.Status,
      Url: res?.Url,
      FileName: res?.FileName,
      IsReady: res?.IsReady === 'true' || res?.IsReady === true,
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
    const action = `${this.getSoapNamespace()}getTransportationListCustomer`;
    const bodyXml = `<getTransportationListCustomer xmlns="${this.getSoapNamespace()}">
      <login>${escapeXml(this.login)}</login>
      <password>${escapeXml(this.pass)}</password>
    </getTransportationListCustomer>`;

    const response = await executeSoapCall<{ getTransportationListCustomerResponse?: { getTransportationListCustomerResult?: any } }>({
      endpoint: this.endpoint,
      action,
      bodyXml,
    });

    const result = response?.getTransportationListCustomerResponse?.getTransportationListCustomerResult;
    const items = result?.TransportationList?.Transportation;
    if (!items) return [];
    return Array.isArray(items) ? items : [items];
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
