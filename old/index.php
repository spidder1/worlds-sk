<?php

    include ("config.php");

    if ($do == "conf") {
        require(IMPORT_ABS_PATH . IMPORT_PATH . "/settings/index.php");
        exit;
    }

    if ($do == "logs") {
        while (ob_get_level() > 0) { ob_end_clean() ; } 
        ob_start("ob_gzhandler"); 
        chdir(IMPORT_ABS_PATH . IMPORT_PATH . "/logs/");
        require(IMPORT_ABS_PATH . IMPORT_PATH . "/logs/index.php");
        exit;
    }


    if ($do == "sync") {
        $s = ImpLib::gt();

        //    $sop = $b2b->get_category_ancestors(13);     dump($sop);



        $b2b->download_feeds();

        if (true) {
            $s = ImpLib::gt();
            $logger->LogCron("   - INSERT");
            $products = $b2b->process_xml("FOR_INSERT");
            $logger->LogCron("     - FEED PROCESSED => ".count($products)." items (".ImpLib::grt($s)."s) ");
            if (count($products) > 0 ) {
//                            dump($products);exit;

                $b2b->insert($products);
                //        	header("Location: ". IMPORT_BASE_URL . "ib2b/?" .  $b2b->name); exit;
            }
        }

        if (true) {
            $s = ImpLib::gt();
            $logger->LogCron("   - UPDATE");
            $products = $b2b->process_xml("FOR_UPDATE");
            $logger->LogCron("     - FEED PROCESSED => ".count($products)." items (".ImpLib::grt($s)."s) ");
            $b2b->update($products);
            $db->query("COMMIT");

        }



        $logger->LogCron("------------------------------------------------------------------");
        echo "Sync done.";
        exit;
}