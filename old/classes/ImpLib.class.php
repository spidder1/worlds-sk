<?php
class ImpLib {

    function __construct() {

    }

    public static function gt()  {
        list($usec, $sec) = explode(" ", microtime());
        return ((float)$usec + (float)$sec);
    }

    public static function grt($s)  {  // get result time
        list($usec, $sec) = explode(" ", microtime());
        $e = ((float)$usec + (float)$sec);
        return round($e - $s, 2);
    }

    public static function getMetaKeyWords($desc) {
    	$i = 0;
    	$keywords = "";
        foreach (explode(" ", $desc) as $w) {
            if (strlen($w) > 3) {
                $keywords[]=str_replace(",", "", $w);
                $i++;
            }
            if ($i > 11) break;
        }
        return implode(",", $keywords);
    }

    public function uncompressZIP($srcName, $dstName) {
        /*
        $zip = new ZipArchive;
        $res = $zip->open($srcName);
        if ($res === TRUE) {
            $zip->extractTo($dstName);
            $zip->close();
        } else {
            echo "error during unzip process";
        }
        */
        $com='unzip '.$srcName . " -d $dstName";
        exec($com,$return , $returnval);
        //print_r($return);
        //print_r($returnval);
        //exit;

    }

     public static function round_to($number, $step = 1, $sub = 0, $min) {
	    $number += $sub; // to ensure it rounds in the correct way
	    if($step == 0 || $step == 1) {
			$result = round($number) - $sub;
			if ($result >= $number) {
				return $result;
			} else {
				return round($number+$step) - $sub;
			}
	    }

	     $result = (round($number / $step) * $step) - $sub;
	     if ($result >= $number) {
				return $result;
			} else {
				return (round(($number+$step) / $step) * $step) - $sub;
			}
	}

	public static function nicePriceToro($a) {
			$d = round(100* ($a -floor($a)));
			if (($d>1) && ($d<50) ) {
				return $d = floor($a) + 0.5;
			}
			if (($d>50) && ($d<95) ) {
				return $d = floor($a) + 0.95;
			}
		return $a;
	}

	public static function nicePrice($a) {
				$d= (substr(round($a), -1));
				if ($d<0.5) {
					$a = ImpLib::round_to($a, 1, 0.1, $a);
				} else {
					$a = ImpLib::round_to($a, 1, 0.1, $a);
				}
		return $a;
	}



    public static function limitSentence($string, $limit = 120) {
        $out = "";
        if (strlen($string)<$limit) return $string;
        foreach(array(0,1,2,3,4,5,6,7,8,9) as $i) {
            $last = $out;
            preg_match('/^([^.!?]*[\.!?]+){0,'.$i.'}/', strip_tags($string), $abstract);
            $out = $abstract[0];
            if (strlen($out) > $limit) break;
            if (strlen($out) == strlen($string)) break;
        }
        return $last;
    }

    public static function addBusinessLogic($articles_final) {
    	define("RELATED_PRODUCT_COUNT",   10 );
		define("UPSELLS_PRODUCT_COUNT",   10 );
		define("CROSSSELLS_PRODUCT_COUNT",   10 );
		global $b2b, $logger;
		$cattree = $b2b->get_store_categories_simple();

		if (count($articles_final)==0) return array();

    	foreach ($articles_final as $p) {
			foreach ($p->category_ids as $c)
				$categs[$c][$p->sku] = $p->price;
		}

		foreach ($articles_final as $p) {

			$i = mysql_query("select * from imported ");
          //    $logger->LogCron("Pinged : {$p->sku}");

			// upsells
			$UPSELLS_PRODUCT_COUNT = 0;
			$in_cat = $categs[$p->category_ids[0]];
			foreach ($in_cat  as $in_c => $price) {
				if ($p->price < $price) {
					$articles_final[$p->sku]->upsells[] = $in_c;
					if ($UPSELLS_PRODUCT_COUNT++ == UPSELLS_PRODUCT_COUNT-1) break;
				}
			}

			// crosssells
			$attempts = 0;
			while (@count($articles_final[$p->sku]->crosssells) < CROSSSELLS_PRODUCT_COUNT ) {
			    $cat_rand = rand(0, count($cattree));
			    if ($attempts++ > 300) break;
				if (@$cattree[$cat_rand]) {
					if (@$categs[$cat_rand]) {
 						$articles_final[$p->sku]->crosssells[] = key($categs[$cat_rand]);
						$articles_final[$p->sku]->crosssells = array_unique($articles_final[$p->sku]->crosssells);
					}
				}
			}

			// related
			$RELATED_PRODUCT_COUNT = 0;
			$in_cat = $categs[$p->category_ids[0]];
			foreach ($in_cat  as $in_c => $price) {
				$articles_final[$p->sku]->related[] = $in_c;
				if ($RELATED_PRODUCT_COUNT++ == RELATED_PRODUCT_COUNT-1) break;
			}
			//$tmp = $articles_final[$p->sku]; unset($articles_final); $articles_final[$p->sku] = $tmp;
			//break;

		}
		return $articles_final;
	}

    public static function limitString($string, $limit = 100) {
        // Return early if the string is already shorter than the limit
        if(strlen($string) < $limit) {return $string;}

        $regex = "/(.{1,$limit})\b/";
        preg_match($regex, $string, $matches);
        return $matches[1];
    }


    public static function convert($size) {
        $unit=array('B','kB','MB','GB','TB','PB');
        return @round($size/pow(1024,($i=floor(log($size,1024)))),2).' '.$unit[$i];
    }

    function uncompressGZ($srcName, $dstName) {
        $sfp = gzopen($srcName, "rb");
        $fp = fopen($dstName, "w");

        while ($string = gzread($sfp, 4096)) {
            fwrite($fp, $string, strlen($string));
        }
        gzclose($sfp);
        fclose($fp);
    }


    public function rrmdir($dir) {
       if (is_dir($dir)) {
         $objects = scandir($dir);
         foreach ($objects as $object) {
           if ($object != "." && $object != "..") {
             if (filetype($dir."/".$object) == "dir") ImpLib::rrmdir($dir."/".$object); else unlink($dir."/".$object);
           }
         }
         reset($objects);
         //rmdir($dir);
       }
    }

    public static function tourl ($str) {
         /*function tourl($s)
        {
            static $tbl = array("\xc3\xa1"=>"a","\xc3\xa4"=>"a","\xc4\x8d"=>"c","\xc4\x8f"=>"d","\xc3\xa9"=>"e","\xc4\x9b"=>"e","\xc3\xad"=>"i","\xc4\xbe"=>"l","\xc4\xba"=>"l","\xc5\x88"=>"n","\xc3\xb3"=>"o","\xc3\xb6"=>"o","\xc5\x91"=>"o","\xc3\xb4"=>"o","\xc5\x99"=>"r","\xc5\x95"=>"r","\xc5\xa1"=>"s","\xc5\xa5"=>"t","\xc3\xba"=>"u","\xc5\xaf"=>"u","\xc3\xbc"=>"u","\xc5\xb1"=>"u","\xc3\xbd"=>"y","\xc5\xbe"=>"z","\xc3\x81"=>"A","\xc3\x84"=>"A","\xc4\x8c"=>"C","\xc4\x8e"=>"D","\xc3\x89"=>"E","\xc4\x9a"=>"E","\xc3\x8d"=>"I","\xc4\xbd"=>"L","\xc4\xb9"=>"L","\xc5\x87"=>"N","\xc3\x93"=>"O","\xc3\x96"=>"O","\xc5\x90"=>"O","\xc3\x94"=>"O","\xc5\x98"=>"R","\xc5\x94"=>"R","\xc5\xa0"=>"S","\xc5\xa4"=>"T","\xc3\x9a"=>"U","\xc5\xae"=>"U","\xc3\x9c"=>"U","\xc5\xb0"=>"U","\xc3\x9d"=>"Y","\xc5\xbd"=>"Z");
            $temp = strtr($s, $tbl);
            return upravSEO($temp) ;
        } */
        //$str=  iconv('WIN-1250', 'UTF-8', $str);   // blafy v kategoriich
        //$str = iconv("utf-8", "us-ascii//TRANSLIT", $str);
        $str=ImpLib::utf2ascii($str);
        $str = preg_replace("~[^\w\d]+~", '-', strtolower($str));
        $str = trim($str, "-");
        $str = preg_replace('~[^-\w\d]+~', '', $str);

        return $str;
    }

    public static function tourl2 ($str) {
        $str=ImpLib::utf2ascii($str);
        $str = preg_replace("~[^\w\d]+~", '_', strtolower($str));
        $str = trim($str, "-");
        $str = preg_replace('~[^-\w\d]+~', '', $str);

        return $str;
    }

    public function clean_category ($str) {

        //$str=  iconv('WIN-1250', 'UTF-8', $str);   // blafy v kategoriich
        //$str = iconv("utf-8", "us-ascii//TRANSLIT", $str);
        //setlocale(cs_CZ.utf8);
        $str = preg_replace("~[^\w\d]+~", ' ', $str);

        return $str;
    }

     public static function limitText($text, $len) {
        if (strlen($text) < $len) {
            return $text;
        }
        $text_words = explode(' ', $text);
        $out = null;


        foreach ($text_words as $word) {
            if ((strlen($word) > $len) && $out == null) {

                return substr($word, 0, $len) . "...";
            }
            if ((strlen($out) + strlen($word)) > $len) {
                return $out . "...";
            }
            $out.=" " . $word;
        }
        $out = substr($out, 1, strlen($out));
        return $out;
    }

	public static function cyr2lat($inputStr) {
	    $cyr  = array('а','б','в','г','д','e','ж','з','и','й','к','л','м','н','о','п','р','с','т','у',
	        'ф','х','ц','ч','ш','щ','ъ','ь', 'ю','я','А','Б','В','Г','Д','Е','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У',
	        'Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ь', 'Ю','Я' );
	    $lat = array( 'a','b','v','g','d','e','zh','z','i','y','k','l','m','n','o','p','r','s','t','u',
	        'f' ,'h' ,'ts' ,'ch','sh' ,'sht' ,'a' ,'y' ,'yu' ,'ya','A','B','V','G','D','E','Zh',
	        'Z','I','Y','K','L','M','N','O','P','R','S','T','U',
	        'F' ,'H' ,'Ts' ,'Ch','Sh' ,'Sht' ,'A' ,'Y' ,'Yu' ,'Ya' );
	       // $textcyr = str_replace($cyr, $lat, $textcyr);
        return  str_replace( $cyr, $lat, $inputStr);
	}

    public static function utf2ascii($inputStr) {
        $FT_UTF8TOASCIISRC = array("\xc3\x80","\xc3\x81","\xc3\x82","\xc3\x83","\xc3\x84","\xc3\x85","\xc3\x87","\xc3\x88","\xc3\x89","\xc3\x8a","\xc3\x8b","\xc3\x8c","\xc3\x8d","\xc3\x8e","\xc3\x8f","\xc3\x91","\xc3\x92","\xc3\x93","\xc3\x94","\xc3\x95","\xc3\x96","\xc3\x99","\xc3\x9a","\xc3\x9b","\xc3\x9c","\xc3\x9d","\xc3\xa0","\xc3\xa1","\xc3\xa2","\xc3\xa3","\xc3\xa4","\xc3\xa5","\xc3\xa7","\xc3\xa8","\xc3\xa9","\xc3\xaa","\xc3\xab","\xc3\xac","\xc3\xad","\xc3\xae","\xc3\xaf","\xc3\xb1","\xc3\xb2","\xc3\xb3","\xc3\xb4","\xc3\xb5","\xc3\xb6","\xc3\xb9","\xc3\xba","\xc3\xbb","\xc3\xbc","\xc3\xbd","\xc3\xbf","\xc4\x80","\xc4\x81","\xc4\x82","\xc4\x83","\xc4\x84","\xc4\x85","\xc4\x86","\xc4\x87","\xc4\x88","\xc4\x89","\xc4\x8a","\xc4\x8b","\xc4\x8c","\xc4\x8d","\xc4\x8e","\xc4\x8f","\xc4\x92","\xc4\x93","\xc4\x94","\xc4\x95","\xc4\x96","\xc4\x97","\xc4\x98","\xc4\x99","\xc4\x9a","\xc4\x9b","\xc4\x9c","\xc4\x9d","\xc4\x9e","\xc4\x9f","\xc4\xa0","\xc4\xa1","\xc4\xa2","\xc4\xa3","\xc4\xa4","\xc4\xa5","\xc4\xa8","\xc4\xa9","\xc4\xaa","\xc4\xab","\xc4\xac","\xc4\xad","\xc4\xae","\xc4\xaf","\xc4\xb0","\xc4\xb4","\xc4\xb5","\xc4\xb6","\xc4\xb7","\xc4\xb9","\xc4\xba","\xc4\xbb","\xc4\xbc","\xc4\xbd","\xc4\xbe","\xc5\x83","\xc5\x84","\xc5\x85","\xc5\x86","\xc5\x87","\xc5\x88","\xc5\x8c","\xc5\x8d","\xc5\x8e","\xc5\x8f","\xc5\x90","\xc5\x91","\xc5\x94","\xc5\x95","\xc5\x96","\xc5\x97","\xc5\x98","\xc5\x99","\xc5\x9a","\xc5\x9b","\xc5\x9c","\xc5\x9d","\xc5\x9e","\xc5\x9f","\xc5\xa0","\xc5\xa1","\xc5\xa2","\xc5\xa3","\xc5\xa4","\xc5\xa5","\xc5\xa8","\xc5\xa9","\xc5\xaa","\xc5\xab","\xc5\xac","\xc5\xad","\xc5\xae","\xc5\xaf","\xc5\xb0","\xc5\xb1","\xc5\xb2","\xc5\xb3","\xc5\xb4","\xc5\xb5","\xc5\xb6","\xc5\xb7","\xc5\xb8","\xc5\xb9","\xc5\xba","\xc5\xbb","\xc5\xbc","\xc5\xbd","\xc5\xbe","\xc6\xa0","\xc6\xa1","\xc6\xaf","\xc6\xb0","\xc7\x8d","\xc7\x8e","\xc7\x8f","\xc7\x90","\xc7\x91","\xc7\x92","\xc7\x93","\xc7\x94","\xc7\x95","\xc7\x96","\xc7\x97","\xc7\x98","\xc7\x99","\xc7\x9a","\xc7\x9b","\xc7\x9c","\xc7\x9e","\xc7\x9f","\xc7\xa2","\xc7\xa3","\xc7\xa6","\xc7\xa7","\xc7\xa8","\xc7\xa9","\xc7\xaa","\xc7\xab","\xc7\xb0","\xc7\xb4","\xc7\xb5","\xc7\xb8","\xc7\xb9","\xc7\xba","\xc7\xbb","\xc7\xbc","\xc7\xbd","\xc7\xbe","\xc7\xbf","\xc8\x80","\xc8\x81","\xc8\x82","\xc8\x83","\xc8\x84","\xc8\x85","\xc8\x86","\xc8\x87","\xc8\x88","\xc8\x89","\xc8\x8a","\xc8\x8b","\xc8\x8c","\xc8\x8d","\xc8\x8e","\xc8\x8f","\xc8\x90","\xc8\x91","\xc8\x92","\xc8\x93","\xc8\x94","\xc8\x95","\xc8\x96","\xc8\x97","\xc8\x98","\xc8\x99","\xc8\x9a","\xc8\x9b","\xc8\x9e","\xc8\x9f","\xc8\xa6","\xc8\xa7","\xc8\xa8","\xc8\xa9","\xc8\xaa","\xc8\xab","\xc8\xac","\xc8\xad","\xc8\xae","\xc8\xaf","\xc8\xb2","\xc8\xb3","\xcd\xbe","\xce\x85","\xce\x87","\xe1\xb8\x80","\xe1\xb8\x81","\xe1\xb8\x82","\xe1\xb8\x83","\xe1\xb8\x84","\xe1\xb8\x85","\xe1\xb8\x86","\xe1\xb8\x87","\xe1\xb8\x88","\xe1\xb8\x89","\xe1\xb8\x8a","\xe1\xb8\x8b","\xe1\xb8\x8c","\xe1\xb8\x8d","\xe1\xb8\x8e","\xe1\xb8\x8f","\xe1\xb8\x90","\xe1\xb8\x91","\xe1\xb8\x92","\xe1\xb8\x93","\xe1\xb8\x98","\xe1\xb8\x99","\xe1\xb8\x9a","\xe1\xb8\x9b","\xe1\xb8\x9e","\xe1\xb8\x9f","\xe1\xb8\xa0","\xe1\xb8\xa1","\xe1\xb8\xa2","\xe1\xb8\xa3","\xe1\xb8\xa4","\xe1\xb8\xa5","\xe1\xb8\xa6","\xe1\xb8\xa7","\xe1\xb8\xa8","\xe1\xb8\xa9","\xe1\xb8\xaa","\xe1\xb8\xab","\xe1\xb8\xac","\xe1\xb8\xad","\xe1\xb8\xae","\xe1\xb8\xaf","\xe1\xb8\xb0","\xe1\xb8\xb1","\xe1\xb8\xb2","\xe1\xb8\xb3","\xe1\xb8\xb4","\xe1\xb8\xb5","\xe1\xb8\xb6","\xe1\xb8\xb7","\xe1\xb8\xba","\xe1\xb8\xbb","\xe1\xb8\xbc","\xe1\xb8\xbd","\xe1\xb8\xbe","\xe1\xb8\xbf","\xe1\xb9\x80","\xe1\xb9\x81","\xe1\xb9\x82","\xe1\xb9\x83","\xe1\xb9\x84","\xe1\xb9\x85","\xe1\xb9\x86","\xe1\xb9\x87","\xe1\xb9\x88","\xe1\xb9\x89","\xe1\xb9\x8a","\xe1\xb9\x8b","\xe1\xb9\x8c","\xe1\xb9\x8d","\xe1\xb9\x8e","\xe1\xb9\x8f","\xe1\xb9\x94","\xe1\xb9\x95","\xe1\xb9\x96","\xe1\xb9\x97","\xe1\xb9\x98","\xe1\xb9\x99","\xe1\xb9\x9a","\xe1\xb9\x9b","\xe1\xb9\x9e","\xe1\xb9\x9f","\xe1\xb9\xa0","\xe1\xb9\xa1","\xe1\xb9\xa2","\xe1\xb9\xa3","\xe1\xb9\xaa","\xe1\xb9\xab","\xe1\xb9\xac","\xe1\xb9\xad","\xe1\xb9\xae","\xe1\xb9\xaf","\xe1\xb9\xb0","\xe1\xb9\xb1","\xe1\xb9\xb2","\xe1\xb9\xb3","\xe1\xb9\xb4","\xe1\xb9\xb5","\xe1\xb9\xb6","\xe1\xb9\xb7","\xe1\xb9\xbc","\xe1\xb9\xbd","\xe1\xb9\xbe","\xe1\xb9\xbf","\xe1\xba\x80","\xe1\xba\x81","\xe1\xba\x82","\xe1\xba\x83","\xe1\xba\x84","\xe1\xba\x85","\xe1\xba\x86","\xe1\xba\x87","\xe1\xba\x88","\xe1\xba\x89","\xe1\xba\x8a","\xe1\xba\x8b","\xe1\xba\x8c","\xe1\xba\x8d","\xe1\xba\x8e","\xe1\xba\x8f","\xe1\xba\x90","\xe1\xba\x91","\xe1\xba\x92","\xe1\xba\x93","\xe1\xba\x94","\xe1\xba\x95","\xe1\xba\x96","\xe1\xba\x97","\xe1\xba\x98","\xe1\xba\x99","\xe1\xba\xa0","\xe1\xba\xa1","\xe1\xba\xa2","\xe1\xba\xa3","\xe1\xba\xa4","\xe1\xba\xa5","\xe1\xba\xa6","\xe1\xba\xa7","\xe1\xba\xa8","\xe1\xba\xa9","\xe1\xba\xaa","\xe1\xba\xab","\xe1\xba\xb8","\xe1\xba\xb9","\xe1\xba\xba","\xe1\xba\xbb","\xe1\xba\xbc","\xe1\xba\xbd","\xe1\xba\xbe","\xe1\xba\xbf","\xe1\xbb\x80","\xe1\xbb\x81","\xe1\xbb\x82","\xe1\xbb\x83","\xe1\xbb\x84","\xe1\xbb\x85","\xe1\xbb\x88","\xe1\xbb\x89","\xe1\xbb\x8a","\xe1\xbb\x8b","\xe1\xbb\x8c","\xe1\xbb\x8d","\xe1\xbb\x8e","\xe1\xbb\x8f","\xe1\xbb\x90","\xe1\xbb\x91","\xe1\xbb\x92","\xe1\xbb\x93","\xe1\xbb\x94","\xe1\xbb\x95","\xe1\xbb\x96","\xe1\xbb\x97","\xe1\xbb\xa4","\xe1\xbb\xa5","\xe1\xbb\xa6","\xe1\xbb\xa7","\xe1\xbb\xb2","\xe1\xbb\xb3","\xe1\xbb\xb4","\xe1\xbb\xb5","\xe1\xbb\xb6","\xe1\xbb\xb7","\xe1\xbb\xb8","\xe1\xbb\xb9","\xe1\xbf\x81","\xe1\xbf\xad","\xe1\xbf\xaf","\xe1\xbf\xbd","\xe2\x84\xaa","\xe2\x84\xab","\xe2\x89\xa0","\xe2\x89\xae","\xe2\x89\xaf");
        $FT_UTF8TOASCIIDST = array("\x41","\x41","\x41","\x41","\x41","\x41","\x43","\x45","\x45","\x45","\x45","\x49","\x49","\x49","\x49","\x4e","\x4f","\x4f","\x4f","\x4f","\x4f","\x55","\x55","\x55","\x55","\x59","\x61","\x61","\x61","\x61","\x61","\x61","\x63","\x65","\x65","\x65","\x65","\x69","\x69","\x69","\x69","\x6e","\x6f","\x6f","\x6f","\x6f","\x6f","\x75","\x75","\x75","\x75","\x79","\x79","\x41","\x61","\x41","\x61","\x41","\x61","\x43","\x63","\x43","\x63","\x43","\x63","\x43","\x63","\x44","\x64","\x45","\x65","\x45","\x65","\x45","\x65","\x45","\x65","\x45","\x65","\x47","\x67","\x47","\x67","\x47","\x67","\x47","\x67","\x48","\x68","\x49","\x69","\x49","\x69","\x49","\x69","\x49","\x69","\x49","\x4a","\x6a","\x4b","\x6b","\x4c","\x6c","\x4c","\x6c","\x4c","\x6c","\x4e","\x6e","\x4e","\x6e","\x4e","\x6e","\x4f","\x6f","\x4f","\x6f","\x4f","\x6f","\x52","\x72","\x52","\x72","\x52","\x72","\x53","\x73","\x53","\x73","\x53","\x73","\x53","\x73","\x54","\x74","\x54","\x74","\x55","\x75","\x55","\x75","\x55","\x75","\x55","\x75","\x55","\x75","\x55","\x75","\x57","\x77","\x59","\x79","\x59","\x5a","\x7a","\x5a","\x7a","\x5a","\x7a","\x4f","\x6f","\x55","\x75","\x41","\x61","\x49","\x69","\x4f","\x6f","\x55","\x75","\xdc","\xfc","\xdc","\xfc","\xdc","\xfc","\xdc","\xfc","\xc4","\xe4","\xc6","\xe6","\x47","\x67","\x4b","\x6b","\x4f","\x6f","\x6a","\x47","\x67","\x4e","\x6e","\xc5","\xe5","\xc6","\xe6","\xd8","\xf8","\x41","\x61","\x41","\x61","\x45","\x65","\x45","\x65","\x49","\x69","\x49","\x69","\x4f","\x6f","\x4f","\x6f","\x52","\x72","\x52","\x72","\x55","\x75","\x55","\x75","\x53","\x73","\x54","\x74","\x48","\x68","\x41","\x61","\x45","\x65","\xd6","\xf6","\xd5","\xf5","\x4f","\x6f","\x59","\x79","\x3b","\xa8","\xb7","\x41","\x61","\x42","\x62","\x42","\x62","\x42","\x62","\xc7","\xe7","\x44","\x64","\x44","\x64","\x44","\x64","\x44","\x64","\x44","\x64","\x45","\x65","\x45","\x65","\x46","\x66","\x47","\x67","\x48","\x68","\x48","\x68","\x48","\x68","\x48","\x68","\x48","\x68","\x49","\x69","\xcf","\xef","\x4b","\x6b","\x4b","\x6b","\x4b","\x6b","\x4c","\x6c","\x4c","\x6c","\x4c","\x6c","\x4d","\x6d","\x4d","\x6d","\x4d","\x6d","\x4e","\x6e","\x4e","\x6e","\x4e","\x6e","\x4e","\x6e","\xd5","\xf5","\xd5","\xf5","\x50","\x70","\x50","\x70","\x52","\x72","\x52","\x72","\x52","\x72","\x53","\x73","\x53","\x73","\x54","\x74","\x54","\x74","\x54","\x74","\x54","\x74","\x55","\x75","\x55","\x75","\x55","\x75","\x56","\x76","\x56","\x76","\x57","\x77","\x57","\x77","\x57","\x77","\x57","\x77","\x57","\x77","\x58","\x78","\x58","\x78","\x59","\x79","\x5a","\x7a","\x5a","\x7a","\x5a","\x7a","\x68","\x74","\x77","\x79","\x41","\x61","\x41","\x61","\xc2","\xe2","\xc2","\xe2","\xc2","\xe2","\xc2","\xe2","\x45","\x65","\x45","\x65","\x45","\x65","\xca","\xea","\xca","\xea","\xca","\xea","\xca","\xea","\x49","\x69","\x49","\x69","\x4f","\x6f","\x4f","\x6f","\xd4","\xf4","\xd4","\xf4","\xd4","\xf4","\xd4","\xf4","\x55","\x75","\x55","\x75","\x59","\x79","\x59","\x79","\x59","\x79","\x59","\x79","\xa8","\xa8","\x60","\xb4","\x4b","\xc5","\x3d","\x3c","\x3e");
        return str_replace($FT_UTF8TOASCIISRC, $FT_UTF8TOASCIIDST, $inputStr);
        }

    public static function download_file($src_file,$src_file_temp){
       $ch = curl_init($src_file);
       $File = fopen ($src_file_temp, "w");
       curl_setopt($ch, CURLOPT_FILE, $File);
       curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
       curl_setopt ($ch, CURLOPT_SSL_VERIFYHOST, 0);
      // curl_setopt($ch, CURLOPT_HEADER, TRUE);
       curl_setopt($ch, CURLOPT_USERPWD, 'd:d');
       $result=curl_exec ($ch);

       fclose($File);
      //echo  $last_url = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
      curl_close ($ch);
    }

    public static function downloadImageHTTPS($url_file, $local_file){
		$ch = curl_init($url_file);
		$File = fopen ($local_file, "w");
		curl_setopt($ch, CURLOPT_FILE, $File);
		curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt ($ch, CURLOPT_SSL_VERIFYHOST, 0);
		//           	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_COOKIEJAR, "cookies.txt");
		//			curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
		curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/5.0 (compatible; MSIE 5.01; Windows NT 5.0)");
		// curl_setopt($ch, CURLOPT_HEADER, TRUE);
		$result=curl_exec ($ch);
		fclose($File);
		//echo  $last_url = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
		curl_close ($ch);
    }

}