<?php
$sid = $_POST['sid'];

if($sid){
	session_id($sid);
	session_start();
	$u = $_SESSION['u'];
	$p = $_SESSION['p'];
} else {
	$u = $_POST['u'];
	$p = $_POST['p'];
	session_start();
	$_SESSION['u'] = $u;
	$_SESSION['p'] = $p;
	$sid = session_id();
}


$link = mysqli_connect("localhost", "colegio", "bikerete5", "hoyllego");
$create = "select data, pass from users where user='".$u."';";
$query = mysqli_query($link, $create);
$res = mysqli_fetch_assoc($query);
if ($res['data']){
	if (crypt($p, $res['pass']) == $res['pass']){
		session_start();
		echo '{"correct" : 1, "nombre": "'.$u.'", "datos": '.$res['data'].', "sid" : "'.$sid.'"}';
	} else {
		echo '{"correct" : 2, "nombre" : "Contraseña incorrecta", "datos": {}}';
	}
	
} else {
	echo '{"correct" : 2, "nombre" : "Usuario no encotrado", "datos": {}}';
}
mysqli_close($link);
?>