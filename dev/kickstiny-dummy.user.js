// ==UserScript==
// @name         Kickstiny - Enhanced Kick Embedded Player
// @namespace    https://www.destiny.gg
// @version      0.0.1
// @description  Replaces the controls in the Kick embedded player with custom controls that offer a volume slider, quality selector, and more.
// @author       Destinygg
// @match        https://player.kick.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  "use strict";

  function addScript(url) {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", url);
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  // Load script from localhost with cache-busting timestamp
  addScript("http://localhost:6868/index.js?t=" + new Date().getTime());
})();
