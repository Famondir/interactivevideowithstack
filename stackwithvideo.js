/* global document */

/**
 * Copyright (c) 2022
 *
 * This script makes interactive videos with STACK questions possible. To use this script also load vjs v7.18.0
 *
 * @summary This script makes interactive videos with STACK questions possible.
 * @author Simon Schäfer <Simon.Schaefer@HTW-Berlin.de>
 *
 * Created at     : 2022-02-16
 * Last modified  : 2022-02-24
 */

// #----------# defining functions #----------#

function loadCSS(cssId, cssUrl) { // lädt eine CSS Datei anhand ihrer URL
	if (!document.getElementById(cssId)) {
		var cssLink  = document.createElement('link');
		cssLink.id   = cssId;
		cssLink.rel  = 'stylesheet';
		cssLink.type = 'text/css';
		cssLink.href = cssUrl;
		cssLink.media = 'all';
		document.head.appendChild(cssLink);
	}
}

function showD(s) { // schaltet ein Element sichtbar via display-Wert
	document.getElementById(s).style.display = 'block';
}

function showV(s) { // schaltet ein Element sichtbar via visible-Wert
	document.getElementById(s).style.visibility = 'visible';
}

function toggleV(s) { // schaltet zwischen Sichtbarkeit und Unsichtbarkeit hin und her (bezogen auf visibility-Wert)
  var x = document.getElementById(s);
  if (x.style.visibility === "hidden") {
	x.style.visibility = "visible";
  } else {
	x.style.visibility = "hidden";
  }
}

function stateQuestion(event) {
	if (player.currentTime() >= maxtime) { // wenn das Video am Ende des aktuellen Abschnitts angekommen ist
		player.pause();
		// getState();
		
		if (anzahlRichtig < list.length-1) { // zeige die nächste Aufgabe, wenn es noch eine gibt
			showD(list[anzahlRichtig][0]);
			showV("questionCanvas");
		}
	}
}

function getState() {
	if (anzahlRichtig < list.length-1) { // es wurden noch nicht alle Fragen angezeigt
		console.log("#-----# Aktueller Aufgabenstatus #-----#");
		console.log("Sichtbare prt-Feedbackfelder: ", anzahl);
		console.log("MaxTime: ", maxtime);
		console.log("Aktuelle Aufgabe: ", aktuelleAufgabe);
		console.log("aktuelle Aufgabe sichtbar?: ", (document.getElementById(aktuelleAufgabe).style.display != 'none'));
		console.log("Anzahl richtig gelöster Aufgaben: ", anzahlRichtig);
		console.log("Aktuelle Videozeit: ", player.currentTime());
		console.log("");
	} else { // es gibt keine weitere Aufgabe mehr
		console.log("#-----# Aktueller Aufgabenstatus #-----#");
		console.log("Sichtbare prt-Feedbackfelder: ", anzahl);
		console.log("MaxTime: ", maxtime);
		console.log("Aktuelle Aufgabe: ", "no further questions to state\n");
		console.log("Anzahl richtig gelöster Aufgaben: ", anzahlRichtig);
		console.log("Aktuelle Videozeit: ", player.currentTime());
		console.log("");
	}
}

function uebertrage(){
	console.log("Speichere aktuelle Videoposition");
	document.querySelector('#zahl').querySelector('input').value=player.currentTime();
};

// Quelle: https://stackoverflow.com/a/61511955/14406173
function waitForElm(selector) {
	return new Promise(resolve => {
		if (document.querySelector(selector)) {
			return resolve(document.querySelector(selector));
		}

		const observer = new MutationObserver(mutations => {
			if (document.querySelector(selector)) {
				resolve(document.querySelector(selector));
				observer.disconnect();
			}
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
	});
}

// Chapter markers and disabled timebar for video
// Quellen: https://codepen.io/nickwanhere/pen/gOMderr und https://codepen.io/team/rcrooks1969/pen/LJBdPJ
function addMarkers() {
	
	// if we are not waiting for .vjs-progress-holder in addition to loadedmetadata we might not find the right element
	waitForElm('.vjs-progress-holder').then((progressHolder) => {
		// console.log('vjs-progress-holder is ready');
		
		var videoDuration = player.duration();
		console.log("Videolänge beträgt: "+videoDuration);

		// Loop over each cue point, dynamically create a div for each
		// then place div in progress bar
		for (i = 0; i <= anzahlRichtig && i < list.length-1; i++) {
			
			var elem = document.createElement("div");
			elem.className = "vjs-marker";
			elem.id = "cp" + i;
			elem.style.left = list[i][1]/videoDuration*100 + "%";
			elem.dataset.time = list[i][1];
			
			var elemSpan = document.createElement("span");
			elemSpan.textContent = list[i][2];
			elem.appendChild(elemSpan);
			
			elem.onclick = function () {
				if (this.dataset.time <= maxtime) {
					player.currentTime(this.dataset.time);
					console.log("Sprung erfolgreich.");
					stateQuestion(); // zeigt neue Aufgabe, wenn der Sprungmarker der neueste ist
				} else {
					console.log("Hier darfst du noch nicht hin springen.");
				}
			};
			
			progressHolder.appendChild(elem);
		}
		
		// Add blocker
			var elem = document.createElement("div");
			elem.className = "vjs-marker vjs-blocker";
			elem.style.left = list[anzahlRichtig][1]/videoDuration*100 + "%";
			elem.style.width = (100-list[anzahlRichtig][1]/videoDuration*100) + "%"
			
			var elemSpan = document.createElement("span");
			elemSpan.textContent = "Hierhin können Sie noch nicht springen.";
			elem.appendChild(elemSpan);
			
			progressHolder.appendChild(elem);
	});
		
}
 
// #----------# loading CSS #----------#
 
// loading CSS for Video JS
var cssId = 'vjsCSS';
loadCSS(cssId, 'https://vjs.zencdn.net/7.18.0/video-js.css');

// loading CSS for interactive video player
cssId = 'interactivePlayerCSS'
loadCSS(cssId, 'https://videowithstack.4lima.de/stackwithvideo.css');

// #----------# adding eventlisteners #----------#



// #----------#  #----------#