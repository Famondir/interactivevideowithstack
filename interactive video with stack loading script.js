<script src="https://vjs.zencdn.net/7.18.0/video.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/videojs-youtube@2.6.1/dist/Youtube.min.js"></script>
<script src="https://videowithstack.4lima.de/stackwithvideo.js"></script>

<script type="text/javascript">
	list = {#list#};
</script>

/* Video per Direktlink einbinden */
<div id="interactiveVideo" class = "mt-2 mb-2">
    <video-js id="video1" class="video-js vjs-default-skin" controls
	data-setup='{"playbackRates": [0.75, 0.9, 1, 1.1, 1.25, 1.5], "fluid": true}'>
    <source src="https://mediathek.htw-berlin.de/getMedium/Default/531c43cd4e70b7ead9d6b01118ae26a7.mp4" type="video/mp4">
	</video-js>
</div>

/* bindet Video von Youtube ein */
/*
<div id="interactiveVideo" class = "mt-2 mb-2">
	<video-js id="video1" class="video-js vjs-default-skin" controls
	data-setup='{"playbackRates": [0.75, 0.9, 1, 1.1, 1.25, 1.5], "fluid": true, "techOrder": ["youtube"], 
	"sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=xjS6SftYQaQ"}] }'>
	</video-js>
</div>
*/

/* Anzeigeplatzhalter für die aktuelle Aufgabe
wird per JS auf das Videoelement verschoben
 */
<div id="questionCanvas" class="card" style="visibility: hidden;">
	<h4 class="card-header" id="questionCanvasHeader">aktuelle Aufgabe
		<button type="button" class="close" onclick="toggleV('questionCanvas'); return false;"> /* don't reload the page */
          <span aria-hidden="true">&times;</span>
        </button>
	</h4>
	<div class="card-footer" id="questionCanvasFooter">
		/* hier kommt der submit-Button hin */
	</div>
</div>

/* Aufgabensammlung
hier werden alle Aufgaben gestellt
bereits richtig beantwortete Aufgaben sieht man dann hier (als Archiv)
*/
<div id="aufgabensammlung" class="card bg-light" style="display: none;">
	<div class="card-header">
		<h4 class="card-title">Richtig beantwortete Aufgaben</h4>
	</div>
    <div class="card-body" id="a1" style="display: none;"> /* id muss mit erstem Eintrag in Stackliste übereinstimmen */
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

<div id="zahl" style="display: none;">
[[input:ansZ]][[validation:ansZ]][[feedback:prtZ]]
</div>

