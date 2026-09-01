<?php
/*
*
*  ajax v0.1
*    25.3.2014
*
*/
$str_to_remove = "settings/ajax.php";
require("../config.php");

$to_do = $_REQUEST['to_do'];
$supplier = mysql_real_escape_string ( @$_REQUEST['supplier']);
$category_ids = mysql_real_escape_string ( @$_REQUEST['category_oc_id']);
$category_feed_id = mysql_real_escape_string( @$_REQUEST['category_feed_id']);


if ($to_do=="SAVE_CATEGORY_SETTINGS") {
     $db->query("DELETE FROM import_category_settings WHERE feed_category_id = '$category_feed_id'");
     $categories = explode(",", $category_ids);
     if (count($categories) > 0) {
         $categories = @array_unique($categories);
         foreach($categories as $category_oc_id)
             $db->query("INSERT INTO import_category_settings (feed_category_id, store_category_id, supplier_id) VALUES ('$category_feed_id', '$category_oc_id', '$supplier')");
     } else {
         $db->query("INSERT INTO import_category_settings (feed_category_id, store_category_id, supplier_id) VALUES ('$category_feed_id', '$category_oc_id', '$supplier')");
     }
     echo "ok";
}

if ($to_do=="ADD_NEW_CATEGORY") {
    $newcatname = explode(" > ", mysql_real_escape_string ( $_REQUEST['newcatname']) );
    $newcatid = mysql_real_escape_string ( $_REQUEST['newcatid']);
    $lvl = 0;
    $id_parent = ID_CATEGORY_ROOT;
    foreach($newcatname as $catname) {
      $s = ImpLib::gt();
        $store_category_id = $b2b->getCategory($catname, $id_parent);
      //  echo "$catname=>$store_category_id t=".ImpLib::grt($s)."\n";
      //  echo "before : $catname, par=$id_parent, lvl=$lvl = $store_category_id \n";
       // exit;
        if (!$store_category_id) {
            $id_cat_new = $b2b->createCategory($catname, $id_parent, $lvl);
            //echo $catname . " par=$id_parent =>  $id_cat_new \n";
            $store_category_id = $id_cat_new;
            $id_parent = $id_cat_new;
        } else {
            $id_parent = $store_category_id; // for next iteration
        }
        $lvl++;
    }
    $db->query("DELETE FROM import_category_settings WHERE feed_category_id = '$newcatid' AND supplier_id='$supplier'");
    $db->query("INSERT INTO import_category_settings (feed_category_id, store_category_id, supplier_id)
             VALUES ('$newcatid', '$store_category_id', '$supplier')");
    die("ok");
}


if ($to_do=="SAVE_SETTINGS_PER_CATEGORY") {
    $variable_value = addslashes (mysql_real_escape_string ( $_REQUEST['value']) );
    $variable_name = mysql_real_escape_string ( $_REQUEST['code']);
    $category_feed_id =  mysql_real_escape_string( $_REQUEST['category_feed_id']);
    $tmp = array();
	foreach( $db->query("SELECT value FROM import_settings WHERE name = '{$variable_name}' AND supplier='$supplier'") as $arr) {
		if ($arr)
			if (count(unserialize($arr['value'])) > 0)
				$tmp = unserialize($arr['value']);
		break;
	}
	$tmp[$category_feed_id] = $variable_value;
	$json = serialize($tmp);
	$db->query("DELETE FROM import_settings WHERE name = '{$variable_name}' AND supplier='$supplier'");
    $db->query("INSERT INTO import_settings (supplier, value, name) VALUES ('$supplier','{$json}','$variable_name')");
    echo "ok";
}

if ($to_do=="GET_CATEGORY_PRODUCTS_SETTINGS") {
    $supplier = $_REQUEST['supplier'];
    $category_feed_id = $_REQUEST['category_feed_id'];
    echo Settings::getFormatedProductsInCategory($category_feed_id, $supplier);
}

if ($to_do=="SAVE_CATEGORY_PRODUCTS_SETTINGS") {
    $supplier = $_REQUEST['supplier'];
    $category_feed_id = $_REQUEST['category_feed_id'];
    $skus = @$_REQUEST['skus'];
    $db->query("DELETE FROM import_product_settings WHERE category_feed_id='$category_feed_id' AND supplier='$supplier'");
    if ($skus)
        foreach ($skus as $sku)
            $db->query("INSERT INTO import_product_settings (category_feed_id, sku, imported, supplier) VALUES ('$category_feed_id', '$sku' ,1, '$supplier')");
    echo Settings::getFormatedProductsInCategory($category_feed_id, $supplier);
}

if ($to_do=="SAVE_IMPORT_SETTINGS") {
    $variable_value = addslashes ( ( $_REQUEST['variable_value']) );
    $variable_name =  ( $_REQUEST['variable_name']);
    $db->query("DELETE FROM import_settings WHERE supplier='$supplier' AND name='$variable_name'");
    $db->query("INSERT INTO import_settings (supplier, value, name) VALUES ('$supplier','$variable_value','$variable_name')");
    echo "ok";
}