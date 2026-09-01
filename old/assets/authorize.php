<?php
session_name('imp2');

session_start();


if (@$_REQUEST['submitbtn']) {
	$username = $_REQUEST['username'];
	$password = $_REQUEST['password'];
	
	if ($username == 'admin' and $password == 'demo') {
		$_SESSION['authorized'] = true;
		header("Location: " . CATEGORY_MAPPING_URL);  
	} else {
		$error = true;
	}
}

if (@$_SESSION['authorized']) {
	return;
} else { ?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
<div align="center">
<form method="post" action="<?php echo CATEGORY_MAPPING_URL; ?>">
<table width="300" cellspacing="2" cellpadding="0" border="0" align="center">
<tbody><tr>
  <td><h2>LOGIN FORM</h2></td>
</tr>
<tr>
<td>

 <table width="100%" cellspacing="2" cellpadding="0" border="0" align="center">
 <tbody><tr>
  <td><b>Login:</b></td>
  <td><input type="text" maxlength="20" size="20" value="" name="username"></td>
 </tr>
 <tr valign="top" align="left">
  <td><b>Password:</b></td>
  <td><input type="password" maxlength="20" size="20" name="password"><br>&nbsp;</td>
 </tr>
 <tr>
  <td align="center" colspan="2"><input type="submit" value="Login..." name="submitbtn">

  </td>
 </tr>
 </tbody></table>

</td>
</tr>
</tbody></table>
<?php
	if (@$error) { ?>
<p align="center" style="color: red;">You have entered invalid login or password.</p>
<?php
	} ?>
</form>
</div>
</body>
</html>
<?php
die;
}