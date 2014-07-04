<!DOCTYPE html>
<html>
<body>


<?php 
include("conect.php");

$link = mysql_connect("$host", "$usuario", "$clave", "$base");
echo 'Conecto wacho D:';
mysql_select_db("escuela", $link);


$matricula = $_POST['matricula'];


$ingreso = "insert into alumnos (matricula, apellido, nombre, dni, fecha, sexo,
 procedencia, direccion, mail, telefono)" + 'values ($matricula, $apellido, $nombre, $dni, $fecha, $sexo, $procedencia, $direccion, $mail, $telefono)';
$result = mysql_query($ingreso);
echo '¡Gracias! Hemos recibido sus datos';


 ?>

</body>
</html>
<!-- lei sobre la modificacion desde la pagina web, esta bastante bueno, simplemente cambiar el usuario 'root' por otro que este 
dentro del server mysql y darle permisos para que lo haga xd una boludes-->

<!--<html>
<head>
	<title>Test loco</title>
</head>
<body>
	<div>N° Legajo: <?php echo $_POST['matricula']; ?> </div>
	<div>Apellido: <?php echo $_POST['apellido']; ?></div>
	<div>Nombre: <?php echo $_POST['nombre']; ?></div>
	<div>Dni:  <?php echo $_POST['dni']; ?></div>
    <div>Fecha de nacimiento: <?php echo $_POST['fecha']; ?></div>
	<div>Sexo: <?php echo $_POST['sexo']; ?></div>
	<div>Escuela de Procedencia: <?php echo $_POST['procedencia']; ?></div>
	<div>Direccion: <?php echo $_POST['direccion']; ?></div>
	<div>Correo Electronico: <?php echo $_POST['mail']; ?></div>
	<div>Telefono <?php echo $_POST['telefono']; ?></div>


</body>
</html>-->