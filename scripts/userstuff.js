var __USERINFO = {};
var __USERINFO2 = {};
var hl_sid = 0;
function ifAutoLogin(){
	function getCookie(cname) {//w3s
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i].trim();
			if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
		}
			return 0;
	}
	hl_sid = getCookie("hl_sid");
	if (hl_sid != 0){
		loginSubmit();
	}
	
}

function loginSubmit() {
	var usr = document.getElementsByName("usuario")[0].value;
	var crPass = CryptoJS.SHA1(document.getElementsByName("pass")[0].value);
	var req = new XMLHttpRequest();
	req.open("POST","backend_php/user.php", true);
	req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	if (hl_sid != 0){
		req.send("sid="+hl_sid);
	} else {
		req.send("u="+usr+"&p="+crPass);
	}
	req.onreadystatechange=function(){
		if (req.readyState==4 && req.status==200){
			userData = JSON.parse(req.responseText);

			if (userData.correct == 1){
				sombreado("login",1);
				document.getElementById("subopNoLogin").className = "subSubop";
				document.getElementById("subopLogin").className = "subSubop show";
				document.getElementById("pregunta").className = "show";
				document.getElementById("autorespuesta").textContent = userData.nombre;
				document.getElementById("errorlogin").className = " ";
				document.getElementById("login").reset();
				document.cookie="hl_sid="+userData.sid+"; expires=Tue, 01 Jan 2030 00:00:00 GMT";
				__USERINFO = userData.datos;
				__USERINFO2.user = usr;
				__USERINFO2.pass = crPass;


				createPag1();
				setUserBackground(2);
			} else {
				document.getElementById("errorlogin").className = "show";
				document.getElementById("errorlogin").textContent = userData.nombre;
			}
		} else if (req.status==404)  {
			console.log(req.status, req.readyState, req.responseText);
		}
	}

}

function logout(){
	saveUser(function(){
		__USERINFO = {};
		__USERINFO2 = {};
		document.getElementById("subopNoLogin").className = "subSubop show";
		document.getElementById("subopLogin").className = "subSubop";
		document.getElementById("pregunta").className = " ";
		document.getElementById("autorespuesta").textContent = " ";
		createPag1(function(){});
		swOpciones();
		setUserBackground(0);
		document.cookie = "hl_sid=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
		hl_sid = 0;
	}, 1);
}

function registerSubmit(){
	document.getElementById("registerLoadAnim").className = "show";
	var email = document.getElementsByName("email")[0].value;
	var newuser = document.getElementsByName("newuser")[0].value;
	var newpass1t = document.getElementsByName("newpass1")[0].value;
	var newpass2t = document.getElementsByName("newpass2")[0].value;
	var newpass1 = CryptoJS.SHA1(newpass1t);
	var newpass2 = CryptoJS.SHA1(newpass2t);
	var b64ch = window.btoa(document.getElementsByName('recaptcha_challenge_field')[0].value);
	var b64re = window.btoa(document.getElementsByName('recaptcha_response_field')[0].value);

	if (newpass1t == newpass2t && newuser.length >= 4 && newpass1t.length >= 4 && email.indexOf("@") > 0 && email.indexOf(".") > 0){
		var req = new XMLHttpRequest();
		req.open("POST","backend_php/register.php",true);
		req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		req.send("email="+email+"&newuser="+newuser+"&newpass1="+newpass1+"&newpass2="+newpass2+"&ch="+b64ch+"&re="+b64re);
		req.onreadystatechange=function(){
			if (req.readyState==4 && req.status==200){
				status = req.responseText;

				if (status == 1){
					console.log("Registrado Correctamente");
					document.getElementById("registerError").className = " ";
					document.getElementById("registerLoadAnim").className = " ";
					sombreado("register",1);
					document.getElementsByName("usuario")[0].value = newuser;
					document.getElementsByName("pass")[0].value = newpass1t;
					loginSubmit();
				} else if (status == 2) {
					registerlog("Captcha erróneo");
				} else if (status == 3){
					registerlog("Usuario repetido");
				} else {
					registerlog("Error General");
				}	
			}
		}
	} else {
		if (newpass1t != newpass2t){
			registerlog("Las contraseñas no coinciden");
		}
		if (newuser.length < 4){
			registerlog("User muy corto");
		}
		if (newpass1.length < 4){
			registerlog("Contraseña muy corta");
		}
		if(email.indexOf("@") == -1 || email.indexOf("@") == 0 || email.indexOf(".") == -1 || email.indexOf(".") == 0){
			registerlog("E-mail no válido");
		}
		document.getElementById("registerLoadAnim").className = " ";
	}
	function registerlog(input){
		document.getElementById("registerLoadAnim").className = " ";
		var a = document.getElementById("registerError");
		a.innerHTML = " ";
		a.appendChild(document.createTextNode(input));
		a.className = "show";
	}
	
}
function loadCaptcha(){
	Recaptcha.create("6Lfi7fQSAAAAAGZtc1UtPsNyo2DtiSb7OG5NN3rK", 'captcha', {
		tabindex: 1,
		theme: "clean",
		callback: Recaptcha.focus_response_field
	});
}

//funciones de configuracion de usuario

function setUserBackground(fl){
	if (fl == 1){
		url = document.getElementsByName("userBackgroundURL")[0].value;
		document.body.style.backgroundImage = "url("+url+")";
		__USERINFO.userBackgroundURL = url;
		saveUser();
	} else if (fl == 2){
		if (__USERINFO.userBackgroundURL){
			document.body.style.backgroundImage = "url("+__USERINFO.userBackgroundURL+")";
		}
		
	} else {
		document.body.removeAttribute("style");
		__USERINFO.userBackgroundURL = null;
		saveUser();
	}
}

function saveUser(callback, destroy){
	var destroy = destroy || 0;
	callback = callback || 0;
	var req = new XMLHttpRequest();
	req.open("POST","backend_php/getUser.php", true);
	req.setRequestHeader("Content-type","application/x-www-form-urlencoded");

	if (destroy != 0){
		req.send("u="+__USERINFO2.user+"&p="+__USERINFO2.pass+"&data="+window.btoa(JSON.stringify(__USERINFO))+"&sid="+hl_sid);
	} else {
		req.send("u="+__USERINFO2.user+"&p="+__USERINFO2.pass+"&data="+window.btoa(JSON.stringify(__USERINFO)));
	}
	req.onreadystatechange=function(){
		if (req.readyState==4 && req.status==200){
			if (req.responseText == 1){
				if (callback != 0){
					callback();
				}
			} else {
				console.log("error de datos de logout", req.responseText);
			}
		}
	}
}