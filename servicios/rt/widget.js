function _initWidget_rt(data){
	var reqxml = new XMLHttpRequest();
	reqxml.open("GET", "servicios/rt/rss.xml?u=" + Math.random(), false);
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
		ac.style.width = 100 * 6 + "%";
		
		for (var i = 0; i < 6; i++)
		{
			if (i == 5)
			{
				tittxt = noticont[0].getElementsByTagName('title')[0].childNodes[0].nodeValue;
				rawdesc = noticont[0].getElementsByTagName('description')[0].childNodes[0].wholeText;
				if (rawdesc.match("<img") == null)
				{
					spldesc[1]= rawdesc;
				}
				else
				{
					spldesc = rawdesc.split("<br>");
				}	
			}
			else
			{
				tittxt = noticont[i].getElementsByTagName('title')[0].childNodes[0].nodeValue;
				rawdesc = noticont[i].getElementsByTagName('description')[0].childNodes[0].wholeText;
				if (rawdesc.match("<img") == null)
				{
					spldesc[1]= rawdesc;
				}
				else
				{
					spldesc = rawdesc.split("<br>");
				}
			}
		titulo[i] = document.createElement("div");
		titulo[i].innerHTML = tittxt;
		titulo[i].className = "TituloNoti";
		desc[i] = document.createElement("div");	
		desc[i].innerHTML = spldesc[1];
		desc[i].className = "DescNoti";
		fondo[i] = document.createElement("div");
		fondo[i].className = "FondoNoti";
		fondo[i].style.width = 100 / 6 + "%";

		fondo[i].appendChild(titulo[i]);
		fondo[i].appendChild(desc[i]);
		ac.appendChild(fondo[i]);
			
		}
	} else {
		console.log(reqxml.readyState,reqxml.status);
	}
	return ac;
}