var work_time = 25; // minutes
var rest_time = 5;  // minutes

var type = 'square'
var frequency = 450;
var volume = .05;
var duration = 250;

// type can also be 'square', 'sawtooth' and 'triangle'



audioCtx = new(window.AudioContext || window.webkitAudioContext)();

function beep(dur=duration) {
  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  gainNode.gain.value = volume;
  oscillator.frequency.value = frequency;
  oscillator.type = type;

  oscillator.start();

  setTimeout(
    function() {
      oscillator.stop();
    },
    dur
  );
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function pomodoro(work=work_time, rest=rest_time){
  var doing_work = false;
  work = work*60000; // to ms
  rest = rest*60000; // to ms

  while(true){
    if(doing_work){
      doing_work = false;

      beep();
      await sleep(rest);
      beep();
      await sleep(500);
      continue;
    }
    else{
      doing_work = true;

      beep();
      await sleep(work);
      continue;
    }
  }
}

pomodoro();
