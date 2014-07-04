function _initPest_trenes_sarmiento(data) 
{
	var conte = document.createElement("div");
	conte.className = "trenesLineasPest"
	var ramales = [];
	var nombreramal = [];
	var detalles = [];
	for (var x = 0; x < data.length; x++) 
	{
		if (data[x].nombre == "sarmiento") 
		{
			var a = x;
		}
	}
	for (var y=0; y < data[a].ramales.length; y++)
	{
		ramales[y] = document.createElement("div");
		ramales[y].className = "trenesRamales";
		nombreramal[y] = document.createElement("div");
		nombreramal[y].className = "trenesNombreRamal";
		detalles[y] = document.createElement("div");
		detalles[y].className = "trenesDetalles";
		nombreramal[y].innerHTML = data[a].ramales[y].nombre;
		if (data[a].ramales[y].estado == 1)
		{
			nombreramal[y].className = "trenesNombreRamal verde";
		}
		else if (data[a].ramales[y].estado == 2)
		{
			nombreramal[y].className = "trenesNombreRamal amarillo";
		}
		else if (data[a].ramales[y].estado == 3)
		{
			nombreramal[y].className = "trenesNombreRamal rojo";
		}
		detalles[y].innerHTML = data[a].ramales[y].detalle;
		ramales[y].appendChild(nombreramal[y]);
		ramales[y].appendChild(detalles[y]);
		conte.appendChild(ramales[y]);
	}
	return conte;
}
