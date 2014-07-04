function hora (){
	var reloj = new Date();
	var relojarr = [];
	relojarr.push(reloj.getHours());
	relojarr.push(reloj.getMinutes());
	relojarr.push(reloj.getDay());
	relojarr.push(reloj.getDate());
	relojarr.push(reloj.getMonth());
	relojarr.push(reloj.getFullYear());
	if (relojarr[1] < 10){
		relojarr[1] = '0' + relojarr[1];
	}
	if (relojarr[4] == 0){
		relojarr[4] = 'Enero';
	} else if (relojarr[4] == 1){
		relojarr[4] = 'Febrero';
	} else if (relojarr[4] == 2){
		relojarr[4] = 'Marzo'; 
	} else if (relojarr[4] == 3){
		relojarr[4] = 'Abril';
	} else if (relojarr[4] == 4){
		relojarr[4] = 'Mayo';
	} else if (relojarr[4] == 5){
		relojarr[4] = 'Junio'; 
	} else if (relojarr[4] == 6){
		relojarr[4] = 'Julio';
	} else if (relojarr[4] == 7){
		relojarr[4] = 'Agosto';
	} else if (relojarr[4] == 8){
		relojarr[4] = 'Septiembre'; 
	} else if (relojarr[4] == 9){
		relojarr[4] = 'Octubre';
	} else if (relojarr[4] == 10){
		relojarr[4] = 'Noviembre';
	} else if (relojarr[4] == 11){
		relojarr[4] = 'Diciembre'; 
	}

	if (relojarr[2] == 0){
		relojarr[2] = 'Domingo';
	} else if (relojarr[2] == 1){
		relojarr[2] = 'Lunes';
	} else if (relojarr[2] == 2){
		relojarr[2] = 'Martes';
	} else if (relojarr[2] == 3){
		relojarr[2] = 'Miercoles';
	} else if (relojarr[2] == 4){
		relojarr[2] = 'Jueves';
	} else if (relojarr[2] == 5){
		relojarr[2] = 'Viernes';
	} else if (relojarr[2] == 6){
		relojarr[2] = 'Sábado';
	}
	return relojarr;
}

var sw = 1;
function horaswitch(){
	if (sw == 1){
		sw = 0;
	} else {
		sw = 1;
	}
	updatetime();
}
updatetime();
function updatetime (ss){
	var relojarr = new hora();
	if (sw == 1){
		document.getElementById("hora").textContent = relojarr[0] + ':' + relojarr[1] + " | " + relojarr[2] + ", " + relojarr[3] + " de " + relojarr[4] + " de " + relojarr[5];
	} else if (sw == 0) {
		document.getElementById("hora").textContent = relojarr[0] + ':' + relojarr[1];
	}
	
	setTimeout("updatetime(3)", 1000);
}