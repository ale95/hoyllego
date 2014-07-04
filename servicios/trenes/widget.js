function _initWidget_trenes (data)
{
	var ac = document.createElement("div");
	ac.id = "trenesPrinc";
	var lineas = [];
	var nombrelinea = [];
	var ramales = [];
	var nombreramales = [];
	for (var x=0; x < data.length; x++)
	{
		lineas[x] = document.createElement("div");
		lineas[x].className = "treneslinea";
		nombrelinea[x] = document.createElement("div");
		nombrelinea[x].className = "nombrelinea";
		nombrelinea[x].innerHTML = data[x].nombre;
		//lineas[x].style.width = 100/data.length+"%";
		if (data[x].estado == 1)
		{
			nombrelinea[x].className = "nombrelinea verde";
		}
		else if (data[x].estado == 2)
		{
			nombrelinea[x].className = "nombrelinea amarillo";
		}
		else if (data[x].estado == 3)
		{
			nombrelinea[x].className = "nombrelinea rojo";
		}
		lineas[x].appendChild(nombrelinea[x]);
		ramales[x] = document.createElement("div");
		ramales[x].className = "ramales";
		for (var y=0; y < data[x].ramales.length; y++)
		{
			nombreramales[y] = document.createElement("div");
			nombreramales[y].className = "nombreramales";
			nombreramales[y].innerHTML = data[x].ramales[y].nombre;
			if (data[x].ramales[y].estado == 1)
			{
				nombreramales[y].className = "nombreramales verde";
			}
			else if (data[x].ramales[y].estado == 2)
			{
				nombreramales[y].className = "nombreramales amarillo";
			}
			else if (data[x].ramales[y].estado == 3)
			{
				nombreramales[y].className = "nombreramales rojo";
			}
			ramales[x].appendChild(nombreramales[y]);
			
		}
	lineas[x].appendChild(ramales[x]);
	ac.appendChild(lineas[x]);

	}
	return ac;

}
