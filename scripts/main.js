var target, currentAmt, amt;

target = 25000;
currentAmt = 12500;
amt = 0;

function formatTimes(time) {
  if (time < 10) {
    return '0' + `${time}`;
  } else {
    return `${time}`;
  }
}

function countdownTimer() {
  const difference = +new Date("2021-01-05T19:00") - +new Date();

  if (difference > 0) {
    const parts = {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
    $('#hours').text(`${formatTimes(parts['hours'])}`);
    $('#minutes').text(`${formatTimes(parts['minutes'])}`);
    $('#seconds').text(`${formatTimes(parts['seconds'])}`);
  }

  $('#hours').append('<span class="time-spec">H</span>');
  $('#minutes').append('<span class="time-spec">M</span>');
  $('#seconds').append('<span class="time-spec">S</span>')
}

function zoomLink() {
  return null;
}

function animateAmount() {
  var stepTime = (4000 / currentAmt);
  var amtObj = $('#amount');
  var increment = currentAmt * (1 / 1000);
  const timer = () => {
    if (!(amt <= currentAmt)) return;
    setAmountHeader(amt);
    amt += increment;
  }
  setInterval(timer, stepTime);
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
    }, 4000)
  } else {
    $('#progress-bar').height(progHeight.toString() + 'px');
  }
}

// peach height: 840 px
// total: 993 px
// bottom height: 7 px

function setPeachHeight() {
  $('#peach-holder').height($('#peach-holder').css('width').toString());
  $('#peach-background').height($('#peach').height());
}

function setAmountHeader(amt) {
  $('#amount').text(numberWithCommas(amt));
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

window.onload = function() {
  countdownTimer();
  setInterval(countdownTimer, 1000);
  setPeachHeight();
  setProgress(true);
  animateAmount();
}

$(window).resize(function() {
  setPeachHeight();
  setProgress(false);
})
