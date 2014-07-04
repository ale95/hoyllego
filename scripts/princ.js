var serviciosIndex;
function princLoad(){
	ifAutoLogin();
	var divLoadArea = document.getElementsByTagName('head')[0];
	document.getElementById("princLoad").style.display = "block";
	var servIndexReq = new XMLHttpRequest();
	servIndexReq.open("GET","servicios/servicios.json?r=" + Math.random(),false);
	servIndexReq.send();
	var servExpandResAcum = 0;
	if (servIndexReq.readyState==4 && servIndexReq.status==200){
		serviciosIndex = JSON.parse(servIndexReq.responseText );
		for (var i = 0 ; i < serviciosIndex.length ; i++){
			var intjsimport = new XMLHttpRequest();
			intjsimport.open("GET","servicios/"+serviciosIndex[i].nombre+"/widget.js?r=" + Math.random(),false);
			intjsimport.send();
			if (intjsimport.readyState==4 && intjsimport.status==200){
				window.eval(intjsimport.responseText);
				divLoadArea.innerHTML += "<link rel='stylesheet' type='text/css' href='servicios/"+serviciosIndex[i].nombre+"/widget.css'>";
				divLoadArea.innerHTML += "<link rel='stylesheet' type='text/css' href='servicios/"+serviciosIndex[i].nombre+"/expand/expand.css'>";
				var servExpandReq = new XMLHttpRequest();
				servExpandReq.open("GET","servicios/"+serviciosIndex[i].nombre+"/expand/index.json?r=" + Math.random(),false);
				servExpandReq.send();
				if (servExpandReq.readyState==4 && servExpandReq.status==200){
					var servExpandRes = JSON.parse(servExpandReq.responseText);
					servExpandResAcum += servExpandRes.length;
					var swflag = 0;
					for (var x = 0 ; x < servExpandRes.length ; x++){
						var intjsimport2 = new XMLHttpRequest();
						intjsimport2.open("GET","servicios/"+serviciosIndex[i].nombre+"/expand/"+servExpandRes[x].nombre+"/pest.js?r=" + Math.random(),false);
						intjsimport2.send();
						if (intjsimport2.readyState==4 && intjsimport2.status==200){
							window.eval(intjsimport2.responseText);
							if (swflag != 1){
								switchUpdateLoop(2);
								swflag = 1;
							}
						}
					}
				}
			}
		}
	}
}

setTimeout("switchUpdateLoop(2)", 3000);
var SPFlagAct = 0;
var setSwitchTimeout;

function switchUpdateLoop(flag, callback){
	document.getElementById("princLoad").style.display = "none";
	if (flag == 1){
		clearTimeout(setSwitchTimeout);
	} else {
		clearTimeout(setSwitchTimeout);
		updateLoop(callback);
	}
	function updateLoop(callback){
		var callback = callback || 0;
		document.getElementById("cargando").className = 'show';
		createPag1(function (e){
			if (e == 0){
				document.getElementById("cargando").className = ' ';
				document.getElementById("error").className = " ";
			} else  {
				document.getElementById("cargando").className = " ";
				document.getElementById("error").className = "show";
			}

			if (callback != 0){
				callback();
			}
			
		});
		if (SPFlagAct == 1){
			activate.switchPest(1,1);
		}
		//console.log(1);
		setSwitchTimeout = setTimeout(updateLoop, 10000);
	}
}

var widgetsPrefCustom = [];
function createPag1 (callback) {
	var arrHijos = [];

	if (__USERINFO.widgetsPrefCustom){
		if (__USERINFO.widgetsPrefCustom.length < serviciosIndex.length){
			for (var i = 0 ; i < serviciosIndex.length ; i++){
				for (var z = 0 ; z < __USERINFO.widgetsPrefCustom.length ; z++){
					if (__USERINFO.widgetsPrefCustom[z].nombre == serviciosIndex[i].nombre){
						break;
					}
					if (z == __USERINFO.widgetsPrefCustom.length - 1){
						__USERINFO.widgetsPrefCustom[z+1] = serviciosIndex[i];
						__USERINFO.widgetsPrefCustom[z+1].visible = 0;
					}
				}
			}
		} else if (__USERINFO.widgetsPrefCustom.length > serviciosIndex.length){
			for (var i = 0 ; i <  __USERINFO.widgetsPrefCustom.length ; i++){
				for (var z = 0 ; z < serviciosIndex.length ; z++){
					if (serviciosIndex[z].nombre == __USERINFO.widgetsPrefCustom[i].nombre){
						break;
					}
					if (z == serviciosIndex.length - 1){
						__USERINFO.widgetsPrefCustom.splice(i, 1);
						i--;
					}
				}
			}			
		}
		widgetsPrefCustom = __USERINFO.widgetsPrefCustom;
	} else {
		for (var i = 0; i < serviciosIndex.length ; i++){
			widgetsPrefCustom[i] = {
				"nombre" : serviciosIndex[i].nombre,
				"visible" : serviciosIndex[i].visible
			}
		}
		__USERINFO.widgetsPrefCustom = widgetsPrefCustom;
	}
	
	document.getElementById("widSw").innerHTML = "";
	for (var i = 0; i < serviciosIndex.length ; i++){
		var z;
		for (z= 0 ; z <= serviciosIndex.length ; z++){
			if (serviciosIndex[z].nombre == widgetsPrefCustom[i].nombre){
				break;
			}
		}
		createWidSw(i, z);
		createWidget(serviciosIndex[z], widgetsPrefCustom[i], i, (i == serviciosIndex.length -1)? callback : 0);
	}
	
	__USERINFO.widgetsPrefCustom = widgetsPrefCustom;

	function createWidSw(pos, orpos){
		var tmphijo = document.createElement("div");
		tmphijo.className = "item rojo";
		tmphijo.style.backgroundImage = "url(servicios/"+widgetsPrefCustom[pos].nombre+"/face.png)";
		if (widgetsPrefCustom[pos].visible == 1){
			tmphijo.className = "item verde";
		}
		tmphijo.onclick = function(){widSwVisiv(pos)};
		tmphijo.appendChild(document.createTextNode(serviciosIndex[orpos].dispNombre));
		arrHijos.splice(pos, 0, tmphijo);
		document.getElementById("widSw").appendChild(tmphijo);
	}
	function widSwVisiv(pos){
		if (widgetsPrefCustom[pos].visible == 1){
			widgetsPrefCustom[pos].visible = 0;
			reordenateWidget(widgetsPrefCustom[pos].nombre,widgetsPrefCustom.length - 1 );
		} else {
			widgetsPrefCustom[pos].visible = 1;
			reordenateWidget(widgetsPrefCustom[pos].nombre, 0);
		}
		switchUpdateLoop(2);
	}
	var widgetsNew = [];
	function createWidget (data, datacus, position, callback){
		var callback = callback || 0;
		var a = document.createElement("div");
		a.className = "serv";
		a.id = data.nombre;
		a.onmousedown = function (e){ifSelOrMove(data, e, 1);};
		a.addEventListener("touchstart", function (e){ifSelOrMove(data, e, 2);}, false);
		if (data.height){
			a.style.height = data.height + "px";
		}
		if (datacus.visible != 1){
			a.style.display = "none";
		}
		a.style.backgroundImage = "url(servicios/"+data.nombre+"/face.png)";

		var ab = document.createElement("div");
		ab.className = "titulo";
		ab.appendChild(document.createTextNode(data.dispNombre));

		var ac = document.createElement("div");
		ac.className = "servcont";

		var req2 = new XMLHttpRequest();
		req2.open("GET","servicios/"+data.nombre+"/widget.html?r=" + Math.random(),true);
		req2.send();
		req2.onreadystatechange=function (){
			if (req2.readyState==4 && req2.status==200){
				ac.innerHTML += req2.responseText;
				getServData(data, function(widgetdata){
					var aca = window["_initWidget_"+data.nombre](widgetdata);
					ac.appendChild(aca);
					//a.appendChild(aa);
					a.appendChild(ab);
					a.appendChild(ac);
					widgetsNew[position] = a;
					callAdd();
					if (callback != 0){
						callback(0);
					}
				});
			}
		}	
	}

	var callAddFlag = 0;
	function callAdd() {
		callAddFlag++;
		if (callAddFlag == serviciosIndex.length){
			var cont = document.createElement("div");
			for (var i = 0; i < widgetsNew.length ; i++){
				cont.appendChild(widgetsNew[i]);
			}
			replaceIfNotEqual(document.getElementById("pag1cont"), cont, "");
			callAddFlag = 0;
		}
	}

	function ifSelOrMove(data, initevent, disp){
		var b = document.getElementById(data.nombre);
		var cou = setTimeout(function(){
			b.onmouseup = null;
			moveserv(data.nombre, initevent, disp);
		}, 500);
		switchUpdateLoop(1);
		b.onmouseup = function (){
			clearTimeout(cou);
			activate(data);
		};

		function touchmCanceler(e){
			if (e.changedTouches[0].clientY-initevent.changedTouches[0].clientY < -5 || e.changedTouches[0].clientX-initevent.changedTouches[0].clientX < -5 || e.changedTouches[0].clientX-initevent.changedTouches[0].clientX > 5 || e.changedTouches[0].clientY-initevent.changedTouches[0].clientY > 5){
				clearTimeout(cou);
				b.removeEventListener("touchmove", touchmCanceler, false);
			}
		}
		function toucheCanceler(e){
			clearTimeout(cou);
			b.removeEventListener("touchend", toucheCanceler, false);
		}

		b.addEventListener("touchmove",touchmCanceler,false);
		b.addEventListener("touchend",toucheCanceler,false);

		function moveserv(ncl, initevent, disp){
			var a = document.getElementById(ncl);
			a.className = "serv-order";
			a.onclick = null;
			a.style.height = window.getComputedStyle(a).height;
			a.style.top = ncl.offsetTop + document.getElementById("pag1cont").scrollTop + 40+ "px";
			a.style.position = "fixed";
			
			b = document.getElementsByClassName("serv-order")[0];
			var CantNoVisible = 0;
			for (var x = 0 ; x < widgetsPrefCustom.length ; x++){
				if (widgetsPrefCustom[x].visible == 0){
					CantNoVisible++;
				}
			}
			var interwidgetpos = new Array();
			interwidgetpos[0] = 40;
			for (var z = 1 ; z <= document.getElementsByClassName("serv").length - CantNoVisible;z++){
				interwidgetpos[z] = parseInt(window.getComputedStyle(document.getElementsByClassName("serv")[z-1]).height) + 16 + interwidgetpos[z-1];
			}
			if (disp == 1){
				var mxc = initevent.clientY;
			} else if (disp == 2){
				var mxc = initevent.changedTouches[0].clientY;
			}

			document.body.onmousemove = moveselect;
			a.addEventListener("touchmove",moveselect,false);
			var mxcom = a.offsetTop;

			var posSelect = posSelect || widgetsPrefCustom.length - CantNoVisible - 1;
			function moveselect(e){
				if (disp == 1){
					ev = e || window.event;
				} else if (disp == 2){
					ev = e.changedTouches[0];
					e.preventDefault();
				}
				//a.onclick = null;
				
				b.style.top = ev.clientY-40+"px";// - mxc + mxcom +
				var i;
				for (i = 0; i < interwidgetpos.length ; i++){
					if (ev.clientY +document.getElementById("pag1cont").scrollTop - interwidgetpos[i] < 50 && ev.clientY +document.getElementById("pag1cont").scrollTop - interwidgetpos[i] > -50){
						posSelect = i;
						if (i != 0){
							document.getElementsByClassName("serv")[i-1].style.marginBottom = "54px";//parseInt(window.getComputedStyle(b).height) + 4 + "px";
						} else {		
							document.getElementsByClassName("serv")[i].style.marginTop ="70px";// parseInt(window.getComputedStyle(b).height) + 20 + "px";
							ceroflag = 1;
						}
					} else {
						//posSelect = -1;
						if (i - 1 >= 0){
							var ceroflag = ceroflag || 2;
							if (ceroflag != 1){
								document.getElementsByClassName("serv")[i-1].style.marginTop = 8+"px";
							}
							ceroflag = 2;
							document.getElementsByClassName("serv")[i-1].style.marginBottom = 8+"px";
						}
					}
				}
			}
			document.body.onmouseup = function(){reordenateWidget(ncl, posSelect)};
			b.addEventListener("touchend",function(){reordenateWidget(ncl, posSelect)},false);
		}
	}
	function reordenateWidget(ncl, posSelect){
		for (var i = 0; i < serviciosIndex.length ; i++){
			if (widgetsPrefCustom[i].nombre == ncl){
				servToMove = i;
			}
		}
		if (posSelect == -1 || posSelect == servToMove){
			servMove = -1;
			//console.log("no se movio nada", posSelect, servToMove);
		} else {
			if (posSelect > servToMove){
				servMove = posSelect+1;
				for (var za = widgetsPrefCustom.length - 1; za >= servMove; za--) {
					widgetsPrefCustom[za+1] = widgetsPrefCustom[za];
				}
				widgetsPrefCustom[servMove] = widgetsPrefCustom[servToMove];
				widgetsPrefCustom.splice(servToMove, 1);
			} else {
				servMove = posSelect;
				for (var za = widgetsPrefCustom.length - 1; za >= servMove; za--) {
					widgetsPrefCustom[za+1] = widgetsPrefCustom[za];
				}
				 widgetsPrefCustom[servMove] = widgetsPrefCustom[servToMove+1];
				 widgetsPrefCustom.splice(servToMove+1, 1);
			}
			//console.log("movido "+servToMove+" al "+servMove);
		}	
		document.body.onmousemove  = null;
		document.body.onmouseup = null;
		//document.getElementById(ncl).removeEventListener("touchmove",moveselect,false);
		document.getElementById(ncl).removeEventListener("touchend",function(){reordenateWidget(ncl, posSelect)},false);
		createPag1();//no anda la idea
		switchUpdateLoop(2);
	}
}

var nameCache;
var pest = new Array();
function activate(data){
	switchUpdateLoop(2);
	if (data.nombre == -1){
		data.nombre = nameCache;
	} else {
		nameCache = data.nombre;
		document.getElementById('cargando').className = "show";
		pest = [];
	}
	document.getElementById("pag2pest").style.display = "block";
	document.getElementById("pag2cont").style.top = "40px";
	SPFlagAct = 1;
	var req = new XMLHttpRequest();
	req.open("GET","servicios/"+data.nombre+"/expand/index.json?r=" + Math.random(),true);
	req.send();
	req.onreadystatechange=function (){
		if (req.readyState==4 && req.status==200){
			var pestList = JSON.parse(req.responseText);
			for (var i = 0 ; i < pestList.length ; i++){
				pest[i] = createPest(pestList[i], data);
			}
			if (pestList.length <= 1){
				document.getElementById("pag2pest").style.display = "none";
				document.getElementById("pag2cont").style.top = "0";
			}
			switchPest(pestList[0], data);

			document.getElementById('pag2pest').innerHTML = " ";
			document.getElementById('pag2cont').innerHTML = " ";
			document.getElementById("submarca").textContent = data.dispNombre;
			for (i = 0 ; i < pest.length ; i++){
				document.getElementById('pag2pest').appendChild(pest[i]);
			}
			move();
		}
	}
	function createPest(datapest, datawid){
		var a = document.createElement("div");
		a.className = "pest";
		a.id = datapest.nombre;
		a.onclick = function () {switchPest(datapest, datawid);};
		a.appendChild(document.createTextNode(datapest.dispNombre));
		return a;
	}

	var oldDataPest;
	var oldDataWid;
	var updateFlag;
	function switchPest(dataPest, dataWid){
		if (dataPest == 1 && dataWid == 1){
			dataPest = oldDataPest;
			dataWid = oldDataWid;
			updateFlag = 1;
		} else {
			oldDataPest = dataPest;
			oldDataWid = dataWid;
			updateFlag = 2;
		}
		
		var req2 = new XMLHttpRequest();
		req2.open("GET","servicios/"+dataWid.nombre+"/expand/"+dataPest.nombre+"/pest.html?r=" + Math.random(),true);
		req2.send();
		req2.onreadystatechange=function (){
			if (req2.readyState==4 && req2.status==200){
				if (!dataPest.noUpdate || (updateFlag == 2 && dataPest.noUpdate)){

					getServData(dataWid, function(dataServ){
						var out = window["_initPest_"+dataWid.nombre+"_"+dataPest.nombre](dataServ);

						//document.getElementById("pag2cont").appendChild(out);
						replaceIfNotEqual(document.getElementById("pag2cont"), out, req2.responseText);

					});

					for (var i = 0 ; i < document.getElementsByClassName('pest').length ; i++){
						document.getElementsByClassName('pest')[i].className = "pest";
					}
					document.getElementById(dataPest.nombre).className = "pest selected";
				}
			}
		}
	}
	activate.switchPest = switchPest;
}


function getServData(dataid, callback){
	var req = new XMLHttpRequest();
	req.open("GET","servicios/"+dataid.nombre+"/serv.json?r=" + Math.random(),true);
	req.send();
	req.onreadystatechange=function (){
		if (req.readyState==4 && req.status==200){
			var a = JSON.parse(req.responseText)
			callback(a);
		}
	}
}

function replaceIfNotEqual(obj, inn, othtml){
	var callback = callback || 0;
	var c1 = obj.innerHTML;
	var ca1 = c1.replace(/\n/g, "").replace(/\s/g, '');//.replace(/style="[-()%{};:,.a-z 0-9]*"/g, '');

	var a = document.createElement("div");
	a.appendChild(inn);
	var c2 = othtml+a.innerHTML;
	var ca2 = c2.replace(/\n/g, "").replace(/\s/g, '');//.replace(/style="[-()%{};:,.a-z 0-9]*"/g, '');
	//console.log(ca1 + "|||||"+ca2);
	if (ca1 != ca2){
		obj.innerHTML = " ";
		obj.innerHTML = othtml;
		obj.appendChild(inn);
	}
}


(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

window.addEventListener("beforeunload", function (){
	if (__USERINFO2.user){
		saveUser();
	}
}, false);


/*!function(d,s,id){
	var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';
	if(!d.getElementById(id)){
		js=d.createElement(s);
		js.id=id;js.src=p+"://platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js,fjs);
	}
}(document,"script","twitter-wjs")*/