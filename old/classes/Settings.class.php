<?php
/*
*
*  Settings.class.php v0.6
*    6.1.2014
*
*/

class Settings {

    function __construct() { }

    public static function checkServer() {
    	global $db;
//		$db->query('SET GLOBAL innodb_lock_wait_timeout = 5000; ');
		$db->query('SET innodb_lock_wait_timeout = 5000; ');
		$db->query('SET NAMES UTF8');
		$db->query('SET COLLATION_CONNECTION=UTF8_GENERAL_CI');
		ini_set("memory_limit", "1G");
		ini_set("max_execution_time", 5000);
		ini_set('default_socket_timeout', 1000);
		date_default_timezone_set('Europe/Prague');

		/*
		'memory' => array(	0 => '<li> Your memory limit is <strong>{{memory}}M </strong>, which is not enought. You need to setup Memory Limit value as 256M - this value is reguired by Magento by default. You do this in php.ini or .htaccess. Ask your hosting provider.</li>',
							1 => '<li>You have appropriate memory limit of <strong>{{memory}}M</strong></li>',
							"replace" => '{{memory}}'	),
			'time' => array(	0 => '<li> Your max execution time limit is <strong>{{time}} seconds</strong>, which is not enought. Recommended max execution time limit is 1800 seconds.</li>',
							1 => '<li>You have appropriate max execution time of <strong>{{time}} s</strong>.</li>',
							2 => '<li> Your max execution time limit is <strong>{{time}} seconds</strong>, which fulfill the minimum requirements. Recommended max execution time limit is 1800 seconds.</li>',

							*/

		ignore_user_abort(true);
	}

    public static function get_import_settings($supplier) {
        global $db, $SettingsConf, $iconf;
        $arr = array();
        foreach ($db->query("SELECT * FROM  import_settings WHERE supplier = '$supplier'") as $row)
            $arr[ $row['name'] ] = $row['value'];

        if (count($iconf['SettingsBoxes']) > 0)
			foreach ($iconf['SettingsBoxes'] as $SettingConf)
				if (!@$arr[$SettingConf['code']])
					$db->query("INSERT INTO import_settings SET supplier = '$supplier', name='{$SettingConf['code']}', value='{$SettingConf['default']}'");

        foreach ($iconf['SettingsPerCategory'] as $name => $sett) {
			if (@$arr[ $sett['code'] ] != "") {
				$arr[ $sett['code'] ] = unserialize($arr[$sett['code']]);
			}
        }

        foreach ( $db->query("SELECT * FROM import_product_settings WHERE supplier = '$supplier'") as $p){
            $arr[$p['product_settings_type']] [$p['sku']] = true;     // [$p['category_feed_id']]
        }

        return $arr;
    }

    public static function automapCategory($newcatname_orig, $newcatid, $id_parent = ID_CATEGORY_ROOT) {
    	global $db, $b2b, $logger;
    	$lvl = 0;
    	$s = ImpLib::gt();
    	$newcatname = explode(" > ", mysql_real_escape_string ( $newcatname_orig) );
    	$newcatid = mysql_real_escape_string ( $newcatid);
	    foreach($newcatname as $catname) {
	      $s = ImpLib::gt();
	        $store_category_id = $b2b->getCategory($catname, $id_parent, false);
	        if (!$store_category_id) {
	            $id_cat_new = $b2b->createCategory($catname, $id_parent, $lvl);
	            $store_category_id = $id_cat_new;
	            $id_parent = $id_cat_new;
	        } else {
	            $id_parent = $store_category_id;
	        }
	        $lvl++;
	    }
	    $db->query("DELETE FROM import_category_settings WHERE feed_category_id = '{$newcatid}' AND supplier_id='{$b2b->name}'");
	    $db->query("INSERT INTO import_category_settings (feed_category_id, store_category_id, supplier_id)
	             VALUES ('{$newcatid}', '{$store_category_id}', '{$b2b->name}')");
	    $logger->LogCron("      - Automapped category [{$newcatname_orig}] => store_category_id=$store_category_id (".ImpLib::grt($s)."s)");
    }

    public static function get_category_mappings($supplier_id = "") {
        global $db, $b2b;
        foreach (@$db->query("SELECT * FROM  import_category_settings WHERE supplier_id='$supplier_id'") as $row)
            if (($row['store_category_id']!=0) && ($row['store_category_id']!="") )
                $arr[trim ( $row['feed_category_id'], "\n") ][] = $row['store_category_id'];

        return @$arr;
    }

    public static function get_margin_from_price($price) {
        global $b2b;
        $price = (float)$price;
        
        $margins_text = trim(@$b2b->import_settings['MARGINS_PER_PRICE_RANGES']);
        if (empty($margins_text)) {
            return 20.0; // Záchranná marža v %, ak sú nastavenia úplne prázdne
        }

        $last_margin = 20.0;
        foreach (explode("\n", $margins_text) as $supplier) {
            $supplier = trim(str_replace("\r", "", $supplier)); // Odstránenie skrytého znaku \r a whitespace
            if (empty($supplier)) continue;

            $tmp = explode(":", $supplier);
            if (count($tmp) < 2) continue;

            $range = explode("-", $tmp[0]);
            if (count($range) < 2) continue;

            // Podpora pre desatinné čiarky aj bodky (napr. 0-49,99 alebo 0-49.99)
            $min = (float)str_replace(",", ".", trim($range[0]));
            $max = (float)str_replace(",", ".", trim($range[1]));
            $margin = (float)str_replace(",", ".", trim($tmp[1]));
            $last_margin = $margin;

            if (($min <= $price) && ($max >= $price)) {
                return $margin;
            }
        }
        
        // Ak cena presiahne najvyššie definované pásmo, vráti sa marža posledného pásma
        return $last_margin; 
    }

    public static function CustomFilter($product, $settings) {
		$result = $settings;
		preg_match_all("!\{(\w+)\}!", $settings, $matches);
		foreach ($matches[1] as $match)
			$result = str_replace("{" . $match . "}", $product->$match, $result);
		return $result;
	}

	public static function get_margin_from_price_expression($price) {
        global $b2b;
        $price = (float)$price;
        $margins_text = trim(@$b2b->import_settings['MARGINS_PER_PRICE_RANGES']);
        if (empty($margins_text)) return array($price, $price);

        $last_margin = $price;
        $last_expression = (string)$price;
        foreach (explode("\n", $margins_text) as $supplier) {
            $supplier = trim(str_replace("\r", "", $supplier));
            if (empty($supplier)) continue;

            $tmp = explode(":", $supplier);
            if (count($tmp) < 2) continue;

            $range = explode("-", $tmp[0]);
            if (count($range) < 2) continue;

            $min = (float)str_replace(",", ".", trim($range[0]));
            $max = (float)str_replace(",", ".", trim($range[1]));

            $expression = str_replace("price", $price, trim($tmp[1]));
            $expression = str_replace(",", ".", $expression);
            $last_expression = $expression;

            if (($min <= $price) && ($max >= $price)) {
                // Bezpečné vyhodnotenie eval() s odchytením chýb
                try {
                    $eval_result = eval("return $expression;");
                    return array($expression, (float)$eval_result);
                } catch (\Throwable $e) {
                    return array($expression, 0.0);
                }
            }
        }
        return array($last_expression, (float)$last_margin);
    }


    /*
    public static function _printSubCats($subcats, $space = "") {
           global $AUTOMAP, $b2b, $id, $iconf;

           if (@$subcats) {
            foreach ($subcats as $subcat) {
                 $subcatid =  $subcat['id'];
                 $subcatname_short =  $subcat['name'];
                 $subcatname =  $subcat['fullpath'];

                 $feed_category_id_from_settings = $selectors = "";
                 if (@$b2b->import_category_mapping[$subcatid])
                     foreach($b2b->import_category_mapping[$subcatid] as $feed_category_id_from_settings) {
                        $selectors .= Settings::get_virtual_selector($b2b->store_categories_simple, $feed_category_id_from_settings, $subcatid) . "<br />";
                     }
                // $b2b->parent_feed_category_id_from_settings = @$feed_category_id_from_settings;

                 if (!@$selectors) $selectors = Settings::get_virtual_selector($b2b->store_categories_simple, $feed_category_id_from_settings, $subcatid); // alespon choose
                 $addcatmap = '<div class="addcatmap" feedID="'.$subcatid.'" >+</div>';

           //     $feed_category_id_from_settings = @$b2b->import_category_mapping[$subcatid];
            //    $selector = Settings::get_virtual_selector($b2b->store_categories_simple, $feed_category_id_from_settings, $subcatid);

                $styl = ( ((( @$feed_category_id_from_settings=="") || (@$feed_category_id_from_settings=="0" ) ) &&
                ($b2b->parent_feed_category_id_from_settings!="0" && $b2b->parent_feed_category_id_from_settings!="") )) ? "xx":"style='display:none;'";

                if ($AUTOMAP && ( ( $feed_category_id_from_settings=="") || ($feed_category_id_from_settings=="0" )) ) { // nebude namapovano
                   $url = CATEGORY_MAPPING_URL_AJAX . "&supplier={$b2b->name}&newcatname=" . urlencode($subcatname) . "&margin=0&newcatid=$subcatid&newparentid=$id&to_do=ADD_NEW_CATEGORY";
                   echo file_get_contents($url);
                   // ImpLib::file_get_contents_curl($url);
                }

                $button_add_new_category ="<span $styl class='new_cat_mapped' newcatname='$subcatname' newcatid='$subcatid' newparentid='$id' >=></span>";

                if (@$b2b->feed_category_counts[$subcatid]) { $count = "(".$b2b->feed_category_counts[$subcatid].")"; } else { $count = ""; }

                $p2dset = "<div class='p2dset' category_feed_id='$subcatid'><img src='".IMPORT_BASE_URL . IMPORT_PATH . "/assets/dir.gif' /></div><div opened='0' class='p2dset_$subcatid p2dsetbox'></div>";

                echo "<tr class='trsub'><td class='subcategory'>$space $p2dset ".$subcatname_short." $count</td>";



				foreach ($iconf['SettingsPerCategory'] as $colname => $sett) {
					echo "<td><input class='{$sett['class']}' code='{$sett['code']}' type='text' category_feed_id='{$subcatid}' value='".(@$b2b->import_settings[$sett['code']][$subcatid] != "" ? $b2b->import_settings[$sett['code']][$subcatid]:"")."' size='{$sett['size']}'></td>";
				}
				echo "<td>$button_add_new_category $addcatmap</td><td class='selectors_$id'>$selectors</td></tr>";

                if (@$subcat['sub']) {
                   Settings::_printSubCats($subcat['sub'], $space . "  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
                }
            }
        }
    }
      */

    public static function get_selector($oc_categories, $active_oc_category_id, $feed_category, $selector = "selector") {
        $selector = "<select class='$selector' id='$feed_category'>";
        $selector .= "<option value='0'>-------------</option>";
        if (!@$oc_categories) return $selector;
        foreach($oc_categories as  $id1 => $cats_1) {
            $checked = $active_oc_category_id == @$cats_1['category_id'] ? " selected='selected' ":"";
            if (!@$cats_1['category_id']) continue;
            $selector .= "<option value='{$cats_1['category_id']}' $checked>".@$cats_1['name']."</option>\n";
            if (@$cats_1['children'])
                foreach($cats_1['children'] as $id2 => $cats_2) {
                $checked = $active_oc_category_id == $cats_2['category_id'] ? " selected='selected' ":"";
                $selector .= "<option value='{$cats_2['category_id']}' $checked>--- ".$cats_2['name']."</option>\n";
                if (@$cats_2['children'])
	                foreach(@$cats_2['children'] as $id3 => $cats_3) {
	                    $checked = $active_oc_category_id == $cats_3['category_id'] ? " selected='selected' ":"";
	                    $selector .= "<option value='{$cats_3['category_id']}' $checked>------ ".$cats_3['name']."</option>\n";
                        if (@$cats_3['children'])
		                    foreach(@$cats_3['children'] as $id4 => $cats_4) {
		                        $checked = $active_oc_category_id == $cats_4['category_id'] ? " selected='selected' ":"";
		                        $selector .= "<option value='{$cats_4['category_id']}' $checked>---------- ".$cats_4['name']."</option>\n";
                                if (@$cats_4['children'])
		                        foreach(@$cats_4['children'] as $id5 => $cats_5) {
		                            $checked = $active_oc_category_id == $cats_5['category_id'] ? " selected='selected' ":"";
		                            $selector .= "<option value='{$cats_5['category_id']}' $checked>-------------- ".$cats_5['name']."</option>\n";
		                        }
		                    }
	                }
            }
        }
        $selector .= "</select>";
        return $selector;
    }

    public static function get_virtual_selector($categories, $active_category_id, $feed_category) {
        $selector = "<span class='virtual_selector' category_feed_id='$feed_category' category_oc_id='$active_category_id'>";
        @$selected_category = $categories[$active_category_id];
        if ( ($selected_category != "")  ) {
		    $selector .= $selected_category;
        } else {
		    $selector .= "<span class='not_selected'>[ Choose... ]</span>";
        }
        $selector .= "</span>";
        return $selector;
    }

    public static function displayCategoryMappingTool() {
        global $b2b, $AUTOMAP, $logger, $db, $iconf;
        $b2b->import_settings = Settings::get_import_settings($b2b->name);

        ?>
         <table border="0" cellpadding="0" cellspacing="0" width="1200">
            <tr class='tableheader2' style="display: none;"><td colspan="3">Category Mapping Tool
            <div class="info1"><img src="<?php echo IMPORT_BASE_URL . IMPORT_PATH; ?>/assets/info.png" /></div>
            </td></tr>
            <tr class='tableheader'><td width='650'><?php echo _t("Supplier's category"); ?></td><?php foreach ($iconf['SettingsPerCategory'] as $colname => $sett) { echo "<td>{$colname}</td>"; } ?><td width='30'></td><td width='550'><?php echo _t("Store category"); ?></td></tr>

        <?php
        $store_categories = $b2b->get_store_categories();
        $b2b->store_categories_simple = $b2b->get_store_categories_simple();

        echo Settings::get_selector($store_categories , 0, 0);

        // $category_mapping = $b2b->get_category_mapping_tree();
        if ($AUTOMAP) {
            $category_mapping = $b2b->get_category_mapping_tree();
        } else {
            $category_mapping = $b2b->get_category_mapping_tree();
        }


        $b2b->import_category_mapping = Settings::get_category_mappings($b2b->name) ;
        if (isset($b2b->import_category_mapping))
	        foreach ($b2b->import_category_mapping as $feed_category_id => $store_category_ids) {
        		foreach ($store_category_ids as $store_category_id) {
					if (!isset($b2b->store_categories_simple[$store_category_id])) {  // the mapped category not exists
						$db->query("DELETE FROM import_category_settings WHERE store_category_id='{$store_category_id}'");
						$logger->LogCron("     - REMOVED store_category {$store_category_id} from settings.");
					}
				}
	        }
        $b2b->import_category_mapping = Settings::get_category_mappings($b2b->name);

        foreach($category_mapping as $cm) {
			 if (!isset($cm['id'])) continue;
             $id = $cm['id'];
             if (!$id) continue;
             if (strlen($cm['name']) < 2) continue;

             $feed_category_id_from_settings = $selectors = "";
             if (@$b2b->import_category_mapping[$id])
                 foreach($b2b->import_category_mapping[$id] as $feed_category_id_from_settings) {
                    $selectors .= Settings::get_virtual_selector($b2b->store_categories_simple, $feed_category_id_from_settings, $id) . "<br />";
                 }

             $b2b->parent_feed_category_id_from_settings = @$feed_category_id_from_settings;


             if (!@$selectors) $selectors = Settings::get_virtual_selector($b2b->store_categories_simple, $feed_category_id_from_settings, $id); // alespon choose
             $addcatmap = '<div class="addcatmap" feedID="'.$id.'" >+</div>';

            // $selector = Settings::get_virtual_selector($b2b->store_categories_simple, $feed_category_id_from_settings, $id);

             $button_add_new_category = ( ( $feed_category_id_from_settings=="") || ($feed_category_id_from_settings=="0" ) ) ?
                  '<span class="new_cat_mapped" newcatname="'.addslashes(str_replace("\"", "'", $cm['name'])).'" newcatid="'.$id.'" newparentid="0" >=></span>':"";

             if (@$b2b->feed_category_counts[$id]) { $count = "(".$b2b->feed_category_counts[$id].")"; } else { $count = ""; }

             $p2dset = "";
             if (isset($iconf['SettingsCategoryProducts']))
             	foreach ($iconf['SettingsCategoryProducts'] as $setTitle => $setValues)
             		$p2dset .= "<div class='p2dset p2dset_{$setValues['code']}' category_feed_id='{$id}' SetTitle='{$setTitle}' product_settings_type='{$setValues['code']}'><img src='".IMPORT_BASE_URL . IMPORT_PATH . "/assets/{$setValues['icon']}' alt='{$setTitle}' /></div><div opened='0' class='p2dset_{$setValues['code']}_{$id} p2dsetbox'></div>";


			 echo "<tr class='trmaincategory'><td class='maincategory'><h4 class='h4s'>".$cm['name']." $count</h4><span class='corner'>$p2dset</span><div style='clear:both'></div></td>";
			 foreach ($iconf['SettingsPerCategory'] as $colname => $sett) {
				echo "<td><input class='{$sett['class']}' code='{$sett['code']}' type='text' category_feed_id='{$id}' value='".(@$b2b->import_settings[$sett['code']][$id] != "" ? $b2b->import_settings[$sett['code']][$id]:"")."' size='{$sett['size']}'></td>";
			 }

			 echo "<td>$button_add_new_category $addcatmap</td><td class='selectors_$id'>$selectors</td></tr>";

             if ( ($AUTOMAP) && (( $feed_category_id_from_settings=="") || ($feed_category_id_from_settings=="0" )) ) {
                 Settings::automapCategory($cm['name'], $id);
             }

             if (isset($cm['sub'])) {
//            	Settings::_printSubCats($cm['sub']);
			 }
        }

        ?>
        </table>

    <script language="JavaScript">
    <!--
      var supplier = '<?php  echo $b2b->name; ?>';
      var ajaxloader = "<img style='margin-left:3px; border:0px solid #000;' src='<?php echo IMPORT_BASE_URL. IMPORT_PATH;?>/assets/ajax-loader.gif' />";
      var feedID = 0;
      var product_settings_type = "";

      $(".selector").hide();

      init();

      var virtual_selector = "";

      function init_p2dset() {

          $('.save_products').click(function() {
               var skus = new Array();
               //$(".p2dset_" + feedID).html(ajaxloader  + "<br>" + $(".p2dset_" + feedID).html());
               $('.save_products').hide(20);
               $('.save_products').show(20);
               $('.p2dset_checkbox:checkbox:checked').each(function () {
                   var sThisVal = (this.checked ? $(this).val() : "");
                   skus.push(this.name);
               })

               var data = { 'category_feed_id':   feedID, 'supplier': supplier, 'skus':skus, 'product_settings_type': product_settings_type, 'to_do': "SAVE_CATEGORY_PRODUCTS_SETTINGS" };
               $.ajax({ type: 'post', cache: false, url: '<?php echo CATEGORY_MAPPING_URL_AJAX ?>', data: data, success: function(data){
                  $(".p2dset_"  + product_settings_type + "_" + feedID).html(data);

                  init_p2dset();

               }
               })

          })

          $('.all_products').click(function() {  $('.p2dset_checkbox:checkbox').each(function () { this.checked = "checked";   }); })
          $('.no_products').click(function() { $('.p2dset_checkbox:checkbox').each(function () { this.checked = ""; }); })
      }

      $('.p2dset').click(function() {
           var e = $(this);
           feedID = e.attr("category_feed_id");
           SetTitle = e.attr("SetTitle");
           product_settings_type = e.attr("product_settings_type");
           $(".p2dsetbox").html("");
           $(".p2dset_" + product_settings_type + "_" + feedID).html(ajaxloader);
           //var parent = $('.virtual_selector[category_feed_id="'+feedID+'"]').html();
           //e.append("<br /><span class='virtual_selector' category_feed_id='" + feedID + "' category_oc_id=''>" + parent + "</span>");
           if ($(".p2dset_" + product_settings_type + "_" + feedID).attr("opened") != 1) {
               var data = { 'category_feed_id':   feedID, 'supplier': supplier, 'product_settings_type': product_settings_type,'to_do': "GET_CATEGORY_PRODUCTS_SETTINGS" };
                    $.ajax({ type: 'post', cache: false, url: '<?php echo CATEGORY_MAPPING_URL_AJAX ?>', data: data, success: function(data){

                        if (data!="empty") {
	                        $(".p2dset_" + product_settings_type + "_" + feedID).html(data);
	                        $(".p2dset_" + product_settings_type + "_" + feedID).attr("opened", 1);
	                        $("#SetTitle").html(SetTitle);
	                        init_p2dset();
						}  else {
							alert("This category is empty");
							$(".p2dset_"  + product_settings_type + "_"+ feedID).html("");
						}
                    }
               })
           } else {
               $(".p2dset_" + product_settings_type + "_" + feedID).attr("opened", 0);
               $(".p2dset_" + product_settings_type + "_" + feedID).html("");
               feedID = 0;
           }
      })

      $('.addcatmap').click(function() {
           var e = $(this);
           var feedID = e.attr("feedID");

           var parent = $('.virtual_selector[category_feed_id="'+feedID+'"]').html();
           $('.selectors_' + feedID).append("<br /><span class='virtual_selector' category_feed_id='" + feedID + "' category_oc_id=''>" + parent + "</span>");
           init();
      })



         /**************************************** AUTOMAP THE CATEGORY **********************************/
          $('.new_cat_mapped').click(function() {
              var newcatname = $(this).attr("newcatname");
              var newcatid = $(this).attr("newcatid");
              var newparentid = $(this).attr("newparentid");
              var loader = jQuery("#loader").html();
              jQuery(this).html(ajaxloader);
              var data = { 'newcatname':   newcatname,
                        'newcatid':   newcatid,
                        'supplier':   supplier,
                        'newparentid':   newparentid,
                        'to_do': "ADD_NEW_CATEGORY" };
               $.ajax({ type: 'post', cache: false, url: '<?php echo CATEGORY_MAPPING_URL_AJAX ?>', data: data, success: function(data){
                 if (data=="ok") {
                          location.href='<?php echo CATEGORY_MAPPING_URL; ?>';
                      //alert(data);
                 }
               }
               })
          })

       function init() {
       /**************************************** CHANGE THE CATEGORY MAPPING ******************/
          $('.virtual_selector').click(function() {
              virtual_selector = $(this);
              var category_oc_id = $(this).attr("category_oc_id");
              $(this).attr("category_oc_id", 0);   // dulezite pro nasl. fci
              var category_feed_id = $(this).attr("category_feed_id");
              var new_selector = $(".selector").insertAfter($(this));
               $(".selector").show()
               new_selector.attr("category_oc_id", category_oc_id) ;
               new_selector.attr("category_feed_id", category_feed_id) ;
               new_selector.val(category_oc_id);
          })
      }


      /**************************************** CATEGORY *************************************/
      $(".selector").change(function() {
            var this_selector = $(this);
            var category_oc_id = $(this).val();
            var category_feed_id = $(this).attr("category_feed_id");
            $('.virtual_selector[category_feed_id="'+category_feed_id+'"]').each(function (index) {
                cat =  $( this ) . attr("category_oc_id");
                if ( (cat != "0") && (cat != "") ){
                    category_oc_id = category_oc_id + "," + cat;
                }
            })
           var data = { 'category_feed_id':   category_feed_id,
                'category_oc_id':   category_oc_id,
                'supplier':   supplier,
                'to_do': "SAVE_CATEGORY_SETTINGS" };
           $.ajax({ type: 'post', cache: false, url: '<?php echo CATEGORY_MAPPING_URL_AJAX ?>', data: data, success: function(data){
                 if (data=="ok") {
                       if (category_oc_id==0) {
                        virtual_selector.html("<span class='not_selected'>[ Choose... ]</span>");
                        // $('.virtual_selector[category_feed_id="'+category_feed_id+'"]').html("<span class='not_selected'>[ Choose... ]</span>");
                       } else {
                         //   $('.virtual_selector[category_feed_id="'+category_feed_id+'"]').html(this_selector.find("option:selected").text());
                            virtual_selector.html(this_selector.find("option:selected").text());
                           // $('.virtual_selector[category_feed_id="'+category_feed_id+'"]').attr('category_oc_id', this_selector.val());
                            virtual_selector.attr('category_oc_id', this_selector.val());
                     }
                       this_selector.hide(200);
                 } else {alert("Problem - contact the administrator !!!");}
              }
           });
      })

      /**************************************** SettingsPerCategory *************************************/
      $(".SettingsPerCategory").change(function() {
            var value = $(this).val();
            var category_feed_id = $(this).attr("category_feed_id");
            var code = $(this).attr("code");
            var this_selector = $(this);
            this_selector.hide(200);
            var data = { 'category_feed_id':   category_feed_id,
                'code':   code,
                'value':   value,
                'supplier':   supplier,
                'to_do': "SAVE_SETTINGS_PER_CATEGORY" };

            $.ajax({ type: 'post', cache: false, url: '<?php echo CATEGORY_MAPPING_URL_AJAX ?>', data: data, success: function(data){
                 if (data=="ok") {
                     this_selector.show(200);
                 } else {
                     alert("Problem - contact the administrator !!!");
                 }
              }
           });
      })

      jQuery('.info1').click(function() {
        jQuery('.infobox1').bPopup({ opacity: 0.6, modalClose: true, follow: [10, 10] });
      })
      //-->
      </script>
    <?php
    }

    public static function getFormatedProductsInCategory($category_feed_id, $supplier, $product_settings_type) {
        global $db, $b2b;
        $supplier = $_REQUEST['supplier'];
        //$b2b = new $supplier();
        $sku = "";
        foreach ( $db->query("SELECT * FROM import_product_settings WHERE category_feed_id='$category_feed_id' AND product_settings_type='$product_settings_type' AND supplier = '$supplier'") as $p){
            $ok[$p['sku']] = true;
        }
        $out = "<div id='SetTitle'></div><br /><span class='all_products'>ALL</span><span class='no_products'>NO PRODUCT</span><span class='save_products'>SAVE</span><br /><br />";
        foreach ($b2b->getProductsInCategory($category_feed_id) as $sku => $p) {
           $ch = @$ok[$sku] ? "checked='true'":"";
           $out .=  "<input type='checkbox' name='{$sku}' class='p2dset_checkbox' $ch> {$sku} | <small>{$p}</small><br/>";
        }
        if ($sku == "") return "empty";
        $out .= "<br/>";
        return $out;
    }

    public static function parseExtConf($str, $prefix = '', $unescape = false) {
		  $result = array();
    	  $block = null;
		  $value = '';
    	  foreach (explode("\n", $str) as $line) {
			if ($block === null) {
			  $line = trim($line);
    		  if ($line !== '' and strpbrk($line[0], '#;') === false) {
				@list($key, $value) = explode('=', $line, 2);
    			$key = rtrim($key);
				$value = ltrim($value);
    			if ($value === '{') {
				  $block = $key;
				  $value = '';
				} elseif (isset($value)) {
				  $result[$prefix.$key] = $unescape ? stripcslashes($value) : $value;
				}
			  }
			} elseif ($line === '}') {
			  $result[$prefix.$block] = (string) substr($value, 0, -1);
			  $block = null;
			} else {
			  $value .= rtrim($line)."\n";
			}
		  }
		  return $result;
	}

	public static function customKeywordIsMatched($supplier_attribute_to_match) {
        global $b2b;
        $result = array();
        if (!isset($b2b->USED_CUSTOM_KEYWORDS)) {
			$USED_CUSTOM_KEYWORDS = array();
			if (@isset($b2b->import_settings['USED_CUSTOM_KEYWORDS']))
				foreach (explode("\n", $b2b->import_settings['USED_CUSTOM_KEYWORDS']) as $USED_CUSTOM_KEYWORD) {
					$USED_CUSTOM_KEYWORDS[] = $USED_CUSTOM_KEYWORD;
				}
			$b2b->USED_CUSTOM_KEYWORDS = $USED_CUSTOM_KEYWORDS;
			$b2b->USED_CUSTOM_KEYWORD_MATCHED = array();
		}

		foreach ($b2b->USED_CUSTOM_KEYWORDS as $USED_CUSTOM_KEY) {
		    $crc = true;
		    $founded = false;
		    foreach (explode(" ", $USED_CUSTOM_KEY) as $USED_CUSTOM_KEYWORD) {
                if (preg_match("/".$USED_CUSTOM_KEYWORD."/i", $supplier_attribute_to_match)) {
     				$founded = true;
				} else {
					$crc = false;
				}
			}
			if ($crc && $founded) {
				$result[] = $USED_CUSTOM_KEY;
//				return $USED_CUSTOM_KEY;
//				 $b2b->USED_CUSTOM_KEYWORD_MATCHED[$USED_CUSTOM_KEY][] = $supplier_attribute_to_match ;
			}
		}
		return $result;
	}

	public static function customKeywordMatchingCategs() {
        global $b2b;
    	$categs = array();
    	if (@$b2b->import_settings['USED_CUSTOM_KEYWORDS'] == "") return array();
     	if (isset($b2b->import_settings['USED_CUSTOM_KEYWORDS'])) {
        	foreach($b2b->USED_CUSTOM_KEYWORD_MATCHED as $uckm => $list)
				$b2b->USED_CUSTOM_KEYWORD_MATCHED[$uckm] = implode("<br> ", $list);
			foreach (explode("\n", $b2b->import_settings['USED_CUSTOM_KEYWORDS']) as $USED_CUSTOM_KEYWORD)
		    	$categs["custkey-" . $USED_CUSTOM_KEYWORD] = " TITLE-KEYWORDS => ".$USED_CUSTOM_KEYWORD."" . "<br><br><small>".@$b2b->USED_CUSTOM_KEYWORD_MATCHED[$USED_CUSTOM_KEYWORD]."$USED_CUSTOM_KEYWORD</small>";
        }
        return $categs;
	}

    public static function customKeywordMatching($supplier_attribute_to_match) {
    	global $b2b;
		if (@$b2b->import_settings['USED_CUSTOM_KEYWORDS'] == "") return false;
    	if (!isset($b2b->USED_CUSTOM_KEYWORDS)) {
			$USED_CUSTOM_KEYWORDS = array();
			if (isset($b2b->import_settings['USED_CUSTOM_KEYWORDS']))
				foreach (explode("\n", $b2b->import_settings['USED_CUSTOM_KEYWORDS']) as $USED_CUSTOM_KEYWORD) {
					$USED_CUSTOM_KEYWORDS[] = $USED_CUSTOM_KEYWORD;
				}
			$b2b->USED_CUSTOM_KEYWORDS = $USED_CUSTOM_KEYWORDS;
			$b2b->USED_CUSTOM_KEYWORD_MATCHED = array();
		}

		foreach ($b2b->USED_CUSTOM_KEYWORDS as $USED_CUSTOM_KEY) {
		    $crc = true;
		    $founded = false;
		    foreach (explode(" ", $USED_CUSTOM_KEY) as $USED_CUSTOM_KEYWORD) {
                if (preg_match("/".$USED_CUSTOM_KEYWORD."/i", $supplier_attribute_to_match)) {
     				$founded = true;
				} else {
					$crc = false;
				}
			}
			if ($crc && $founded) {
				 $b2b->USED_CUSTOM_KEYWORD_MATCHED[$USED_CUSTOM_KEY][] = $supplier_attribute_to_match ;
			}
		}
	}

    public static function displayAttributeManagementTool() {
		global $b2b, $db, $client, $sessionId;
		Mage::init();
		$Magento_AttributeSets = array();
        $attributestmp = Mage::getSingleton('eav/config')
        	->getEntityType(Mage_Catalog_Model_Product::ENTITY)->getAttributeCollection();
        foreach($attributestmp->getData() as $at) {
           // if (substr($at['attribute_code'], 0, strlen(ATTRIBUTES_PREFIX) ) == ATTRIBUTES_PREFIX) {
                $Magento_Attributes[$at['attribute_code']]['attribute_id'] = $at['attribute_id'];
                $Magento_Attributes[$at['attribute_code']]['name'] = $at['frontend_label'];
           // }
        }
        ksort($Magento_Attributes);
        $Magento_AttributeSets_temp = $client->call( $sessionId, "catalog_product_attribute_set.list");
        foreach($Magento_AttributeSets_temp as $as) {
            $Magento_AttributeSets[$as['name']] = $as['set_id'];
        }
		echo '<table border="0" cellpadding="0" cellspacing="0" width="600">';
		foreach ($Magento_Attributes as $Magento_Attribute) {
			if ($Magento_Attribute['name'] == "") continue;
			echo "<tr>";
			echo "<td>{$Magento_Attribute['name']}</td>";
			echo "<td>{$Magento_Attribute['code']}</td>";
			echo "<td><span class='copy_to_all_sets' id_attribute='{$Magento_Attribute['attribute_id']}'>COPY to all Sets</span></td>";
			echo "<td><span class='remove_from_all_sets' id_attribute='{$Magento_Attribute['attribute_id']}'>REMOVE from all Sets</span></td>";
			echo "</tr>";
		}
		echo '</table>';
      //  dump($Magento_AttributeSets);
       // dump($Magento_Attributes);
       ?>
       <style>
       .copy_to_all_sets{text-decoration: underline; color:blue;cursor:pointer}
       .remove_from_all_sets{text-decoration: underline; color:blue;cursor:pointer}
       </style><script language="JavaScript">
        <!--
          jQuery('.copy_to_all_sets').click(function() {
          	  	var e = $(this);
          	  	id_attribute = e.attr("id_attribute");
				var data = {  'supplier': supplier, 'id_attribute': id_attribute, 'to_do': "COPY_TO_ALL_SETS" };
				$.ajax({ type: 'post', cache: false, url: '<?php echo CATEGORY_MAPPING_URL_AJAX ?>', data: data, success: function(data){
						if (data=="ok") {
                          alert("ok");
                 	  	}
					}
				})
		  })

		  jQuery('.remove_from_all_sets').click(function() {
          	  	var e = $(this);
          	  	id_attribute = e.attr("id_attribute");
				var data = {  'supplier': supplier, 'id_attribute': id_attribute, 'to_do': "REMOVE_FROM_ALL_SETS" };
				$.ajax({ type: 'post', cache: false, url: '<?php echo CATEGORY_MAPPING_URL_AJAX ?>', data: data, success: function(data){
						if (data=="ok") {
                          alert("ok");
                 	  	}
					}
				})
		  })
      //-->
      </script>

       <?php
	}

}
