<?php

    /***   MAIN SETTINGS ***/
    define("IMPORT_PLATFORM", "MAGENTO");
    define("IMPORT_PATH", "ib2b");
    define("FEED_MAX_HOURS_OLD", 24 * 30);
    define("ID_LANG", 1 );
    $iconf['AdminLang'] = "en";
    function getImportedLangs() { return array("EN" => ID_LANG	); }

    ini_set('display_errors', '1'); error_reporting(1);
    ini_set("memory_limit", "1024M");
    date_default_timezone_set('Europe/Prague');
    set_time_limit(0); ini_set('max_execution_time', '1900');
    ini_set('mysql.connect_timeout','0');
    ini_set('default_socket_timeout', 14400);

    $iconf['SettingsPerCategory'] = array(
        "Margin" => 			array("code" => "MARGIN", "default" => "", "class" => "SettingsPerCategory", "size" => 2),
        /*"Shipping time" => 			array("code" => "SHIPPING_TIME", "default" => "", "class" => "SettingsPerCategory", "size" => 20),
        "Margin profit factor" => 			array("code" => "MARGIN_PROFIT_FACTOR", "default" => "", "class" => "SettingsPerCategory", "size" => 1),
        "Margin Wholesale" => 	array("code" => "MARGIN_WHOLESALE", "default" => "", "class" => "SettingsPerCategory", "size" => 2),
        "Default height" => 	array("code" => "DEFAULT_HEIGHT", "default" => "", "class" => "SettingsPerCategory", "size" => 2),    */
    );

    $iconf['SettingsBoxes'] = array(
        //    "Not synced products price" => 					array("code" => "NOTSYNCEDPRODUCTPRICE", "default" => ""),
        //    "Don't update price for following SKU" => 		array("code" => "NOTSYNCEDPRODUCTPRICE", "default" => ""),
        //    "Don't update Description for following SKU" => array("code" => "NOTSYNCEDPRODUCTPRICE", "default" => ""),
        //    "Rules for Generating Product Title" => 		array("code" => "NOTSYNCEDPRODUCTPRICE", "default" => ""),
        // Settings::CustomFilter($a, $this->import_settings["GENERATE_DESC_RULES"]); => {MFG} {Model}
        "Profit Margins per price ranges" =>     array("code" => "MARGINS_PER_PRICE_RANGES", "default" => "0"),
        "Tovar mimo Slovensko" => 	array("code" => "SHIPPINGABBROAD", "default" => "0"),
        //    "Max. margin profit" =>  				array("code" => "MAX_MARGIN_PROFIT", "default" => "0"),
        //    "Discount per manufacturer" =>  		array("code" => "DISCOUNT_PER_MANUFACTURER", "default" => "0"),
        //    "Disable/Don't update following products" => "DISABLED_PRODUCTS",

        //	"Change the product price per model" => "CHANGE_THE_PRICE_PER_MODEL",
        //	"Profit Margins per price ranges" => "MARGINS_PER_PRICE_RANGES",
        //	"Extra profit margin for all products (amount)" => "EXTRA_MARGIN",
        //    "Used Custom Keywords for Categorization (searching in title)" => array("code" => "USED_CUSTOM_KEYWORDS", "default" => ""),
        //    "Custom mapping for SKU" => array("code" => "USED_CUSTOM_SKU", "default" => ""),

        /*
        "Náhrada textu v popisku" =>  		array("code" => "DISCOUNT_PER_MANUFACTURER", "default" => "0"),
        "Nastavení ceny dle rozsahu" =>  		array("code" => "DISCOUNT_PER_MANUFACTURER", "default" => "0"),
        "Marže dle ceny produktu" =>  		array("code" => "DISCOUNT_PER_MANUFACTURER", "default" => "0"),
        "Speciální popisky pro zboží dle výrobce" =>  		array("code" => "DISCOUNT_PER_MANUFACTURER", "default" => "0"),
        "Úprava cen zboží dle výrobce" =>  		array("code" => "DISCOUNT_PER_MANUFACTURER", "default" => "0"),
        "Náhrada textu" =>  		array("code" => "DISCOUNT_PER_MANUFACTURER", "default" => "0"),*/
    );
    //$iconf['SettingsBoxes'] = array();


    //$client = new SoapClient("https://private-ws-sk.elinkx.biz/service.asmx?WSDL");
    //print_r($client );exit;

    $iconf['SettingsCategoryProducts'] = array(
        //	"Exclude from Category Mapping" => 	array("code" => "EXCLUDE_FROM_CATEGORY_MAPPING", "icon" => "exclude.png", "help" => "It allows you to define for which items the update of Product <-> Category relation is skipped."),
    );

    register_shutdown_function('fatal_handler');
    //set_error_handler('my_error_handler');
    //error_fatal(E_ALL^E_NOTICE); // will die on any error except E_NOTICE
    function fatal_handler() {
        global $logger;
        $error = error_get_last();
        if ($error["type"]!=8192 && $error["type"]!=8 && $error["type"]!=2){
            if( $error !== NULL) $logger->LogCron(" FATAL ERROR - {$error["type"]}, {$error["message"]}, {$error["file"]}, row: {$error["line"]}");
        }
    }

    if (isset($argv[1])) {            			// sync
        define("IMPORT_ABS_PATH", str_replace("ib2b", "",  dirname(__FILE__)));	$VendorID = (string) $argv[1];
        define("IMPORT_BASE_URL", "http://www..nl/");
        $do = "sync";
    } else {                                    // web sync
        $str_to_remove = @$str_to_remove ? $str_to_remove : basename($_SERVER['SCRIPT_FILENAME']);  //settings/ajax.php
        $arg = @$_SERVER['QUERY_STRING'];
        $VendorID = current(explode("-", $arg));
        define("IMPORT_ABS_PATH", str_replace(IMPORT_PATH . "/" . $str_to_remove, "", @$_SERVER['SCRIPT_FILENAME']));
        define("IMPORT_BASE_URL", str_replace(IMPORT_PATH . "/" . $str_to_remove, "", 'http://' . @$_SERVER['HTTP_HOST'] . @$_SERVER['SCRIPT_NAME']));
        define("CATEGORY_MAPPING_URL", IMPORT_BASE_URL . IMPORT_PATH . '/?'.$VendorID.'-conf');
        if ($arg == $VendorID)
            $do = "sync";
        if (strpos($arg, "conf")) {
            $AUTOMAP = strpos($arg, "automap") ? true:false;
            //	    if (!$AUTOMAP) require(IMPORT_ABS_PATH . IMPORT_PATH."/assets/authorize.php");
            $do = "conf";
        }
    }
    include("assets/XMLStreamer.php");
    include("assets/assets.php");
    include("classes/Settings.class.php");
    include("classes/ImpLib.class.php");

    define("CATEGORY_MAPPING_URL_AJAX", IMPORT_BASE_URL . IMPORT_PATH . '/settings/ajax.php?'.$VendorID.'-conf');
    define("FEED_PATH",IMPORT_ABS_PATH . "/ib2b-feeds/" . $VendorID . "/");
    @mkdir(FEED_PATH, 0777, true);
    @mkdir(IMPORT_ABS_PATH . IMPORT_PATH."/logs/");
//    $logger = new KLogger ( IMPORT_ABS_PATH . IMPORT_PATH."/logs/".@date("Y-m-d").".txt" , KLogger::CRON );

    if ($arg == $VendorID) {
        $do = "sync";
    }
    if (strpos($arg, "conf")) {
        $AUTOMAP = strpos($arg, "automap") ? true:false;
        $do = "conf";
    }
    
      if (strpos($arg, "logs")) {
        $do = "logs";
            $logger = new KLogger ( IMPORT_ABS_PATH . IMPORT_PATH."/logs/".@date("Y-m-d").".txt" , $VendorID . "-{$do}" );

    } else {
        $logger = new KLogger ( IMPORT_ABS_PATH . IMPORT_PATH."/logs/".@date("Y-m-d").".txt" , $VendorID . "-{$do}" );
        $logger->LogCron("START (mem=".ini_get("memory_limit").", max_exec_time=".ini_get("max_execution_time")."s, DNS=".@gethostbyaddr($_SERVER['REMOTE_ADDR']).@$_SERVER['TERM'] . " " . @$_SERVER['HOSTNAME']. " " . @$_SERVER['SHELL']);
    }

    if (strpos($arg, "ice")) {
        require_once(IMPORT_ABS_PATH . IMPORT_PATH . "/classes/IceCat.class.php");
        $do = "icecat";
        define("ICECAT_username", "blaskom");
        define("ICECAT_password", "heslo123");
        define("ICE_FEED_PATH",IMPORT_ABS_PATH . "/ib2b-feeds/ice/");
        @mkdir(ICE_FEED_PATH, 0775);

        define("CRON_MAX_ICECAT_LIFETIME_INFO", '2000');
        define("UPDATE_ICECAT_LIMIT", '10');
        //define("DOWNLOAD_LIMIT", '1500');
        define("ICECAT_ITEM_STEP", '4000');
        define("MAX_ICECAT_IMAGE_WIDTH" , 1000);

        define("UPDATE_IMAGES_ONLY_LANG" , 1);
        define("ICECAT_UPDATE_IMAGES", true);
        define("ICECAT_UPDATE_RELATIONS", false);
        define("ICECAT_UPDATE_FEATURES", true);
        define("ICECAT_UPDATE_FEATURES_WITHOUT_VARIANTS", false);
        define("ICECAT_UPDATE_DESC", true);
        define("ICECAT_UPDATE_BRANDS", true);
    }


    if (IMPORT_PLATFORM=="MAGENTO") $connector_class = "MagConn";
    if (IMPORT_PLATFORM=="WOOCOMMERCE") $connector_class = "WooCommerceConn";
    if (IMPORT_PLATFORM=="PRESTASHOP") $connector_class = "PrestaShopConn";
    if (IMPORT_PLATFORM=="OPENCART") $connector_class = "OpenCartConn";
    if (IMPORT_PLATFORM=="ZENCART") $connector_class = "ZenCartConn";
    require(IMPORT_ABS_PATH . IMPORT_PATH . "/classes/{$connector_class}.class.php");
    call_user_func(array($connector_class, 'init'));

    $dbc = @mysql_connect(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD) or die('KO!');
    mysql_select_db(DB_DATABASE) or die('KO!');

    $db = new My_Db($dbc);
    $db->setDb(DB_DATABASE);
    Settings::checkServer();

    if (mysql_num_rows(mysql_query("SHOW TABLES LIKE 'imported'")) != 1) {
        echo DB_HOSTNAME ."/". DB_DATABASE ."/".DB_USERNAME ."/". DB_PASSWORD . " | " ;
        echo "<a target='_blank' href='/ib2b/assets/adminer.php?username=".DB_USERNAME."/".DB_PASSWORD."&db=".DB_DATABASE."&server=".DB_HOSTNAME."'>ADMINER</a><br><br>DB Tables installed.";
        installSQL();
    }

//    $logger->LogCron("START (mem=".ini_get("memory_limit").", max_exec_time=".ini_get("max_execution_time")."s, DNS=".@gethostbyaddr($_SERVER['REMOTE_ADDR']).")");

    include(IMPORT_ABS_PATH . IMPORT_PATH . "/classes/Feed_{$VendorID}.class.php");
    $b2b = new $VendorID;
    $b2b->identificator = $VendorID;

    $b2b->help = Settings::parseExtConf(file_get_contents(IMPORT_ABS_PATH . IMPORT_PATH . "/settings/lang_{$iconf['AdminLang']}.ini"), '', true);

    function _t($translate) {
        global $b2b;
        if (isset($b2b->help[$translate])) return  $b2b->help[$translate];
        return $translate;
    }

    function installSQL() {
        global $db;
        $db->query("
            CREATE TABLE IF NOT EXISTS  `import_settings` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `supplier_id` varchar(50) NOT NULL,
            `name` varchar(100) NOT NULL,
            `value` longtext NOT NULL,
            `supplier` varchar(100) NOT NULL,
            PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        ");

        $db->query("CREATE TABLE IF NOT EXISTS `import_category_settings` (
            `feed_category_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
            `store_category_id` int(11) DEFAULT NULL,
            `margin` int(11) DEFAULT NULL,
            `supplier_id` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL
            ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
        ")        ;

        $db->query("CREATE TABLE IF NOT EXISTS `imported` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `sku` varchar(200) NOT NULL,
            `manufacturer` varchar(200) NOT NULL,
            `manufacturer_sku` varchar(200) NOT NULL,
            `ean` varchar(20) NOT NULL,
            `shop_status` varchar(20) NOT NULL,
            `store_product_id` int(11) NOT NULL,
            `supplier` varchar(30) NOT NULL,
            `processed` tinyint(1) NOT NULL,
            `date_add` datetime NOT NULL,
            `date_update` datetime NOT NULL,
            PRIMARY KEY (`id`),
            UNIQUE `sku` (`sku`),
            KEY `store_product_id` (`store_product_id`),
            KEY `shop_status` (`shop_status`)
        ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=0 ;");

        $db->query("CREATE TABLE IF NOT EXISTS `import_product_settings` (
            `sku` varchar(50) NOT NULL,
            `imported` int(11) NOT NULL,
            `category_feed_id` varchar(50) NOT NULL,
            `supplier` varchar(20) NOT NULL,
            UNIQUE KEY `sku_category_feed_id` (`sku`,`category_feed_id`),
            KEY `imported` (`imported`),
            KEY `category_feed_id` (`category_feed_id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
        ") ;

        $db->query("CREATE TABLE IF NOT EXISTS `imported_image` (
            `id_image` int(10) unsigned NOT NULL,
        `sku` varchar(100) NOT NULL) COMMENT='';") ;

        $db->query("CREATE TABLE IF NOT EXISTS `imported_attribute` (
            `id_product_attribute` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
            `reference` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
            `supplier` varchar(255) COLLATE utf8_czech_ci DEFAULT NULL,
            `processed` tinyint(1) DEFAULT '1',
            PRIMARY KEY (`id_product_attribute`),
            KEY `reference` (`reference`)
        ) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;");

        if (false) { // only for icecat
            $db->query("CREATE TABLE IF NOT EXISTS `import_icecat` (
                `id` int(11) NOT NULL AUTO_INCREMENT,
                `sku` varchar(50) NOT NULL,
                `store_product_id` int(11) NOT NULL,
                `part_number` varchar(30) NOT NULL,
                `vendor_id` varchar(200) NOT NULL,
                `ean_upc` varchar(14) NOT NULL,
                `icecat_state` varchar(25) NOT NULL,
                `date_add` datetime NOT NULL,
                `date_update` datetime NOT NULL,
                `shop_status` varchar(30) NOT NULL,
                `date_update_shop` datetime NOT NULL,
                `id_icecat` int(11) NOT NULL,
                `id_lang` int(11) NOT NULL,
                PRIMARY KEY (`id`,`part_number`),
                KEY `sku` (`sku`),
                KEY `part_number` (`part_number`),
                KEY `date_update_shop` (`date_update_shop`),
                KEY `store_product_id` (`store_product_id`),
                KEY `date_update` (`date_update`)
            ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;");

            $db->query("
                CREATE TABLE IF NOT EXISTS `import_icecat_feature` (
                `icecat_id_feature` int(11) NOT NULL,
                `store_id_feature` int(11) NOT NULL,
                KEY `icecat_id_feature` (`icecat_id_feature`),
                KEY `store_id_feature` (`store_id_feature`)
            ) ENGINE=InnoDB DEFAULT CHARSET=latin1;");


            $db->query("
                CREATE TABLE IF NOT EXISTS `import_icecat_feature_value` (
                `icecat_id_feature_value_ID` int(11) NOT NULL,
                `store_id_feature_value` int(11) NOT NULL,
                `store_id_feature` int(11) NOT NULL
                ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
            ");
        }

}
