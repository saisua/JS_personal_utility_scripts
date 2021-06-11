function _px(text, char_len=2){
    return text.substring(0, text.length-char_len);
}

var size_mult = 2;
var top_off = 20;


(e=>e.style.height = _px(e.style.height)*size_mult+"px")(document.querySelector("div[class='detail  detail--slider  detail--images  detail--xd']"));	

// EVERY PICTURE:
function run(){
	(e=>{e.style.transform="translateX(-"+(500-top_off)+"px)"; e.style.height=_px(e.style.height)*size_mult+"px"; e.style.width=_px(e.style.width)*size_mult+"px"; e.style.top=top_off+"px";})(
	document.querySelectorAll("div[class='detail__pane']")[1]);

	document.querySelectorAll("div[class='detail__media  detail__media--images']")[1].style.height = "800px";

	document.querySelectorAll("div[class='detail__media__img-wrapper  js-image-detail-wrapper']")[1].style.height = "3000px";

	(e=>{e.style.maxHeight="200%";e.style.maxWidth="200%"; e.style.height=_px(e.style.height)*size_mult+"px"; e.style.width=_px(e.style.width)*size_mult+"px"; e.scrollIntoView();})(document.querySelectorAll("img[class='detail__media__img-highres  js-detail-img  js-detail-img-high']")[1]);
}
run();