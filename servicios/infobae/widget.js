function _initWidget_infobae(data)
{
	var reqxml = new XMLHttpRequest();
	reqxml.open("GET", "servicios/infobae/rss.xml?u=" + Math.random(), false);
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
		ac.style.width = 100 * 10 + "%";
		
		for (var i = 0; i < 10; i++)
		{
			if (i == 9)
			{
				tittxt = noticont[0].getElementsByTagName('title')[0].childNodes[0].wholeText;
				rawdesc = noticont[0].getElementsByTagName('description')[0].childNodes[0].wholeText;
			}
			else
			{
				tittxt = noticont[i].getElementsByTagName('title')[0].childNodes[0].wholeText;
				rawdesc = noticont[i].getElementsByTagName('description')[0].childNodes[0].wholeText;
			}
			
			titulo[i] = document.createElement("div");
			titulo[i].innerHTML = tittxt;
			titulo[i].className = "TituloNoti";
			desc[i] = document.createElement("div");	
			desc[i].innerHTML = rawdesc;
			desc[i].className = "DescNoti";
			fondo[i] = document.createElement("div");
			fondo[i].className = "FondoNoti"
			fondo[i].style.width = 100 / 10 + "%";

		fondo[i].appendChild(titulo[i]);
		fondo[i].appendChild(desc[i]);
		ac.appendChild(fondo[i]);
			
		}
	} else {
		console.log(reqxml.readyState,reqxml.status);
	}
	return ac;
}