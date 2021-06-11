Array.from(((e)=>(e[e.length-1]))(document.querySelectorAll("thread[class='ts-expanded-message']")).querySelectorAll("div[class='message-body-container padded-content']")).map(mess=>(mess.innerText))

window.HISTORY = 5;
window.IN_MESSAGES = 3;
window.CHECK_EVERY_MS = 200;
window.RESTART_SECONDS = 20;
window.message_history = [];

window.last_sent = undefined;

var element = document.querySelector("div[class='ts-edit-box']");
while(element.nodeName != "THREAD")
    element = element.parentNode;
window.parent_el = element;


// Usage: Press "Reply" in the thread you want the bot to answer to,
// scroll up a bit (so that the site doesn't scroll down by itself)
// and then run the script. Take a good nap in my name
function add_message(mess){
	if(mess != window.last_message && mess.innerText.length > 0){
		window.counter = 0;

		if(window.message_history.length > window.HISTORY){
			window.message_history.shift();
		}

		window.message_history.push({});
		window.last_message = mess;

		for(var word of mess.innerText.trim().toLowerCase().split(" ")){
			if(word.length == 0) continue;

			for(var dict_num=0; dict_num < window.message_history.length; dict_num++){
				if(window.message_history[dict_num][word] != undefined) window.message_history[dict_num][word]+=1;
				else window.message_history[dict_num][word] = 1;
			}
		}
		
		if(window.message_history.length >= window.HISTORY){
			var to_send = new Set();

			for(var m_num=0; m_num < window.message_history.length - window.IN_MESSAGES; m_num++){
				var message = window.message_history[m_num];
				for(var dict_key in message){
					if(message[dict_key] >= window.IN_MESSAGES){
						to_send.add(dict_key);
					}
				}
			}	
		
		
		if(to_send_length > 0){			
			var to_send_str = Array.from(to_send.values()).join(" ");

			if(Array.from(document.querySelector("div[class='ts-edit-box']")).length == 1)
	window.parent_el.querySelector("div[class='ts-message-action-toolbar'] button").click()

			if(!window.last_sent || !(to_send_str.includes(window.last_sent) || window.last_sent.includes(to_send_str))){
				window.last_sent = to_send_str;
				console.log(to_send_str);
				//document.querySelector("div[class='ts-edit-box']").querySelector("br").parentNode.innerText = to_send_str;
				//document.querySelector('button[id="send-message-button"]').click();
			}
			window.message_history = [];
		}
	
	}
}

function start(){
	window.counter = 0;

	window.interval = setInterval(()=>{
		if(window.counter > (window.RESTART_SECONDS*(1000/window.CHECK_EVERY_MS))){
			window.counter = 0;
			window.message_history = [];
			window.last_sent = undefined;
		}		
		window.counter += 1;

		add_message(((e)=>{return e[e.length-1];})(Array.from(document.querySelectorAll("div[class='message-body-container padded-content']"))));
	},window.CHECK_EVERY_MS)
}

