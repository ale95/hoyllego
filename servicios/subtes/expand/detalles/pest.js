function _initPest_subtes_detalles(data) 
{
	var conte = document.createElement("div");
	conte.id = "detallesConte"
	var widget = [];
	var lin = [];
	var texto = [];
	for (var x=0; x < data.length; x++)
	{
		widget[x] = document.createElement("div");
		widget[x].className = "wid";
		lin[x] = document.createElement("div");
		lin[x].className = "lin";
		texto[x] = document.createElement("div");
		texto[x].className = "texto";
		if (x<=5)
		{
			lin[x].innerHTML = "Linea "+data[x].nombre;
		}
		else if (x==6)
		{
			lin[x].innerHTML = "Premetro";
		}
		else
		{
			lin[x].innerHTML = "Urquiza";
		}

		if (data[x].estado == 1)
		{
			lin[x].className = "lin verde";
		}
		else if (data[x].estado == 2)
		{
			lin[x].className = "lin amarillo";
		}
		else if (data[x].estado == 3)
		{
			lin[x].className = "lin rojo";
		}

		texto[x].innerHTML = data[x].detalle;
		widget[x].appendChild(lin[x]);
		widget[x].appendChild(texto[x]);
		conte.appendChild(widget[x]);
	}
	return conte;
}