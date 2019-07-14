

function toggleCounts(e, v) {
  for (let span of e.getElementsByTagName('span')) {
    span.style.visibility = v;
  }
}


function highlightPlayerDiv(e) {
  e.className += " on";
  toggleCounts(e, "visible");
}


function highlightPlayerDivs(player) {
  const trs = Array.from( document.getElementsByTagName('tr') ).reverse();

  let total = 0;

  // Scroll into view the first div.
  let firstDiv = null;

  for (let tr of trs) {
    let tds = tr.querySelectorAll(`[data-player="${player}"]`);
    for (let td of tds) {

      if (!firstDiv) {
        firstDiv = td;
        firstDiv.scrollIntoView(false);
      }

      setTimeout(highlightPlayerDiv, total++ * 1100, td);
    }
  }
}


function deHighlightAll() {
  let xs = document.querySelectorAll("[data-player]");
  for (var i = 0; i < xs.length; i++) {
    let x = xs[i];
    let className = x.className;
    if (className.substr(-3) == " on") {
      x.className = className.substring(0, className.length - 3);
      toggleCounts(x, "hidden");
    }
    
  }
}

window.onmousedown = e => {
  let player = e.target.dataset.player;
  if (player) {
    deHighlightAll();
    highlightPlayerDivs(player);
  }
}

window.ontouchstart = e => {
  window.onmousedown(e);
  e.preventDefault();
}
