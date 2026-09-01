<?php

    class ImportXmlStreamer extends XmlStreamer {
        public function processNode($xmlString, $elementName, $nodeIndex) {
            global $logger, $b2b;

            $type = $this->type;
            if ( (@count(@$this->articles_final) > 2000) && ($type=="FOR_INSERT") ) return true;

            //if ( (@count(@$this->articles_final) > 60000) && ($type=="FOR_UPDATE") ) return true;
            $AttributesCode = $this->AttributesCode;
            $CategoryAttributes = $this->CategoryAttributes;
            //        print_r($xmlString);
            $a = simplexml_load_string($xmlString);
            //                print_r($a); exit;
            //echo "{$a->ProId}<br>";
            $item = new stdClass();


            //    <ProId>434663</ProId>
            //    <Code>MAN701662</Code>
            //    <PartNumber>701662</PartNumber>

            $item->sku = str_replace("'", "", trim((string) $a->Code));
            $item->sku = str_replace("\\", "-", $item->sku);
            $item->sku = str_replace("\"", "", $item->sku);
            //        dump($this->store_products);exit;
            $store_product_id = "";
            if (isset($this->store_products[strtolower($item->sku)])) {
                $store_product_id = $this->store_products[strtolower($item->sku)];
            }
            $this->product_total++;
            // 	dump($this->store_products);
            if (($type=="FOR_INSERT") && $store_product_id) return true;
            if (($type=="FOR_UPDATE") && !$store_product_id) return true;

            //        echo $item->sku  ."<br>";
            $item->status = 1;

            // [ProId] => 3803
            // [Code] => 670051
            // [PartNumber] => 51626AE
            if (isset($a->ProductNavigatorDataList)) {
                foreach($a->ProductNavigatorDataList->children() as $nav) {
                    $attr_code = $nav->AttributeCode;
                    $attr_value = $nav->ValueCode;
                    $catxml = @$this->category_mapping[(string) $a->CategoryCode . "_" . $attr_value];
                    if (@$catxml) {
                        foreach ($catxml as $catstore) {
                            $item->category_ids[] = (int) $catstore;
                            $sop = $this->b2b->get_category_ancestors((int) $catstore);    
                            if (count($sop)>0)
                                foreach($sop as $cc){
                                    $item->category_ids[] = (int) $cc;
                            }
                        }
                    }
                }     
            } 

            $item->category_XML = (string) $a->CategoryCode;
            if (@$this->category_mapping[$item->category_XML])
                foreach ($this->category_mapping[$item->category_XML] as $catstore) {
                    //	$item->category_ids = @array_merge($item->category_ids, $this->get_category_ancestors($catstore));
                    $item->category_ids[] = (int) $catstore;
            }
            if (@count($item->category_ids) == 0) {
                $item->category_ids = array();
                return true;
                continue;
            }
            $this->product_mapped++;
            $item->category_ids = @array_unique($item->category_ids);
            $item->store_product_id = $store_product_id;
            $item->manufacturer_sku = (string) $a->Code;
            $item->codeitem = (string) $a->Code;
            $item->partnumber = (string) $a->PartNumber;
            $item->id_supplier = 3;
            $item->weight = 0;
            $item->ecotax = (float) $a->GarbageFee + (float) $a->AuthorFee  ;

            if (true || $this->type=="FOR_INSERT") {
                $item->title = str_replace("\\" , "-", (string) $a->Name);

                //                $item->desc_short = ImpLib::limitSentence(strip_tags ( (string) $a->DescriptionShort ), 160);
                $item->desc_short = (string) $a->DescriptionShort;
                $item->desc_long = ((string) $a->Description !="" ? (string) $a->Description . "<br>":"") .   (string) $a->DescriptionShort;
                if ($item->desc_long=="") $item->desc_long = $item->title;
                //                if ($item->desc_short=="") $item->desc_short = $item->title;
                $item->desc_long .= "<br><br>" . ((String) $a->Warranty != "" ? "Záruka: " . (String) $a->Warranty : "");
                $item->meta_title = $item->title;
                $item->meta_desc = $item->desc_short;
                $meta_keywords = array();
                foreach (explode(" ", $item->meta_title) as $r) {
                    if (strlen($r) > 4) {
                        $meta_keywords[] = str_replace(",", "", $r);
                    }
                }
                $item->meta_keyword = implode(", ", $meta_keywords);
            }

            if ($item->sku == "IBMNB-20H50070XS") {
                //                dump($item);  
                //                print_r($a);  
                //                exit;
            }


            $item->ean_upc = str_replace("`", "", (string) $a->EANCode);

            $raw_buy_price = (float) $a->YourPrice;
            $item->ecotax = (float) $a->GarbageFee + (float) $a->AuthorFee;
            $item->wholesale_price = (float) $a->YourPriceWithFees;
            $quantity = (int) $a->OnStockCount;

            if (true) {
                $item->quantity = (int) $quantity;
                if($quantity=="100+")  $item->quantity = 1000;
                if($quantity=="50-99")  $item->quantity = 99;
                if($quantity=="10-49")  $item->quantity = 49;

                // 1. Zistenie marže: špecifická marža kategórie má prednosť, inak cenový rozsah podľa nákupnej ceny
                $cat_margin = @$this->category_margins[$item->category_XML];
                if (!empty($cat_margin) && is_numeric($cat_margin) && ((float)$cat_margin > 0)) {
                    $item->margin = (float) $cat_margin;
                } else {
                    $item->margin = Settings::get_margin_from_price($raw_buy_price);
                }

                // 2. Výpočet finálnej ceny: Nákupná cena + marža, následne pripočítaný ecotax (poplatok za elektroodpad a autorské poplatky)
                $calculated_price = $raw_buy_price * (1 + ($item->margin / 100));
                $item->price = round($calculated_price + $item->ecotax, 2);
                $item->price_raw = $raw_buy_price + $item->ecotax;
                //echo ", Store Price={$item->price} | quantity={$item->quantity}</b><br>";
                foreach ($a->ImageList->ProductImage as $img) {
                    $i =  str_replace("_3.", ".", (string) $img->URL);
                    $i =  str_replace("http://", "https://", $i);
                    $item->images[] =  str_replace("_8.", ".",$i);
                }
                //print_r($a);;
                if ($item->sku == "S321805"){
//                    print_r($a);
//                    dump($item);exit;
                }
                //		            $item->id_manufacturer = @Presta15Conn::get_manufacturer_id(addslashes( (string) $a->ProducerName));
                $item->manufacturer = addslashes( (string) $a->ProducerName);
                $attributes = array();

                if (isset($a->ProductNavigatorDataList)) {
                    foreach($a->ProductNavigatorDataList->children() as $nav) {
                        $attr_code = (string )$nav->AttributeCode;
                        $attr_value = (string ) $nav->ValueCode;
                        $attr_name = @$CategoryAttributes[(string) $a->CategoryCode][$attr_code];
                        if ($attr_name!="")
                            $item->features[$attr_name] = $AttributesCode[$attr_code][$attr_value];
                    }
                }

                $item->supplier_reference = "";
                $item->available_later = "Na objednávku";
                $item->available_now = "Skladem";
                $item->warranty = (String) $a->Warranty;
                $item->weight = "";
                $item->length = "";
                $item->depth  = "";
                $item->width  = "";
                $item->height = "";
                $item->active = 1;
                foreach ($a->LogisticDataList->ProductLogisticData as $ProductLogisticData) {
                    if ((int) $ProductLogisticData->count == 1) {
                        $item->length = (float) $ProductLogisticData->length;
                        $item->depth  = (float) $ProductLogisticData->length;
                        $item->width  = (float) $ProductLogisticData->width ;
                        $item->weight = (float) $ProductLogisticData->weight /100;
                        $item->height = (float) $ProductLogisticData->height  ;
                    }
                }
                @$this->product_processed++;

                $this->articles_final[$item->sku] = $item;

                if ($type=="FOR_UPDATE") {
                    echo @$b2b->RRR++ . "  " . $item->sku . "  " . $item->price_raw . " (vc. {$item->ecotax}) + " . $item->margin . " w:"  . $item->warranty . "% => {$item->price}   | qty={$item->quantity}<Br>";
                }
                //                     exit;

                if ($item->sku=="LWP-DASH20-SG") {
                    //                             print_r($a);;
                    //                             dump($item);
                    //                             exit;

                }

                //                dump($item);exit;

            }

            return true;
        }
    }

    class ED extends MagConn {

        function __construct() {
            global $iconf;
            $this->name = get_class();
            if (mysql_num_rows(mysql_query("SHOW TABLES LIKE 'imported'")) != 1) {
                echo DB_HOSTNAME ."/". DB_DATABASE ."/".DB_USERNAME ."/". DB_PASSWORD . "<br><br>DB Tables installed.<br>" ;
                $this->install();
            }
            $this->settings = Settings::get_import_settings($this->name);
            $this->import_settings = $this->settings;
            $this->category_mapping = Settings::get_category_mappings($this->name);
            $this->category_margins = @$this->import_settings['MARGIN'];
            $this->attributesDynamicNames = array();  // prepareMagentoAttributesDynamic

            $iconf['FieldsSettings'] = array(
                "store" 		=> array("INSERT" => true, "UPDATE" => false, "Default" => STORE),
                "news_from_date"=> array("INSERT" => true, "UPDATE" => false, "Default" => ""),
                "websites" 		=> array("INSERT" => true, "UPDATE" => false, "Default" => WEBSITES),
                "attribute_set" => array("INSERT" => true, "UPDATE" => false, "Default" => "TTP"),
                "visibility" 	=> array("INSERT" => true, "UPDATE" => false, "Default" => 4),
                "tax_class_id" 	=> array("INSERT" => true, "UPDATE" => false, "Default" => TAX_CLASS_ID),
                "is_in_stock" 	=> array("INSERT" => true, "UPDATE" => false, "Default" => ""),        // 
                "status" 		=> array("INSERT" => true, "UPDATE" => false, "Default" => 1),          // 
                "title" 		=> array("INSERT" => true, "UPDATE" => false, "Default" => ""),
                "desc_long" 	=> array("INSERT" => true, "UPDATE" => true, "Default" => ""),
                "desc_short" 	=> array("INSERT" => true, "UPDATE" => true, "Default" => ""),
                "meta_title" 	=> array("INSERT" => true, "UPDATE" => false, "Default" => ""),
                "meta_desc" 	=> array("INSERT" => true, "UPDATE" => false, "Default" => ""),
                "meta_keyword" 	=> array("INSERT" => true, "UPDATE" => false, "Default" => ""),
                "quantity" 		=> array("INSERT" => true, "UPDATE" => false, "Default" => ""),         //
                "price" 		=> array("INSERT" => true, "UPDATE" => true, "Default" => ""),
                "special_price" => array("INSERT" => true, "UPDATE" => false, "Default" => ""),
                "special_to_date"=>array("INSERT" => true, "UPDATE" => false, "Default" => ""),
                "cost" 			=> array("INSERT" => true, "UPDATE" => false, "Default" => ""),
                "msrp" 			=> array("INSERT" => true, "UPDATE" => false, "Default" => ""),
                "image" 		=> array("INSERT" => true, "UPDATE" => true, "Default" => ""),
                "categories" 	=> array("INSERT" => true, "UPDATE" => true, "Default" => ""),
                "ean_upc" 		=> array("INSERT" => true, "UPDATE" => false, "Default" => ""),
                "manufacturer" 	=> array("INSERT" => true, "UPDATE" => false, "Default" => ""),
                "weight" 		=> array("INSERT" => true, "UPDATE" => false, "Default" => ""),
                "xre_skus" 		=> array("INSERT" => false, "UPDATE" => false, "Default" => ""),
                "cs_skus" 		=> array("INSERT" => false, "UPDATE" => false, "Default" => ""),
                "us_skus" 		=> array("INSERT" => false, "UPDATE" => false, "Default" => ""),
            );

            $iconf['CustomFieldsSettings'] = array(
                "partnumber"         => array("INSERT" => true, "UPDATE" => true, "Default" => ""),
                "warranty"             => array("INSERT" => true, "UPDATE" => true, "Default" => ""),
                "codeitem" 		    => array("INSERT" => true, "UPDATE" => true, "Default" => ""),
                //			"news_from_date" 		=> array("INSERT" => true, "UPDATE" => true, "Default" => ""),
                //			"use_config_manage_stock" 	=> array("INSERT" => true, "UPDATE" => false, "Default" => 1),
                //			"manage_stock" 				=> array("INSERT" => true, "UPDATE" => false, "Default" => 1),
                //			"options_container" 		=> array("INSERT" => true, "UPDATE" => false, "Default" => 1),
            );

            $this->wsLogin = "EthosAPI";
            $this->wsPass = "Ed_2025";
        }

        public function getCategories() {
            $file = FEED_PATH . "CategoryList.xml";
            $fdiff = (date("U") -  filemtime($file)) / 3600;
            if ( (filesize($file) > 100) && ($fdiff < 4) ) {
                $fulldataset = file_get_contents($file);
            } else {
                $url = "https://private-ws-sk.elinkx.biz/service.asmx/getNavigator?login={$this->wsLogin}&password={$this->wsPass}";
                $fulldataset = file_get_contents($url);
                file_put_contents($file, $fulldataset);
            }
            $xml = new SimpleXMLElement($fulldataset);
            //$categories = $xml->children('urn:schemas-microsoft-com:xml-diffgram-v1')->children();
            return $xml;
        }


        public function process_xml($type = "FOR_INSERT") {
            global $logger, $db;
            $product_total = $mapped = $processed = 0;
            $this->store_products = $this->get_imported($this->name);
            $this->import_settings = Settings::get_import_settings($this->name);
            $articles_final = array();

            $file =  FEED_PATH . "/ProductCategoryAttributeValueList.xml";
            $xml = new SimpleXMLElement(file_get_contents($file));
            foreach ($xml->ProductCategoryAttributeValueList->ProductCategoryAttributeValue as $r) {
                $AttributesCode[(string)  $r->AttributeCode][(string)  $r->ValueCode] = (string) $r->Value;
            }

            $file =  FEED_PATH . "/ProductCategoryList.xml";
            $xml = new SimpleXMLElement(file_get_contents($file));
            foreach ($xml->children() as $r) {
                foreach ($r as $re) {
                    if (@$re->ProductAttributeList->ProductCategoryAttribute)
                        foreach($re->ProductAttributeList->ProductCategoryAttribute as $aa) {
                            $CategoryAttributes[(string)$re->CategoryCode][ (string)$aa->AttributeCode] = (string)$aa->AttributeName;
                    }
                }
            }

            //dump($this->store_products );

            $rr=1;
            $file = FEED_PATH . $this->name."_$rr.xml";
            while(@filesize($file) > 0) {
                $streamer = new ImportXmlStreamer($file);
                $streamer->product_total = $streamer->processed = $streamer->mapped = 0;
                $streamer->store_products = $this->store_products;
                $streamer->import_settings = $this->import_settings;
                $streamer->category_mapping = $this->category_mapping;
                $streamer->category_margins = @$this->import_settings['MARGIN'];
                $streamer->AttributesCode = $AttributesCode;
                $streamer->CategoryAttributes = $CategoryAttributes;
                $streamer->type = $type;
                $streamer->b2b = $this;
                $streamer->settings = $this->settings;

                $streamer->parse();

                $product_total = $product_total + $streamer->product_total;
                $mapped = $mapped + $streamer->mapped;
                $processed = $processed + $streamer->processed;

                if (isset($streamer->articles_final)) {
                    foreach ($streamer->articles_final as $sku => $item_obj) {
                        $articles_final[$sku] = $item_obj;
                    }
                    //				$logger->LogCron("   - Processed  $file | OUT:".count($articles_final)." | product_total=$product_total |  mapped=$mapped | processed=$processed | MEM: ".ImpLib::convert(memory_get_usage(true)) ." Peak: " . ImpLib::convert(memory_get_peak_usage(true)));
                }
                $rr++;
                $file = FEED_PATH . $this->name."_$rr.xml";

                if ( (@count(@$articles_final) > 10000) && ($type=="FOR_INSERT") ) break;
                //    if ( (@count(@$articles_final) > 60000) && ($type=="FOR_UPDATE") ) break;


            }

            $logger->LogCron("   - DATAFEED Parsed | OUT:".count($articles_final)." | product_total=$product_total |  mapped=$mapped | processed=$processed");

            //        die("stopped");

            return @$articles_final;
        }

        public function download_feeds() {
            global $logger;
            $file = FEED_PATH . "/".$this->name."_1.xml";
            $fdiff = (date("U") -  @filemtime($file)) / 3600;
            if ($fdiff > 4) {

                $file =  FEED_PATH . "/ProductCommodityList.xml";
                $fulldataset = file_get_contents("https://private-ws-sk.elinkx.biz/service.asmx/getProductCommodityList?login={$this->wsLogin}&password={$this->wsPass}&onStock=false&Comodities=");
                //        echo $fulldataset;exit;
                file_put_contents($file, $fulldataset);
                $logger->LogCron("FEED DOWNLOADED: $file (".ImpLib::convert( filesize($file)).")");

                $commodities_xml = new SimpleXMLElement($fulldataset);
                $ii=0;
                $r=0;
                foreach($commodities_xml->ProductCommodityList->ProductCommodity  as $commodity_xml) {
                    $ii++ ;
                    if ($ii > 0) {
                        $r++;
                        $ii=0;

                    };
                    if ( ($commodity_xml->CommodityCode!="") && ($commodity_xml->CommodityCode!="   ") )
                        $commodities[$r][] =(string) $commodity_xml->CommodityCode ;
                }
                //dump($commodities);exit;
                // $commodities = implode(",", $commodities);
                //   $fulldataset = file_get_contents("https://private-ws-sk.elinkx.biz/service.asmx/getProductCatalogueFullDownloadZIP?login={$this->wsLogin}&password={$this->wsPass}&onStock=true&Comodities=");
                $rr=0;

                foreach ($commodities as $commodity) {
                    $rr++;
                    $commodity = implode(",",$commodity);
                    $commodity = str_replace(" ", "%20", $commodity);
                    dump($commodity);
                    
                    $fulldataset = file_get_contents("https://private-ws-sk.elinkx.biz/service.asmx/getProductCatalogueFullDownloadZIP?login={$this->wsLogin}&password={$this->wsPass}&onStock=false&Comodities=$commodity");
                    //                echo "https://private-ws-sk.elinkx.biz/service.asmx/getProductCatalogueFullDownloadZIP?login={$this->wsLogin}&password={$this->wsPass}&onStock=false&Comodities=$commodity"
                    $file =  FEED_PATH . "/ED_$rr.xml";
                    $xml = new SimpleXMLElement($fulldataset);
                    $link = (string) $xml->ProductListStatus->url;
                    $f = (string) $xml->ProductListStatus->fileName; // dump($xml->ProductListStatus);
                    file_put_contents($file . ".zip", file_get_contents($link));
                    $zip = new ZipArchive;
                    $res = $zip->open($file . ".zip");
                    if ($res === TRUE) {
                        $zip->extractTo(FEED_PATH);
                        $zip->close();
                    } else {
                        echo "error during unzip process";
                    }
                    rename(FEED_PATH . str_replace(".zip", ".xml", $f), $file );
                    $logger->LogCron("FEED DOWNLOADED: $file = $commodity(".ImpLib::convert( filesize($file)).")");
                }

//                die("ok");
                
                $file =  FEED_PATH . "/ProductCategoryList.xml";
                $fulldataset = file_get_contents("https://private-ws-sk.elinkx.biz/service.asmx/getProductCategoryList?login={$this->wsLogin}&password={$this->wsPass}&onStock=false&Comodities=");
                file_put_contents($file, $fulldataset);
                $logger->LogCron("FEED DOWNLOADED: $file (".ImpLib::convert( filesize($file)).")");

                $file =  FEED_PATH . "/ProductCategoryAttributeValueList.xml";
                $fulldataset = file_get_contents("https://private-ws-sk.elinkx.biz/service.asmx/getProductCategoryAttributeValueList?login={$this->wsLogin}&password={$this->wsPass}&onStock=false&Comodities=");
                file_put_contents($file, $fulldataset);
                $logger->LogCron("FEED DOWNLOADED: $file (".ImpLib::convert( filesize($file)).")");
            }
            return true;
        }

        public function get_category_mapping_tree() {
            global $db;

            /*
            $xml = new SimpleXMLElement(file_get_contents(FEED_PATH . "/".$this->name.".xml"));
            foreach($xml->children() as $a) {
            foreach($a->ProductNavigatorDataList->children() as $nav) {
            $attr_code = $nav->AttributeCode;
            $attr_value = $nav->ValueCode;
            //  $allowed_categories[(int) $a->CategoryCode][(int) $nav->AttributeCode] = true;
            $allowed_categories[(int) $a->CategoryCode][(int) $attr_value] = true;
            // echo "{$a->CategoryCode} v {$nav->AttributeCode}";exit;
            }
            }
            */

            // dump($allowed_categories);// exit;

            $file =  FEED_PATH . "/ProductCategoryList.xml";
            $xml = new SimpleXMLElement(file_get_contents($file));
            foreach ($xml->children() as $r) {
                foreach ($r as $re) {
                    if (@$re->ProductAttributeList->ProductCategoryAttribute)
                        foreach($re->ProductAttributeList->ProductCategoryAttribute as $aa) {
                            if ((string) $aa->IsPrimary == "true") {
                                $CategoryAttributes[(string)$re->CategoryCode][ (string)$aa->AttributeCode] = (string)$aa->AttributeName;
                            }
                    }
                }
            }

            $file =  FEED_PATH . "/ProductCategoryAttributeValueList.xml";
            $xml = new SimpleXMLElement(file_get_contents($file));
            foreach ($xml->ProductCategoryAttributeValueList->ProductCategoryAttributeValue as $r) {
                $AttributesCode[(string)  $r->AttributeCode][(string)  $r->ValueCode] = (string) $r->Value;
            }
            // echo $AttributesCode;exit;
            $categs = array();
            $categories = $this->getCategories();

            foreach ($categories->ProductSuperCategoryList->children() as $ProductSuperCategoryList ) {
                //$categs[(string) $ProductSuperCategoryList->SuperCategoryCode] =  (string)  $ProductSuperCategoryList->SuperCategoryName;
                foreach ($ProductSuperCategoryList as $ProductCategoryList) {
                    foreach ($ProductCategoryList as $ProductCategory) {
                        $category_code = (string) $ProductCategory->CategoryCode;
                        $lvl3_key = @key($CategoryAttributes[$category_code]);
                        $lvl3 = @$CategoryAttributes[$category_code][$lvl3_key];
                        //   echo "CODE=" . $ProductCategory->CategoryCode . " | name=" .(string)  $ProductSuperCategoryList->SuperCategoryName . " > " . (string)  $ProductCategory->CategoryName ." => $lvl3_key $lvl3<br>";

                        $categs[$category_code] =  (string)  $ProductSuperCategoryList->SuperCategoryName . " > " . (string)  $ProductCategory->CategoryName ;
                        if (count(@$AttributesCode[$lvl3_key]) > 0) {
                            foreach ($AttributesCode[$lvl3_key] as $sub_key => $sub) {
                                $lvl3 = " > $sub";
                                //echo "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;". $sub . "<br>";

                                if (@$allowed_categories[$category_code][$sub_key])  {
                                    $categs[$category_code ."_". $sub_key] =  (string)  $ProductSuperCategoryList->SuperCategoryName . " > " . (string)  $ProductCategory->CategoryName . $lvl3;
                                    ///  echo "<br><br>code: " . $category_code . " => $sub_key | " . $lvl3_key . "<br>";//exit;
                                    // echo  (string)  $ProductSuperCategoryList->SuperCategoryName . " > " . (string)  $ProductCategory->CategoryName . $lvl3 . "<br>";

                                    //	echo $T++."<Br>";
                                } else {
                                    //echo  (string)  $ProductSuperCategoryList->SuperCategoryName . " > " . (string)  $ProductCategory->CategoryName . $lvl3 . "<br>";


                                    $categs[$category_code ."_". $sub_key] =  (string)  $ProductSuperCategoryList->SuperCategoryName . " > " . (string)  $ProductCategory->CategoryName . $lvl3;

                                }

                            }
                        }
                    }
                }
            }      //  dump($categs);exit;

            unset($categs['categories']);
            asort($categs);

            foreach($categs as $id_category => $catname) {
                $sub = "";
                $exp = explode(" > ", $catname);
                //      echo $exp['2']. "<br>";

                $id_new_category = ($id_category);
                $category_mapping[$id_new_category] = array
                (
                    'id' => $id_new_category,
                    'name' => $catname ,
                    'fullpath' => $catname,
                    'sub' => $sub
                );
                //  dump($category_mapping);
            }
            //  dump($category_mapping);
            // $db->query("INSERT INTO import_settings (name, value) VALUES ('SUPPLIER_CATEGORIES', '".addslashes(serialize($category_mapping))."');");


            return $category_mapping;
        }


        public function install() {

            mysql_query("
                CREATE TABLE IF NOT EXISTS  `import_settings` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `supplier_id` varchar(50) NOT NULL,
                `name` varchar(100) NOT NULL,
                `value` longtext NOT NULL,
                `supplier` varchar(100) NOT NULL,
                PRIMARY KEY (`id`)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
            ");

            mysql_query("CREATE TABLE IF NOT EXISTS `import_category_settings` (
                `feed_category_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
                `store_category_id` int(11) DEFAULT NULL,
                `margin` int(11) DEFAULT NULL,
                `supplier_id` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL
                ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
            ") or die(mysql_error());

            mysql_query("CREATE TABLE IF NOT EXISTS `imported` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `sku` varchar(200) NOT NULL,
                `shop_status` varchar(20) NOT NULL,
                `store_product_id` int(11) NOT NULL,
                `supplier` varchar(30) NOT NULL,
                `manufacturer` varchar(30) NOT NULL,
                `manufacturer_sku` varchar(30) NOT NULL,
                `ean` varchar(30) NOT NULL,
                `processed` tinyint(1) NOT NULL,
                `date_add` datetime NOT NULL,
                `date_update` datetime NOT NULL,
                PRIMARY KEY (`id`),
                UNIQUE `sku` (`sku`),
                KEY `store_product_id` (`store_product_id`),
                KEY `shop_status` (`shop_status`)
                ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=0 ;
            ") or die(mysql_error());

            mysql_query("CREATE TABLE `import_product_settings` (
                `sku` varchar(50) NOT NULL,
                `imported` int(11) NOT NULL,
                `category_feed_id` varchar(50) NOT NULL,
                `supplier` varchar(20) NOT NULL,
                UNIQUE KEY `sku_category_feed_id` (`sku`,`category_feed_id`),
                KEY `imported` (`imported`),
                KEY `category_feed_id` (`category_feed_id`)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
            ") or die(mysql_error());

            mysql_query("CREATE TABLE `imported_attribute` (
                `id_product_attribute` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
                `reference` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
                `processed` tinyint(1) DEFAULT '1',
                PRIMARY KEY (`id_product_attribute`),
                KEY `reference` (`reference`),
                ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
            ");

        }



    }
