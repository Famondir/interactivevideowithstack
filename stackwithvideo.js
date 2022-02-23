/**
 * Copyright (c) 2022
 *
 * This script makes interactive videos with STACK questions possible. To use this script also load vjs v7.18.0
 *
 * @summary This script makes interactive videos with STACK questions possible.
 * @author Simon Schäfer <Simon.Schaefer@HTW-Berlin.de>
 *
 * Created at     : 2022-02-16
 * Last modified  : 2022-02-23
 */
 
// loading CSS for Video JS
var cssId = 'vjsCSS';

if (!document.getElementById(cssId)) {
	var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://vjs.zencdn.net/7.18.0/video-js.css';
    link.media = 'all';
    head.appendChild(link);
}

// creating custom CSS for interactive video player
cssId = 'interactivePlayerCSS'

if (!document.getElementById(cssId)) {
	var vjsInteractiveCSS = `
		.vjs-marker {
			position: absolute;
			background: red;
			width: 5px;
			height: 110%;
			z-index: 30;
			margin-left: -3px;
		}
		
		.vjs-marker:hover span {
			opacity:1;
		}
		
		.vjs-marker span {
			position:absolute;
			bottom:15px;
			opacity:0;
			margin-left:-20px;
			z-index:90;
			background:rgba(0,0,0,.8);
			padding:8px;
			font-size:10px;
		}
		
		/* Might block autoplaying video otherwise */
		.video-js .vjs-big-play-button {
			display: none !important;
		}
		
		/* Shows control bar instead of big play button by default */
		.video-js .vjs-control-bar {
			display: flex;
		} 
		
		.vjs-blocker {
			background: rgb(33,37,41);
			z-index:0;
			margin-left: 0px;
		} 
		
		.video-js .vjs-progress-control:hover .vjs-mouse-display {
			display: none;
		}
		
		/*
		.video-js .vjs-play-progress, .video-js .vjs-volume-level {
			background-color: white;
		}*/
		
		#targetcardFooter {
			padding: 0px !important;
		} 
				
		#targetcard {
			/* hier sollte man das div zentrieren*/
		}
		
		.fa-svg-icon {
			display: inline-flex;
			align-self: center;
			/* Define a global color for the icons In this case white */
			fill: #fff;
		} 
		
		/* Define the size of the default icons */ 
		.fa-svg-icon svg {
			height:1.8em; 
			width:1.8em;
		} 
		
		/* Positionate the SVG correctly */ 
		.fa-svg-icon.svg-baseline svg {
			top: .125em;
			position: relative;
		}
	`
	
	var head  = document.getElementsByTagName('head')[0];
    var styleElement = document.createElement('style');
	styleElement.id   = cssId;
    styleElement.appendChild(document.createTextNode(vjsInteractiveCSS));
    head.appendChild(styleElement);
}