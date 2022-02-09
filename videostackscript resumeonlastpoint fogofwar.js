/*
<script src="https://vjs.zencdn.net/7.18.0/video.min.js"></script>

<script type="text/javascript">
var cssId = 'myCss';  // you could encode the css path itself to generate id..
if (!document.getElementById(cssId))
{
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://vjs.zencdn.net/7.18.0/video-js.css';
    link.media = 'all';
    head.appendChild(link);
}
</script>
*/

<script type="text/javascript">
	// Quelle: verändert nach https://www.rub.de/ak-mathe-digital/stackselbstlern.js
	function show(s) {
		document.getElementById(s).style.display = 'block';
		/*document.getElementById(s).scrollIntoView();
		document.getElementById(s).focus(); 
		var displaycache = JSON.parse(sessionStorage.getItem("displaycache" + aufgabennummer));
		displaycache[s] = "block";
		sessionStorage.setItem("displaycache" + aufgabennummer, JSON.stringify(displaycache));
		*/
	  }

	function getState () {
		if (anzahlRichtig < list.length-1) {
			console.log("#-----# Aktueller Aufgabenstatus #-----#");
			console.log("Sichtbare prt-Feedbackfelder: ", anzahl);
			console.log("MaxTime: ", maxtime);
			console.log("Aktuelle Aufgabe: ", aktuelleAufgabe);
			console.log("aktuelle Aufgabe sichtbar?: ", (document.getElementById(aktuelleAufgabe).style.display != 'none'));
			console.log("Anzahl richtig gelöster Aufgaben: ", anzahlRichtig);
			console.log("Aktuelle Videozeit: ", video.currentTime);
			console.log("");
		} else {
			console.log("#-----# Aktueller Aufgabenstatus #-----#");
			console.log("Sichtbare prt-Feedbackfelder: ", anzahl);
			console.log("MaxTime: ", maxtime);
			console.log("Aktuelle Aufgabe: ", "no further questions to state\n");
			console.log("Anzahl richtig gelöster Aufgaben: ", anzahlRichtig);
			console.log("Aktuelle Videozeit: ", video.currentTime);
			console.log("");
		}
	}

	function playNext(start = 0, end = 5) {
		video.currentTime = start;
		maxtime = end;
		video.play();
	}
	
	function playCurrent() {
		if (anzahlRichtig > 0) {
			video.currentTime = list[anzahlRichtig-1][1];
		} else {
			video.currentTime = 0;
		}
		
		maxtime = list[anzahlRichtig][1];
		video.play();
	}

	function stateQuestion(event) {
		if (video.currentTime >= maxtime) {
			video.pause();
			getState();
			if (anzahl < list.length-1) {
				show(list[anzahlRichtig][0]);
			}
		}
	}
	
	// Chapter markers
	// Quellen: https://codepen.io/nickwanhere/pen/gOMderr und https://codepen.io/team/rcrooks1969/pen/LJBdPJ
	function addMarkers() {
		
		// var playheadWell = document.getElementsByClassName("vjs-progress-control vjs-control")[0].children[0];
		
		// if we are not waiting for .vjs-progress-holder in addition to loadedmetadata we might not find the right element
		waitForElm('.vjs-progress-holder').then((playheadWell) => {
			console.log('Element is ready');
			// console.log(playheadWell.textContent);
			
			var videoDuration = video.duration;

			// console.log(playheadWell);
			// console.log(videoDuration);
			// console.log("fügt Marker hinzu");

			// Loop over each cue point, dynamically create a div for each
			// then place in div progress bar
			for (i = 0; i <= anzahl && i < list.length-1; i++) {
				
				var elem = document.createElement("div");
				elem.className = "vjs-marker";
				elem.id = "cp" + i;
				elem.style.left = list[i][1]/videoDuration*100 + "%";
				elem.dataset.time = list[i][1];
				// console.log("time:", list[i][1]);
				console.log("elem.style.left", elem.style.left);
				
				var elemSpan = document.createElement("span");
				elemSpan.textContent = list[i][2];
				elem.appendChild(elemSpan);
				
				elem.onclick = function () {
					if (this.dataset.time <= maxtime) {
						console.log("Sprung erfolgreich.");
						video.currentTime = this.dataset.time;
						stateQuestion();
					} else {
						console.log("Hier darfst du noch nicht hin springen.");
					}
				};
				
				playheadWell.appendChild(elem);
			}
			
			// Add blocker
				var elem = document.createElement("div");
				elem.className = "vjs-marker vjs-blocker";
				var elemSpan = document.createElement("span");
				elemSpan.textContent = "Hierhin können Sie noch nicht springen.";
				elem.appendChild(elemSpan);
				elem.style.left = list[anzahl][1]/videoDuration*100 + "%";
				elem.style.width = (100-list[anzahl][1]/videoDuration*100) + "%"
				
				playheadWell.appendChild(elem);
		});
			
	}
		
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
		
		function uebertrage(){
			document.querySelector('#zahl').querySelector('input').value=video.currentTime;
			
			// document.querySelector('input[type="submit"]').click();
		};
</script>

<script type="text/javascript">
	function setval(varval) {
		maxtime = maxtime + varval;
		// alert(maxtime);
		play();
	}

	function play() {
		video.play;
	}

	function stop() {
		video.pause();
	}

	function mute() {
		video.volume = 0;
	}

	function unmute() {
		video.volume = 1;
	}
</script>

/* Video einbinden */
<div id="videos">
    <video id="video1" class="video-js vjs-default-skin" controls="" width="640" data-setup='{ "playbackRates": [0.75, 0.9, 1, 1.1, 1.25, 1.5], "width": 640 }'>
    <source src="https://mediathek.htw-berlin.de/getMedium/Default/531c43cd4e70b7ead9d6b01118ae26a7.mp4" type="video/mp4">
	<track kind="chapters" src="https://moodle.htw-berlin.de/draftfile.php/1230510/user/draft/853464344/dummyvideo.vtt" srclang="en"  label="English" default>
	</video>
</div>

/* externe Videokontrollelemente */
<div class="videocontrols">
<button onclick="playCurrent();" class="btn btn-primary" type="button">Spiele aktuellen Abschnitt</button>
    <button onclick="playNext();" class="btn btn-primary" type="button">Play</button>
    <button onclick="stop();" class="btn btn-danger" type="button">Pause</button>
    <button onclick="mute();" class="btn btn-danger" type="button">Mute</button>
    <button onclick="unmute();" class="btn btn-danger" type="button">Unmute</button>
    <div class="slidecontainer">
        <input type="range" min="0" max="100" value="100" class="slider" id="myRange">
    </div>
	<button onclick="setval(5);" class="btn btn-danger" type="button">+5</button>
</div>

/* Anzeige aktueller Aufgabe */
<div id="targetcard" class="card">
	<div class="card-header" id="headAktuelleAufgabe">
		<h4 class="card-title">aktuelle Aufgabe</h4>
	</div>
</div>

/* Aufgabensammlung */
<div id="aufgabensammlung" class="card bg-light" style="display: none;">
	<div class="card-header">
		<h4 class="card-title">Richtig beantwortete Aufgaben</h4>
	</div>
    <div class="card-body" id="a1" style="display: none;">
        <h5 class="card-title">Aufgabe 1</h5>
        <p class="card-text">Was ergibt \({@v1@}+{@v2@}\)?</p>
        <p class="card-text">[[input:ans1]] [[validation:ans1]]</p>
		<p class="card-text">[[feedback:prt1]]</p>
    </div>
	<div class="card-body" id="a2" style="display: none;">
        <h5 class="card-title">Aufgabe 2</h5>
        <p class="card-text">Was ergibt \({@v1@}+{@v2@}\)?</p>
        <p class="card-text">[[input:ans2]] [[validation:ans2]]</p>
		<p class="card-text">[[feedback:prt2]]</p>
    </div>
	<div class="card-body" id="a3" style="display: none;">
        <h5 class="card-title">Aufgabe 3</h5>
        <p class="card-text">Was ergibt \({@v1@}+{@v2@}\)?</p>
        <p class="card-text">[[input:ans3]] [[validation:ans3]]</p>
		<p class="card-text">[[feedback:prt3]]</p>
    </div>
</div>

<script type="text/javascript">
    var video = document.getElementsByTagName("video")[0];
    var maxtime = 0;
	var list = null;
	var prtList = null;
	var anzahl = 0;
	var anzahlRichtig = 0;
	var aktuelleAufgabe = "";

    var slider = document.getElementById("myRange");

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
        video.volume = this.value / 100;
    }

    const parent = document.getElementById('targetcard');

    document.addEventListener("DOMContentLoaded", function(event) {
		console.log('DOM is fully loaded');
		
		// Check-Button verschieben
        const checkButton = document.querySelector('.im-controls');
		checkButton.style.textAlign = "center";
        checkButton.style.marginBottom = ".5em";
        parent.insertAdjacentElement('beforeEnd', checkButton);

		// Aufgabenstatus updaten
		prtList = document.getElementsByClassName("stackprtfeedback");
		var prtArray = Array.prototype.slice.call(prtList).filter(function (el) {return !el.classList.contains("stackprtfeedback-prtZ")});
		anzahl = prtArray.length;
		
		list = {#list#};
		// console.log(list);
		list.push(["none",video.duration]);
		//console.log(list);
		
		anzahlRichtig = 0;
		for (let i = 0; i < anzahl; i++) {
			//  console.log(prtArray[i].children[0].className=="correct");
			if (prtArray[i].children[0].className=="correct") {
				anzahlRichtig+=1;
			}
			
			document.getElementById(list[i][0]).style.display = "block";
		}
		
		aktuelleAufgabe = list[anzahlRichtig][0];
		maxtime = list[anzahlRichtig][1];
		
		//document.getElementById(list[anzahl][0]).style.display = "block";	
		
		getState();
		
		// Neueste Aufgabe verschieben
        var currentQuestion = document.getElementById(list[anzahlRichtig][0]);
        if (anzahlRichtig < list.length-1) {
			document.getElementById("headAktuelleAufgabe").insertAdjacentElement('afterend', currentQuestion);
		}
		
		// Aufgabensammlung anzeigen, wenn nötig
		if (anzahlRichtig > 0) {
			document.getElementById("aufgabensammlung").style.display = "block";
		}
		
		document.querySelector('input[type="submit"]').onclick = function() {uebertrage()};
    });
		

	// video.addEventListener("timeupdate", stateQuestion, false);
	
	// verhindert vorspulen (Quelle: https://stackoverflow.com/a/39754847/14406173)	
	var timeTracking = {
		watchedTime: 0,
		currentTime: 0
	};
				
	var lastUpdated = 'currentTime';

	video.addEventListener('timeupdate', function () {
		if (!video.seeking) {
			if (video.currentTime > timeTracking.watchedTime) {
				timeTracking.watchedTime = video.currentTime;
				lastUpdated = 'watchedTime';
			}
			//tracking time updated  after user rewinds
			else {
				timeTracking.currentTime = video.currentTime;
				lastUpdated = 'currentTime';
			}
			
			stateQuestion();
		}
		
	});
	
	// prevent user from seeking
	video.addEventListener('seeking', function () {
		// guard against infinite recursion:
		// user seeks, seeking is fired, currentTime is modified, seeking is fired, current time is modified, ....
		// var delta = video.currentTime - timeTracking.watchedTime;
		var delta = video.currentTime - maxtime;
		if (delta > 0) {
			video.pause();
			console.log("Pause");
			//play back from where the user started seeking after rewind or without rewind
			video.currentTime = (timeTracking[lastUpdated] < maxtime ? timeTracking[lastUpdated] : maxtime); // soll Endlosschleife vorbeugen
			video.play();
		}
	});
	
	video.onloadedmetadata = function() {
		console.log('metadata loaded');
		list[list.length-1] = (["none",video.duration]);
		maxtime = list[anzahlRichtig][1];
		
		// setzt Videozeit auf letzten Videostand
		if (document.querySelector('#zaehler')) {
			var currTime = (document.querySelector('#zaehler').innerHTML > maxtime ? maxtime : document.querySelector('#zaehler').innerHTML);
			console.log("Setze Video for bei: ", currTime);
		} else {
			var currTime = 0;
		}
		
		timeTracking["watchedTime"] = currTime;
		timeTracking["currentTime"] = currTime;
		video.currentTime = currTime;
		
		addMarkers(); // manchmal wurden die Marker nicht richtig eingefügt. Eiun spezieller Observer hat geholfen
		
		video.play(); // spiele nach erstem Check automatisch weiter

		
	};

/*
	window.onload = (event) => {
		console.log('page is fully loaded');
		// document.getElementsByClassName("vjs-big-play-button")[0].style.display = "none";
		// document.getElementsByClassName("vjs-control-bar")[0].style.display = "flex";
		
		document.querySelector('input[type="submit"]').onclick = function() {uebertrage()};
	};
*/
</script>

<div id="zahl" style="display: none;">
[[input:ansZ]][[validation:ansZ]][[feedback:prtZ]]
</div>