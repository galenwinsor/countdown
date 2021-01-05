// TODO: make social media ready, prepare backend, double check DNS

var target, currentAmt, amt;

target = 25000;
currentAmt = 12500;
amt = 0;

function getAmount() {
  return new Promise((resolve,reject) => {
    fetch('https://ossoff-therm-default-rtdb.firebaseio.com/amount.json')
    .then(response => response.json())
    .then(data => {
      currentAmt = data;
      console.log('Success:', data);
      resolve(data);
    })
    .then((error) => {
      console.log('Error:', error);
      reject(error);
    })
  })
}

function formatTimes(time) {
  if (time < 10) {
    return '0' + `${time}`;
  } else {
    return `${time}`;
  }
}

function countdownTimer() {
  const difference = +new Date("2021-01-05T19:00:00") - +new Date();

  if (difference > 0) {
    if (difference < 900000) {
      $('#closing').text("We're almost there! Thank you for all your hard work. Please join us for a thank you ").append('<a href=#>Zoom call!</a>');
    }
    const parts = {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
    $('#hours').text(`${formatTimes(parts['hours'])}`);
    $('#minutes').text(`${formatTimes(parts['minutes'])}`);
    $('#seconds').text(`${formatTimes(parts['seconds'])}`);
  } else {
    $('#hours').text(formatTimes(0));
    $('#minutes').text(formatTimes(0));
    $('#seconds').text(formatTimes(0));
    $('#closing').text('We did it! Thank you for all your hard work.');
    $('amount-text').text('votes in!')
    clearInterval(countdownTimer);
  }

  $('#hours').append('<span class="time-spec">H</span>');
  $('#minutes').append('<span class="time-spec">M</span>');
  $('#seconds').append('<span class="time-spec">S</span>')
}

function zoomLink() {
  return null;
}

function animateAmount() {
  console.log('Current amount:' + currentAmt);
  var stepTime = (4000 / currentAmt);
  var amtObj = $('#amount');
  var increment = Math.floor(currentAmt * (1 / 1000));
  var timer = () => {
    if (!(amt <= currentAmt)) {
      console.log('Current amount: ' + currentAmt);
      setAmountHeader(currentAmt);
      clearInterval(inter);
      return;
    }
    setAmountHeader(amt);
    amt += increment;
  }
  var inter = setInterval(timer, stepTime);
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

function adjustBackground() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  if (width > 1199 && ((width / height) < (1274 / 719))) {
    $('.background').css({
      'background-image':'url("images/black_background_alt.png")',
      'background-position':'top right'
    });
  } else if (width > 1199) {
    $('.background').css({
      'background-image':'url("images/black_background.png")',
      'background-position':'top right'
    });
  } else if (width < 1199 && width > 720) {
    $('.background').css({
      'background-image':'url("images/black_background_alt.png")',
      'background-position':'top right'
    });
  } else {
    $('.background').css({
      'background-image':'url("images/black_background_intermediate.png")',
      'background-position':'top left'
    })
  }
}

window.onload = async function() {
  await getAmount();
  countdownTimer();
  setInterval(countdownTimer, 1000);
  setPeachHeight();
  setProgress(true);
  animateAmount();
  adjustBackground();
}

$(window).resize(function() {
  setPeachHeight();
  setProgress(false);
  adjustBackground();
})
