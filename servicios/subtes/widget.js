function _initWidget_subtes(data)
{
	var ac = document.createElement("div");
	ac.id = "subtesPrinc";
	var a = [];
	var b = [];
	for (var x=0; x < data.length; x++)
	{
		a[x] = document.createElement("div");
		a[x].style.backgroundColor = data[x].color;
		b[x] = document.createElement("div");
		b[x].className = "estado";
		if (data[x].estado == 1)
		{
			b[x].className = "estado verde";
		}
		else if (data[x].estado == 2)
		{
			b[x].className = "estado amarillo";
		}
		else if (data[x].estado == 3)
		{
			b[x].className = "estado rojo";
		}
		a[x].className = "circ";
		a[x].innerHTML = data[x].nombre[0];
		if (x==5)
		{
			a[x].className = "circ h";
		}
		b[x].appendChild(a[x]);
		ac.appendChild(b[x]);
	}
	return ac;
}
