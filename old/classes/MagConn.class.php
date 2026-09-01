<?php
    /*
    *
    *  Magento 1.9.x.x v0.72
    *    24.7.2015
    *
    */

    class MagConn {

        function __construct() {}

        public static function init() {
            global $sessionId, $client, $db;
            @require(IMPORT_ABS_PATH . "/app/Mage.php");
            //		    $client = new SoapClient(IMPORT_BASE_URL . 'index.php/api/soap/?wsdl'); // v2_soap?wsdl=1
            //    echo IMPORT_BASE_URL . 'index.php/api/soap/?wsdl';
            //$client = new SoapClient( 'http://127.0.0.1/mg/index.php/api/soap/?wsdl');
            //		    $sessionId = $client->login('soap', "soapecek01");
            @mkdir(IMPORT_ABS_PATH . "/media/catalog");
            @mkdir(IMPORT_ABS_PATH . "/media/catalog/product");

            define("FEED_PATH_MAGMI_CSV", IMPORT_ABS_PATH . "ib2b-feeds/");
            @mkdir(FEED_PATH_MAGMI_CSV, 777, true);
            define("FEED_PATH_MAGMI_CSV_FILE", FEED_PATH_MAGMI_CSV . "import.csv");
            define("LOGGER_STEP_MAGMI", 1000);
            define("ATTRIBUTES_PREFIX", "sv");
            define("MAGENTO_ROOT_CATEGORY", 2);
            define("ID_CATEGORY_ROOT", MAGENTO_ROOT_CATEGORY);
            define("UPDATE_ATTRIBUTES", false);
            define("SKELETON_ID_SET", 4);
            define("TAX_CLASS_ID", 2);
            define("WEBSITES", "");
            define("STORE", "admin");
            define("STORE_ID", "1");
            define("WEBSITE_ID", "4");

            MagConn::checkFileRights();
            MagConn::checkMagmiFuse();
            $connection = MagConn::parseMagentoDbConfig();
            if (0) {
                echo "DB={$connection->host}/{$connection->username}/{$connection->password}/{$connection->dbname}| prefix={$connection->table_prefix}  | ";
                echo "<a target='_blank' href='/ib2b/assets/adminer.php?username={$connection->username}/{$connection->password}&db={$connection->dbname}&server={$connection->host}'>ADMINER</a>";
                echo "<br>PATH=".getcwd()."<br><br>";
                MagConn::installMagmi($connection);
                exit;
            }

        }

        public function insert($products) {
            global $logger, $db;
            $s = ImpLib::gt();

            if (!$this->CreateCSV($products, "FOR_INSERT")) {
                $logger->LogCron("       - INSERTED 0 items");
                return false;
            }

            $last = end($products);
            $logger->LogCron("     - CSV READY, last = ".$last->sku."(".ImpLib::grt($s)."s) ");
            $s = ImpLib::gt();
            $this->sync();
            $logger->LogCron("     - INSERTED ".count($products)." items (".ImpLib::grt($s)."s) ");
        }

        public function update($products) {
            global $logger, $db;
            $s = ImpLib::gt();

            if (true)  {
                $_price_attribute_id = $db->query("SELECT attribute_id FROM "._DB_PREFIX_."eav_attribute WHERE entity_type_id=4 AND attribute_code = 'price'")->fetchColumn();
                $db->query("UPDATE imported SET processed = 0 WHERE supplier='{$this->identificator}'"); // only for update
                $db->query('SET autocommit = 0'); 
                foreach ($products as $product) {
                    $is_in_stock = $product->quantity > 0 ? 1:0;// store_id=$store_id AND
                    $sql = "UPDATE "._DB_PREFIX_."catalog_product_entity_decimal SET value={$product->price} WHERE `attribute_id` = {$_price_attribute_id} AND entity_id = {$product->store_product_id}";
                    $db->query($sql);
                    $db->query("UPDATE  "._DB_PREFIX_."cataloginventory_stock_status SET qty={$product->quantity} WHERE product_id={$product->store_product_id}"); 
                    $db->query("UPDATE  "._DB_PREFIX_."cataloginventory_stock_item SET qty={$product->quantity}, is_in_stock={$is_in_stock} WHERE product_id={$product->store_product_id}"); 

                    // warranty
                    $db->query("INSERT INTO "._DB_PREFIX_."catalog_product_entity_varchar SET 
                        attribute_id=138,
                        entity_id={$product->store_product_id},
                        store_id=0,
                        value='{$product->warranty}',
                        entity_type_id=4
                        ON DUPLICATE KEY UPDATE value='{$product->warranty}'");                     
                        
                    // desc_long
                    $product->desc_long = addslashes($product->desc_long);
                    $db->query("INSERT INTO "._DB_PREFIX_."catalog_product_entity_text SET 
                        attribute_id=72,
                        entity_id={$product->store_product_id},
                        store_id=0,
                        value='{$product->desc_long}',
                        entity_type_id=4
                        ON DUPLICATE KEY UPDATE value='{$product->desc_long}'");                     
                        
                    // desc_short
                    $product->desc_short = addslashes($product->desc_short);
                    $db->query("INSERT INTO "._DB_PREFIX_."catalog_product_entity_text SET 
                        attribute_id=73,
                        entity_id={$product->store_product_id},
                        store_id=0,
                        value='{$product->desc_short}',
                        entity_type_id=4
                        ON DUPLICATE KEY UPDATE value='{$product->desc_short}'"); 

                    // CATEGORY update
                    $db->query("DELETE FROM "._DB_PREFIX_."catalog_category_product WHERE product_id={$product->store_product_id}");
                    $db->query("DELETE FROM "._DB_PREFIX_."catalog_category_product_index WHERE product_id={$product->store_product_id}");

                    foreach ($product->category_ids as $cat) {
                        $db->query("INSERT INTO catalog_category_product_index   (category_id, product_id, position, is_parent, store_id, visibility ) 
                            VALUES ({$cat},{$product->store_product_id}, 1, 1, 1, 1)");
                        $db->query("INSERT INTO catalog_category_product         (category_id, product_id, position ) VALUES({$cat}, {$product->store_product_id}, 1)");
                    }
                    $db->query("UPDATE imported SET processed=1 WHERE sku = '{$product->sku}'");
                }

                $db->query('COMMIT'); 

                Mage::app('admin');
                foreach ($db->query("SELECT sku FROM imported WHERE processed = 0 AND supplier = '{$this->identificator}'") as $p) {
                    $product = Mage::getModel('catalog/product');
                    $product->load($product->getIdBySku($p['sku']));
                    $product->delete();
                    $db->query("DELETE FROM imported WHERE sku=\"".addslashes($p['sku'])."\"");
                    $logger->LogCron("        - removed {$p['sku']}");
                } 

                $logger->LogCron("     - FAST UPDATER FINISHED => ".count($products)." items (".ImpLib::grt($s)."s) ");

                $s = ImpLib::gt();
                Mage::app('admin');
                $process = Mage::getSingleton('index/indexer')->getProcessByCode('cataloginventory_stock');
                $process->reindexAll();
                $logger->LogCron("     - Reindexed cataloginventory_stock "  . ImpLib::grt($s) . "s");

                $process = Mage::getSingleton('index/indexer')->getProcessByCode('catalog_category_product');
                $process->reindexAll();
                $logger->LogCron("     - Reindexed catalog_category_product "  . ImpLib::grt($s) . "s");

                $process = Mage::getSingleton('index/indexer')->getProcessByCode('catalog_product_price');
                $process->reindexAll();
                $logger->LogCron("     - Reindexed catalog_product_price "  . ImpLib::grt($s) . "s");
                return true;
            }


            // magmi processing 
            if (!$this->CreateCSV($products, "FOR_UPDATE")) {
                $logger->LogCron("     - SYNCED 0 items");
                return false;
            }

            $last = end($products);
            $logger->LogCron("     - CSV READY, last = ".$last->sku." (".ImpLib::grt($s)."s) ");
            $s = ImpLib::gt();
            $this->sync();
            $logger->LogCron("     - UPDATED ".count($products)." items (".ImpLib::grt($s)."s) ");
            $logger->LogCron("     - DEACTIVATED ({$this->deactivated} items) ");
        }

        public function sync() {
            global $db, $store_ids;
            $_REQUEST = array(
                'engine' => 'magmi_productimportengine:Magmi_ProductImportEngine',
                'run' => 'import',
                'logfile' => 'progress.txt',
                'profile' => 'default',
                'mode' => 'create'
            );

            chdir(IMPORT_ABS_PATH . IMPORT_PATH .'/magmi/web');
            $db->query('SET autocommit = 0'); 
            require('magmi_run.php');
            $db->query('COMMIT'); 

            // require_once '../../../app/Mage.php';
            // UPDATE `catalog_product_entity_int` SET `value` =2 WHERE `attribute_id` = (select * from eav_attribute where attribute_code like 'tax_class_id');
            /* mysql_query('SET autocommit = 0') or die(mysql_error());          // tax_class_id
            foreach ($db->query("SELECT * FROM imported i JOIN catalog_product_entity m ON i.sku=m.sku WHERE i.processed=1") as $p) {
            foreach ($store_ids as $store_id) {
            $sql = "UPDATE catalog_product_entity_int SET value=".TAX_CLASS_ID." WHERE `attribute_id` = '113' AND store_id=$store_id AND entity_id = {$p['entity_id']}";
            $db->query($sql);
            }
            }
            mysql_query('COMMIT') or die(mysql_error());
            mysql_query('SET autocommit = 0') or die(mysql_error());   // website
            foreach ($db->query("SELECT * FROM imported i JOIN mage_catalog_product_entity m ON i.sku=m.sku") as $p) {
            $db->query("DELETE FROM mage_catalog_product_website WHERE product_id = {$p['entity_id']}");
            $db->query("INSERT INTO mage_catalog_product_website (product_id, website_id) VALUES ({$p['entity_id']}, ".WEBSITE_ID.")");
            //echo $p['entity_id']."<br>";
            }
            mysql_query('COMMIT') or die(mysql_error());

            mysql_query('SET autocommit = 0') or die(mysql_error());          // active
            foreach ($db->query("SELECT * FROM imported i JOIN mage_catalog_product_entity m ON i.sku=m.sku WHERE i.processed=1") as $p) {
            foreach ($store_ids as $store_id) {
            $sql = "UPDATE mage_catalog_product_entity_int SET value=1 WHERE `attribute_id` = '87' AND store_id=$store_id AND entity_id = {$p['entity_id']}";
            $db->query($sql);
            }
            }
            mysql_query('COMMIT') or die(mysql_error());
            */
            return true;
        }

        public function CreateCSV($products, $type) {
            global $db, $logger;
            if (!count($products)) return false;
            $this->deactivated = 0;
            $i = 0;
            $this->firsty = true;

            $this->fh = fopen(FEED_PATH_MAGMI_CSV . "import.csv", 'w');

            //			$this->category_paths = $this->get_category_paths_for_csv();
            $this->import_settings = Settings::get_import_settings($this->identificator);
            $notsynced = explode(",", @$this->import_settings['NOTSYNCEDPRODUCTPRICE']);

            $this->imported_skus_tmp = $db->query("SELECT id, sku FROM imported WHERE supplier='{$this->identificator}'");
            foreach ($this->imported_skus_tmp as $imported_sku) {
                $this->imported_skus[$imported_sku['sku']] = $imported_sku['id'];
            }
            $db->query("UPDATE imported SET processed = 0 WHERE supplier='{$this->identificator}'"); // only for update
            $db->query('SET autocommit = 0');

            // Magento attributes
            if (true) {
                $all_codes = array();
                foreach ($products as $product) {
                    if (@$product->featuresMagento)
                        foreach ($product->featuresMagento['Product details codes'] as $code=>$value) {
                            $all_codes[] = $code;
                    }
                }
                $all_codes = array_unique($all_codes);
            }
            $this->all_codes = $all_codes;


            foreach ($products as $product) {

                // INSERT
                if ($type=="FOR_INSERT") {
                    if (@count($product->attributes) > 0) {
                        foreach ($product->attributes as $asku => $attr) {
                            $this->writeCSVline_Insert($product, "configurable-item", $asku);      }
                        $this->writeCSVline_Insert($product, "configurable");
                    } else {
                        $this->writeCSVline_Insert($product, "simple");
                    }
                }

                // UPDATE
                if ($type=="FOR_UPDATE") {
                    if (@count($product->attributes) > 0) {
                        foreach ($product->attributes as $asku => $attr)
                            $this->writeCSVline_Update($product, "configurable-item", $asku);
                        $this->writeCSVline_Update($product, "configurable");
                    } else {
                        $this->writeCSVline_Update($product, "simple");
                    }
                }
            }

            $db->query("COMMIT");  // up-to-date the processed products in imported table

            // DEACTIVATION
            if (true)
                if ($type=="FOR_UPDATE") {
                    $diss = "";
                    foreach(explode(",", @$this->import_settings['DISABLED_PRODUCTS']) as $dis ) {
                        if ($dis == "") continue;
                        $product = new stdClass();
                        $product->sku = $dis;
                        $diss[] = $dis;
                        $csv_line = $this->_getMagmiFields($product, "simple", "DEACTIVATION");
                        $csv_line['qty'] = 0;
                        $csv_line['is_in_stock'] = 0;
                        $csv_line['status'] = 2;
                        if (false) {
                            $csv_line['type'] = "simple";
                            $csv_line['simples_skus'] = "__MAGMI_IGNORE__";
                            $csv_line['configurable_attributes'] = "__MAGMI_IGNORE__";
                        }
                        foreach ($this->attributesDynamicNames as $attr_name => $attr_code)
                            $csv_line[$attr_code] = "";

                        foreach($this->all_codes as $code) {
                            $value = @$product->featuresMagento['Product details codes'][$code]['value'];
                            if ($value) {
                                $csv_line[$code] = "__MAGMI_IGNORE__";
                            } else {
                                $csv_line[$code] = "__MAGMI_IGNORE__";
                            }
                        }
                        $this->deactivated++;
                        @fwrite($this->fh, '`' . implode('`;`', $csv_line) . '`' . "\n");
                    }
                    //					$logger->LogCron("       - Forced Disabled => ".@implode(",", $diss));

                    foreach ($db->query("SELECT sku FROM imported WHERE processed = 0 AND supplier = '{$this->identificator}'") as $p) {
                        $product = new stdClass();
                        $product->sku = $p['sku'];
                        $csv_line = $this->_getMagmiFields($product, "simple", "DEACTIVATION");
                        $csv_line['qty'] = 0;
                        $csv_line['is_in_stock'] = 0;
                        $csv_line['status'] = 2;
                        if (false) {
                            $csv_line['type'] = "simple";
                            $csv_line['simples_skus'] = "__MAGMI_IGNORE__";
                            $csv_line['configurable_attributes'] = "__MAGMI_IGNORE__";
                        }
                        foreach ($this->attributesDynamicNames as $attr_name => $attr_code)
                            $csv_line[$attr_code] = "";

                        foreach($this->all_codes as $code) {
                            $value = @$product->featuresMagento['Product details codes'][$code]['value'];
                            if ($value) {
                                $csv_line[$code] = "__MAGMI_IGNORE__";
                            } else {
                                $csv_line[$code] = "__MAGMI_IGNORE__";
                            }
                        }
                        $this->deactivated++;
                        @fwrite($this->fh, '`' . implode('`;`', $csv_line) . '`' . "\n");
                    }
                }

                fclose($this->fh);
            //        dump($csv_line);
            //        die("csv generated");
            return true;
        }

        private function writeCSVline_Insert($product, $type = "simple", $asku = "") {
            global $db, $notsynced;

            $sku = $product->sku;
            if ($type == "configurable-item") {
                $attr = $product->attributes[$asku];
                $sku = $asku;
            }

            $csv_line = $this->_getMagmiFields($product, $type, "INSERT");

            if ($type=="configurable") {
                foreach ($product->attributes as $asku => $attr)
                    $askus[] = $asku;

                $csv_line['type'] = "configurable";
                $csv_line['visibility'] = 4;
                $csv_line['simples_skus'] = implode(",", $askus);
                $csv_line['configurable_attributes'] = implode(",", $this->attributesDynamicNames);
                foreach ($this->attributesDynamicNames as $attr_name => $attr_code)
                    $csv_line[$attr_code] = "";
            }

            if ($type=="configurable-item") {
                $csv_line['type'] = "simple";
                $csv_line['visibility'] = 1;
                $csv_line['simples_skus'] = "";
                $csv_line['configurable_attributes'] = "";
                foreach ($this->attributesDynamicNames as $attr_name => $attr_code) {
                    $csv_line[$attr_code] = $attr[$attr_name];
                }
                $csv_line['sku'] = $asku;

                if ($product->title != "__MAGMI_IGNORE__") {
                    $titleAppendix = array();
                    foreach ($this->attributesDynamicNames as $attr_name => $attr_code) {
                        $csv_line_tmp[$attr_code] = $attr[$attr_name];
                        $titleAppendix[] = $attr[$attr_name];
                    }
                    $titleAppendix = implode(" ", $titleAppendix);
                    $csv_line['name'] = $product->title . " " . $titleAppendix;
                }
            }

            if ($type=="simple") {
                $csv_line['type'] = "simple";
                $csv_line['simples_skus'] = "";
                $csv_line['configurable_attributes'] = "";
                foreach ($this->attributesDynamicNames as $attr_name => $attr_code)
                    $csv_line[$attr_code] = "";
            }

            foreach($this->all_codes as $code) {
                $value = @$product->featuresMagento['Product details codes'][$code]['value'];
                if ($value) {
                    $csv_line[$code] = $value;
                } else {
                    $csv_line[$code] = '';
                }
            }

            $db->query("INSERT imported (sku, shop_status, store_product_id, processed, date_add, date_update, supplier)
                VALUES ('{$sku}', 'IMPORTED', '', '1', NOW(), NOW(), '{$this->identificator}')");
            $imported_id = mysql_insert_id();
            $this->imported_skus[$asku] = $imported_id;

            // WRITING THE COLUMN HEADERS
            if ($this->firsty) { fwrite($this->fh, "`" . implode('`;`', array_keys($csv_line)) . '`' . "\n"); $this->firsty = false; }
            fwrite($this->fh, '`' . implode('`;`', $csv_line) . '`' . "\n");

        }

        private function writeCSVline_Update($product, $type = "simple", $asku = "") {
            global $db, $notsynced, $b2b, $logger;

            if ($type == "configurable-item") {
                $attr = $product->attributes[$asku];
            }

            if (@isset($this->import_settings['EXCLUDE_FROM_CATEGORY_MAPPING']))
                if ($this->import_settings['EXCLUDE_FROM_CATEGORY_MAPPING'][$product->sku]) {
                    $categories = "__MAGMI_IGNORE__";
                    $logger->LogCron("     - EXCLUDE_FROM_CATEGORY_MAPPING skipped " . $product->sku);
                }

                $csv_line = $this->_getMagmiFields($product, $type, "UPDATE");

            if ($type=="configurable") {
                foreach ($product->attributes as $asku => $attr)
                    $askus[] = $asku;

                $csv_line['type'] = "configurable";
                $csv_line['simples_skus'] = implode(",", $askus);
                $csv_line['configurable_attributes'] = implode("," , $this->attributesDynamicNames);;
                foreach ($this->attributesDynamicNames as $attr_name => $attr_code)
                    $csv_line[$attr_code] = "";
            }

            if ($type=="configurable-item") {
                $csv_line['type'] = "simple";
                $csv_line['simples_skus'] = "";
                $csv_line['configurable_attributes'] = "";
                foreach ($this->attributesDynamicNames as $attr_name => $attr_code) {
                    $csv_line[$attr_code] = $attr[$attr_name];
                }
                $csv_line['sku'] = $asku;
            }

            if ($type=="simple") {
                if (false) {
                    $csv_line['type'] = "simple";
                    $csv_line['simples_skus'] = "";
                    $csv_line['configurable_attributes'] = "";
                }
                foreach ($this->attributesDynamicNames as $attr_name => $attr_code)
                    $csv_line[$attr_code] = "";
            }

            foreach($this->all_codes as $code) {
                $value = @$product->featuresMagento['Product details codes'][$code]['value'];
                if ($value) {
                    $csv_line[$code] = $value;
                } else {
                    $csv_line[$code] = '';
                }
            }

            $imported_id = @$this->imported_skus[$product->sku];

            if (@$imported_id)
                $db->query("UPDATE imported SET processed=1 WHERE id = $imported_id");

            $imported_id = @$this->imported_skus[$asku];
            if (@$imported_id)
                $db->query("UPDATE imported SET processed=1 WHERE id = $imported_id");


            // WRITING THE COLUMN HEADERS
            if ($this->firsty) { fwrite($this->fh, "`" . implode('`;`', array_keys($csv_line)) . '`' . "\n"); $this->firsty = false; }
            fwrite($this->fh, '`' . implode('`;`', $csv_line) . '`' . "\n");

        }

        private function _getMagmiFields($product, $type, $method) {
            $csv_line = array();
            global $iconf;

            $csv_line['sku'] = $product->sku;

            if ($method!="DEACTIVATION") {
                if ($type != "configurable-item") {
                    $oo=0;
                    if (isset($product->images)) {
                        if (count($product->images) > 1) {
                            $pix = array();

                            foreach($product->images as $img)
                                $pix[] = $img . "::" . $product->title . " #" . $oo++;
                            $media_gallery = implode(';', $pix );
                        } else {
                            $media_gallery = @$product->images[0] . "::" . $product->title  ;
                        }
                        $image ="+".current(array_splice($product->images, 0, 1));
                    }
                } else {
                    $media_gallery = "__MAGMI_IGNORE__";
                    $image = "__MAGMI_IGNORE__";
                }
            }

            if ($method=="DEACTIVATION") {
                $method = "UPDATE";
                foreach ($iconf['FieldsSettings'] as $key => $row) {
                    if ($row['UPDATE'])
                        $product->$key = "__MAGMI_IGNORE__";
                }

                foreach ($iconf['CustomFieldsSettings'] as $key => $row) {
                    if ($row['UPDATE'])
                        $product->$key = "__MAGMI_IGNORE__";
                }

                $csv_line['sku'] = $product->sku;
            }

            $product->status = !isset($product->status) ? 1 : $product->status;
            if (@$product->status == 0) $product->status = 2;
            if (!isset($product->stock)) $product->stock = 1;
            if (!isset($iconf['FieldsSettings'])) die("iconf['FieldsSettings'] isn't set.");
            if ($iconf['FieldsSettings']['is_in_stock'][$method]) $csv_line['is_in_stock'] = $product->stock ;
            if ($iconf['FieldsSettings']['store'][$method]) $csv_line['store'] = STORE;
            if ($iconf['FieldsSettings']['status'][$method]) $csv_line['status'] = $product->status;
            if ($iconf['FieldsSettings']['attribute_set'][$method]) $csv_line['attribute_set'] = isset($product->attribute_set) ? $product->attribute_set : "Default";
            if ($iconf['FieldsSettings']['title'][$method]) $csv_line['name'] = $this->_clear($product->title);
            if ($iconf['FieldsSettings']['desc_long'][$method]) $csv_line['description'] = $this->_clear($product->desc_long);
            if ($iconf['FieldsSettings']['desc_short'][$method]) $csv_line['short_description'] = $this->_clear($product->desc_short);
            if ($iconf['FieldsSettings']['meta_title'][$method]) $csv_line['meta_title'] = @$this->_clear($product->meta_title);
            if ($iconf['FieldsSettings']['meta_desc'][$method]) $csv_line['meta_description'] = @$this->_clear($product->meta_desc);
            if ($iconf['FieldsSettings']['meta_keyword'][$method]) $csv_line['meta_keyword'] = @$this->_clear($product->meta_keyword);
            if ($iconf['FieldsSettings']['news_from_date'][$method]) $csv_line['news_from_date'] = $product->news_from_date;    // date("Y-m-j");
            if ($iconf['FieldsSettings']['news_to_date'][$method]) $csv_line['news_to_date'] = $product->news_to_date;  // date("Y-m-j", strtotime("+1 week"));
            //            if ($iconf['FieldsSettings']['categories'][$method]) $csv_line['categories'] = $categories;
            if ($iconf['FieldsSettings']['categories'][$method]) $csv_line['category_ids'] = implode(",", $product->category_ids);
            if ($iconf['FieldsSettings']['quantity'][$method]) $csv_line['qty'] = $product->quantity;
            if ($iconf['FieldsSettings']['price'][$method]) $csv_line['price'] = @$product->price;
            if ($iconf['FieldsSettings']['cost'][$method]) $csv_line['cost'] = @$product->cost;
            if ($iconf['FieldsSettings']['msrp'][$method]) $csv_line['msrp'] = @$product->msrp;
            if ($iconf['FieldsSettings']['ean_upc'][$method]) $csv_line['ean'] = @$product->ean_upc;
            if ($iconf['FieldsSettings']['special_price'][$method]) $csv_line['special_price'] = @$product->special_price;
            if ($iconf['FieldsSettings']['manufacturer'][$method]) $csv_line['manufacturer'] = @$product->manufacturer;
            if ($iconf['FieldsSettings']['weight'][$method]) $csv_line['weight'] = @$product->weight;
            if ($iconf['FieldsSettings']['xre_skus'][$method]) $csv_line['xre_skus'] = @implode(",", $product->related);
            if ($iconf['FieldsSettings']['cs_skus'][$method]) $csv_line['cs_skus'] = @implode(",", $product->crosssells);
            if ($iconf['FieldsSettings']['us_skus'][$method]) $csv_line['us_skus'] = @implode(",", $product->upsells);
            if ($iconf['FieldsSettings']['image'][$method]) {
                $csv_line['media_gallery'] = $media_gallery;
                $csv_line['image'] = $image;
                $csv_line['small_image'] = $image;
                $csv_line['thumbnail'] = $image;
            }

            foreach ($iconf['CustomFieldsSettings'] as $key => $row)
                if ($row[$method])
                    if (isset($product->$key)) {
                        $csv_line[$key] = $product->$key;
                    } else {
                        $csv_line[$key] = "__MAGMI_IGNORE__";
                }

                return $csv_line;
        }

        private function _clear($s) {
            $s = str_replace("`", "'", $s);
            return $s;
        }

        public function get_imported($supplier) {
            global $db;
            $arr = array();
            foreach ($db->query("SELECT * FROM imported WHERE shop_status = 'IMPORTED' AND supplier='{$supplier}'") as $row) {
                $arr[$row['sku']] = true ;
            }
            $arr = $this->checkImportedProducts($arr);
            return $arr;
        }

        public function get_category_ancestors($c) {  
            if (!isset( $this->ancestors_reorganized )) {
                global $db;
                if (!isset($this->category_attribute_name_id)) {
                    $this->category_attribute_name_id = $db->query("SELECT attribute_id FROM "._DB_PREFIX_."eav_attribute WHERE entity_type_id=3 AND attribute_code = 'name'")->fetchColumn();
                    if ($this->category_attribute_name_id < 1) die("Category name attribute unknown.");
                }
                foreach($db->query("SELECT e.entity_id AS 'entity_id',e.parent_id AS 'parent_id', vn.value AS 'name'
                    FROM "._DB_PREFIX_."catalog_category_entity e
                    LEFT JOIN "._DB_PREFIX_."catalog_category_entity_varchar vn
                    ON e.entity_id = vn.entity_id AND vn.attribute_id = {$this->category_attribute_name_id}
                    ") as $row ) { 

                    if ($row['parent_id'] > 2) 
                        $reorg[$row['entity_id']] = (int) $row['parent_id'];   
                }
                $this->ancestors_reorganized = $reorg;
            }

            $ancestors = array();
            $parent = $this->ancestors_reorganized[$c];
            while ($parent) {
                if (count($ancestors) > 10) {
                }
                $ancestors[] = $parent;  
                $parent = $this->ancestors_reorganized[$parent];
            }       
            return $ancestors;
        }

        public function get_store_categories_simple() {
            global $db;
            if (!isset($this->category_attribute_name_id)) {
                $this->category_attribute_name_id = $db->query("SELECT attribute_id FROM "._DB_PREFIX_."eav_attribute WHERE entity_type_id=3 AND attribute_code = 'name'")->fetchColumn();
                if ($this->category_attribute_name_id < 1) die("Category name attribute unknown.");
            }

            foreach($db->query("SELECT e.entity_id AS 'entity_id',e.parent_id AS 'parent_id', vn.value AS 'name'
                FROM "._DB_PREFIX_."catalog_category_entity e
                LEFT JOIN "._DB_PREFIX_."catalog_category_entity_varchar vn
                ON e.entity_id = vn.entity_id AND vn.attribute_id = {$this->category_attribute_name_id}
                ") as $row ) {    
                $before = $this->_get_category_name($row['parent_id']);
                $arr[$row['entity_id']] =  $before == "" ? $row['name']:$before . " > " . $row['name'];
            }
            $rootcat = $arr[MAGENTO_ROOT_CATEGORY] . " > ";
            foreach ($arr as &$row) {
                $row =  str_replace($rootcat, "", $row);
            }
            return @$arr;
        }

        private function _get_category_name($id) {
            global $db;
            foreach($db->query("SELECT e.entity_id AS 'entity_id', e.parent_id AS 'parent_id',vn.value AS 'name'
                FROM "._DB_PREFIX_."catalog_category_entity e
                LEFT JOIN "._DB_PREFIX_."catalog_category_entity_varchar vn
                ON e.entity_id = vn.entity_id AND vn.attribute_id = {$this->category_attribute_name_id}
                WHERE e.entity_id = {$id}
                "
                ) as $row) {
                if ($row['parent_id']==0) {
                    return  $row['name'];
                } else{
                    return $this->_get_category_name($row['parent_id']) . " > ". $row['name'];
                }
            }
            return @$row['name'];;
        }

        public function get_store_categories() {
            $arr=array();
            global $db;

            if (!isset($this->category_attribute_name_id)) {
                $this->category_attribute_name_id = $db->query("SELECT attribute_id FROM "._DB_PREFIX_."eav_attribute WHERE entity_type_id=3 AND attribute_code = 'name'")->fetchColumn();
                if ($this->category_attribute_name_id < 1) die("Category name attribute unknown.");
            }

            foreach($db->query("SELECT e.entity_id AS 'entity_id', e.parent_id AS 'parent_id',vn.value AS 'name'
                FROM "._DB_PREFIX_."catalog_category_entity e
                LEFT JOIN "._DB_PREFIX_."catalog_category_entity_varchar vn
                ON e.entity_id = vn.entity_id AND vn.attribute_id = {$this->category_attribute_name_id}
                WHERE e.parent_id = 0
                ") as $row) {
                $arr[$row['entity_id']]['category_id'] = $row['entity_id'];
                $arr[$row['entity_id']]['name'] = $row['name'];
                $arr[$row['entity_id']]['parent'] = $row['parent_id'];
                $arr[$row['entity_id']]['children'] = $this->__get_categories($row['entity_id']);
            }
            return @$arr;
        }

        private function __get_categories($parent_id) {
            $arr=array();
            global $db;
            foreach($db->query("SELECT e.entity_id AS 'entity_id', e.parent_id AS 'parent_id',vn.value AS 'name'
                FROM "._DB_PREFIX_."catalog_category_entity e
                LEFT JOIN "._DB_PREFIX_."catalog_category_entity_varchar vn
                ON e.entity_id = vn.entity_id AND vn.attribute_id = {$this->category_attribute_name_id}
                WHERE e.parent_id = '$parent_id'") as $row) {
                $arr[$row['entity_id']]['category_id'] = $row['entity_id'];
                $arr[$row['entity_id']]['name'] = $row['name'];
                $arr[$row['entity_id']]['parent'] = $row['parent_id'];
                $arr[$row['entity_id']]['children'] = $this->__get_categories($row['entity_id']);
            }
            return $arr;
        }


        public function checkImportedProducts($imported) {
            global $db, $logger;
            $really_imported = array();
            foreach ($db->query("SELECT sku, entity_id FROM "._DB_PREFIX_."catalog_product_entity") as $sku) {
                if (@$imported[$sku['sku']]) {    
                    $really_imported[strtolower($sku['sku'])] = $sku['entity_id'];
                    unset($imported[$sku['sku']]);
                }
            }
            $r = 0;
            $db->query("SET autocommit = 0");
            foreach ($imported as $sku=>$t) {
                $db->query("DELETE FROM imported WHERE sku=\"".addslashes($sku)."\"");
                $r++;
            }
            if ($r > 0)
                $logger->LogCron("     - REMOVED {$r} items from IMPORTED table. The items were remotely removed by admin.");
            $db->query("COMMIT");
            return $really_imported;
        }

        public function addProductsToImported($imported) {
            global $db;
            $really_imported = array();
            foreach ($db->query("SELECT sku FROM "._DB_PREFIX_."catalog_product_entity") as $sku) {
                if (!@$imported[$sku['sku']]) {
                    $not_imported[$sku['sku']] = true;

                }
            }
            $db->query("SET autocommit = 0");
            foreach ($not_imported as $not_importe=>$t) {            //   echo $sku;
                $db->query("INSERT imported (sku, shop_status, store_product_id, processed, date_add, date_update, supplier)
                    VALUES ('{$not_importe}', 'IMPORTED', '', '1', NOW(), NOW(), '{$this->identificator}')");

            }


            $db->query("COMMIT");dump($not_imported);exit;
            return $really_imported;
        }


        public function createCategory($catname, $id_parent, $lvl) {
            Mage::app('admin');
            try{
                $category = Mage::getModel('catalog/category');
                $category->setName($catname);
                $category->setUrlKey( ImpLib::tourl($catname) );
                $category->setIsActive(1);
                $category->setDisplayMode('PRODUCTS');
                $category->setIsAnchor(1); //for active achor
                $category->setStoreId(Mage::app()->getStore()->getId());
                $parentCategory = Mage::getModel('catalog/category')->load($id_parent);
                $category->setPath($parentCategory->getPath());
                $category->save();
            } catch(Exception $e) {
                var_dump($e);
            }
            return $category->getId();
        }

        public function getCategory($catname, $id_parent, $category_tree_cache = true) {
            Mage::app('admin');
            $category = Mage::getResourceModel('catalog/category_collection')->addFieldToFilter('name', $catname);
            $cat = $category->getData();
            foreach ($cat as $c)
                if ($c['parent_id'] == $id_parent)
                    return $c['entity_id'];
                return false;
        }

        public static function reindex() {
            global $logger, $db;

            $problem = $db->query("SELECT name, COUNT(name) AS NumOccurrences FROM catalog_product_flat_1 GROUP BY name HAVING ( COUNT(name) > 1 );")->fetch();
            if ($problem)
                $logger->LogCron("      - Reindexation warning - Product with same name exists.");

            $problem = $db->query("SELECT url_key, COUNT(url_key) AS NumOccurrences FROM catalog_product_flat_1 GROUP BY url_key HAVING ( COUNT(url_key) > 1 );")->fetch();
            if ($problem)
                $logger->LogCron("      - Reindexation warning - Product with same name URL keys.");

            $problem = $db->query("SELECT DISTINCT(`sku`) as `sku`, COUNT(`sku`) as `skuCount`, `entity_id` FROM `catalog_product_entity` GROUP BY `sku` HAVING `skuCount` > 1;")->fetch();
            if ($problem)
                $logger->LogCron("      - Reindexation warning - Product with same name SKU.");

            $st = ImpLib::gt();
            $logger->LogCron("REINDEXING => START");

            Mage::app('admin');
            $process = Mage::getSingleton('index/indexer')->getProcessByCode('catalog_category_flat');
            $process->reindexAll();
            $logger->LogCron("  => catalog_category_flat "  . ImpLib::grt($st) . "s");

            Mage::app('admin');
            $process = Mage::getSingleton('index/indexer')->getProcessByCode('tag_summary');
            $process->reindexAll();
            $logger->LogCron("  => tag_summary "  . ImpLib::grt($st) . "s");

            $s = ImpLib::gt();
            $process = Mage::getSingleton('index/indexer')->getProcessByCode('catalog_product_flat');
            $process->reindexAll();
            $logger->LogCron("  => catalog_product_flat "  . ImpLib::grt($s) . "s");

            $s = ImpLib::gt();
            $process = Mage::getSingleton('index/indexer')->getProcessByCode('catalog_product_attribute');
            $process->reindexAll();
            $logger->LogCron("  => catalog_product_attribute "  . ImpLib::grt($s) . "s");

            $s = ImpLib::gt();
            $process = Mage::getSingleton('index/indexer')->getProcessByCode('catalog_product_price');
            $process->reindexAll();
            $logger->LogCron("  => catalog_product_price "  . ImpLib::grt($s) . "s");

            $s = ImpLib::gt();
            $process = Mage::getSingleton('index/indexer')->getProcessByCode('catalog_category_product');
            $process->reindexAll();
            $logger->LogCron("  => catalog_category_product "  . ImpLib::grt($s) . "s");

            $s = ImpLib::gt();
            $drop = "ALTER TABLE `catalogsearch_fulltext` DROP INDEX `FTI_CATALOGSEARCH_FULLTEXT_DATA_INDEX`;";
            $add = "ALTER TABLE `catalogsearch_fulltext` ADD FULLTEXT `FTI_CATALOGSEARCH_FULLTEXT_DATA_INDEX` (`data_index`);";
            //    $db->query($drop);
            $process = Mage::getSingleton('index/indexer')->getProcessByCode('catalogsearch_fulltext');
            $process->reindexAll();
            //   $db->query($add);
            $logger->LogCron("  => catalogsearch_fulltext "  . ImpLib::grt($s) . "s");

            $s = ImpLib::gt();
            $process = Mage::getSingleton('index/indexer')->getProcessByCode('cataloginventory_stock');
            $process->reindexAll();
            $logger->LogCron("  => cataloginventory_stock "  . ImpLib::grt($s) . "s");

            $s = ImpLib::gt();
            $process = Mage::getSingleton('index/indexer')->getProcessByCode('catalog_url');
            $process->reindexAll();
            $logger->LogCron("  => catalog_url "  . ImpLib::grt($s) . "s");

            //tag_summary
            $logger->LogCron("  - Done in "  . ImpLib::grt($st) . "s");
            // echo ImpLib::grt($st);
        }

        public function remove_all($range, $type="simple") {
            global $client, $logger, $sessionId;
            $filters = array(
                'type_id' => array( '=' => $type ),
                //'set' => array('=' => 49),
                'product_id' => array('in' => $range),
                'status' => array('=' => 1)
            );
            $responseInfo = $client->call($sessionId, 'catalog_product.list', array($filters));
            Mage::app('admin');
            foreach($responseInfo as $id) {
                $logger->LogCron("REMOVED {$id['product_id']}");
                $product = Mage::getModel('catalog/product')->load($id['product_id']);
                $product->delete();
                if (@$r++ >40) break;
            }
            header("Location: ".IMPORT_BASE_URL."/ib2b/?" . $this->name);
        }

        public function tourl2 ($str) {
            $str=ImpLib::utf2ascii($str);
            $str = preg_replace("~[^\w\d]+~", '_', strtolower($str));
            $str = trim($str, "-");
            $str = preg_replace('~[^-\w\d]+~', '', $str);

            return $str;
        }

        public function __get_attribute_code($a) {
            global $db;
            $row = $db->query("select * from "._DB_PREFIX_."eav_attribute where attribute_code like '$a'")->fetch();
            return $row['attribute_id'];
        }

        /*
        public function createAttribute() {
        global $client;
        global $sessionId;
        $data = array(
        "attribute_code" => "test_attribute",
        "frontend_input" => "text",
        "scope" => "1",
        "default_value" => "1",
        "is_unique" => 0,
        "is_required" => 0,
        "apply_to" => array("simple"),
        "is_configurable" => 0,
        "is_searchable" => 0,
        "is_visible_in_advanced_search" => 0,
        "is_comparable" => 0,
        "is_used_for_promo_rules" => 0,
        "is_visible_on_front" => 0,
        "used_in_product_listing" => 0,
        "additional_fields" => array(),
        "frontend_label" => array(array("store_id" => "0", "label" => "some label"))
        );
        $result = $client->call($sessionId, 'product_attribute.create', array($data));
        var_dump ($result);
        exit;
        }
        */

        public function get_items_prices($filters = null, $store = null) {
            global $db;
            $attribute_supplier_id = $db->query("SELECT * FROM eav_attribute a WHERE a.attribute_code like 'fromsupplier'")->fetchColumn();
            foreach ($db->query("SELECT * FROM `catalog_product_entity_varchar` WHERE attribute_id=$attribute_supplier_id ") as $r)
                $supps[$r['entity_id']] = $r['value'];

            $app = Mage::app('default');
            $collection = Mage::getModel('catalog/product')->getCollection()->addAttributeToSelect('price')->addAttributeToSelect('sku');

            $result = array();
            foreach ($collection as $product) {
                if (!$supps[$product->getId()]) continue;
                $sku = $product->getSku();
                $result[$sku] = array(
                    'id' =>  $product->getId(),
                    'sku'        =>  $sku,
                    'supplier'   =>  $supps[$product->getId()],
                    'price'      =>  $product->getData('price')

                    //'set'        => $product->getAttributeSetId(),
                    //'type'       => $product->getTypeId(),
                    //'category_ids' => $product->getCategoryIds(),
                    //'website_ids'  => $product->getWebsiteIds()
                );
            }
            // dump($result);exit;
            return  $result;
        }

        public function preCacheAttributeSets() {
            global $client, $sessionId, $logger;
            Mage::init();
            $this->ussco_attributes = array();
            $this->Magento_AttributeSets = array();
            $attributes = Mage::getSingleton('eav/config')
            ->getEntityType(Mage_Catalog_Model_Product::ENTITY)->getAttributeCollection();
            foreach($attributes->getData() as $at) {
                if (substr($at['attribute_code'], 0, strlen(ATTRIBUTES_PREFIX) ) == ATTRIBUTES_PREFIX) {
                    $this->ussco_attributes[$at['attribute_code']] = $at['attribute_id'];
                }
            }
            $Magento_AttributeSets_temp = $client->call( $sessionId, "catalog_product_attribute_set.list");
            foreach($Magento_AttributeSets_temp as $as) {
                $this->Magento_AttributeSets[$as['name']] = $as['set_id'];
            }
        }

        public function checkMagentoAttributes($feedAttributes) {
            global $client, $sessionId, $logger;
            $ats_prefix = "";
            Mage::init();
            $this->ussco_attributes = array();
            $attributes = Mage::getSingleton('eav/config')
            ->getEntityType(Mage_Catalog_Model_Product::ENTITY)->getAttributeCollection();
            foreach($attributes->getData() as $at) {
                if (substr($at['attribute_code'], 0, strlen($ats_prefix)) == $ats_prefix) {
                    $this->mg_attributes[$at['attribute_code']] = $at['attribute_id'];
                }
            }
            //   dump($attributes);
            //   dump($this->mg_attributes);

            foreach($feedAttributes as $feature) {
                $attr_code = $ats_prefix . $this->tourl2(strtolower($feature['code']));
                if (!$this->mg_attributes[$attr_code]) {
                    $data = array(
                        "attribute_code" => $attr_code,
                        "frontend_input" => "select",
                        "scope" => "global",
                        "default_value" => "",
                        "is_unique" => 0,
                        "is_required" => 0,
                        "apply_to" => array(), //array("simple"),
                        "is_configurable" => 0,
                        "is_searchable" => 1,
                        "is_visible_in_advanced_search" => 1,
                        "is_comparable" => 1,
                        "is_used_for_promo_rules" => 0,
                        "is_visible_on_front" => $feature['front'], // 1
                        "used_in_product_listing" => 0,
                        "additional_fields" => array(),
                        "frontend_label" => array(array("store_id" => "0", "label" => $feature['name']))
                    );
                    $attributeId = $client->call($sessionId, 'product_attribute.create', array($data, $attr_code));
                    $logger->LogCron("       - Attribute $attr_code created");
                }
                //echo "X";break;
            }
        }

        public function prepareMagentoAttributes($item) {
            global $client, $sessionId, $logger;
            // dump($item->features);
            $item->Magento_Features['Product details codes_merge'] = "";
            foreach($item->features as $feature => $value) {
                $attr_code = ATTRIBUTES_PREFIX . substr("_" . str_replace("-", "_", ImpLib::tourl( ImpLib::cyr2lat($feature))), 0, 27) ;
                if (!$this->ussco_attributes[$attr_code]) {
                    $data = array(
                        "attribute_code" => $attr_code,
                        "frontend_input" => "select",
                        "scope" => "global",
                        "default_value" => "",
                        "is_unique" => 0,
                        "is_required" => 0,
                        "apply_to" => array(),
                        "is_configurable" => 0,
                        "is_searchable" => 1,
                        "is_visible_in_advanced_search" => 1,
                        "is_comparable" => 1,
                        "is_used_for_promo_rules" => 0,
                        "is_visible_on_front" => 1, // 1
                        "used_in_product_listing" => 0,
                        "additional_fields" => array(),
                        "frontend_label" => array(array("store_id" => "0", "label" => $feature))
                    );

                    $attributeId = $client->call($sessionId, 'product_attribute.create', array($data, $attr_code));
                    $logger->LogCron("       - Attribute [$attr_code] created");
                    $this->ussco_attributes[$attr_code] = $attributeId;

                }
                $item->Magento_Features['Product details codes'][$attr_code]['value']=$value;
                $item->Magento_Features['Product details codes'][$attr_code]['id_attribute']=$this->ussco_attributes[$attr_code];
            }

            ksort($item->Magento_Features['Product details codes']);
            $item->Magento_Features['Product details codes_merge'] = implode("|", array_keys($item->Magento_Features['Product details codes']));

            $item->Magento_Features['Product details codes_merge'] .= "|" . implode("|", ($item->Magento_Attributes));

            $item->Magento_AttributeSetName = ATTRIBUTES_PREFIX . "_" . md5($item->Magento_Features['Product details codes_merge']);
            $item->attribute_set = $item->Magento_AttributeSetName;

            if (@$this->Magento_AttributeSets[$item->Magento_AttributeSetName] != "") {
                // Attribute sets exists
                $item->Magento_AttributeSetID = $this->Magento_AttributeSets[$item->Magento_AttributeSetName];
            } else {
                $id_attribute_set =  $client->call( $sessionId,
                    "product_attribute_set.create", array($item->Magento_AttributeSetName, SKELETON_ID_SET));
                $logger->LogCron("     - Attribute set {$item->Magento_AttributeSetName} created (ID={$id_attribute_set}) [{$item->Magento_Features['Product details codes_merge']}]");
                foreach ($item->Magento_Features['Product details codes'] as $code => $attribute) {
                    $id_attribute = $attribute['id_attribute'];
                    $result = $client->call( $sessionId,"product_attribute_set.attributeAdd", array($id_attribute, $id_attribute_set));
                    $logger->LogCron("     - Attribute {$code}={$id_attribute} associated with attribute set = {$id_attribute_set}");

                }
                foreach ($item->Magento_Attributes as $attr_code) {
                    $result = $client->call( $sessionId,"product_attribute_set.attributeAdd", array($this->Magento_AttributesList[$attr_code], $id_attribute_set));
                    $logger->LogCron("     - Attribute {$attr_code}={$this->Magento_AttributesList[$attr_code]} associated with attribute set = {$id_attribute_set}");

                }
                $item->Magento_AttributeSetID = $id_attribute_set;
                $this->Magento_AttributeSets[$item->Magento_AttributeSetName] = $id_attribute_set; // for next iteration
            }
            return $item;
        }

        public function prepareMagentoAttributesDynamic() {
            global $client, $sessionId, $logger;
            Mage::init();
            $attributes = Mage::getSingleton('eav/config')->getEntityType(Mage_Catalog_Model_Product::ENTITY)->getAttributeCollection();
            foreach($attributes->getData() as $at)
                $this->Magento_AttributesList[$at['attribute_code']] = $at['attribute_id'];

            foreach($this->attributesDynamicNames as $attr_name => $attr_code) {

                if (!$this->Magento_AttributesList[$attr_code]) {

                    $data = array(
                        "attribute_code" => $attr_code,
                        "frontend_input" => "select",
                        "scope" => "global",
                        "default_value" => "",
                        "is_unique" => 0,
                        "is_required" => 0,
                        "apply_to" => array("simple"),
                        "is_configurable" => 1,
                        "is_searchable" => 0,
                        "is_visible_in_advanced_search" => 1,
                        "is_comparable" => 0,
                        "is_used_for_promo_rules" => 0,
                        "is_visible_on_front" => 0, // 1
                        "used_in_product_listing" => 1,
                        "additional_fields" => array(),
                        "frontend_label" => array(array("store_id" => "0", "label" => $attr_name))
                    );
                    $attributeId = $client->call($sessionId, 'product_attribute.create', array($data, $attr_code));
                    $logger->LogCron("       - Attribute $attr_code created "); // "and added to the default attribute set");
                    //$result = $client->call( $sessionId,"product_attribute_set.attributeAdd", array($attributeId, SKELETON_ID_SET));
                    $this->Magento_AttributesList[$attr_code] = $attributeId;
                }

            }
        }

        public static function parseMagentoDbConfig() {
            $config_file = simplexml_load_file(dirname(__FILE__) . '/../../app/etc/local.xml');
            $table_prefix = $config_file->xpath("//global/resources/db/table_prefix");
            $table_prefix = (string) $table_prefix[0];
            $connections = $config_file->xpath("//global/resources/default_setup/connection");
            foreach($connections as $connection) {
                if(intval($connection->active) == 1) {
                    $connection->table_prefix =  ($table_prefix ? $table_prefix : '');
                    define("_DB_PREFIX_", $connection->table_prefix );
                    define("DB_HOSTNAME", $connection->host );
                    define("DB_USERNAME", $connection->username);
                    define("DB_PASSWORD", $connection->password );
                    define("DB_DATABASE", $connection->dbname);
                    return $connection;
                }
            }
        }

        public static function checkFileRights() {
            $progress_file = dirname(__FILE__) . '/../magmi/state/progress.txt';
            if (file_exists($progress_file))
                if (!is_writable($progress_file)) die("<b style='color:red'>{$progress_file}</b> isn't writeable<br>");

                if (file_exists(FEED_PATH_MAGMI_CSV_FILE))
                if (!is_writable(FEED_PATH_MAGMI_CSV_FILE)) die("<b style='color:red'>".FEED_PATH_MAGMI_CSV_FILE."</b> isn't writeable<br>");
        }

        public static function installMagmi($connection) {
            // magmi.ini
            $magmi_conf = dirname(__FILE__) . '/../magmi/conf/magmi.ini';
            $file = file_get_contents($magmi_conf);
            $file = preg_replace("/host = \"(.*)\"/", "host = \"{$connection->host}\"", $file, 1);
            $file = preg_replace("/dbname = \"(.*)\"/", "dbname = \"{$connection->dbname}\"", $file, 1);
            $file = preg_replace("/user = \"(.*)\"/", "user = \"{$connection->username}\"", $file, 1);
            $file = preg_replace("/password = \"(.*)\"/", "password = \"{$connection->password}\"", $file, 1);
            $file = preg_replace("/table_prefix = \"(.*)\"/", "table_prefix = \"{$connection->table_prefix}\"", $file, 1);
            echo "magmi.ini: " . $file . "<Br>";
            file_put_contents($magmi_conf, $file);

            // Magmi_CSVDataSource.conf
            $magmi_conf = dirname(__FILE__) . '/../magmi/conf/Magmi_CSVDataSource.conf';
            $file = file_get_contents($magmi_conf);
            $file = preg_replace("/CSV:filename = \"(.*)\"/", "CSV:filename = \"".FEED_PATH_MAGMI_CSV_FILE ."\"", $file, 1);
            echo "<Br><br>Magmi_CSVDataSource.conf: " . $file . "<Br>";
            file_put_contents($magmi_conf, $file);
        }

        public function _fix($arr) {
            foreach($arr as $key=>$value) {
                $tmp[$key] = str_replace("`", "'", $value);
            }
            return $tmp;
        }

        public function removeAllImportedItems() {
            global $db, $logger;
            Mage::app('admin');
            foreach ($db->query("SELECT * FROM "._DB_PREFIX_."catalog_product_entity") as $sku)
                $store[$sku['sku']] = $sku['entity_id'];
            $i = 0; $log = "";
            foreach ($db->query("SELECT * FROM imported") as $sku) {
                $product_id = $store[$sku['sku']];
                if (!isset($product_id)) continue;
                $product = Mage::getModel('catalog/product')->load($product_id);
                $log .= "{$sku['sku']} (ID={$product_id}), ";
                $product->delete();
                $i++;
                $db->query("DELETE FROM imported WHERE store_product_id={$product_id}");
                if ($i > 20) break;
            }
            $logger->LogCron("     		- Removed {$i} items, {$log}");
            //        header("Location: ");
            exit;
        }

        public function addStoreCategories($item) {
            global $db;
            if (!isset($this->productCategory)) {
                $store_product = array();
                foreach ($db->query("SELECT sku, entity_id FROM "._DB_PREFIX_."catalog_product_entity") as $sku)
                    $store_product[$sku['entity_id']] = $sku['sku'];
                Mage::app('admin');
                $category = Mage::getModel('catalog/category');
                $tree = $category->getTreeModel();
                $tree->load();
                $ids = $tree->getCollection()->getAllIds();
                if ($ids){
                    foreach ($ids as $id){
                        $category = Mage::getModel('catalog/category')->load($id);
                        $collection = $category->getProductCollection()->addAttributeToSort('position');
                        Mage::getModel('catalog/layer')->prepareProductCollection($collection);
                        $product_position_array = Mage::getModel('catalog/category')->load($id)->getProductsPosition();
                        //$name = $category->getName();
                        foreach ($product_position_array as $product => $tt) {
                            $productCategory[$store_product[$product]][] = (int) $id ;
                        }
                    }
                }
                $this->productCategory = $productCategory;
            }
            foreach($this->productCategory[$item->sku] as $c) {
                $item->category_ids[] = $c;
            }
            $item->category_ids = array_unique($item->category_ids);
            return $item;
        }

        public function deactivateProductsWithoutImage() {
            global $db, $logger;
            $s = ImpLib::gt();
            $skus = ""; $r=0;
            $status_id = $db->query("select * from "._DB_PREFIX_."eav_attribute where entity_type_id = 4 and attribute_code = 'status'")->fetchColumn();

            foreach ($db->query("SELECT * FROM `"._DB_PREFIX_."catalog_product_entity_media_gallery`
                RIGHT OUTER JOIN "._DB_PREFIX_."catalog_product_entity ON "._DB_PREFIX_."catalog_product_entity.entity_id = "._DB_PREFIX_."catalog_product_entity_media_gallery.entity_id
                WHERE "._DB_PREFIX_."catalog_product_entity_media_gallery.value is NULL") as $product) {
                $r++ ;
                $skus .= "{$product['entity_id']}, ";
                $db->query("UPDATE "._DB_PREFIX_."catalog_product_entity_int SET VALUE = '2' WHERE attribute_id = {$status_id} AND entity_id = {$product['entity_id']}");
            }
            $db->query("COMMIT");
            $logger->LogCron("     - Image count = 0 => {$r} items (deactivated) in " . ImpLib::grt($s) . "s | IDs => " . $skus);
        }

        public function removeDeactivatedProducts() {
            global $db, $logger;
            Mage::app('admin');   // Mage::registry('isSecureArea')
            umask(0);
            //		Mage::app();
            foreach ($db->query("SELECT sku FROM imported WHERE processed = 0 AND supplier = '{$this->identificator}'") as $p) {
                $s = ImpLib::gt();
                $product = Mage::getModel('catalog/product');
                $id = $product->getIdBySku($p['sku']);
                if ($id=="") {
                    $logger->LogCron("      - not removed {$p['sku']}, not found in Magento");
                    $db->query("DELETE FROM imported WHERE sku='{$p['sku']}'");
                    continue;
                }
                $product->load($id);
                $product->delete();
                $db->query("DELETE FROM imported WHERE sku='{$p['sku']}'");
                $logger->LogCron("      - removed {$p['sku']} [ID={$id}] in " . ImpLib::grt($s) . "s");
            }
            $db->query("COMMIT");
        }

        public static function checkMagmiFuse() {
            global $logger;
            $fuse = IMPORT_ABS_PATH . IMPORT_PATH . "/magmi/state/magmistate";
            if (@filesize($fuse) == 7) {
                $fdiff = (date("U") -  @filemtime($fuse)) / 3600;
                if ($fdiff > 1) {
                    unlink($fuse);
                    $logger->LogCron("       - Magmi fuse was removed ({$fuse} created before {$fdiff} hours)");
                }
            }
        }

        public function storeInspector() {
            global $db, $logger;
            Mage::app('admin');   // Mage::registry('isSecureArea')
            umask(0);
            Mage::app();

            echo "<h3>WEBSITE => STORES</h3><br />";
            $store2website = array();
            foreach (Mage::app()->getWebsites() as $website) {
                foreach ($website->getGroups() as $group) {
                    $stores = $group->getStores();
                    foreach ($stores as $store) {
                        echo $website->getCode() . " (".$website->getName().") => " . $store->getCode() ." (".$store->getName().")<br/>";
                        $store2website[$store->getCode()] = $website->getCode();
                    }
                }
            }

            echo "<h3>TAX CLASSES</h3><br />";
            foreach ($db->query("SELECT * FROM tax_class WHERE class_type='PRODUCT'") as $tc) {
                echo "ID={$tc['class_id']} {$tc['class_name']}<br />";
            }

            echo "<h3>ATTRIBUTE SETS</h3><br />";
            $entityType = Mage::getModel('catalog/product')->getResource()->getTypeId();
            $attributeSetCollection = Mage::getResourceModel('eav/entity_attribute_set_collection')->setEntityTypeFilter($entityType);
            foreach ($attributeSetCollection as $id=>$attributeSet) {
                $entityTypeId = $attributeSet->getEntityTypeId();
                $name = $attributeSet->getAttributeSetName();
                $attributes = Mage::getModel('catalog/product')->getResource()->loadAllAttributes()->getSortedAttributes($attributeSetId);
                echo "ID={$id} entityTypeId={$entityTypeId} ({$name}) => ".count($attributes)." attributes<br />";
            }

            echo "<h3>CATEGORIES</h3><br>";
            $category = Mage::getModel('catalog/category');
            $tree = $category->getTreeModel();
            $tree->load();
            $ids = $tree->getCollection()->getAllIds();
            if ($ids){
                foreach ($ids as $id){
                    $cat = Mage::getModel('catalog/category');
                    $cat->load($id);
                    $categories[] = array("ID" => $cat->getId(), "name" => $cat->getName() );
                }
            }
            echo "Total count: " . count($categories) . "<br>";

            echo "<h3>PRODUCTS</h3><br>";
            $collection = Mage::getModel('catalog/product')->getCollection()->addAttributeToSelect('price')->addAttributeToSelect('sku');
            $product_counts = 0;
            $result = array();
            foreach ($collection as $product) {
                $sku = $product->getSku();
                $TypeId = $product->getTypeId();
                $result[$sku] = array(
                    'id' 		 =>  $product->getId(),
                    'sku'        =>  $sku,
                    //                'price'      =>  $product->getData('price'),
                    //                'set'        => $product->getAttributeSetId(),
                    'type'       => $TypeId,
                    //                'category_ids' => $product->getCategoryIds(),
                    //                'website_ids'  => $product->getWebsiteIds()
                );

                if($TypeId == "configurable") {
                    $conf = Mage::getModel('catalog/product_type_configurable')->setProduct($product);

                    $childProducts = Mage::getModel('catalog/product_type_configurable')->getUsedProducts(null,$product);
                    foreach($childProducts as $child) {
                        print_r($child->getName());  exit;
                    }

                    $simple_collection = $conf->getUsedProductCollection()->addAttributeToSelect('*')->addFilterByRequiredOptions();
                    foreach($simple_collection as $simple_product){
                        echo $simple_product->getSku() . " - " . $simple_product->getName() . " - " . Mage::helper('core')->currency($simple_product->getPrice()) . "<br>";
                        $result[$sku]['simple_collection'] = array("sku" => $simple_product->getSku());
                        exit;

                    }
                }
                $product_counts++;
            }
            echo "Total products: {$product_counts}<br>";
            //        dump($result);
            die("<br>Inspection finished.");
        }

}