/**
 * eD system a. s. (E LINKX) Web Service Data Contracts
 * Based on PRIVATE Data Exchange Specification (v 4.4.17.0)
 */

export interface EDServiceCredentials {
  login: string;
  password: string;
  endpointUrl?: string; // default: https://private-ws-sk.elinkx.biz/service.asmx
}

export type EDStatusCode = 'DONE' | 'ERROR';

export interface EDStatus {
  StatusCode: EDStatusCode;
  ErrorText?: string;
}

export interface EDProductListStatus {
  Status?: EDStatus;
  Url?: string;
  FileName?: string;
  IsReady: boolean | string;
}

export interface EDImageItem {
  URL: string;
}

/** eD XML may emit one image as an object and several images as an array. */
export interface EDImageList {
  ProductImage?: EDImageItem | EDImageItem[];
  Image?: EDImageItem | EDImageItem[];
}

export type EDImageInput = EDImageItem | EDImageItem[] | EDImageList;

export interface EDNavigatorData {
  AttributeCode: number | string;
  ValueCode: number | string;
}

export interface EDLogisticData {
  typ: 'JEDN' | 'PACK' | string;
  count: number;
  weight: number; // kg
  length: number; // cm
  width: number; // cm
  height: number; // cm
}

export interface EDExtInfoCode {
  InfoCode: string;
  InfoName: string;
}

/**
 * Full product detail returned by getProductCatalogueFullDownloadXML / ZIP or getProductDetail
 */
export interface EDRawProductDetail {
  ProId: string;
  Code: string;
  Name: string;
  PartNumber: string;
  PartNumber2?: string;
  EANCode?: string;
  YourPrice: number;
  YourPriceWithFees: number;
  GarbageFee: number;
  AuthorFee: number;
  ValuePack: number;
  ValuePackQty: number;
  DealerPrice?: number;
  DealerPrice1?: number;
  EndUserPrice?: number;
  Vat: number;
  OnStock: boolean | string | number;
  OnStockCount?: number;
  OnStockText?: string;
  Unit?: string;
  Status?: string;
  IsTop?: boolean | string;
  InfoCode?: string;
  CommodityCode?: string;
  CommodityName?: string;
  Warranty?: string;
  WarrantyTerm?: number;
  WarrantyUnit?: string;
  Description?: string;
  DescriptionShort?: string;
  NameB2C?: string;
  IndexSort1?: string;
  IndexCode1?: string;
  IndexOrder1?: string;
  IndexImplicit1?: boolean | string;
  IndexSort2?: string;
  IndexCode2?: string;
  IndexOrder2?: string;
  IndexImplicit2?: boolean | string;
  DateAvailible?: string;
  ImgCount?: number;
  ImgLastChanged?: string;
  PixImgCode?: string;
  ProducerCode?: string;
  ProducerName?: string;
  CategoryCode?: string;
  ImageList?: EDImageInput;
  ProductNavigatorDataList?: EDNavigatorData[];
  B2C?: boolean | string;
  LogisticDataList?: EDLogisticData[];
  RateOfDutyCode?: string;
  RCStatus?: 'Y' | 'N' | 'U' | string;
  RCCode?: string;
  IsPremium?: boolean | string;
  ExtInfoCodes?: EDExtInfoCode[];
  MultipleQuantity?: number;
  PriceCurrency?: string;
}

/**
 * Hourly Stock & Price update from getProductCatalogueStockDownloadXML
 */
export interface EDRawProductStock {
  ProId: string;
  Code: string;
  PartNumber: string;
  OnStockCount: number;
  DateAvailible: string;
  YourPrice: number;
  YourPriceWithFees: number;
  GarbageFee: number;
  AuthorFee: number;
  ValuePack: number;
  ValuePackQty: number;
  PriceCurrency: string;
}

/**
 * Categories, SuperCategories, Attributes & Values from getNavigator
 */
export interface EDSuperCategory {
  SuperCategoryCode: string | number;
  SuperCategoryName: string;
  ParentSuperCategoryCode: string | number;
  ProductCategoryList?: EDCategory[];
}

export interface EDCategory {
  CategoryCode: string | number;
  CategoryName: string;
  ProductAttributeList?: EDCategoryAttribute[];
  ImageList?: EDImageInput;
}

export interface EDCategoryAttribute {
  AttributeCode: string | number;
  AttributeName: string;
  IsPrimary?: boolean | string;
  FilterOperator?: 'AND' | 'OR' | string;
}

export interface EDAttributeValue {
  ValueCode: string | number;
  AttributeCode: string | number;
  Value: string;
  ValueSort?: number;
}

export interface EDProducer {
  ProducerCode: string;
  ProducerName: string;
  ProducerId: string | number;
}

export interface EDCommodity {
  CommodityCode: string;
  CommodityName: string;
  CommodityParentCode?: string;
}

export interface EDIndexTreeItem {
  IndexCode: string;
  CommodityCode: string;
  IndexName: string;
  IndexSort: string;
  IndexSortCode: string;
  IndexLevel: number;
  IndexOrder: number;
  IndexCodeName: string;
  ProductIndexList?: EDIndexTreeItem[];
}

export interface EDProductRelationChild {
  ProId: string;
  Code: string;
  Qty: number;
  RelTypeId: string | number;
  RelTypeName: string;
}

export interface EDProductRelation {
  ParentProId: string;
  ParentCode: string;
  Childs: EDProductRelationChild[];
}
