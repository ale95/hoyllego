function _initWidget_tiempo (data){
		var ac = document.createElement("div");
		ac.id = "temp-cont";
		/*var imgEstado = document.createElement("div");
		imgEstado.id = "temp-icono";*/
		ac.style.backgroundImage = "url(" + data.icono + ")";

			var aca = document.createElement("div");
			aca.id = "temp-t";
			aca.appendChild(document.createTextNode(data.temperatura + "°"));

			var acb = document.createElement("div");
			acb.id = "temp-estado";
			acb.appendChild(document.createTextNode(data.estado));

			var acc = document.createElement("div");
			acc.id = "temp-maxmin-cont";

				var acca = document.createElement("div");
				acca.className = "temp-m";
				acca.appendChild(document.createTextNode("Mín: " + data.minima + "°"));

				var accb = document.createElement("div");
				accb.className = "temp-m";
				accb.appendChild(document.createTextNode("Máx: " + data.maxima + "°"));

			//var xmlreq = new XMLHttpRequest();
			//xmlreq.open("GET","http://www.smn.gov.ar/feeds/avisocorto.xml",false);
			//xmlreq.send();

			/*if (xmlreq.readyState==4 && xmlreq.status==200)
			{
				var parser = new DOMParser();
				var xmltemp = parser.parseFromString(xmlreq.responseText, "text/xml");
				var desc = xmltemp.getElementsByTagName('rss')[0].getElementsByTagName('channel')[0].getElementsByTagName('item')[0].getElementsByTagName('description')[0].childNodes[0].nodeValue;
				var Domdesc = document.createElement('div');
				Domdesc.innerHTML = desc;
			}*/

			acc.appendChild(acca);
			acc.appendChild(accb);
		//ac.appendChild(imgEstado);
		aca.appendChild(acb);
		ac.appendChild(aca);
		ac.appendChild(acc);

		//ac.appendChild(Domdesc);

	return ac;
}