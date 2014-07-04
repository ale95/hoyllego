function _initPest_tiempo_pronostico(data) 
{
	var a = document.createElement("div");
	a.id = "tiempo_pronostico"

	var aa = document.createElement("div");
	aa.className = "subpron";
	aa.id = "hoy";
		var aaa = document.createElement("div");
		aaa.className = "ConteImgEstado";
		aaa.style.backgroundImage = "url("+data.icono+")";
		aaa.appendChild(document.createTextNode("Hoy"));
	aa.appendChild(aaa);
		var aab = document.createElement("div");
		aab.className = "subpronInfo";
	aa.appendChild(aab);

			var aaaa = document.createElement("div");
			aaaa.appendChild(document.createTextNode(data.temperatura + "° | " + data.estado));
			aaaa.className = "estado";
			var aaab = document.createElement("div");
			aaab.appendChild(document.createTextNode("Mínima: " + data.minima + "° | Máxima: " + data.maxima + "°"));
			aaab.className = "RangoTemp";
		aab.appendChild(aaaa);
		aab.appendChild(aaab);
	a.appendChild(aa);

	var exten = [];
	var divimgEstado = [];
	var imgEstado = [];
	var info = [];
	var dia = [];
	var temp = [];
	var estado = [];

	for (var x = 0; x < data.extendido.length; x++)
	{
		exten[x] = document.createElement("div");
		exten[x].className = "subpron";

		divimgEstado[x] = document.createElement("div");
		divimgEstado[x].className = "ConteImgEstado";
		divimgEstado[x].style.backgroundImage = "url("+data.extendido[x].icono+")";
		if (data.extendido[x].dia == "Mon")
		{
			data.extendido[x].dia = "Lunes";
		}
		else if (data.extendido[x].dia == "Tue")
		{
			data.extendido[x].dia = "Martes";
		}
		else if (data.extendido[x].dia == "Wed")
		{
			data.extendido[x].dia = "Miércoles";
		}
		else if (data.extendido[x].dia == "Thu")
		{
			data.extendido[x].dia = "Jueves";
		}
		else if (data.extendido[x].dia == "Fri")
		{
			data.extendido[x].dia = "Viernes";
		}
		else if (data.extendido[x].dia == "Sat")
		{
			data.extendido[x].dia = "Sábado";
		}
		else if (data.extendido[x].dia == "Sun")
		{
			data.extendido[x].dia = "Domingo";
		}

		info[x] = document.createElement("div");
		info[x].className = "subpronInfo";

		dia[x] = document.createElement("div");
		dia[x].className = "NombreDia";
		dia[x].innerHTML = data.extendido[x].dia;

		estado[x] = document.createElement("div");
		estado[x].className = "estado";
		estado[x].innerHTML = data.extendido[x].estado;

		temp[x] = document.createElement("div");
		temp[x].className = "RangoTemp";
		temp[x].innerHTML = "Mínima: " + data.extendido[x].minima + "° | Máxima: " + data.extendido[x].maxima + "°";

		
		
		info[x].appendChild(estado[x]);
		info[x].appendChild(temp[x]);
		divimgEstado[x].appendChild(dia[x]);
		exten[x].appendChild(divimgEstado[x]);
		exten[x].appendChild(info[x]);
		a.appendChild(exten[x]);


	}

	return a;
}
