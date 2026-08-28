import {
  EDSuperCategory,
  EDCategory,
  EDProducer,
  EDCommodity,
  EDRawProductDetail,
  EDRawProductStock,
  EDProductListStatus,
  EDOrderTransportation,
  EDResponseNewOrder,
  EDNewOrderCustomerRequest,
} from '@worlds/types';

export class MockEDSystemClient {
  async getProductSuperCategoryList(): Promise<EDSuperCategory[]> {
    return [
      {
        SuperCategoryCode: '1',
        SuperCategoryName: 'PC, Notebooky, Tablety',
        ParentSuperCategoryCode: '0',
        ProductCategoryList: [
          { CategoryCode: '101', CategoryName: 'Notebooky' },
          { CategoryCode: '102', CategoryName: 'Stolné počítače' },
          { CategoryCode: '103', CategoryName: 'Tablety' },
        ],
      },
      {
        SuperCategoryCode: '2',
        SuperCategoryName: 'Komponenty',
        ParentSuperCategoryCode: '0',
        ProductCategoryList: [
          { CategoryCode: '201', CategoryName: 'Procesory' },
          { CategoryCode: '202', CategoryName: 'Grafické karty' },
          { CategoryCode: '203', CategoryName: 'Pamäte RAM' },
          { CategoryCode: '204', CategoryName: 'SSD disky' },
        ],
      },
      {
        SuperCategoryCode: '3',
        SuperCategoryName: 'Monitory a projekcia',
        ParentSuperCategoryCode: '0',
        ProductCategoryList: [
          { CategoryCode: '301', CategoryName: 'Monitory' },
          { CategoryCode: '302', CategoryName: 'Projektory' },
        ],
      },
      {
        SuperCategoryCode: '4',
        SuperCategoryName: 'Príslušenstvo a periférie',
        ParentSuperCategoryCode: '0',
        ProductCategoryList: [
          { CategoryCode: '401', CategoryName: 'Klávesnice a myši' },
          { CategoryCode: '402', CategoryName: 'Pamäťové karty' },
          { CategoryCode: '403', CategoryName: 'Káble a adaptéry' },
        ],
      },
    ];
  }

  async getProductCategoryList(): Promise<EDCategory[]> {
    return [
      {
        CategoryCode: '101',
        CategoryName: 'Notebooky',
        ProductAttributeList: [
          { AttributeCode: '58', AttributeName: 'Uhlopriečka displeja', IsPrimary: 'true' },
          { AttributeCode: '16', AttributeName: 'Kapacita RAM' },
          { AttributeCode: '182', AttributeName: 'Kapacita SSD' },
          { AttributeCode: '190', AttributeName: 'Procesor' },
        ],
      },
      {
        CategoryCode: '201',
        CategoryName: 'Procesory',
        ProductAttributeList: [
          { AttributeCode: '210', AttributeName: 'Pätica (Socket)', IsPrimary: 'true' },
          { AttributeCode: '211', AttributeName: 'Počet jadier' },
          { AttributeCode: '212', AttributeName: 'Frekvencia' },
        ],
      },
      {
        CategoryCode: '301',
        CategoryName: 'Monitory',
        ProductAttributeList: [
          { AttributeCode: '310', AttributeName: 'Uhlopriečka', IsPrimary: 'true' },
          { AttributeCode: '311', AttributeName: 'Rozlíšenie' },
          { AttributeCode: '312', AttributeName: 'Obnovovacia frekvencia' },
        ],
      },
    ];
  }

  async getProductProducerList(): Promise<EDProducer[]> {
    return [
      { ProducerCode: 'ASUS', ProducerName: 'ASUS', ProducerId: 10 },
      { ProducerCode: 'LENOVO', ProducerName: 'Lenovo', ProducerId: 11 },
      { ProducerCode: 'HP', ProducerName: 'Hewlett Packard', ProducerId: 12 },
      { ProducerCode: 'DELL', ProducerName: 'DELL', ProducerId: 13 },
      { ProducerCode: 'APPLE', ProducerName: 'Apple', ProducerId: 14 },
      { ProducerCode: 'INTEL', ProducerName: 'Intel', ProducerId: 20 },
      { ProducerCode: 'AMD', ProducerName: 'AMD', ProducerId: 21 },
      { ProducerCode: 'SAMSUNG', ProducerName: 'Samsung', ProducerId: 30 },
      { ProducerCode: 'KINGSTON', ProducerName: 'Kingston', ProducerId: 40 },
    ];
  }

  async getProductCommodityList(): Promise<EDCommodity[]> {
    return [
      { CommodityCode: 'NB', CommodityName: 'Notebooky' },
      { CommodityCode: 'CPU', CommodityName: 'Procesory' },
      { CommodityCode: 'LCD', CommodityName: 'Monitory LCD' },
      { CommodityCode: 'SSD', CommodityName: 'Solid State Disks' },
      { CommodityCode: 'MEM', CommodityName: 'Pamäťové moduly' },
    ];
  }

  async getSampleProducts(): Promise<EDRawProductDetail[]> {
    return [
      {
        ProId: '9001',
        Code: 'ASU-NB-EXP15',
        Name: 'ASUS ExpertBook B1 B1502CVA-BQ1234X i5-1335U 16GB 512GB 15.6" FHD W11P',
        PartNumber: '90NX06Q1-M00AB0',
        EANCode: '4711387123456',
        YourPrice: 520.0,
        YourPriceWithFees: 524.5,
        GarbageFee: 3.5,
        AuthorFee: 1.0,
        ValuePack: 0,
        ValuePackQty: 0,
        DealerPrice: 550.0,
        EndUserPrice: 689.0,
        Vat: 20,
        OnStock: true,
        OnStockCount: 14,
        OnStockText: 'Skladom > 10 ks',
        Unit: 'ks',
        ProducerCode: 'ASUS',
        ProducerName: 'ASUS',
        CommodityCode: 'NB',
        CommodityName: 'Notebooky',
        CategoryCode: '101',
        Warranty: '36 mesiacov on-site',
        WarrantyTerm: 36,
        WarrantyUnit: 'M',
        Description:
          'Výkonný a odolný firemný notebook ASUS ExpertBook B1 je navrhnutý pre podnikanie. Procesor Intel Core i5-1335U, 16GB RAM, 512GB SSD, 15.6" antireflexný FHD displej, Windows 11 Pro.',
        DescriptionShort: '15.6" notebook i5-1335U, 16GB RAM, 512GB SSD, W11 Pro',
        ImageList: [
          { URL: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80' },
          { URL: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80' },
        ],
        ProductNavigatorDataList: [
          { AttributeCode: '58', ValueCode: '15.6' },
          { AttributeCode: '16', ValueCode: '16GB' },
          { AttributeCode: '182', ValueCode: '512GB' },
          { AttributeCode: '190', ValueCode: 'Intel Core i5' },
        ],
        LogisticDataList: [{ typ: 'JEDN', count: 1, weight: 1.69, length: 36.1, width: 23.3, height: 1.99 }],
      },
      {
        ProId: '9002',
        Code: 'LEN-LOQ-15',
        Name: 'Lenovo LOQ 15IRX9 i7-13650HX 16GB 1TB SSD RTX 4060 15.6" WQHD 165Hz bez OS',
        PartNumber: '83DV004TCK',
        EANCode: '0197532895421',
        YourPrice: 890.0,
        YourPriceWithFees: 894.8,
        GarbageFee: 3.8,
        AuthorFee: 1.0,
        ValuePack: 0,
        ValuePackQty: 0,
        DealerPrice: 940.0,
        EndUserPrice: 1149.0,
        Vat: 20,
        OnStock: true,
        OnStockCount: 7,
        OnStockText: 'Skladom 7 ks',
        Unit: 'ks',
        ProducerCode: 'LENOVO',
        ProducerName: 'Lenovo',
        CommodityCode: 'NB',
        CommodityName: 'Notebooky',
        CategoryCode: '101',
        Warranty: '24 mesiacov',
        WarrantyTerm: 24,
        WarrantyUnit: 'M',
        Description:
          'Herný notebook Lenovo LOQ 15 s výkonným procesorom Intel Core i7-13650HX a grafickou kartou NVIDIA GeForce RTX 4060 8GB.',
        DescriptionShort: 'Herný notebook i7, 16GB RAM, RTX 4060, 1TB SSD',
        ImageList: [
          { URL: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80' },
        ],
        ProductNavigatorDataList: [
          { AttributeCode: '58', ValueCode: '15.6' },
          { AttributeCode: '16', ValueCode: '16GB' },
          { AttributeCode: '182', ValueCode: '1TB' },
        ],
        LogisticDataList: [{ typ: 'JEDN', count: 1, weight: 2.38, length: 35.9, width: 25.8, height: 2.39 }],
      },
      {
        ProId: '9003',
        Code: 'INT-CPU-14700K',
        Name: 'Intel Core i7-14700K Raptor Lake Refresh 20-jadrový LGA1700 Box',
        PartNumber: 'BX8071514700K',
        EANCode: '5032037278546',
        YourPrice: 345.0,
        YourPriceWithFees: 346.0,
        GarbageFee: 0.8,
        AuthorFee: 0.2,
        ValuePack: 0,
        ValuePackQty: 0,
        DealerPrice: 365.0,
        EndUserPrice: 429.0,
        Vat: 20,
        OnStock: true,
        OnStockCount: 25,
        OnStockText: 'Skladom > 20 ks',
        Unit: 'ks',
        ProducerCode: 'INTEL',
        ProducerName: 'Intel',
        CommodityCode: 'CPU',
        CommodityName: 'Procesory',
        CategoryCode: '201',
        Warranty: '36 mesiacov',
        WarrantyTerm: 36,
        WarrantyUnit: 'M',
        Description:
          'Procesor 14. generácie Intel Raptor Lake Refresh, 20 jadier (8P + 12E), takt až 5.6 GHz, pätica LGA 1700, integrovaná grafika Intel UHD 770.',
        ImageList: [
          { URL: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80' },
        ],
        ProductNavigatorDataList: [
          { AttributeCode: '210', ValueCode: 'LGA1700' },
          { AttributeCode: '211', ValueCode: '20' },
        ],
        LogisticDataList: [{ typ: 'JEDN', count: 1, weight: 0.12, length: 11.5, width: 10.0, height: 4.5 }],
      },
      {
        ProId: '9004',
        Code: 'SAM-MON-G7',
        Name: 'Samsung Odyssey G7 28" IPS UHD 144Hz 1ms HDMI 2.1 G-Sync Compatible HDR400',
        PartNumber: 'LS28BG700EPXEN',
        EANCode: '8806094582123',
        YourPrice: 410.0,
        YourPriceWithFees: 415.5,
        GarbageFee: 4.5,
        AuthorFee: 1.0,
        ValuePack: 0,
        ValuePackQty: 0,
        DealerPrice: 440.0,
        EndUserPrice: 549.0,
        Vat: 20,
        OnStock: true,
        OnStockCount: 5,
        OnStockText: 'Skladom 5 ks',
        Unit: 'ks',
        ProducerCode: 'SAMSUNG',
        ProducerName: 'Samsung',
        CommodityCode: 'LCD',
        CommodityName: 'Monitory LCD',
        CategoryCode: '301',
        Warranty: '24 mesiacov',
        WarrantyTerm: 24,
        WarrantyUnit: 'M',
        Description:
          'Herný 4K UHD monitor Samsung Odyssey G7 s IPS panelom, 144 Hz obnovovacou frekvenciou, odozvou 1 ms a podporou HDR400.',
        ImageList: [
          { URL: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80' },
        ],
        ProductNavigatorDataList: [
          { AttributeCode: '310', ValueCode: '28' },
          { AttributeCode: '311', ValueCode: '3840x2160 (4K UHD)' },
          { AttributeCode: '312', ValueCode: '144Hz' },
        ],
        LogisticDataList: [{ typ: 'JEDN', count: 1, weight: 7.0, length: 71.0, width: 45.0, height: 18.0 }],
      },
      {
        ProId: '9005',
        Code: 'KIN-SSD-KC3000-2TB',
        Name: 'Kingston KC3000 NVMe M.2 2TB PCIe 4.0 (R/W 7000/7000 MB/s)',
        PartNumber: 'SKC3000D/2048G',
        EANCode: '0740617324426',
        YourPrice: 125.0,
        YourPriceWithFees: 125.5,
        GarbageFee: 0.3,
        AuthorFee: 0.2,
        ValuePack: 0,
        ValuePackQty: 0,
        DealerPrice: 135.0,
        EndUserPrice: 169.0,
        Vat: 20,
        OnStock: true,
        OnStockCount: 42,
        OnStockText: 'Skladom > 30 ks',
        Unit: 'ks',
        ProducerCode: 'KINGSTON',
        ProducerName: 'Kingston',
        CommodityCode: 'SSD',
        CommodityName: 'Solid State Disks',
        CategoryCode: '204',
        Warranty: '60 mesiacov',
        WarrantyTerm: 60,
        WarrantyUnit: 'M',
        Description:
          'Špičkový PCIe 4.0 NVMe M.2 SSD disk s kapacitou 2 TB a rýchlosťou čítania/zápisu až 7000 MB/s.',
        ImageList: [
          { URL: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80' },
        ],
        ProductNavigatorDataList: [
          { AttributeCode: '182', ValueCode: '2000GB' },
        ],
        LogisticDataList: [{ typ: 'JEDN', count: 1, weight: 0.05, length: 12.0, width: 8.0, height: 1.0 }],
      },
    ];
  }

  async getProductCatalogueStockDownloadXML(): Promise<EDProductListStatus> {
    return {
      IsReady: true,
      Url: 'https://mock.elinkx.biz/stock.xml',
      FileName: 'stock_sample.xml',
    };
  }

  async getTransportationListCustomer(): Promise<EDOrderTransportation[]> {
    return [
      { Code: 176, Name: 'Kuriér DPD / PPL Slovensko B2C', TypeCode: 'COURIER' },
      { Code: 177, Name: 'Slovenská Pošta Balík na adresu', TypeCode: 'POST' },
      { Code: 180, Name: 'Osobný odber na centrále', TypeCode: 'PICKUP' },
    ];
  }

  async createNewOrderCustomer(
    order: EDNewOrderCustomerRequest,
    isTest = true
  ): Promise<EDResponseNewOrder> {
    return {
      OrderSymbol: `ED-${Date.now().toString().slice(-7)}`,
      Status: { StatusCode: 'DONE' },
    };
  }
}
