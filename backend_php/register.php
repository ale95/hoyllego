<?php
require_once('recaptchalib.php');
//para google
$gprivatekey = "6Lfi7fQSAAAAAAxyIkXOYV8mJFC58QbRpheBmaHi";
$gremoteip = $_SERVER['REMOTE_ADDR'];
$gchallenge = base64_decode($_POST['ch']);
$gresponse = base64_decode($_POST['re']);
$error = 3;
$errorcode = "";
$resp = recaptcha_check_answer($gprivatekey,$gremoteip, $gchallenge ,$gresponse);
$link = mysqli_connect("localhost", "colegio", "bikerete5", "hoyllego");
if (!$resp->is_valid){
	$error = 2;
	$errorcode .= $resp->error;
} else{
	//para db
	if (strlen($_POST["newuser"]) >= 4 && strlen($_POST["newpass1"]) >= 4 && strpos($_POST["email"], "@") && strpos($_POST["email"], ".") ){
		$email = $_POST['email'];
		$newuser = strtolower($_POST['newuser']);
		$newpass = crypt($_POST['newpass1']);
		
		$qverep = "select id from users where user='".$newuser."';";
		$verep = mysqli_query($link, $qverep);
		$resverep = mysqli_fetch_assoc($verep);
		if (!$resverep['id']){
			$create = "create table if not exists users (id INT AUTO_INCREMENT, user VARCHAR(20), pass VARCHAR(100), email VARCHAR(50), data TEXT, PRIMARY KEY(id));";
			mysqli_query($link, $create);
			$ingreso = "insert into users (user,pass,email,data) values ('".$newuser."','".$newpass."','".$email."','{}');";
			mysqli_query($link, $ingreso);
			$error = 1;
		} else {
			$error = 3;
		}

	} else {
		$error = 4;
	}
}

echo $error;
mysqli_close($link);
?>