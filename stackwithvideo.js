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

function loadCSS (cssId, cssUrl) {
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
 
// #----------# loading CSS #----------#
 
// loading CSS for Video JS
var cssId = 'vjsCSS';
loadCSS(cssId, 'https://vjs.zencdn.net/7.18.0/video-js.css');

// loading CSS for interactive video player
cssId = 'interactivePlayerCSS'
loadCSS(cssId, 'https://videowithstack.4lima.de/stackwithvideo.css');

// #----------# adding eventlisteners #----------#



// #----------#  #----------#