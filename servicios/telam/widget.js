function _initWidget_telam(data)
{
	var reqxml = new XMLHttpRequest();
	reqxml.open("GET", "servicios/telam/rss.xml", false);
	reqxml.send();
	var ac = document.createElement("div");
	ac.className = "NotiCont";
	if (reqxml.readyState==4 && reqxml.status==200)
	{
		var parser = new DOMParser();
		var rtxml = parser.parseFromString(reqxml.responseText, "text/xml");
		var	noticont = rtxml.getElementsByTagName('rss')[0].getElementsByTagName('channel')[0].getElementsByTagName('item');
		var fondo = [];
		var titulo = [];
		var desc =[];
		var spldesc = [];
		var fondourl;
		ac.style.width = 100 * 6 + "%";
		
		for (var i = 0; i < 6; i++)
		{
			if (i == 5)
			{
				tittxt = noticont[0].getElementsByTagName('title')[0].childNodes[0].wholeText;
				rawdesc = noticont[0].getElementsByTagName('description')[0].childNodes[0].wholeText;
				if (noticont[0].getElementsByTagName('enclosure')[0])
				{
					fondourl = noticont[0].getElementsByTagName('enclosure')[0].attributes[0].nodeValue;
				}
			}
			else
			{
				tittxt = noticont[i].getElementsByTagName('title')[0].childNodes[0].wholeText;
				rawdesc = noticont[i].getElementsByTagName('description')[0].childNodes[0].wholeText;
				if (noticont[i].getElementsByTagName('enclosure')[0])
				{
					fondourl = noticont[i].getElementsByTagName('enclosure')[0].attributes[0].nodeValue;
				}
			}
			titulo[i] = document.createElement("div");
			titulo[i].innerHTML = tittxt;
			titulo[i].className = "TituloNoti";
			desc[i] = document.createElement("div");	
			desc[i].innerHTML = rawdesc;
			desc[i].className = "DescNoti";
			fondo[i] = document.createElement("div");
			if (fondourl != ""){
				desc[i].className = "DescNoti cFoto";
				fondo[i].style.backgroundImage = "url(" + fondourl + ")";
			}
			fondo[i].className = "FondoNoti"
			fondo[i].style.width = 100 / 6 + "%";

		fondo[i].appendChild(titulo[i]);
		fondo[i].appendChild(desc[i]);
		ac.appendChild(fondo[i]);
		fondourl = "";
			
		}
	} else {
		console.log(reqxml.readyState,reqxml.status);
	}
	return ac;
}