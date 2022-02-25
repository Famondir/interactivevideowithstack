<script src="https://vjs.zencdn.net/7.18.0/video.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/videojs-youtube@2.6.1/dist/Youtube.min.js"></script>
<script src="https://videowithstack.4lima.de/stackwithvideo.js"></script>

<script type="text/javascript">
	// Chapter markers
	// Quellen: https://codepen.io/nickwanhere/pen/gOMderr und https://codepen.io/team/rcrooks1969/pen/LJBdPJ
	function addMarkers() {
		
		// var playheadWell = document.getElementsByClassName("vjs-progress-control vjs-control")[0].children[0];
		
		// if we are not waiting for .vjs-progress-holder in addition to loadedmetadata we might not find the right element
		waitForElm('.vjs-progress-holder').then((playheadWell) => {
			console.log('Element is ready');
			// console.log(playheadWell.textContent);
			
			var videoDuration = player.duration();

			// console.log(playheadWell);
			console.log(videoDuration);
			// console.log("fügt Marker hinzu");

			// Loop over each cue point, dynamically create a div for each
			// then place in div progress bar
			for (i = 0; i <= anzahlRichtig && i < list.length-1; i++) {
				
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
						player.currentTime(this.dataset.time);
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
			console.log("Speichere aktuelle Position");
			document.querySelector('#zahl').querySelector('input').value=player.currentTime();
			
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
		player.play;
	}

	function stop() {
		player.pause();
	}

	function mute() {
		player.volume(0);
	}

	function unmute() {
		player.volume(1);
	}
</script>

/* Video einbinden */
<div id="interactiveVideo" class = "mt-2 mb-2">
    <video-js id="video1" class="video-js vjs-default-skin" controls="" data-setup='{"playbackRates": [0.75, 0.9, 1, 1.1, 1.25, 1.5], "fluid": true}'>
    <source src="https://mediathek.htw-berlin.de/getMedium/Default/531c43cd4e70b7ead9d6b01118ae26a7.mp4" type="video/mp4">
	<track kind="chapters" src="https://moodle.htw-berlin.de/draftfile.php/1230510/user/draft/355323112/dummyvideo.vtt" srclang="en"  label="English" default>
	</video-js>
</div>

/*
<div id="interactiveVideo">
	<video-js
    id="video1"
    class="video-js vjs-default-skin"
    controls
    autoplay
    // width="640" height="264"
    data-setup='{"playbackRates": [0.75, 0.9, 1, 1.1, 1.25, 1.5], "fluid": true, "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=xjS6SftYQaQ"}] }'
  >
  </video-js>

</div>
*/

/* Anzeige aktueller Aufgabe */
<div id="questionCanvas" class="card" style="visibility: hidden;">
	<h4 class="card-header" id="questionCanvasHeader">aktuelle Aufgabe<button type="button" class="close" onclick="toggleV('questionCanvas'); return false;">
          <span aria-hidden="true">&times;</span>
        </button></h4>
	<div class="card-footer" id="questionCanvasFooter">
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
	// var video = document.getElementsByTagName("video")[0];
		
	var player = videojs("video1");
    var maxtime = 0;
	var list = null;
	var prtList = null;
	var anzahl = 0;
	var anzahlRichtig = 0;
	var aktuelleAufgabe = "";

    var slider = document.getElementById("myRange");

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
        player.volume(this.value / 100);
    }
	
	list = {#list#};
	// console.log(list);

    document.addEventListener("DOMContentLoaded", function(event) {
		console.log('DOM is fully loaded');
		
		// Check-Button verschieben
		/*
        const checkButtonArea = document.querySelector('.im-controls');
		checkButtonArea.style.textAlign = "center";
        checkButtonArea.style.marginBottom = ".5em";
		checkButtonArea.style.backgroundColor = "red";
		checkButtonArea.id = "pruefenButton";
		*/
		
		const checkButton = document.querySelector('input[type="submit"]')
		checkButton.classList.add("btn-block");
		checkButton.onclick = function() {uebertrage()};
		checkButton.style.margin = 0;
		checkButton.style.borderRadius = 0;
		
		document.getElementById('questionCanvasFooter').insertAdjacentElement('beforeend', checkButton);

		// Aufgabenstatus updaten
		prtList = document.getElementsByClassName("stackprtfeedback");
		var prtArray = Array.prototype.slice.call(prtList).filter(function (el) {return !el.classList.contains("stackprtfeedback-prtZ")});
		anzahl = prtArray.length;
		
		list.push(["none",player.duration()]);
		//console.log(list);
		
		anzahlRichtig = 0;
		for (let i = 0; i < anzahl; i++) {
			//  console.log(prtArray[i].children[0].className=="correct");
			if (prtArray[i].children[0].className=="correct") {
				anzahlRichtig+=1;
			}
			
			document.getElementById(list[i][0]).style.display = "block";
		}
		
		//console.log("AnzhalRichtig: ", anzahlRichtig);
		
		aktuelleAufgabe = list[anzahlRichtig][0];
		maxtime = list[anzahlRichtig][1];
		
		//document.getElementById(list[anzahl][0]).style.display = "block";	
		
		getState();
		
		// Neueste Aufgabe verschieben
        if (anzahlRichtig < list.length-1) {
			var currentQuestion = document.getElementById(list[anzahlRichtig][0]);
			currentQuestion.classList.add("overflow-auto");
			document.getElementById('questionCanvas').children[0].insertAdjacentElement('afterend', currentQuestion);
		}
		
		// Aufgabensammlung anzeigen, wenn nötig
		if (anzahlRichtig > 0) {
			document.getElementById("aufgabensammlung").style.display = "block";
		}
    });
		

	// video.addEventListener("timeupdate", stateQuestion, false);
	
	// verhindert vorspulen (Quelle: https://stackoverflow.com/a/39754847/14406173)	
	var timeTracking = {
		watchedTime: 0,
		currentTime: 0
	};
				
	var lastUpdated = 'currentTime';

	window.onload = (event) => {
		console.log('page is fully loaded');
		// document.getElementsByClassName("vjs-big-play-button")[0].style.display = "none";
		// document.getElementsByClassName("vjs-control-bar")[0].style.display = "flex";
		
		// document.querySelector('input[type="submit"]').onclick = function() {uebertrage()};
		
		const playerCanvas = document.querySelector(".video-js")
		const questionCanvas = document.querySelector("#questionCanvas");
		
		playerCanvas.appendChild(questionCanvas);
		questionCanvas.style.cssText = `
		visibility: hidden;
		position: absolute; 
		top: 5%; 
		left: 5%; 
		max-width: 90%;
		max-height: 80%;
		font-size: .92345rem;
		font-weight: 400;
		line-height: 1.5;
		text-align: left;
		color: #000;
		`;
		
		if (anzahlRichtig < anzahl) {
			showV("questionCanvas");
		}
	};
	
	player.ready(function(){        
		console.log('player ready');
		
		this.on('loadedmetadata', function(){		
			console.log('metadata loaded');
			
			list[list.length-1] = (["none",player.duration()]);
			maxtime = list[anzahlRichtig][1];
			//console.log('list?');
			
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
			
			addMarkers(); // manchmal wurden die Marker nicht richtig eingefügt. Eiun spezieller Observer hat geholfen
			
			player.play(); // spiele nach erstem Check automatisch weiter

			 // ändere das Abspielsymbol passend zum Playerstatus
			waitForElm('.vjs-play-control').then((elm) => {
				if (!player.paused) {
					elm.classList.add('vjs-playing');
				} else {
					elm.classList.add('vjs-paused');
				}
			});
		
		});		
		
		this.on('timeupdate', function () {
			if (!player.seeking()) {
				if (player.currentTime() > timeTracking.watchedTime) {
					timeTracking.watchedTime = player.currentTime();
					lastUpdated = 'watchedTime';
				}
				//tracking time updated  after user rewinds
				else {
					timeTracking.currentTime = player.currentTime();
					lastUpdated = 'currentTime';
				}
				
				// console.log("state q");
				stateQuestion();
			}
			
		});
		
		// prevent user from seeking
		this.on('seeking', function () {
			// guard against infinite recursion:
			// user seeks, seeking is fired, currentTime is modified, seeking is fired, current time is modified, ....
			// var delta = video.currentTime - timeTracking.watchedTime;
			var delta = player.currentTime() - maxtime;
			if (delta > 0) {
				player.pause();
				console.log("Pause");
				//play back from where the user started seeking after rewind or without rewind
				player.currentTime((timeTracking[lastUpdated] < maxtime ? timeTracking[lastUpdated] : maxtime)); // soll Endlosschleife vorbeugen
				player.play();
			}
		});
		
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
		var player = videojs('video1');		
		player.getChild('controlBar').addChild('myButton', {}, 1);
		//document.getElementsByClassName("vjs-current-time")[0].insertBefore('myButton', {});
		
		/* Fügt Checkmarkicon auf PLayerbutton hinzu */
		document.querySelector('.video-js .stack-question-button .vjs-icon-placeholder').classList.add("fa-svg-icon");
		document.querySelector('.video-js .stack-question-button .vjs-icon-placeholder').classList.add("svg-baseline");
		var svgCM = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svgCM.setAttributeNS(null, 'viewBox', '0 0 1792 1792');
		document.querySelector('.video-js .stack-question-button .vjs-icon-placeholder').appendChild(svgCM);
		var pathCM = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		pathCM.setAttributeNS(null, 'd', 'M1472 930v318q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q63 0 117 25 15 7 18 23 3 17-9 29l-49 49q-10 10-23 10-3 0-9-2-23-6-45-6h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113v-254q0-13 9-22l64-64q10-10 23-10 6 0 12 3 20 8 20 29zm231-489l-814 814q-24 24-57 24t-57-24l-430-430q-24-24-24-57t24-57l110-110q24-24 57-24t57 24l263 263 647-647q24-24 57-24t57 24l110 110q24 24 24 57t-24 57z');
		document.querySelector('.video-js .stack-question-button .vjs-icon-placeholder').children[0].appendChild(pathCM);
	});
	
	/*
	jQuery( document ).ready(function() {
		console.log("jQuery funnktioniert. document ready");
		
		
	});
	*/
</script>

<div id="zahl" style="display: none;">
[[input:ansZ]][[validation:ansZ]][[feedback:prtZ]]
</div>