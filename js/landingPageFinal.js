/*
 * ====================================================================
 * Concentrado de funciones de javascript que seran utilizadas en
 * la pagina www.bossNemployee.com en su segunda landingPage.
 * ====================================================================
 */

function objectsForVerticalAlign () {
	var objects = document.getElementsByClassName ('verticalAlign');
	for (var i=0; i<objects.length; i++) {
 		var pixelsQtyChild = objects[i].clientHeight / 2;
    var pixelsQtyParent = objects[i].parentElement.clientHeight / 2;
    var pixelsQty = pixelsQtyParent - pixelsQtyChild - 30;
 	  objects[i].style.top = pixelsQty + 'px';
 	}
}

function objectsForAbsoluteVerticalAlign () {
	var objects = document.getElementsByClassName ('absoluteVerticalAlign');
	for (var i=0; i<objects.length; i++) {
		var pixelsQtyChild = objects[i].clientHeight / 2;
		var pixelsQtyParent = objects[i].parentElement.clientHeight / 2;
		var pixelsQty = pixelsQtyParent - pixelsQtyChild - 50;
		objects[i].style.top = pixelsQty + 'px';
	}
}

/*
 * ====================================================================
 * Compendio de funciones que ayudan a controlar las pestañas de la
 * seccion 2.
 * ====================================================================
 */


var layers = document.getElementsByClassName ('layerRectangle');
var statusLayer = [true, true, true, true, true];
var messageLayer = document.getElementsByClassName ('messageLayer');

function showLayer () {
 	for (var i=0; i<layers.length; i++) {
		switch (i) {
			case 0:
				var clase = 'layerRectangle layerRectangle1';
				break;
			case 1:
				var clase = 'layerRectangle layerRectangle2';
				break;
			case 2:
				var clase = 'layerRectangle layerRectangle3';
				break;
			case 3:
				var clase = 'layerRectangle layerRectangle4';
				break;
			case 4:
				var clase = 'layerRectangle layerRectangle5';
				break;
		}
		layers[i].className = clase;
 		layers[i].style.borderBottom = '2px solid white';
 		messageLayer[i].style.display = 'none';
		statusLayer[i] = true;
 	}
 	messageLayer[4].style.display = 'inline-block';
	setTimeout (function (){
		objectsForAbsoluteVerticalAlign ();
	}, 1000);
}

function collapseLayer (targetLayer) {
	 if (statusLayer[targetLayer] == true) {
		 for (var i = targetLayer + 1; i < layers.length; i++) {
			 layers[i].className = 'layerRectangle layerRectangleCollapse';
			 statusLayer[i] = false;
			 messageLayer[i].style.display = 'none';
		 }
	 }
	 else if (statusLayer[targetLayer] == false) {
		 for (var i = targetLayer; i >= 0; i--) {
			 switch (i) {
				 case 0:
				   var clase = 'layerRectangle layerRectangle1';
					 break;
				 case 1:
					 var clase = 'layerRectangle layerRectangle2';
					 break;
				 case 2:
				   var clase = 'layerRectangle layerRectangle3';
					 break;
				 case 3:
				   var clase = 'layerRectangle layerRectangle4';
					 break;
				 case 4:
		  	   var clase = 'layerRectangle layerRectangle5';
					 break;
			 }
			 layers[i].className = clase;
			 statusLayer[i] = true;
			 messageLayer[i].style.display = 'none';
		 }
	 }
	 setTimeout (function () {
		 messageLayer[targetLayer].style.display = 'inline-block';
		 objectsForAbsoluteVerticalAlign ();
	 }, 1000);
}

/*
 * ====================================================================
 * Funciones relacionadas con el menu.
 * ====================================================================
 */

var statusMenu = false;
var statusMenuLinks = false;

function menu () {
 	var menu = document.getElementById ('menu');
 	if (statusMenu == false) {
 		statusMenu = true;
 		menu.className = 'menu menuStatus2';
 		setTimeout (function () {
 			menu.className = 'menu menuStatus3';
 		}, 1000);
 	}
 	else {
 		statusMenu = false;
		menu.className = 'menu menuStatus2';
 		setTimeout (function () {
			menu.className = 'menu menuStatus1';
 		}, 1000);
 	}
}

function eventClickMenuLink () {
 	var textMenuLink = document.getElementsByClassName ('textMenuLink');
 	for (var i=0; i<textMenuLink.length; i++){
 		textMenuLink[i].addEventListener ('click', function () {
			var subject = this.getAttribute ('data-subject');
			statusMenuLinks = false;
 			clickMenuLink (subject);
 		});
 	}
	var btnMenuTop = document.getElementById ('btnMenuTop');
	btnMenuTop.addEventListener ('click', function () {
		statusMenuLinks = true;
		clickMenuLink (0);
	});
}

function clickMenuLink (dataSubject) {
	var linksMenu = document.getElementById ('linksMenu');
	var sectionsMenu = document.getElementById ('sectionsMenu');
	if (statusMenuLinks == false) {
		linksMenu.className = 'col-xs-6 linksMenu contentcenter';
		sectionsMenu.className = 'col-xs-6 sectionsMenu contentcenter';
		sectionsMenu.style.opacity = 0;
		setTimeout (function () {
			requestMenu (dataSubject);
			sectionsMenu.style.opacity = 1;
		}, 1000);
	}
	else if (statusMenuLinks == true) {
		sectionsMenu.style.opacity = 0;
		setTimeout (function () {
			linksMenu.className = 'col-xs-12 linksMenu contentcenter';
			sectionsMenu.className = 'col-xs-0 sectionsMenu contentcenter';
		}, 1000);
	}
}

function requestMenu (dataSubject) {
	ajax = objectAjax ();
	var URL = '../' + dataSubject + '.txt';
	ajax.onreadystatechange = function () {
		document.getElementById ('sectionsMenu').innerHTML = ajax.responseText;
	}
	ajax.open ('POST', URL, true);
	ajax.send ();
}

/*
 * ====================================================================
 * Script para controlar la barra de opiniones de la seccion3.
 * ====================================================================
 */

var opinion = document.getElementsByClassName ('opinion');
var statusOpinion = [false, false, false];

function showOpinionStart () {
	opinion[0].style.display = 'inline-block';
	statusOpinion[0] = true;
	objectsForVerticalAlign ();
}

function showOpinion (direction) {
	for (var i = 0; i < opinion.length; i++) {
		if (statusOpinion[i] == true) {
			opinion[i].style.display = 'none';
			statusOpinion[i] = false;
			if (direction == 'next') {
				if (i == opinion.length - 1) {
					i = 0;
				}
				else {
					i += 1;
				}
			}
			else if (direction == 'previous') {
				if (i == 0) {
					i = opinion.length - 1;
				}
				else {
					i -= 1;
				}
			}
			opinion[i].style.display = 'inline-block';
			statusOpinion[i] = true;
			objectsForVerticalAlign ();
			break;
		}
	}
}

/*
 * ====================================================================
 * La funcion hiddeNavAndFooter () esta asociada al elemento workspace
 * directamente en el html. Por alguna razon la funcion no se dispara
 * con el addEventListener-workspace-click.
 * ====================================================================
 */

var statusNavAndFooter = true;
var originOfClick = 'workspace';

function hiddeNavAndFooter () {
	if (statusNavAndFooter == true) {
		document.getElementById ('navbar').style.top = '-50px';
		document.getElementById ('footer').style.bottom = '-39px';
		statusNavAndFooter = false;
	}
	else {
		if (originOfClick == 'workspace') {
			document.getElementById ('navbar').style.top = '0px';
			document.getElementById ('footer').style.bottom = '0px';
			statusNavAndFooter = true;
		}
		else {
			originOfClick = 'workspace';
		}
	}
}

function justHiddeNavAndFooter (){
	originOfClick = 'btnPlay';
}

/*
 * ====================================================================
 * Funciones relacionadas con el funcionamiento del video principal.
 * Video ligado al boton play de la seccion 1.
 * ====================================================================
 */

function clickPlayVideo () {
	justHiddeNavAndFooter ();
	var video = document.getElementById ('videoPlay');
	video.style.zIndex = 302;
	video.style.backgroundColor = 'rgba(0,0,0,0.7)';
	video.style.opacity = 1;
	video = document.getElementsByClassName ('video')[0];
	video.style.backgroundColor = 'rgba(0,0,0,1)';
	video.style.opacity = '1';
	setTimeout(function () {
	    video.play ();
	}, 1000);
}

function closePlayVideo () {
	var video = document.getElementsByClassName ('video')[0];
	video.pause ();
	video.style.backgroundColor = 'rgba(0,0,0,0)';
	video.style.opacity = 0;
	video = document.getElementById ('videoPlay');
	video.style.backgroundColor = 'rgba(0,0,0,0)';
	video.style.opacity = 0;
	hiddeNavAndFooter ();
	setTimeout (function () {
		video.style.zIndex = '-302';
	}, 1000);
}

function eventClickPlayVideo () {
	document.getElementById ('btnPlay').addEventListener ('click',function () {
		clickPlayVideo ();
	});
	document.getElementById ('btnCerrarVideo').addEventListener ('click',function () {
		closePlayVideo ();
	});
}

/*
 * ====================================================================
 * Todas las secciones del html inician con opacity = 0 con la
 * intencion de dar soporte a la transicion entre secciones del evento
 * scroll. Por ello, al cargar la pagina, cambiamos la opacidad de la
 * primera seccion.
 * ====================================================================
 */

function loadConditions () {
	var section1 = document.getElementById ('section1');
	section1.style.opacity = 1;
	location.href = '#' + section1.getAttribute ('name');
}

/*
 * ====================================================================
 * Las siguientes funciones se dedican a establecer todo lo necesario
 * para la navegacion de la pagina usando el scroll. Tomar en cuenta
 * que se utiliza una funcion con el evento wheel para computadoras
 * y una con eventos onTouch para dispositivos moviles.
 * ====================================================================
 */

var puntero = 0;

function displacementScroll (value) {
	var sections = document.getElementsByClassName ('section');
	if (value == 'up') {
		if (puntero != 0) {
			sections[puntero].style.opacity = 0;
			setTimeout (function () {
				location.href = '#' + sections[puntero - 1].getAttribute ('name');
				sections[puntero - 1].style.opacity = 1;
				puntero -= 1;
				if (puntero == 1) {
					showLayer ();
				}
			}, 1000);
		}
	}
	else if (value == 'down') {
		if (puntero != sections.length - 1) {
			sections[puntero].style.opacity = 0;
			setTimeout (function () {
				location.href = '#' + sections[puntero + 1].getAttribute ('name');
				sections[puntero + 1].style.opacity = 1;
				puntero += 1;
				if (puntero == 1) {
					showLayer ();
				}
			}, 1000);
		}
	}
}

/*
 * ====================================================================
 * Cuando se realiza el cambio de orientacion de la pantalla en
 * dispositivos portatiles, el modo de fullpage falla, por lo que la
 * ubicacion de la seccion debe ser reiniciada. Debido a que el evento
 * orientationchange detona antes de que las propiedades CSS sean
 * actualizadas, se agrego un setTimeout para darle el tiempo suficiente.
 * Primero se actualiza el CSS y despues se reubica la seccion.
 * ====================================================================
 */

function reSetOrientationChange () {
	var sections = document.getElementsByClassName ('section');
	setTimeout (function () {
		location.href = '#' + sections[puntero].getAttribute ('name');
	}, 250);
}

/*
 * ====================================================================
 * La funcion noPropagationClickEvent nos ayuda a evitar que, al hacer
 * click sobre un boton, este click detone la funcion hiddeNavAndFooter.
 * Por alguna razon, la funcion no se dispara con el addEventListener,
 * por lo que la funcion esta agregada directamente en el html.
 * ====================================================================
 */

 function noPropagationClick (event) {
	 event.stopPropagation ();
 }

/*
 * ====================================================================
 * Los eventos se encuentran de aqui en adelante.
 * ====================================================================
 */

window.addEventListener('load', function () {
	loadConditions ();
  objectsForVerticalAlign ();
  objectsForAbsoluteVerticalAlign ();
	showOpinionStart ();
	keyboardAndroid ();
	eventClickPlayVideo ();
	eventClickMenuLink ();
});

window.addEventListener('resize', function () {
	if (clickOnField == false) {
		objectsForVerticalAlign ();
	  objectsForAbsoluteVerticalAlign ();
		reSetOrientationChange ();
	}
  else if (clickOnField == true) {
  	justHiddeNavAndFooter ();
		objectsForAbsoluteVerticalAlign ();
  }
});

window.addEventListener('wheel', function (event) {
	var direction = event.deltaY;
	if (direction > 0) {
		direction = 'down';
	}
	else if (direction < 0) {
		direction = 'up';
	}
	displacementScroll (direction);
});

window.addEventListener ('touchstart', function (event) {
	start = event.changedTouches[0].clientY;
});

window.addEventListener ('touchend', function (event) {
	var end = event.changedTouches[0].clientY;
	var direction = end - start;
	if (direction < -10) {
		direction = 'down';
	}
	else if (direction > 10) {
		direction = 'up';
	}
	displacementScroll (direction);
});

window.addEventListener('orientationchange', function () {
	reSetOrientationChange ();
	setTimeout (function () {
		objectsForAbsoluteVerticalAlign ();
	}, 1000);
});

/*
 * ====================================================================
 * Funciones para prevenir el problema causado por la aparicion del
 * teclado en android. Recordar que en android, cuando se da click en
 * un campo, el teclado virtual es mostrado y esto cambia el tamaño de
 * la pantalla. Esto no pasa en iOS.
 * ====================================================================
 */

var clickOnField = false;

function keyboardAndroid () {
	var inputs = document.getElementsByTagName ('input');
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener('focus', function () {
			clickOnField = true;
		});
		inputs[i].addEventListener('blur', function () {
			clickOnField = false;
		});
	}
}

/*
 * ====================================================================
 * Funcion de Facebook.
 * ====================================================================
 */

(function (d, s, id) {
	var js, fjs = d.getElementsByTagName (s)[0];
	if (d.getElementById (id)) return;
	js = d.createElement (s);
	js.id = id;
	js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v2.5";
	fjs.parentNode.insertBefore (js, fjs);
}
(document, 'script', 'facebook-jssdk'));

/*
 * ====================================================================
 * Funcion de Twitter.
 * ====================================================================
 */

!function (d,s,id) {
	var js, fjs=d.getElementsByTagName (s)[0], p=/^http:/.test(d.location)?'http':'https';
	if (!d.getElementById (id)) {
		js=d.createElement (s);
		js.id=id;
		js.src=p+'://platform.twitter.com/widgets.js';
		fjs.parentNode.insertBefore (js,fjs);
	}
}
(document, 'script', 'twitter-wjs');

/*
 * ====================================================================
 * Funcion Ajax.
 * ====================================================================
 */

function objectAjax (){
	try {
		object = new XMLHttpRequest ();
	}
	catch (err1) {
		try {
			object = new ActiveXObject ('Msxm12.XMLHTTP');
		}
		catch (err2) {
			try {
				object = new ActiveXObject ('Microsoft.XMLHTTP');
			}
			catch (err3) {
				object = false;
			}
		}
	}
	return object;
}

/*
 * ===========================================================================
 * Autor: Edgar Leon.
 * Proyecto: www.bossNemployee.com
 * ===========================================================================
 */
