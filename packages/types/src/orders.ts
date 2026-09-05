/**
 * Order & Logistics types for eD system integration and Worlds.sk commerce
 */

export interface OrderAddress {
  name: string;
  street: string;
  city: string;
  zipCode: string;
  countryCode: string; // ISO 3166-1 alpha-2, e.g. 'SK', 'CZ'
  phone?: string;
  email?: string;
  companyName?: string;
  ico?: string;
  dic?: string;
  icDph?: string;
}

export interface EDOrderTransportation {
  Code: number | string;
  Name: string;
  TypeCode: string;
}

export interface EDNewOrderItem {
  ProductCode: string;
  Qty: number;
}

export interface EDNewOrderRequest {
  ShippingAddress?: OrderAddress;
  NewOrderItems: EDNewOrderItem[];
  OrderNote?: string;
  OrderSymbolCustomer?: string;
  TransportCode: number;
  telephone?: string;
  email?: string;
}

export interface EDNewOrderItemCustomer {
  ProductCode: string; // Product Code or 'TRA' for transportation
  Qty: number;
  Price: number; // End user price without VAT
  PriceVat: number; // End user price with VAT
  VatRate: number; // e.g. 1.20 or 1.23
}

export interface EDNewOrderCustomerRequest {
  NewOrderCustomerItems: EDNewOrderItemCustomer[];
  ShippingAddress: OrderAddress;
  InvoiceAddress?: OrderAddress;
  OrderNote?: string;
  OrderSymbolCustomer: string; // Internal Order ID / Symbol
  customerName: string;
  custumerInvoiceCode: string; // Unique dealer invoice number
  email: string;
  telephone: string;
  price: number;
  priceVat: number;
  TransportCode?: number;
  deliveryWithoutInvoice?: boolean;
  deliveryWithoutDeliveryNote?: boolean;
  noCashOnDelivery?: boolean;
  deferredInvoicing?: boolean;
  priceTotal?: boolean;
  customerCurrency?: string;
}

export interface EDResponseNewOrder {
  OrderSymbol?: string;
  Status: {
    StatusCode: 'DONE' | 'ERROR';
    ErrorText?: string;
  };
}
