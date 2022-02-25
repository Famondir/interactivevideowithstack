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

function loadCSS(cssId, cssUrl) {
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

function showD(s) {
	document.getElementById(s).style.display = 'block';
}

function showV(s) {
	document.getElementById(s).style.visibility = 'visible';
}

function toggleV(s) {
  var x = document.getElementById(s);
  if (x.style.visibility === "hidden") {
	x.style.visibility = "visible";
  } else {
	x.style.visibility = "hidden";
  }
}

function stateQuestion(event) {
	if (player.currentTime() >= maxtime) {
		player.pause();
		// getState();
		
		if (anzahlRichtig < list.length-1) {
			showD(list[anzahlRichtig][0]);
			showV("questionCanvas");
		}
	}
}

function getState() {
	if (anzahlRichtig < list.length-1) {
		console.log("#-----# Aktueller Aufgabenstatus #-----#");
		console.log("Sichtbare prt-Feedbackfelder: ", anzahl);
		console.log("MaxTime: ", maxtime);
		console.log("Aktuelle Aufgabe: ", aktuelleAufgabe);
		console.log("aktuelle Aufgabe sichtbar?: ", (document.getElementById(aktuelleAufgabe).style.display != 'none'));
		console.log("Anzahl richtig gelöster Aufgaben: ", anzahlRichtig);
		console.log("Aktuelle Videozeit: ", player.currentTime());
		console.log("");
	} else {
		console.log("#-----# Aktueller Aufgabenstatus #-----#");
		console.log("Sichtbare prt-Feedbackfelder: ", anzahl);
		console.log("MaxTime: ", maxtime);
		console.log("Aktuelle Aufgabe: ", "no further questions to state\n");
		console.log("Anzahl richtig gelöster Aufgaben: ", anzahlRichtig);
		console.log("Aktuelle Videozeit: ", player.currentTime());
		console.log("");
	}
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