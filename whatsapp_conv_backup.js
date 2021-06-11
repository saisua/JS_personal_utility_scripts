// save to local file or new tab
function store(text, name, local=false, type="text/plain") {
  var a = document.createElement("a");
  if(Array.isArray(text)){text = text.filter(function(e){return e}).join("\n")}
  var file = new Blob([text], {type: type});
  a.href = URL.createObjectURL(file);
  if(local){
	a.download = name;
	a.click();
  }		
  else{window.open(a.href,'_blank');}
}

function sleep(ms){return new Promise(resolve => setTimeout(resolve, ms));}


async function go_up(){
	var selector = "div[class='MVjBr _3e2jK'],[class='gDOmN _1SYeE']";
	
	var messages = Array.from(document.querySelectorAll(selector));

	var tries = 0;

	while(tries < 3){

		if(prev_mess == undefined || prev_mess != messages[0]){
			messages[0].scrollIntoView();

			var prev_mess = messages[0];

			await sleep(1000);
			messages = Array.from(document.querySelectorAll(selector));

			tries = 0;
		} else {
			tries++;

			await sleep(1000);

			messages = Array.from(document.querySelectorAll(selector));
		}
	}
}

// Most recent message must be a text-only message
var selector = "div[class='MVjBr _3e2jK'],[class='gDOmN _1SYeE']";
var messages = Array.from(document.querySelectorAll(selector));
var user = messages[messages.length-1].firstChild.firstChild.getAttribute("data-pre-plain-text").trim().split(']')[1];

go_up().then(()=>{
var selector = "div[class='MVjBr _3e2jK'],[class='gDOmN _1SYeE']";
    
var messages = Array.from(document.querySelectorAll(selector));

store(messages.map(e=>[(e)&&(e.firstChild)&&(e.firstChild.firstChild)&&(e.firstChild.firstChild.getAttribute)&&(e.firstChild.firstChild.getAttribute("data-pre-plain-text"))&&e.firstChild.firstChild.getAttribute("data-pre-plain-text").includes(user), e.innerText]),"all_messages.txt", true); });
