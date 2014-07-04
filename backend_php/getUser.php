<?php

$sid = $_POST['sid'];

if($sid){
	session_id($sid);
	session_start();
	$u = $_SESSION['u'];
	$p = $_SESSION['p'];
	session_destroy();
} else {
	$u = $_POST['u'];
	$p = $_POST['p'];
}
$link = mysqli_connect("localhost", "colegio", "bikerete5", "hoyllego");
$create = "select id, pass from users where user='".$u."';";
$query = mysqli_query($link, $create);
$res = mysqli_fetch_assoc($query);
if ($res['id']){
	if (crypt($p, $res['pass']) == $res['pass']){
		$updquery = "update users set data='".base64_decode($_POST['data'])."' where user='".$u."';";
		$query = mysqli_query($link, $updquery);
		echo '1';
	} else {
		echo '21';
	}
	
} else {
	echo '22';
}
mysqli_close($link);
?>