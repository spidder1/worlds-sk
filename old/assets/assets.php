<?php
// simple_html_dom, CSVHanler, imageresizer, Klogger, dump

function isPicture($file, $types = NULL)
{
    /* Detect mime content type */
    $mimeType = false;
    if (!$types)
        $types = array('image/gif', 'image/jpg', 'image/jpeg', 'image/pjpeg', 'image/png', 'image/x-png');

    /* Try 4 different methods to determine the mime type */
    if (function_exists('finfo_open'))
    {
        $const = defined('FILEINFO_MIME_TYPE') ? FILEINFO_MIME_TYPE : FILEINFO_MIME;
        $finfo = finfo_open($const);
         $mimeType = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);
    }
    elseif (function_exists('mime_content_type'))
        $mimeType = mime_content_type($file['tmp_name']);
    elseif (function_exists('exec'))
    {
        $mimeType = trim(exec('file -b --mime-type '.escapeshellarg($file['tmp_name'])));
        if (!$mimeType)
            $mimeType = trim(exec('file --mime '.escapeshellarg($file['tmp_name'])));
        if (!$mimeType)
            $mimeType = trim(exec('file -bi '.escapeshellarg($file['tmp_name'])));
    }
    if (empty($mimeType) OR $mimeType == 'regular file' OR $mimeType == 'text/plain')
        $mimeType = $file['type'];

    /* For each allowed MIME type, we are looking for it inside the current MIME type */
    foreach ($types AS $type)
        if (strstr($mimeType, $type))
            return true;

    return false;
}
/**
  * Resize, cut and optimize image
  *
  * @param array $sourceFile Image object from $_FILE
  * @param string $destFile Destination filename
  * @param integer $destWidth Desired width (optional)
  * @param integer $destHeight Desired height (optional)
  *
  * @return boolean Operation result
  */
function imageResize($sourceFile, $destFile, $destWidth = NULL, $destHeight = NULL, $fileType = 'jpg')
{
    if (!file_exists($sourceFile))
        return false;
    list($sourceWidth, $sourceHeight, $type, $attr) = getimagesize($sourceFile);
    // If PS_IMAGE_QUALITY is activated, the generated image will be a PNG with .jpg as a file extension.
    // This allow for higher quality and for transparency. JPG source files will also benefit from a higher quality
    // because JPG reencoding by GD, even with max quality setting, degrades the image.
    /*if (Configuration::get('PS_IMAGE_QUALITY') == 'png_all'
        || (Configuration::get('PS_IMAGE_QUALITY') == 'png' && $type == IMAGETYPE_PNG))
        $fileType = 'png';
    */
    if (!$sourceWidth)
        return false;
    if ($destWidth == NULL) $destWidth = $sourceWidth;
    if ($destHeight == NULL) $destHeight = $sourceHeight;

    $sourceImage = createSrcImage($type, $sourceFile);

    $widthDiff = $destWidth / $sourceWidth;
    $heightDiff = $destHeight / $sourceHeight;

    if ($widthDiff > 1 AND $heightDiff > 1)
    {
        $nextWidth = $sourceWidth;
        $nextHeight = $sourceHeight;
    }
    else
    {
        if ($widthDiff > $heightDiff)
        {
            $nextHeight = $destHeight;
            $nextWidth = round(($sourceWidth * $nextHeight) / $sourceHeight);
            $destWidth = true ? $destWidth : $nextWidth;
        }
        else
        {
            $nextWidth = $destWidth;
            $nextHeight = round($sourceHeight * $destWidth / $sourceWidth);
            $destHeight = true ? $destHeight : $nextHeight;
        }
    }

    $destImage = imagecreatetruecolor($destWidth, $destHeight);

    // If image is a PNG and the output is PNG, fill with transparency. Else fill with white background.
    if (false)
    {
        imagealphablending($destImage, false);
        imagesavealpha($destImage, true);
        $transparent = imagecolorallocatealpha($destImage, 255, 255, 255, 127);
        imagefilledrectangle($destImage, 0, 0, $destWidth, $destHeight, $transparent);
    }else
    {
        $white = imagecolorallocate($destImage, 255, 255, 255);
        imagefilledrectangle($destImage, 0, 0, $destWidth, $destHeight, $white);
    }

    imagecopyresampled($destImage, $sourceImage, (int)(($destWidth - $nextWidth) / 2), (int)(($destHeight - $nextHeight) / 2), 0, 0, $nextWidth, $nextHeight, $sourceWidth, $sourceHeight);
    return (returnDestImage($fileType, $destImage, $destFile));
}

/**
  * Cut image
  *
  * @param array $srcFile Image object from $_FILE
  * @param string $destFile Destination filename
  * @param integer $destWidth Desired width (optional)
  * @param integer $destHeight Desired height (optional)
  *
  * @return boolean Operation result
  */
function imageCut($srcFile, $destFile, $destWidth = NULL, $destHeight = NULL, $fileType = 'jpg', $destX = 0, $destY = 0)
{
    if (!isset($srcFile['tmp_name']) OR !file_exists($srcFile['tmp_name']))
        return false;

    // Source infos
    $srcInfos = getimagesize($srcFile['tmp_name']);
    $src['width'] = $srcInfos[0];
    $src['height'] = $srcInfos[1];
    $src['ressource'] = createSrcImage($srcInfos[2], $srcFile['tmp_name']);

    // Destination infos
    $dest['x'] = $destX;
    $dest['y'] = $destY;
    $dest['width'] = $destWidth != NULL ? $destWidth : $src['width'];
    $dest['height'] = $destHeight != NULL ? $destHeight : $src['height'];
    $dest['ressource'] = createDestImage($dest['width'], $dest['height']);

    $white = imagecolorallocate($dest['ressource'], 255, 255, 255);
    imagecopyresampled($dest['ressource'], $src['ressource'], 0, 0, $dest['x'], $dest['y'], $dest['width'], $dest['height'], $dest['width'], $dest['height']);
    imagecolortransparent($dest['ressource'], $white);
    $return = returnDestImage($fileType, $dest['ressource'], $destFile);
    return    ($return);
}

function createSrcImage($type, $filename)
{
    switch ($type)
    {
        case 1:
            return imagecreatefromgif($filename);
            break;
        case 3:
            return imagecreatefrompng($filename);
            break;
        case 2:
        default:
            return imagecreatefromjpeg($filename);
            break;
    }
}

function createDestImage($width, $height)
{
    $image = imagecreatetruecolor($width, $height);
    $white = imagecolorallocate($image, 255, 255, 255);
    imagefill($image, 0, 0, $white);
    return $image;
}

function returnDestImage($type, $ressource, $filename)
{
    $flag = false;
    switch ($type)
    {
        case 'gif':
            $flag = imagegif($ressource, $filename);
            break;
        case 'png':
            $flag = imagepng($ressource, $filename, 100);
            break;
        case 'jpeg':
        default:
            $flag = imagejpeg($ressource, $filename, 90);
            break;
    }
    imagedestroy($ressource);
    @chmod($filename, 0664);
    return $flag;
}




function dump(&$var, $info = FALSE)
{
    $scope = false;
    $prefix = 'unique';
    $suffix = 'value';

    if($scope) $vals = $scope;
    else $vals = $GLOBALS;

    $old = $var;
    $var = $new = $prefix.rand().$suffix; $vname = FALSE;
    foreach($vals as $key => $val) if($val === $new) $vname = $key;
    $var = $old;

    echo "<pre style='margin: 0px 0px 10px 0px; display: block; background: white; color: black; font-family: Verdana; border: 1px solid #cccccc; padding: 5px; font-size: 10px; line-height: 13px;'>";
    if($info != FALSE) echo "<b style='color: red;'>$info:</b><br>";
    do_dump($var, '$'.$vname);
    echo "</pre>";
}


function do_dump(&$var, $var_name = NULL, $indent = NULL, $reference = NULL)
{
    $do_dump_indent = "<span style='color:#eeeeee;'>|</span> &nbsp;&nbsp; ";
    $reference = $reference.$var_name;
    $keyvar = 'the_do_dump_recursion_protection_scheme'; $keyname = 'referenced_object_name';

    if (is_array($var) && isset($var[$keyvar]))
    {
        $real_var = &$var[$keyvar];
        $real_name = &$var[$keyname];
        $type = ucfirst(gettype($real_var));
        echo "$indent$var_name <span style='color:#a2a2a2'>$type</span> = <span style='color:#e87800;'>&amp;$real_name</span><br>";
    }
    else
    {
        $var = array($keyvar => $var, $keyname => $reference);
        $avar = &$var[$keyvar];

        $type = ucfirst(gettype($avar));
        if($type == "String") $type_color = "<span style='color:green'>";
        elseif($type == "Integer") $type_color = "<span style='color:red'>";
        elseif($type == "Double"){ $type_color = "<span style='color:#0099c5'>"; $type = "Float"; }
        elseif($type == "Boolean") $type_color = "<span style='color:#92008d'>";
        elseif($type == "NULL") $type_color = "<span style='color:black'>";

        if(is_array($avar))
        {
            $count = count($avar);
            echo "$indent" . ($var_name ? "$var_name => ":"") . "<span style='color:#a2a2a2'>$type ($count)</span><br>$indent(<br>";
            $keys = array_keys($avar);
            foreach($keys as $name)
            {
                $value = &$avar[$name];
                do_dump($value, "['$name']", $indent.$do_dump_indent, $reference);
            }
            echo "$indent)<br>";
        }
        elseif(is_object($avar))
        {
            echo "$indent$var_name <span style='color:#a2a2a2'>$type</span><br>$indent(<br>";
            foreach($avar as $name=>$value) do_dump($value, "$name", $indent.$do_dump_indent, $reference);
            echo "$indent)<br>";
        }
        elseif(is_int($avar)) echo "$indent$var_name = <span style='color:#a2a2a2'>$type(".strlen($avar).")</span> $type_color$avar</span><br>";
        elseif(is_string($avar)) echo "$indent$var_name = <span style='color:#a2a2a2'>$type(".strlen($avar).")</span> $type_color\"$avar\"</span><br>";
        elseif(is_float($avar)) echo "$indent$var_name = <span style='color:#a2a2a2'>$type(".strlen($avar).")</span> $type_color$avar</span><br>";
        elseif(is_bool($avar)) echo "$indent$var_name = <span style='color:#a2a2a2'>$type(".strlen($avar).")</span> $type_color".($avar == 1 ? "TRUE":"FALSE")."</span><br>";
        elseif(is_null($avar)) echo "$indent$var_name = <span style='color:#a2a2a2'>$type(".strlen($avar).")</span> {$type_color}NULL</span><br>";
        else echo "$indent$var_name = <span style='color:#a2a2a2'>$type(".strlen($avar).")</span> $avar<br>";

        $var = $var[$keyvar];
    }
}


define('HDOM_TYPE_ELEMENT', 1);
define('HDOM_TYPE_COMMENT', 2);
define('HDOM_TYPE_TEXT',    3);
define('HDOM_TYPE_ENDTAG',  4);
define('HDOM_TYPE_ROOT',    5);
define('HDOM_TYPE_UNKNOWN', 6);
define('HDOM_QUOTE_DOUBLE', 0);
define('HDOM_QUOTE_SINGLE', 1);
define('HDOM_QUOTE_NO',     3);
define('HDOM_INFO_BEGIN',   0);
define('HDOM_INFO_END',     1);
define('HDOM_INFO_QUOTE',   2);
define('HDOM_INFO_SPACE',   3);
define('HDOM_INFO_TEXT',    4);
define('HDOM_INFO_INNER',   5);
define('HDOM_INFO_OUTER',   6);
define('HDOM_INFO_ENDSPACE',7);

// helper functions
// -----------------------------------------------------------------------------
// get html dom form file
function file_get_html() {
    $dom = new simple_html_dom;
    $args = func_get_args();
    $dom->load(call_user_func_array('file_get_contents', $args), true);
    return $dom;
}

// get html dom form string
function str_get_html($str, $lowercase=true) {
    $dom = new simple_html_dom;
    $dom->load($str, $lowercase);
    return $dom;
}

// dump html dom tree
function dump_html_tree($node, $show_attr=true, $deep=0) {
    $lead = str_repeat('    ', $deep);
    echo $lead.$node->tag;
    if ($show_attr && count($node->attr)>0) {
        echo '(';
        foreach($node->attr as $k=>$v)
            echo "[$k]=>\"".$node->$k.'", ';
        echo ')';
    }
    echo "\n";

    foreach($node->nodes as $c)
        dump_html_tree($c, $show_attr, $deep+1);
}

// get dom form file (deprecated)
function file_get_dom() {
    $dom = new simple_html_dom;
    $args = func_get_args();
    $dom->load(call_user_func_array('file_get_contents', $args), true);
    return $dom;
}

// get dom form string (deprecated)
function str_get_dom($str, $lowercase=true) {
    $dom = new simple_html_dom;
    $dom->load($str, $lowercase);
    return $dom;
}

// simple html dom node
// -----------------------------------------------------------------------------
class simple_html_dom_node {
    public $nodetype = HDOM_TYPE_TEXT;
    public $tag = 'text';
    public $attr = array();
    public $children = array();
    public $nodes = array();
    public $parent = null;
    public $_ = array();
    private $dom = null;

    function __construct($dom) {
        $this->dom = $dom;
        $dom->nodes[] = $this;
    }

    function __destruct() {
        $this->clear();
    }

    function __toString() {
        return $this->outertext();
    }

    // clean up memory due to php5 circular references memory leak...
    function clear() {
        $this->dom = null;
        $this->nodes = null;
        $this->parent = null;
        $this->children = null;
    }

    // dump node's tree
    function dump($show_attr=true) {
        dump_html_tree($this, $show_attr);
    }

    // returns the parent of node
    function parent() {
        return $this->parent;
    }

    // returns children of node
    function children($idx=-1) {
        if ($idx===-1) return $this->children;
        if (isset($this->children[$idx])) return $this->children[$idx];
        return null;
    }

    // returns the first child of node
    function first_child() {
        if (count($this->children)>0) return $this->children[0];
        return null;
    }

    // returns the last child of node
    function last_child() {
        if (($count=count($this->children))>0) return $this->children[$count-1];
        return null;
    }

    // returns the next sibling of node
    function next_sibling() {
        if ($this->parent===null) return null;
        $idx = 0;
        $count = count($this->parent->children);
        while ($idx<$count && $this!==$this->parent->children[$idx])
            ++$idx;
        if (++$idx>=$count) return null;
        return $this->parent->children[$idx];
    }

    // returns the previous sibling of node
    function prev_sibling() {
        if ($this->parent===null) return null;
        $idx = 0;
        $count = count($this->parent->children);
        while ($idx<$count && $this!==$this->parent->children[$idx])
            ++$idx;
        if (--$idx<0) return null;
        return $this->parent->children[$idx];
    }

    // get dom node's inner html
    function innertext() {
        if (isset($this->_[HDOM_INFO_INNER])) return $this->_[HDOM_INFO_INNER];
        if (isset($this->_[HDOM_INFO_TEXT])) return $this->dom->restore_noise($this->_[HDOM_INFO_TEXT]);

        $ret = '';
        foreach($this->nodes as $n)
            $ret .= $n->outertext();
        return $ret;
    }

    // get dom node's outer text (with tag)
    function outertext() {
        if ($this->tag==='root') return $this->innertext();

        // trigger callback
        if ($this->dom->callback!==null)
            call_user_func_array($this->dom->callback, array($this));

        if (isset($this->_[HDOM_INFO_OUTER])) return $this->_[HDOM_INFO_OUTER];
        if (isset($this->_[HDOM_INFO_TEXT])) return $this->dom->restore_noise($this->_[HDOM_INFO_TEXT]);

        // render begin tag
        $ret = $this->dom->nodes[$this->_[HDOM_INFO_BEGIN]]->makeup();

        // render inner text
        if (isset($this->_[HDOM_INFO_INNER]))
            $ret .= $this->_[HDOM_INFO_INNER];
        else {
            foreach($this->nodes as $n)
                $ret .= $n->outertext();
        }

        // render end tag
        if(isset($this->_[HDOM_INFO_END]) && $this->_[HDOM_INFO_END]!=0)
            $ret .= '</'.$this->tag.'>';
        return $ret;
    }

    // get dom node's plain text
    function text() {
        if (isset($this->_[HDOM_INFO_INNER])) return $this->_[HDOM_INFO_INNER];
        switch ($this->nodetype) {
            case HDOM_TYPE_TEXT: return $this->dom->restore_noise($this->_[HDOM_INFO_TEXT]);
            case HDOM_TYPE_COMMENT: return '';
            case HDOM_TYPE_UNKNOWN: return '';
        }
        if (strcasecmp($this->tag, 'script')===0) return '';
        if (strcasecmp($this->tag, 'style')===0) return '';

        $ret = '';
        foreach($this->nodes as $n)
            $ret .= $n->text();
        return $ret;
    }

    function xmltext() {
        $ret = $this->innertext();
        $ret = str_ireplace('<![CDATA[', '', $ret);
        $ret = str_replace(']]>', '', $ret);
        return $ret;
    }

    // build node's text with tag
    function makeup() {
        // text, comment, unknown
        if (isset($this->_[HDOM_INFO_TEXT])) return $this->dom->restore_noise($this->_[HDOM_INFO_TEXT]);

        $ret = '<'.$this->tag;
        $i = -1;

        foreach($this->attr as $key=>$val) {
            ++$i;

            // skip removed attribute
            if ($val===null || $val===false)
                continue;

            $ret .= $this->_[HDOM_INFO_SPACE][$i][0];
            //no value attr: nowrap, checked selected...
            if ($val===true)
                $ret .= $key;
            else {
                switch($this->_[HDOM_INFO_QUOTE][$i]) {
                    case HDOM_QUOTE_DOUBLE: $quote = '"'; break;
                    case HDOM_QUOTE_SINGLE: $quote = '\''; break;
                    default: $quote = '';
                }
                $ret .= $key.$this->_[HDOM_INFO_SPACE][$i][1].'='.$this->_[HDOM_INFO_SPACE][$i][2].$quote.$val.$quote;
            }
        }
        $ret = $this->dom->restore_noise($ret);
        return $ret . $this->_[HDOM_INFO_ENDSPACE] . '>';
    }

    // find elements by css selector
    function find($selector, $idx=null) {
        $selectors = $this->parse_selector($selector);
        if (($count=count($selectors))===0) return array();
        $found_keys = array();

        // find each selector
        for ($c=0; $c<$count; ++$c) {
            if (($levle=count($selectors[0]))===0) return array();
            if (!isset($this->_[HDOM_INFO_BEGIN])) return array();

            $head = array($this->_[HDOM_INFO_BEGIN]=>1);

            // handle descendant selectors, no recursive!
            for ($l=0; $l<$levle; ++$l) {
                $ret = array();
                foreach($head as $k=>$v) {
                    $n = ($k===-1) ? $this->dom->root : $this->dom->nodes[$k];
                    $n->seek($selectors[$c][$l], $ret);
                }
                $head = $ret;
            }

            foreach($head as $k=>$v) {
                if (!isset($found_keys[$k]))
                    $found_keys[$k] = 1;
            }
        }

        // sort keys
        ksort($found_keys);

        $found = array();
        foreach($found_keys as $k=>$v)
            $found[] = $this->dom->nodes[$k];

        // return nth-element or array
        if (is_null($idx)) return $found;
		else if ($idx<0) $idx = count($found) + $idx;
        return (isset($found[$idx])) ? $found[$idx] : null;
    }

    // seek for given conditions
    protected function seek($selector, &$ret) {
        list($tag, $key, $val, $exp, $no_key) = $selector;

        // xpath index
        if ($tag && $key && is_numeric($key)) {
            $count = 0;
            foreach ($this->children as $c) {
                if ($tag==='*' || $tag===$c->tag) {
                    if (++$count==$key) {
                        $ret[$c->_[HDOM_INFO_BEGIN]] = 1;
                        return;
                    }
                }
            }
            return;
        }

        $end = (!empty($this->_[HDOM_INFO_END])) ? $this->_[HDOM_INFO_END] : 0;
        if ($end==0) {
            $parent = $this->parent;
            while (!isset($parent->_[HDOM_INFO_END]) && $parent!==null) {
                $end -= 1;
                $parent = $parent->parent;
            }
            $end += $parent->_[HDOM_INFO_END];
        }

        for($i=$this->_[HDOM_INFO_BEGIN]+1; $i<$end; ++$i) {
            $node = $this->dom->nodes[$i];
            $pass = true;

            if ($tag==='*' && !$key) {
                if (in_array($node, $this->children, true))
                    $ret[$i] = 1;
                continue;
            }

            // compare tag
            if ($tag && $tag!=$node->tag && $tag!=='*') {$pass=false;}
            // compare key
            if ($pass && $key) {
                if ($no_key) {
                    if (isset($node->attr[$key])) $pass=false;
                }
                else if (!isset($node->attr[$key])) $pass=false;
            }
            // compare value
            if ($pass && $key && $val  && $val!=='*') {
                $check = $this->match($exp, $val, $node->attr[$key]);
                // handle multiple class
                if (!$check && strcasecmp($key, 'class')===0) {
                    foreach(explode(' ',$node->attr[$key]) as $k) {
                        $check = $this->match($exp, $val, $k);
                        if ($check) break;
                    }
                }
                if (!$check) $pass = false;
            }
            if ($pass) $ret[$i] = 1;
            unset($node);
        }
    }

    protected function match($exp, $pattern, $value) {
        switch ($exp) {
            case '=':
                return ($value===$pattern);
            case '!=':
                return ($value!==$pattern);
            case '^=':
                return preg_match("/^".preg_quote($pattern,'/')."/", $value);
            case '$=':
                return preg_match("/".preg_quote($pattern,'/')."$/", $value);
            case '*=':
                if ($pattern[0]=='/')
                    return preg_match($pattern, $value);
                return preg_match("/".$pattern."/i", $value);
        }
        return false;
    }

    protected function parse_selector($selector_string) {
        // pattern of CSS selectors, modified from mootools
        $pattern = "/([\w-:\*]*)(?:\#([\w-]+)|\.([\w-]+))?(?:\[@?(!?[\w-]+)(?:([!*^$]?=)[\"']?(.*?)[\"']?)?\])?([\/, ]+)/is";
        preg_match_all($pattern, trim($selector_string).' ', $matches, PREG_SET_ORDER);
        $selectors = array();
        $result = array();
        //print_r($matches);

        foreach ($matches as $m) {
            $m[0] = trim($m[0]);
            if ($m[0]==='' || $m[0]==='/' || $m[0]==='//') continue;
            // for borwser grnreated xpath
            if ($m[1]==='tbody') continue;

            list($tag, $key, $val, $exp, $no_key) = array($m[1], null, null, '=', false);
            if(!empty($m[2])) {$key='id'; $val=$m[2];}
            if(!empty($m[3])) {$key='class'; $val=$m[3];}
            if(!empty($m[4])) {$key=$m[4];}
            if(!empty($m[5])) {$exp=$m[5];}
            if(!empty($m[6])) {$val=$m[6];}

            // convert to lowercase
            if ($this->dom->lowercase) {$tag=strtolower($tag); $key=strtolower($key);}
            //elements that do NOT have the specified attribute
            if (isset($key[0]) && $key[0]==='!') {$key=substr($key, 1); $no_key=true;}

            $result[] = array($tag, $key, $val, $exp, $no_key);
            if (trim($m[7])===',') {
                $selectors[] = $result;
                $result = array();
            }
        }
        if (count($result)>0)
            $selectors[] = $result;
        return $selectors;
    }

    function __get($name) {
        if (isset($this->attr[$name])) return $this->attr[$name];
        switch($name) {
            case 'outertext': return $this->outertext();
            case 'innertext': return $this->innertext();
            case 'plaintext': return $this->text();
            case 'xmltext': return $this->xmltext();
            default: return array_key_exists($name, $this->attr);
        }
    }

    function __set($name, $value) {
        switch($name) {
            case 'outertext': return $this->_[HDOM_INFO_OUTER] = $value;
            case 'innertext':
                if (isset($this->_[HDOM_INFO_TEXT])) return $this->_[HDOM_INFO_TEXT] = $value;
                return $this->_[HDOM_INFO_INNER] = $value;
        }
        if (!isset($this->attr[$name])) {
            $this->_[HDOM_INFO_SPACE][] = array(' ', '', '');
            $this->_[HDOM_INFO_QUOTE][] = HDOM_QUOTE_DOUBLE;
        }
        $this->attr[$name] = $value;
    }

    function __isset($name) {
        switch($name) {
            case 'outertext': return true;
            case 'innertext': return true;
            case 'plaintext': return true;
        }
        //no value attr: nowrap, checked selected...
        return (array_key_exists($name, $this->attr)) ? true : isset($this->attr[$name]);
    }

    function __unset($name) {
        if (isset($this->attr[$name]))
            unset($this->attr[$name]);
    }

    // camel naming conventions
    function getAllAttributes() {return $this->attr;}
    function getAttribute($name) {return $this->__get($name);}
    function setAttribute($name, $value) {$this->__set($name, $value);}
    function hasAttribute($name) {return $this->__isset($name);}
    function removeAttribute($name) {$this->__set($name, null);}
    function getElementById($id) {return $this->find("#$id", 0);}
    function getElementsById($id, $idx=null) {return $this->find("#$id", $idx);}
    function getElementByTagName($name) {return $this->find($name, 0);}
    function getElementsByTagName($name, $idx=null) {return $this->find($name, $idx);}
    function parentNode() {return $this->parent();}
    function childNodes($idx=-1) {return $this->children($idx);}
    function firstChild() {return $this->first_child();}
    function lastChild() {return $this->last_child();}
    function nextSibling() {return $this->next_sibling();}
    function previousSibling() {return $this->prev_sibling();}
}

// simple html dom parser
// -----------------------------------------------------------------------------
class simple_html_dom {
    public $root = null;
    public $nodes = array();
    public $callback = null;
    public $lowercase = false;
    protected $pos;
    protected $doc;
    protected $char;
    protected $size;
    protected $cursor;
    protected $parent;
    protected $noise = array();
    protected $token_blank = " \t\r\n";
    protected $token_equal = ' =/>';
    protected $token_slash = " />\r\n\t";
    protected $token_attr = ' >';
    // use isset instead of in_array, performance boost about 30%...
    protected $self_closing_tags = array('img'=>1, 'br'=>1, 'input'=>1, 'meta'=>1, 'link'=>1, 'hr'=>1, 'base'=>1, 'embed'=>1, 'spacer'=>1);
    protected $block_tags = array('root'=>1, 'body'=>1, 'form'=>1, 'div'=>1, 'span'=>1, 'table'=>1);
    protected $optional_closing_tags = array(
        'tr'=>array('tr'=>1, 'td'=>1, 'th'=>1),
        'th'=>array('th'=>1),
        'td'=>array('td'=>1),
        'li'=>array('li'=>1),
        'dt'=>array('dt'=>1, 'dd'=>1),
        'dd'=>array('dd'=>1, 'dt'=>1),
        'dl'=>array('dd'=>1, 'dt'=>1),
        'p'=>array('p'=>1),
        'nobr'=>array('nobr'=>1),
    );

    function __construct($str=null) {
        if ($str) {
            if (preg_match("/^http:\/\//i",$str) || is_file($str))
                $this->load_file($str);
            else
                $this->load($str);
        }
    }

    function __destruct() {
        $this->clear();
    }

    // load html from string
    function load($str, $lowercase=true) {
        // prepare
        $this->prepare($str, $lowercase);
        // strip out comments
        $this->remove_noise("'<!--(.*?)-->'is");
        // strip out cdata
        $this->remove_noise("'<!\[CDATA\[(.*?)\]\]>'is", true);
        // strip out <style> tags
        $this->remove_noise("'<\s*style[^>]*[^/]>(.*?)<\s*/\s*style\s*>'is");
        $this->remove_noise("'<\s*style\s*>(.*?)<\s*/\s*style\s*>'is");
        // strip out <script> tags
        $this->remove_noise("'<\s*script[^>]*[^/]>(.*?)<\s*/\s*script\s*>'is");
        $this->remove_noise("'<\s*script\s*>(.*?)<\s*/\s*script\s*>'is");
        // strip out preformatted tags
        $this->remove_noise("'<\s*(?:code)[^>]*>(.*?)<\s*/\s*(?:code)\s*>'is");
        // strip out server side scripts
        $this->remove_noise("'(<\?)(.*?)(\?>)'s", true);
        // strip smarty scripts
        $this->remove_noise("'(\{\w)(.*?)(\})'s", true);

        // parsing
        while ($this->parse());
        // end
        $this->root->_[HDOM_INFO_END] = $this->cursor;
    }

    // load html from file
    function load_file() {
        $args = func_get_args();
        $this->load(call_user_func_array('file_get_contents', $args), true);
    }

    // set callback function
    function set_callback($function_name) {
        $this->callback = $function_name;
    }

    // remove callback function
    function remove_callback() {
        $this->callback = null;
    }

    // save dom as string
    function save($filepath='') {
        $ret = $this->root->innertext();
        if ($filepath!=='') file_put_contents($filepath, $ret);
        return $ret;
    }

    // find dom node by css selector
    function find($selector, $idx=null) {
        return $this->root->find($selector, $idx);
    }

    // clean up memory due to php5 circular references memory leak...
    function clear() {
        foreach($this->nodes as $n) {$n->clear(); $n = null;}
        if (isset($this->parent)) {$this->parent->clear(); unset($this->parent);}
        if (isset($this->root)) {$this->root->clear(); unset($this->root);}
        unset($this->doc);
        unset($this->noise);
    }

    function dump($show_attr=true) {
        $this->root->dump($show_attr);
    }

    // prepare HTML data and init everything
    protected function prepare($str, $lowercase=true) {
        $this->clear();
        $this->doc = $str;
        $this->pos = 0;
        $this->cursor = 1;
        $this->noise = array();
        $this->nodes = array();
        $this->lowercase = $lowercase;
        $this->root = new simple_html_dom_node($this);
        $this->root->tag = 'root';
        $this->root->_[HDOM_INFO_BEGIN] = -1;
        $this->root->nodetype = HDOM_TYPE_ROOT;
        $this->parent = $this->root;
        // set the length of content
        $this->size = strlen($str);
        if ($this->size>0) $this->char = $this->doc[0];
    }

    // parse html content
    protected function parse() {
        if (($s = $this->copy_until_char('<'))==='')
            return $this->read_tag();

        // text
        $node = new simple_html_dom_node($this);
        ++$this->cursor;
        $node->_[HDOM_INFO_TEXT] = $s;
        $this->link_nodes($node, false);
        return true;
    }

    // read tag info
    protected function read_tag() {
        if ($this->char!=='<') {
            $this->root->_[HDOM_INFO_END] = $this->cursor;
            return false;
        }
        $begin_tag_pos = $this->pos;
        $this->char = (++$this->pos<$this->size) ? $this->doc[$this->pos] : null; // next

        // end tag
        if ($this->char==='/') {
            $this->char = (++$this->pos<$this->size) ? $this->doc[$this->pos] : null; // next
            $this->skip($this->token_blank_t);
            $tag = $this->copy_until_char('>');

            // skip attributes in end tag
            if (($pos = strpos($tag, ' '))!==false)
                $tag = substr($tag, 0, $pos);

            $parent_lower = strtolower($this->parent->tag);
            $tag_lower = strtolower($tag);

            if ($parent_lower!==$tag_lower) {
                if (isset($this->optional_closing_tags[$parent_lower]) && isset($this->block_tags[$tag_lower])) {
                    $this->parent->_[HDOM_INFO_END] = 0;
                    $org_parent = $this->parent;

                    while (($this->parent->parent) && strtolower($this->parent->tag)!==$tag_lower)
                        $this->parent = $this->parent->parent;

                    if (strtolower($this->parent->tag)!==$tag_lower) {
                        $this->parent = $org_parent; // restore origonal parent
                        if ($this->parent->parent) $this->parent = $this->parent->parent;
                        $this->parent->_[HDOM_INFO_END] = $this->cursor;
                        return $this->as_text_node($tag);
                    }
                }
                else if (($this->parent->parent) && isset($this->block_tags[$tag_lower])) {
                    $this->parent->_[HDOM_INFO_END] = 0;
                    $org_parent = $this->parent;

                    while (($this->parent->parent) && strtolower($this->parent->tag)!==$tag_lower)
                        $this->parent = $this->parent->parent;

                    if (strtolower($this->parent->tag)!==$tag_lower) {
                        $this->parent = $org_parent; // restore origonal parent
                        $this->parent->_[HDOM_INFO_END] = $this->cursor;
                        return $this->as_text_node($tag);
                    }
                }
                else if (($this->parent->parent) && strtolower($this->parent->parent->tag)===$tag_lower) {
                    $this->parent->_[HDOM_INFO_END] = 0;
                    $this->parent = $this->parent->parent;
                }
                else
                    return $this->as_text_node($tag);
            }

            $this->parent->_[HDOM_INFO_END] = $this->cursor;
            if ($this->parent->parent) $this->parent = $this->parent->parent;

            $this->char = (++$this->pos<$this->size) ? $this->doc[$this->pos] : null; // next
            return true;
        }

        $node = new simple_html_dom_node($this);
        $node->_[HDOM_INFO_BEGIN] = $this->cursor;
        ++$this->cursor;
        $tag = $this->copy_until($this->token_slash);

        // doctype, cdata & comments...
        if (isset($tag[0]) && $tag[0]==='!') {
            $node->_[HDOM_INFO_TEXT] = '<' . $tag . $this->copy_until_char('>');

            if (isset($tag[2]) && $tag[1]==='-' && $tag[2]==='-') {
                $node->nodetype = HDOM_TYPE_COMMENT;
                $node->tag = 'comment';
            } else {
                $node->nodetype = HDOM_TYPE_UNKNOWN;
                $node->tag = 'unknown';
            }

            if ($this->char==='>') $node->_[HDOM_INFO_TEXT].='>';
            $this->link_nodes($node, true);
            $this->char = (++$this->pos<$this->size) ? $this->doc[$this->pos] : null; // next
            return true;
        }

        // text
        if ($pos=strpos($tag, '<')!==false) {
            $tag = '<' . substr($tag, 0, -1);
            $node->_[HDOM_INFO_TEXT] = $tag;
            $this->link_nodes($node, false);
            $this->char = $this->doc[--$this->pos]; // prev
            return true;
        }

        if (!preg_match("/^[\w-:]+$/", $tag)) {
            $node->_[HDOM_INFO_TEXT] = '<' . $tag . $this->copy_until('<>');
            if ($this->char==='<') {
                $this->link_nodes($node, false);
                return true;
            }

            if ($this->char==='>') $node->_[HDOM_INFO_TEXT].='>';
            $this->link_nodes($node, false);
            $this->char = (++$this->pos<$this->size) ? $this->doc[$this->pos] : null; // next
            return true;
        }

        // begin tag
        $node->nodetype = HDOM_TYPE_ELEMENT;
        $tag_lower = strtolower($tag);
        $node->tag = ($this->lowercase) ? $tag_lower : $tag;

        // handle optional closing tags
        if (isset($this->optional_closing_tags[$tag_lower]) ) {
            while (isset($this->optional_closing_tags[$tag_lower][strtolower($this->parent->tag)])) {
                $this->parent->_[HDOM_INFO_END] = 0;
                $this->parent = $this->parent->parent;
            }
            $node->parent = $this->parent;
        }

        $guard = 0; // prevent infinity loop
        $space = array($this->copy_skip($this->token_blank), '', '');

        // attributes
        do {
            if ($this->char!==null && $space[0]==='') break;
            $name = $this->copy_until($this->token_equal);
            if($guard===$this->pos) {
                $this->char = (++$this->pos<$this->size) ? $this->doc[$this->pos] : null; // next
                continue;
            }
            $guard = $this->pos;

            // handle endless '<'
            if($this->pos>=$this->size-1 && $this->char!=='>') {
                $node->nodetype = HDOM_TYPE_TEXT;
                $node->_[HDOM_INFO_END] = 0;
                $node->_[HDOM_INFO_TEXT] = '<'.$tag . $space[0] . $name;
                $node->tag = 'text';
                $this->link_nodes($node, false);
                return true;
            }

            // handle mismatch '<'
            if($this->doc[$this->pos-1]=='<') {
                $node->nodetype = HDOM_TYPE_TEXT;
                $node->tag = 'text';
                $node->attr = array();
                $node->_[HDOM_INFO_END] = 0;
                $node->_[HDOM_INFO_TEXT] = substr($this->doc, $begin_tag_pos, $this->pos-$begin_tag_pos-1);
                $this->pos -= 2;
                $this->char = (++$this->pos<$this->size) ? $this->doc[$this->pos] : null; // next
                $this->link_nodes($node, false);
                return true;
            }

            if ($name!=='/' && $name!=='') {
                $space[1] = $this->copy_skip($this->token_blank);
                $name = $this->restore_noise($name);
                if ($this->lowercase) $name = strtolower($name);
                if ($this->char==='=') {
                    $this->char = (++$this->pos<$this->size) ? $this->doc[$this->pos] : null; // next
                    $this->parse_attr($node, $name, $space);
                }
                else {
                    //no value attr: nowrap, checked selected...
                    $node->_[HDOM_INFO_QUOTE][] = HDOM_QUOTE_NO;
                    $node->attr[$name] = true;
                    if ($this->char!='>') $this->char = $this->doc[--$this->pos]; // prev
                }
                $node->_[HDOM_INFO_SPACE][] = $space;
                $space = array($this->copy_skip($this->token_blank), '', '');
            }
            else
                break;
        } while($this->char!=='>' && $this->char!=='/');

        $this->link_nodes($node, true);
        $node->_[HDOM_INFO_ENDSPACE] = $space[0];

        // check self closing
        if ($this->copy_until_char_escape('>')==='/') {
            $node->_[HDOM_INFO_ENDSPACE] .= '/';
            $node->_[HDOM_INFO_END] = 0;
        }
        else {
            // reset parent
            if (!isset($this->self_closing_tags[strtolower($node->tag)])) $this->parent = $node;
        }
        $this->char = (++$this->pos<$this->size) ? $this->doc[$this->pos] : null; // next
        return true;
    }

    // parse attributes
    protected function parse_attr($node, $name, &$space) {
        $space[2] = $this->copy_skip($this->token_blank);
        switch($this->char) {
            case '"':
                $node->_[HDOM_INFO_QUOTE][] = HDOM_QUOTE_DOUBLE;
                $this->char = (++$this->pos<$this->size) ? $this->doc[$this->pos] : null; // next
                $node->attr[$name] = $this->restore_noise($this->copy_until_char_escape('"'));
                $this->char = (++$this->pos<$this->size) ? $this->doc[$this->pos] : null; // next
                break;
            case '\'':
                $node->_[HDOM_INFO_QUOTE][] = HDOM_QUOTE_SINGLE;
                $this->char = (++$this->pos<$this->size) ? $this->doc[$this->pos] : null; // next
                $node->attr[$name] = $this->restore_noise($this->copy_until_char_escape('\''));
                $this->char = (++$this->pos<$this->size) ? $this->doc[$this->pos] : null; // next
                break;
            default:
                $node->_[HDOM_INFO_QUOTE][] = HDOM_QUOTE_NO;
                $node->attr[$name] = $this->restore_noise($this->copy_until($this->token_attr));
        }
    }

    // link node's parent
    protected function link_nodes(&$node, $is_child) {
        $node->parent = $this->parent;
        $this->parent->nodes[] = $node;
        if ($is_child)
            $this->parent->children[] = $node;
    }

    // as a text node
    protected function as_text_node($tag) {
        $node = new simple_html_dom_node($this);
        ++$this->cursor;
        $node->_[HDOM_INFO_TEXT] = '</' . $tag . '>';
        $this->link_nodes($node, false);
        $this->char = (++$this->pos<$this->size) ? $this->doc[$this->pos] : null; // next
        return true;
    }

    protected function skip($chars) {
        $this->pos += strspn($this->doc, $chars, $this->pos);
        $this->char = ($this->pos<$this->size) ? $this->doc[$this->pos] : null; // next
    }

    protected function copy_skip($chars) {
        $pos = $this->pos;
        $len = strspn($this->doc, $chars, $pos);
        $this->pos += $len;
        $this->char = ($this->pos<$this->size) ? $this->doc[$this->pos] : null; // next
        if ($len===0) return '';
        return substr($this->doc, $pos, $len);
    }

    protected function copy_until($chars) {
        $pos = $this->pos;
        $len = strcspn($this->doc, $chars, $pos);
        $this->pos += $len;
        $this->char = ($this->pos<$this->size) ? $this->doc[$this->pos] : null; // next
        return substr($this->doc, $pos, $len);
    }

    protected function copy_until_char($char) {
        if ($this->char===null) return '';

        if (($pos = strpos($this->doc, $char, $this->pos))===false) {
            $ret = substr($this->doc, $this->pos, $this->size-$this->pos);
            $this->char = null;
            $this->pos = $this->size;
            return $ret;
        }

        if ($pos===$this->pos) return '';
        $pos_old = $this->pos;
        $this->char = $this->doc[$pos];
        $this->pos = $pos;
        return substr($this->doc, $pos_old, $pos-$pos_old);
    }

    protected function copy_until_char_escape($char) {
        if ($this->char===null) return '';

        $start = $this->pos;
        while(1) {
            if (($pos = strpos($this->doc, $char, $start))===false) {
                $ret = substr($this->doc, $this->pos, $this->size-$this->pos);
                $this->char = null;
                $this->pos = $this->size;
                return $ret;
            }

            if ($pos===$this->pos) return '';

            if ($this->doc[$pos-1]==='\\') {
                $start = $pos+1;
                continue;
            }

            $pos_old = $this->pos;
            $this->char = $this->doc[$pos];
            $this->pos = $pos;
            return substr($this->doc, $pos_old, $pos-$pos_old);
        }
    }

    // remove noise from html content
    protected function remove_noise($pattern, $remove_tag=false) {
        $count = preg_match_all($pattern, $this->doc, $matches, PREG_SET_ORDER|PREG_OFFSET_CAPTURE);

        for ($i=$count-1; $i>-1; --$i) {
            $key = '___noise___'.sprintf('% 3d', count($this->noise)+100);
            $idx = ($remove_tag) ? 0 : 1;
            $this->noise[$key] = $matches[$i][$idx][0];
            $this->doc = substr_replace($this->doc, $key, $matches[$i][$idx][1], strlen($matches[$i][$idx][0]));
        }

        // reset the length of content
        $this->size = strlen($this->doc);
        if ($this->size>0) $this->char = $this->doc[0];
    }

    // restore noise to html content
    function restore_noise($text) {
        while(($pos=strpos($text, '___noise___'))!==false) {
            $key = '___noise___'.$text[$pos+11].$text[$pos+12].$text[$pos+13];
            if (isset($this->noise[$key]))
                $text = substr($text, 0, $pos).$this->noise[$key].substr($text, $pos+14);
        }
        return $text;
    }

    function __toString() {
        return $this->root->innertext();
    }

    function __get($name) {
        switch($name) {
            case 'outertext': return $this->root->innertext();
            case 'innertext': return $this->root->innertext();
            case 'plaintext': return $this->root->text();
        }
    }

    // camel naming conventions
    function childNodes($idx=-1) {return $this->root->childNodes($idx);}
    function firstChild() {return $this->root->first_child();}
    function lastChild() {return $this->root->last_child();}
    function getElementById($id) {return $this->find("#$id", 0);}
    function getElementsById($id, $idx=null) {return $this->find("#$id", $idx);}
    function getElementByTagName($name) {return $this->find($name, 0);}
    function getElementsByTagName($name, $idx=-1) {return $this->find($name, $idx);}
    function loadFile() {$args = func_get_args();$this->load(call_user_func_array('file_get_contents', $args), true);}
}


class My_Db implements Countable, Iterator
{

    protected $_link = null;

    protected $_query = null;

    protected $_result = null;

    protected $_count = 0;

    protected $_lastInsertId = 0;

    protected $_lastFetch = array();

    protected $_cursor = 0;

    protected $_valid = false;

    private static $_instance = null;

    public function __construct($link = null)
    {
        if ($link == null) {
            if (self::$_instance == null) die('Chyba, prvni instance musi dostat parametr link!');
            $link = Db::getInstance()->getLink();
        }
        $this->_link = $link;
        if (self::$_instance == null) self::$_instance = $this;
    }

    protected function getLink()
    {
        return $this->_link;
    }

    /**
    * @desc Returns first instance
    */

    public static function getInstance()
    {
        return self::$_instance;
    }


    public function setDb($dbName)
    {
        mysql_select_db($dbName, $this->_link) or die("<b>Chyba:</b> ".__FILE__.":".__LINE__."<br />".mysql_error()."<br />\$query='".$query."'" .debug_print_backtrace());
    }

    /**
    *
    * @param string $query
    * @return Db
    */
    public function query($query)
    {
        $this->_query = quote_smart($query);
        //echo $query;
        $this->_result = mysql_query($query, $this->_link) or die("<b>Chyba:</b> ".__FILE__.":".__LINE__."<br />".mysql_error()."<br />\$query='".$query."'");
        if (is_resource($this->_result)) {
            $this->_count = mysql_num_rows($this->_result);
        } else {
            $this->_count = mysql_affected_rows($this->_link);
        }
        $this->_lastInsertId = mysql_insert_id($this->_link);
        $this->_valid = true;
        $this->_cursor = 0;
        return clone $this;
    }

    public function fetch()
    {
        if (is_resource($this->_result) and $this->_valid) {
            $this->_lastFetch = mysql_fetch_assoc($this->_result) or $this->_valid = false;
            $this->_cursor++;
        } else {
            $this->_valid = $this->_lastFetch = false;
        }
        return $this->_lastFetch;
    }

    public function fetchColumn($column = 0)
    {
        if (is_resource($this->_result)) {
            $this->_lastFetch = mysql_fetch_row($this->_result) or $this->_valid = false;
            $this->_cursor++;
        } else {
            $this->_valid = $this->_lastFetch = false;
        }
        return $this->_lastFetch[$column];
    }

    public function getLastInsertId()
    {
        return $this->_lastInsertId;
    }

    public function count()
    {
        return $this->_count;
    }

    public function current()
    {
        return $this->_lastFetch;
    }

    public function key()
    {
        return $this->_cursor;
    }

    public function next()
    {
        return $this->fetch();
    }

    public function rewind()
    {
        if ($this->_cursor > 0) {
            $this->query($this->_query);
        }
        $this->fetch();
    }

    public function valid()
    {
        return $this->_valid;
    }

    public function fetchAll()
    {
        $result = array();

        foreach($this as $r)
        {
            $result[] = $r;
        }

        return $result;
    }
}

class My_Db_Table
{
    protected $_name = null;

    protected $_indexingBy = 'id';

    public static function factory($tableName = null)
    {
        return new Db_Table($tableName);
    }

    protected function __construct($tableName = null)
    {
        if (!is_null($tableName)) $this->_name = $tableName;
        $this->init();
    }

    public function init()
    {
    }

    public function getData()
    {
        $data = array();
        $db = Db::getInstance();
        foreach($db->query("SELECT * FROM {$this->_name} LIMIT 10000") as $polozka) {
            if (!is_null($this->_indexingBy)) {
                $data[$polozka[$this->_indexingBy]] = $polozka;
            } else {
                $data[] = $polozka;
            }
        }
        return $data;
    }

    public function getFirstRow()
    {
        $db = Db::getInstance();
        return $db->query("SELECT * FROM {$this->_name} LIMIT 1")->fetch();
    }

    public function setIndexing($index) {
        $this->_indexingBy = $index;
        return $this;
    }
}

function quote_smart($value)
{
    $value = str_replace('\r', '', $value);
    $value = str_replace('\n', '', $value);
    // Stripslashes
    if (get_magic_quotes_gpc()) {
        $value = stripslashes($value);
    }
    // Quote if not a number or a numeric string
    if (!is_numeric($value)) {
        $value = "'" . mysql_real_escape_string($value) . "'";
    }
    return $value;
}


     class KLogger
    {

        const DEBUG     = 1;    // Most Verbose
        const INFO         = 2;    // ...
        const ORDER         = 3;    // ...
        const HTML     = 4;    // ...
        const CRON     = 5;    // Least Verbose
        const OFF         = 6;    // Nothing at all.

        const LOG_OPEN         = 1;
        const OPEN_FAILED     = 2;
        const LOG_CLOSED     = 3;

        /* Public members: Not so much of an example of encapsulation, but that's okay. */
        public $Log_Status     = KLogger::LOG_CLOSED;
        public $DateFormat    = "Y-m-d H:i:s";
        public $MessageQueue;
        public $VendorID;

        private $log_file;
        private $priority = KLogger::INFO;

        private $file_handle;

        private $count_total = 0;
        private $count_tmp   = 0;

        public function __construct( $filepath , $VendorID )
        {
        	$priority = 5 ;
        	$this->VendorID = $VendorID;
            if ( $priority == KLogger::OFF ) return;

            $this->log_file = $filepath;
            $this->MessageQueue = array();
            $this->priority = $priority;

            if ( file_exists( $this->log_file ) )
            {
                if ( !is_writable($this->log_file) )
                {
                    $this->Log_Status = KLogger::OPEN_FAILED;
                    $this->MessageQueue[] = "The file exists, but could not be opened for writing. Check that appropriate permissions have been set.";
                    return;
                }
            }

            if ( $this->file_handle = fopen( $this->log_file , "a" ) )
            {
                $this->Log_Status = KLogger::LOG_OPEN;
                $this->MessageQueue[] = "The log file was opened successfully.";
            }
            else
            {
                $this->Log_Status = KLogger::OPEN_FAILED;
                $this->MessageQueue[] = "The file could not be opened. Check permissions.";
            }

            return;
        }

        public function __destruct()
        {
            if ( $this->file_handle )
                fclose( $this->file_handle );
        }


        public function counterReset() {
			$this->count_total = 0;
        	$this->count_tmp = 0;
        	$this->counter_start = ImpLib::gt();
        }

        public function counter($step) {
        	$this->count_total++;
        	$this->count_tmp++;
		    if ($this->count_tmp >= $step) {
        		$this->count_tmp = 0;
        		$this->LogCron("        #{$this->count_total} | MEM: ".ImpLib::convert(memory_get_usage(true)) ." | Peak: " . ImpLib::convert(memory_get_peak_usage(true)). " | time=". ImpLib::grt($this->counter_start));
            	$this->counter_start = ImpLib::gt();
		    }
        }

        public function LogInfo($line)
        {
            $this->Log( $line , KLogger::INFO );
        }

        public function LogDebug($line)
        {
            $this->Log( $line , KLogger::DEBUG );
        }

        public function LogOrder($line)
        {
            $this->Log( $line , KLogger::ORDER );
        }

        public function LogHTML($line)
        {
            $this->Log( $line , KLogger::HTML );
        }

        public function LogCron($line)
        {
            $this->Log( $line , KLogger::CRON );
        }

        public function Log($line, $priority)
        {
            if ( $this->priority <= $priority )
            {
                $status = $this->getTimeLine( $priority );
                $this->WriteFreeFormLine ( "$status $line \n" );
            }
        }

        public function WriteFreeFormLine( $line )
        {
            if ( $this->Log_Status == KLogger::LOG_OPEN && $this->priority != KLogger::OFF )
            {
                if (fwrite( $this->file_handle , $line ) === false) {
                    $this->MessageQueue[] = "The file could not be written to. Check that appropriate permissions have been set.";
                }
            }
        }

        private function getTimeLine( $level )
        {
            $time = @date( $this->DateFormat );

            switch( $level )
            {
                case KLogger::INFO:
                    return "$time - INFO  -->";
                case KLogger::ORDER:
                    return "$time - ORDER  -->";
                case KLogger::DEBUG:
                    return "$time - DEBUG -->";
                case KLogger::HTML:
                    return "$time";
                case KLogger::CRON:
                    return "$time - ".$this->VendorID." -->";
                default:
                    return "$time - LOG   -->";
            }
        }

    }


    class CSVHandler {
    var $Separator;        //
    var $DataFile;
    var $DataKey;
    var $HeaderData;    //
    var $ItemsList;    //
    var $Items_Count;
    var $color;

// Standard User functions
    function CSVHandler($Filename, $Separator, $KeyFieldName) {        //Constructor
        $this->DataFile=$Filename;
        $this->DataKey=$KeyFieldName;
        $this->Separator=$Separator;
        $this->color="#FFFFFF";
    }
    function ReadCSV() {            //read data into this->ItemsList and return it in an array
        $this->Items_Count=0;
        $this->ItemsList=array();
        $Item=array();
        $fp = fopen ($this->DataFile,"r");
        $this->HeaderData = fgetcsv ($fp, 4000, $this->Separator);
        while ($DataLine = fgetcsv ($fp, 4000, $this->Separator)) {
            $Item = $DataLine;
            array_push($this->ItemsList,$Item);
            $this->Items_Count++;
        }
        fclose($fp);
        return ($this->ItemsList);
    }
    function Select($needle,$column="all")    {            //get items in a sort of SQL Select query and return them in an array
        $this->ReadCSV();
        if($needle=="*") {
            $result=$this->ItemsList;
        } else {
            $result=array();
            if($column=="all") {
                while(list($key,$line)=each($this->ItemsList)) {
                     if (stristr(implode("",$line),$needle)) array_push($result,$line);
                }
            } else {
                while(list($key,$line)=each($this->ItemsList)) {
                     if (stristr($line[$column],$needle)) array_push($result,$line);
                }
            }
        }
        return ($result);
    }
    function ListAll() {                    //prints a list of all Data
        $Data=$this->ReadCSV();
        reset ($this->ItemsList);
        reset ($this->HeaderData);
        $HHeaders="";
        $HData="";
        while(list($HKey,$HVal)=each($this->HeaderData)) {            //Create Headers Line
            $HHeaders.=$this->HTTD($HVal);
        }
        $HHeaders=$this->HTTR($HHeaders);
        while(list($LineKey,$LineVal)=each($this->ItemsList)) {    //Read Data Lines
            $HDataLine="";
            while(list($DataKey,$DataVal)=each($LineVal)) {            //Dissect one Data Line
                $HDataLine.=$this->HTTD($DataVal);
            }
            $HData.=$this->HTTR($HDataLine);    //and add HTML to Data
        }
        print ($this->HTPage($this->HTTable($HHeaders.$HData)));
    }
    function GetValues($field) {        //Fetch all values of a specified field and return values in array
        $Data=$this->ReadCSV();
        $values=array();
        while(list($key,$val)=each($this->ItemsList)) {
            if(!in_array($val[$field],$values)) array_push($values,$val[$field]);
        }
        sort($values);
        return $values;
    }
    function Edit() {                        //All edit function in one Table
        $Data=$this->ReadCSV();
        if(isset($_POST['commit'])) {
            $this->Update($_POST[$this->DataKey],$_POST);
            $Data=$this->ReadCSV();
        }
        if(isset($_POST['add'])) {
            $this->Add($_POST[$this->DataKey],$_POST);
            $Data=$this->ReadCSV();
        }
        if(isset($_POST['delete'])) {
            $this->Delete($_POST[$this->DataKey]);
            $Data=$this->ReadCSV();
        }
        $PAGE=$this->EditList();
        print $PAGE;
    }

//    Administration Area
    function Update($key,$data) {        //Updating Item "key" with "data" named array
        $this->ReadCSV();
        for($i=0;$i<count($this->ItemsList);$i++) {
            If($this->ItemsList[$i][$this->DataKey]==$key){
                while(list($key,$val)=each($this->HeaderData)) {
                    if(isset($data[$val])) $this->ItemsList[$i][$val]=$data[$val];
                }
            }
        }
        $this->WriteData();
        return($this->ItemsList);
    }
    function Add($key,$data) {            //add an Item "key" with "data" named array
        $this->ReadCSV();
        $NewLine=array();
        $NewItem=array($this->DataKey=>$key);
        while(list($key,$val)=each($this->HeaderData)) {
            if(isset($data[$val])) {
                $NewItem[$val]=$data[$val];
            } else {
                $NewItem[$val]=$data[$val]="";
            }
        }
        array_push($this->ItemsList,$NewItem);
        $this->WriteData();
        return($this->ItemsList);
    }
    function EditList() {        //returns Editor's List of Items
        reset ($this->ItemsList);
        reset ($this->HeaderData);
        $HHeaders=$this->HTTD(" ");
        $HData="";
        while(list($HKey,$HVal)=each($this->HeaderData)) {            //Create Headers Line
            $HHeaders.=$this->HTTD($HVal);
        }
        $HHeaders=$this->HTTR($HHeaders);
        while(list($LineKey,$LineVal)=each($this->ItemsList)) {    //Read Data Lines
            $HDataLine="";
            while(list($DataKey,$DataVal)=each($LineVal)) {            //Dissect one Data Line
                $HDataLine.=$this->HTInput($DataKey,$DataVal);
            }
            $HData.=$this->HTForm($LineVal[$this->DataKey],$this->HTTR($this->HTButton("commit").$HDataLine.$this->HTButton("delete")));    //and add HTML to Data
        }
        $HDataLine="";
        reset($this->HeaderData);
        while(list($DataKey,$DataVal)=each($this->HeaderData)) {            // Add an extra Line for Adding a record
            $HDataLine.=$this->HTInput($DataVal,"");
        }
        $HData.=$this->HTForm($LineVal[$this->DataKey],$this->HTTR($this->HTButton("add").$HDataLine));    //and add HTML to Data
        return($this->HTPage($this->HTTable($HHeaders.$HData)));
    }
    function Delete($DeleteKey) {        //Remove Item "Key" from the file
        $inter=array();
        while(list($key,$val)=each($this->ItemsList)) {
            If($val[$this->DataKey]!=$DeleteKey)    array_push($inter,$val);
        }
        $this->ItemsList=$inter;
        $this->WriteData();
        return($this->ItemsList);
    }
    function WriteData() {        //writing contents of ItemList to Datafile
        reset($this->ItemsList);
        $Output=implode($this->Separator, $this->HeaderData)."\n";
        while(list($key,$val)=each($this->ItemsList)) {
            for($i=0;$i<count($this->HeaderData);$i++){
                $writekey=$this->HeaderData[$i];
                $writeitem[$writekey]=$val[$writekey];
            }
            $Output.=implode($this->Separator, $writeitem)."\n";
        }
        $fp = fopen ($this->DataFile,"w");
        flock($fp,2);
        fputs($fp,$Output);
        flock($fp,3);
        fclose($fp);
    }

//    Accessory HTML output functions
    function HTPage($value) {    // Places $value into BODY of HTML Page
        $result = "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">\n";
        $result.="<html><head><title>".$this->DataFile." Editor</title>\n";
        $result.="<meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\">\n";
        $result.="<style type=\"text/css\">";
        $result.="<!--  td { margin: 0px; padding: 0px; border: 1px solid #003399; } --></style></head>\n";
        $result.="<body>\n".$value."</body>\n</html>";
        return $result;
    }
    function HTForm($item,$data) {    //places $data into form $item
        return "<form name=\"".$item."\" method=\"post\">\n".$data."</form>\n";
    }
    function HTTable($value) {        //places $value into TABLE
        return "<table width=\"96%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n".$value."</table>\n";
    }
    function HTTR($value) {            //places $value into TR
        $this->SRotate();
        return "<tr>\n".$value."</tr>\n";
    }
    function HTTD($value) {    // places $value into TD
        return "<td bgcolor=\"".$this->color."\">".$value."</td>\n";
    }
    function HTInput($field,$value) {    //returns TD input field
        $Olen=strlen($value);
        if($Olen<3) {
            $Ilen=12;
        } else {
            $Ilen=$Olen;
        }
        return "<td bgcolor=\"".$this->color."\"><input name=\"".$field."\" type=\"text\" id=\"".$field."\" value=\"".$value."\" size=\"".$Ilen."\"></td>\n";
    }
    function HTButton($value) {    // returns "$value" button
        return "<td><input name=\"".$value."\" type=\"submit\" id=\"".$value."\" value=\"".$value."\"></td>\n";
    }
    function SRotate() {        //rotating colors for more readability of tables
        if($this->color=="#FFFFFF") {
            $this->color="#CCEEFF";
        } else {
            $this->color="#FFFFFF";
        }
    }
}
