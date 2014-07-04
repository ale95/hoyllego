function _initWidget_tn(data){
	_initWidget_tn_cont++;
	var servIndexReq = new XMLHttpRequest();
	if (_initWidget_tn_cont == 20){
		_initWidget_tn_cont = 0;
	}
	if (_initWidget_tn_cont == 1){
		servIndexReq.open("GET","servicios/tn/rss.xml?u=" + Math.random(),false);
		servIndexReq.send();
		_initWidget_tn_oldreq = servIndexReq.responseText;
	}
	var ac = document.createElement("div");
	ac.className = "NotiCont";
	if ((servIndexReq.readyState==4 && servIndexReq.status==200) || _initWidget_tn_cont != 1){
		var parser = new DOMParser();
		var tnxmldom = parser.parseFromString(_initWidget_tn_oldreq, "text/xml");
		var	noticont = tnxmldom.getElementsByTagName('rss')[0].getElementsByTagName('channel')[0].getElementsByTagName('item');
		var fondo = [];
		var titulo = [];
		var desc =[];

		ac.style.width = 100 * 10 + "%"; 
		for(var i = 0 ; i < 10 ; i++){
			var medcontent = noticont[i].getElementsByTagNameNS('http://search.yahoo.com/mrss/','content')[0] || null;

			if (medcontent && medcontent.attributes.getNamedItem("medium").nodeValue == "video")
			{
				fondourl = medcontent.getElementsByTagNameNS('http://search.yahoo.com/mrss/','thumbnail')[0].attributes[0].nodeValue;
			} else if (medcontent) {
				fondourl = medcontent.attributes[0].nodeValue;
			} else {
				fondourl = " ";

			}

			titulotxt = noticont[i].getElementsByTagName('title')[0].childNodes[0].nodeValue;
			desctxt = noticont[i].getElementsByTagName('description')[0].childNodes[0].nodeValue.replace(/&aacute;/g, "á").replace(/&eacute;/g, "é").replace(/&iacute;/g, "í").replace(/&oacute;/g, "ó").replace(/&uacute;/g, "ú").replace(/&iquest;/g, "¿").replace(/&quot;/g, '"').replace(/&ldquo;/g, '"').replace(/&rdquo;/g, '"').replace(/&ntilde;/g, 'ñ').replace(/&nbsp;/g, ' ');
			fondo[i] = document.createElement("div");
			fondo[i].className = "FondoNoti";
			if (i==0)
			{
				var fstu = "url(" + fondourl + ")";
				var fstt = titulotxt;
				var fstd = desctxt;
			}
			if (i==9)
			{
				fondo[i].style.backgroundImage = fstu;
				titulo[i] = document.createElement("div");
				titulo[i].className = "TituloNoti";
				titulo[i].innerHTML = fstt;
				desc[i] = document.createElement("div");
				desc[i].className = "DescNoti";
				desc[i].innerHTML = fstd;
			}
			else
			{
				fondo[i].style.backgroundImage = "url(" + fondourl + ")";
				fondo[i].style.backgroundImage = fondourl;
				titulo[i] = document.createElement("div");
				titulo[i].className = "TituloNoti";
				titulo[i].innerHTML = titulotxt;
				desc[i] = document.createElement("div");
				desc[i].className = "DescNoti";
				desc[i].innerHTML = desctxt;
			}
			if (fondourl != " "){
				desc[i].className = "DescNoti cFoto";
			}
			fondo[i].style.width = 100 / 10 + "%";
			fondo[i].appendChild(titulo[i]);
			fondo[i].appendChild(desc[i]);
			ac.appendChild(fondo[i]);
		}
	}	
	return ac;
}
var _initWidget_tn_cont = 0;
var _initWidget_tn_oldreq = "";