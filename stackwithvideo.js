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
 * Last modified  : 2022-04-20
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

function moveQ(s) {
	// schiebt alle Fragen ins Archiv, die nicht dem Zeitintervall entsprechen
	var qArchive = document.getElementById("aufgabensammlung");	
	for (let i = 0; i < list.length-1; i++) {
		var el = document.getElementById(list[i][0]);
		qArchive.insertAdjacentElement('beforeend', el);
	}
	
	// schiebt die Aufgabe, die dem Zeitintervall entspricht, ins questionCanvas
	var currentQuestion = document.getElementById(s);
	currentQuestion.classList.add("overflow-auto"); // lässt scrollen, falls Inhalt zu groß für Anzeigefeld
	document.getElementById('questionCanvasHeader').insertAdjacentElement('afterend', currentQuestion); // verschiebt die Aufgabe in den Platzhalter
}

function stateQuestion(event) {
	if (Optionen["navigation"] != "free") {
		if (player.currentTime() >= maxtime) { // wenn das Video am Ende des aktuellen Abschnitts angekommen ist
			player.pause();
			// getState();
			
			if (anzahlRichtig < list.length-1) { // zeige die nächste Aufgabe, wenn es noch eine gibt
				showD(list[anzahlRichtig][0]);
				showV("questionCanvas");
			}
		}
	} else {
		for (let i = list.length-1; i >= 0; i--) {
			if (player.currentTime() >= list[i][1]) {
				moveQ(list[i][0]);
				showD(list[i][0]);
				break;
			}
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
		if (Optionen["navigation"] == "free") {
			numDivs = list.length-1;
		} else {
			numDivs = anzahlRichtig;
		}
		
		for (i = 0; i <= numDivs && i < list.length-1; i++) {
			
			var elem = document.createElement("div");
			elem.className = "vjs-marker";
			elem.id = "cp" + i;
			elem.style.left = list[i][1]/videoDuration*100 + "%";
			elem.dataset.time = list[i][1];
			
			var elemSpan = document.createElement("span");
			elemSpan.textContent = list[i][2];
			elem.appendChild(elemSpan);
			
			elem.onclick = function () {
				if (Optionen["navigation"] != "free") {
					if (this.dataset.time <= maxtime) {
						player.currentTime(this.dataset.time);
						console.log("Sprung erfolgreich.");
						// stateQuestion(); // zeigt neue Aufgabe, wenn der Sprungmarker der neueste ist
					} else {
						console.log("Hier darfst du noch nicht hin springen.");
					}
				} else {
					player.currentTime(this.dataset.time);
					console.log("Sprung erfolgreich.");
				}
			};
			
			progressHolder.appendChild(elem);
		}
		
		// Add blocker
			var elem = document.createElement("div");
			elem.className = "vjs-marker vjs-blocker";
			elem.style.left = list[numDivs][1]/videoDuration*100 + "%";
			elem.style.width = (100-list[numDivs][1]/videoDuration*100) + "%"
			
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

// #----------# defining global variables #----------#

var player = null;
var maxtime = 0;
var list = null;
var options = null;
var prtList = null;
var anzahl = 0;
var anzahlRichtig = 0;
var aktuelleAufgabe = "";
const Optionen = [];

// #----------# adding eventlisteners #----------#

// Seitenstruktur ist geladen, Bilder etc. aber noch nicht
document.addEventListener("DOMContentLoaded", function(event) {
	console.log('DOM is fully loaded');
	
	for (let i = 0; i < options.length; i++) {
		Optionen[options[i][0]] = options[i][1];
	}
	
	// fügt der in STACK definierten Liste der Aufgaben einen Knoten hinzu, der die maximale Videolaufzeit enthalten wird
	// dafür müssen aber erst die Metadaten des Videos geladen sein
	list.push(["none", NaN]);
	
	// setzt die Referenz zum vjs player
	player = videojs("video1");
	
	// Check-Button verschieben		
	const checkButton = document.querySelector('input[type="submit"]')
	checkButton.classList.add("btn-block");
	checkButton.classList.add("btn-block-full");
	checkButton.onclick = function() {uebertrage()};
	document.getElementById('questionCanvasFooter').insertAdjacentElement('beforeend', checkButton);

	// Aufgabenstatus updaten
	// zählt, wie viele Feedbackfelder von STACK schon freigegeben wurden, da eine Eingabe für die Aufgabe erfolgte
	// bezieht aber das versteckte Feedbackfeld prtZ nicht mit
	prtList = document.getElementsByClassName("stackprtfeedback");
	var prtArray = Array.prototype.slice.call(prtList).filter(function (el) {return !el.classList.contains("stackprtfeedback-prtZ")});
	anzahl = prtArray.length;
	
	anzahlRichtig = 0;
	for (let i = 0; i < anzahl; i++) {
		//  console.log(prtArray[i].children[0].className=="correct");
		if (prtArray[i].children[0].className=="correct") {
			anzahlRichtig+=1;
		}
		
		// schaltet die bereits richtig gelösten Aufgaben und die neue Aufgabe sichtbar
		showD(list[i][0]);
	}
	
	aktuelleAufgabe = list[anzahlRichtig][0];
	maxtime = list[anzahlRichtig][1];
	
	getState();
	
	// wenn der Player initialisiert wurde...
	player.ready(function(){        
		console.log('player ready');
		
		// wird genutzt, um das vorspulen zu verhindern (Quelle: https://stackoverflow.com/a/39754847/14406173)	
		var lastUpdated = 'currentTime';
		var timeTracking = {
			watchedTime: 0,
			currentTime: 0
		};
		
		// wenn die Videolänge festgestellt wurde...
		this.on('loadedmetadata', function(){		
			console.log('metadata loaded');
			
			// schreibt die Videogesamtlänge in die erweiterte Liste
			list[list.length-1] = (["none",player.duration()]);
			maxtime = list[anzahlRichtig][1];
			
			// setzt Videozeit auf letzten Videostand
			if (document.querySelector('#zaehler')) {
				var currTime = (document.querySelector('#zaehler').innerHTML > maxtime ? maxtime : document.querySelector('#zaehler').innerHTML);
				console.log("Setze Video fort bei: ", currTime);
			} else {
				var currTime = 0;
			}
			
			timeTracking["watchedTime"] = currTime;
			timeTracking["currentTime"] = currTime;
			player.currentTime(currTime);
			
			addMarkers(); // fügt der prograss-bar die Kapitelmarken und den schwarzen Balken hinzu
			player.play(); // spiele nach erstem Check automatisch weiter; quasi autoplay

			// ändere das Abspielsymbol passend zum Playerstatus
			waitForElm('.vjs-play-control').then((elm) => {
				if (!player.paused) {
					elm.classList.add('vjs-playing');
				} else {
					elm.classList.add('vjs-paused');
				}
			});
		
		});		
		
		// wird genutzt, um das vorspulen zu verhindern (Quelle: https://stackoverflow.com/a/39754847/14406173)	
		// wenn sich die Videozeit ändert...
		this.on('timeupdate', function () {
			// ohne dass der benutzer eingreift...
			if (!player.seeking()) {
				if (player.currentTime() > timeTracking.watchedTime) {
					timeTracking.watchedTime = player.currentTime();
					lastUpdated = 'watchedTime';
				} else {
					timeTracking.currentTime = player.currentTime();
					lastUpdated = 'currentTime';
				}
				
				stateQuestion(); // prüft, ob neue Frage angezeigt werden muss
			}
		});
		
		// wenn der Benutzer im Video springen möchte...
		if (Optionen["navigation"] != "free") {
			this.on('seeking', function () {
				// guard against infinite recursion:
				// user seeks, seeking is fired, currentTime is modified, seeking is fired, current time is modified, ....
				var delta = player.currentTime() - maxtime;
				if (delta > 0) {
					player.pause();
					console.log("Video pausiert, da zu weit gesprungen");
					//play back from where the user started seeking after rewind or without rewind
					player.currentTime((timeTracking[lastUpdated] < maxtime ? timeTracking[lastUpdated] : maxtime)); // soll Endlosschleife vorbeugen
					player.play();
				}
			});
		}
		
		// Fügt dem Player einen Button hinzu, mit dem die Aufgabe angezeigt und ausgeblendet werden kann
		var Button = videojs.getComponent('Button');
		var MyButton = videojs.extend(Button, {
		  constructor: function() {
			Button.apply(this, arguments);
			// initialize your button
			this.addClass('stack-question-button');
			this.controlText("toggle question visibility");
		  },
		  handleClick: function() {
			// do something on click
			toggleV('questionCanvas');
		  }
		});
		
		videojs.registerComponent('MyButton', MyButton);	
		player.getChild('controlBar').addChild('myButton', {}, 1);
		
		// Fügt Checkmarkicon auf Playerbutton hinzu
		document.querySelector('.video-js .stack-question-button .vjs-icon-placeholder').classList.add("svg-icon");
		document.querySelector('.video-js .stack-question-button .vjs-icon-placeholder').classList.add("svg-baseline");
		var svgCM = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svgCM.setAttributeNS(null, 'viewBox', '0 0 1792 1792');
		document.querySelector('.video-js .stack-question-button .vjs-icon-placeholder').appendChild(svgCM);
		var pathCM = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		pathCM.setAttributeNS(null, 'd', 'M1472 930v318q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q63 0 117 25 15 7 18 23 3 17-9 29l-49 49q-10 10-23 10-3 0-9-2-23-6-45-6h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-254q0-13 9-22l64-64q10-10 23-10 6 0 12 3 20 8 20 29zm231-489l-814 814q-24 24-57 24t-57-24l-430-430q-24-24-24-57t24-57l110-110q24-24 57-24t57 24l263 263 647-647q24-24 57-24t57 24l110 110q24 24 24 57t-24 57z');
		document.querySelector('.video-js .stack-question-button .vjs-icon-placeholder').children[0].appendChild(pathCM);
	});
	
	// Neueste Aufgabe verschieben
	if (anzahlRichtig < list.length-1) { // wenn noch nicht alle Aufgaben gelöst wurden
		moveQ(list[anzahlRichtig][0]);
	}
	
	// Alte Aufgaben verschieben
	if (Optionen["archive"] == "player") {		
		document.getElementById('questionCanvas').insertAdjacentHTML('afterbegin', `
			<ul class="nav nav-tabs" id="myTab" role="tablist">
			  <li class="nav-item" role="presentation">
				<a class="nav-link active" id="question-tab" data-toggle="tab" href="#questionTab" role="tab" aria-controls="home" aria-selected="true">Aktuelle Aufgabe</a>
			  </li>
			  <li class="nav-item" role="presentation">
				<a class="nav-link" id="archive-tab" data-toggle="tab" href="#archiveTab" role="tab" aria-controls="profile" aria-selected="false">Aufgabensammlung</a>
			  </li>
			</ul>
			<div class="tab-content" id="myTabContent">
			  <div class="tab-pane fade show active" id="questionTab" role="tabpanel" aria-labelledby="question-tab"></div>
			  <div class="tab-pane fade" id="archiveTab" role="tabpanel" aria-labelledby="archive-tab"></div>
			</div>
		`);
		
		var qArchive = document.querySelector("#aufgabensammlung")
		document.getElementById('archiveTab').insertAdjacentElement('beforeend', qArchive);
		document.getElementById('aufgabensammlungHeader').insertAdjacentHTML('beforeend', `
			<button type="button" class="close ml-4" onclick="toggleV('questionCanvas'); return false;"  id="closeButton2">
			  <span aria-hidden="true">&times;</span>
			</button>
		`);
		
		if (anzahlRichtig < list.length-1) { // wenn noch nicht alle Aufgaben gelöst wurden
			var currentQuestion = document.getElementById(list[anzahlRichtig][0]);
			currentQuestion.classList.add("overflow-auto"); // lässt scrollen, falls Inhalt zu große für Anzeigefeld
			document.getElementById('questionTab').insertAdjacentElement('afterbegin', currentQuestion); // verschiebt die Aufgabe in den Platzhalter
		} 
		
		var qHeader = document.getElementById('questionCanvasHeader');
		document.getElementById('questionTab').insertAdjacentElement('afterbegin', qHeader);
	}
	
	// Aufgabensammlung anzeigen, wenn nötig
	if (anzahlRichtig > 0 && Optionen["navigation"] != "free") {
		document.getElementById("aufgabensammlung").style.display = "block";
	}
	
	const playerCanvas = document.querySelector(".video-js")
	const questionCanvas = document.querySelector("#questionCanvas");
	playerCanvas.appendChild(questionCanvas);
	
	if (anzahlRichtig < anzahl) {
		showV("questionCanvas");
	}
});

window.onload = (event) => {
	console.log('page is fully loaded');
};

// #----------#  #----------#