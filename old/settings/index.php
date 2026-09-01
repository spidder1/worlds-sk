<?php
$import_settings = Settings::get_import_settings($b2b->name);
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <script type="text/javascript" src="<?php echo IMPORT_BASE_URL . IMPORT_PATH; ?>/assets/jquery.js"></script>
        <script type="text/javascript" src="<?php echo IMPORT_BASE_URL . IMPORT_PATH; ?>/assets/jquery.bpopup.min.js"></script>
        <script type="text/javascript" src="<?php echo IMPORT_BASE_URL . IMPORT_PATH; ?>/assets/jquery.hashchange.min.js"></script>
        <script type="text/javascript" src="<?php echo IMPORT_BASE_URL . IMPORT_PATH; ?>/assets/jquery.easytabs.min.js"></script>
        <link rel="stylesheet" type="text/css" href="<?php echo IMPORT_BASE_URL . IMPORT_PATH; ?>/assets/style.min.css" />
    </head>
    <body>
        <h1><?php echo _t("Configuration for"); ?> <?php echo $b2b->name; ?></h1>
        <div>
        	<div class="topmessage"><small><?php echo _t("All settings changes are message"); ?>
        	<a href="<?php echo IMPORT_BASE_URL . IMPORT_PATH; ?>/?<?php echo $b2b->name; ?>" target="_blank"><?php echo IMPORT_BASE_URL . IMPORT_PATH; ?>/?<?php echo $b2b->name; ?></a> ( or via <a href="http://en.wikipedia.org/wiki/Cron" target="_blank">CRON</a> )</small>
        	</div></div>
        <br />
        <div id="tab-container" class="tab-container">
          <ul class='etabs'>
            <li class='tab'><a href="#category_mapping"><?php echo _t("Category Mapping Tool"); ?></a></li>
            <li class='tab'><a href="#settings"><?php echo _t("Settings"); ?></a></li>
            <li class='tab'><a href="#logs"><?php echo _t("Logs"); ?></a></li>
            <li class='tab'><a href="#help"><?php echo _t("Help"); ?></a></li>
          </ul>

          <div id="category_mapping" class="tab-content">
                <?php Settings::displayCategoryMappingTool(); ?>
          </div>

          <div id="settings" class="tab-content">
          	 <?php
             if (count($iconf['SettingsBoxes']) > 0) {
                 foreach ($iconf['SettingsBoxes'] as $setting => $setting_array) {
                     ?>
                        <table border="0" cellpadding="0" cellspacing="0" width="610">
                            <tr class='tableheader3'><td colspan="1" align="center"><?php echo $setting; ?></td></tr>
                            <tr class='tableheader'><td>
                                <textarea cols="" rows="" style="float:left; width:600px; height:150px;" class="<?php echo $setting_array['code']; ?>"><?php echo $import_settings[$setting_array['code']]; ?></textarea>
                                <input style="float:right" type="button" class="save_import_settings" importsettings="<?php echo $setting_array['code']; ?>"  value="Save" /><br /><br />
                            </td></tr>
                        </table>
                        <br />
                     <?php
                 }
             ?>
             <script type="text/javascript">
                /* <![CDATA[ */
                 $('.save_import_settings').click(function() {
                       $('.save_import_settings').fadeTo("slow", 0.33);
                       $('.save_import_settings').fadeTo("slow", 1);
                       var importsettings = $(this).attr("importsettings");
                       var el = "." + importsettings + "";
                       var variable_value = $("" + el).val();
                       var data = { 'variable_value':   variable_value,'variable_name':   importsettings, 'supplier': supplier, 'to_do': "SAVE_IMPORT_SETTINGS" };
                       $.ajax({ type: 'post', cache: false, url: '<?php echo CATEGORY_MAPPING_URL_AJAX ?>', data: data, success: function(data){
                             if (data=="ok") { alert("Saved.") }
                         }
                       })
                  })
                /* ]]> */
                </script>
                <?php
             }  else {
                 echo "<div style='margin:10px;'>"._t("Not used.")."</div>";
             }
             ?>
          </div>
          <div id="logs" class="tab-content">
            <iframe src="<?php echo IMPORT_BASE_URL . IMPORT_PATH; ?>/logs/" frameborder="0" width="1200" height="600" style="margin-left: 20px;"></iframe>
          </div>

          <div id="help" class="tab-content" style="padding: 10px;">
                <?php echo _t("Intro"); ?>
                <br />
                <br />
                <?php echo _t("ImportModuleActivity"); ?>
                <br />
                <br />
                <?php echo _t("AdministrationInterface"); ?>
                <br />
                <br />
                <?php echo _t("CategoryMappingToolInfo"); ?>
                 <br />
                 <?php echo _t("SettingsToolInfo"); ?>
                 <br />


          </div>
        </div>

        <script language="JavaScript">
        <!--
          $('#tab-container').easytabs({ animate: false, updateHash: false,});
        //-->
        </script>

</body>
</html>