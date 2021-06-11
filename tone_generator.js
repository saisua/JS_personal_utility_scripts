//http://onlinetonegenerator.com/

var min_freq = 200;
var max_freq = 400;

function random_num(min, max, mid=null, not_repeat_side=5){
    if(mid===null){
        mid = min+(dist/2);
    }
    
    var min_mid = (mid-min)/2;
    var max_mid = (max-mid)/2;

    min += min_mid;
    max -= max_mid;

    var dist = (max - min);

    return ((old_num) => {
        var repeat = ((Math.random() * not_repeat_side) < 1);

        if(old_num < mid){
            var ran2 = (repeat) ? -(Math.random()*min_mid) : (Math.random()*max_mid);
        }
        else if(old_num > mid){
            var ran2 = (!repeat) ? -(Math.random()*min_mid) : (Math.random()*max_mid);
        }
        else var ran2 = 0;

        return Math.floor(Math.random() * dist + min + ran2);
    });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sound(min=2000, max=300000, mid=30000){
  var generator = random_num(min, max, mid);
  var old = generator(mid);
  var freq_range = (max_freq - min_freq);
  while(true){
    document.querySelector("input[id='freq']").value = Math.floor(Math.random()*freq_range) + min_freq;
    document.querySelectorAll("button")[0].click();
    old = generator(old);
    await sleep(old);
  }
};

sound();
