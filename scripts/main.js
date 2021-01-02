var target, currentAmt;

target = 25000;
currentAmt = 12500;

function countdownTimer() {
  const difference = +new Date("2021-01-05T19:00") - +new Date();

  if (difference > 0) {
    const parts = {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
    remaining = Object.keys(parts).map(part => {
    return `${parts[part]}`;
  }).join(" : ");
  }

  document.getElementById("countdown").innerHTML = remaining;
}

function setProgress(animate) {
  // percentage complete
  var percentage;
  // ratio of peach area to total image height
  var heightRatio;
  // ratio starting height to total height
  var startRatio;
  // current peach height
  var peachHeight;
  // current peach area height
  var currentArea;
  // current start
  var currentStart;

  heightRatio = 840 / 993;
  startRatio = 7 / 993;
  peachHeight = $('#peach').height();
  currentArea = heightRatio * peachHeight;
  currentStart = startRatio * peachHeight;
  percentage = currentAmt / target;

  var progHeight = (percentage * currentArea) + currentStart;

  if (animate) {
    $('#progress-bar').animate({
      'height': progHeight.toString() + 'px'
    }, 1000);
  } else {
    $('#progress-bar').height(progHeight.toString() + 'px');
  }
}

// peach height: 840 px
// total: 993 px
// bottom height: 7 px

function setPeachHeight() {
  $('#peach-holder').height($('#peach').height());
}

function setAmountHeader() {
  $('#amount').text(numberWithCommas(currentAmt) + ' voters contacted!');
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

window.onload = function() {
  countdownTimer();
  setInterval(countdownTimer, 1000);
  setPeachHeight();
  setAmountHeader();
  setProgress(true);
}

$(window).resize(function() {
  setPeachHeight();
  setProgress(false);
})
