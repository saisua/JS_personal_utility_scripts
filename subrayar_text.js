	window.all_selection = function(){
	    var selection = document.getSelection();
	    var first = selection.anchorNode.parentNode;
	    var last = selection.focusNode.parentNode;

	    var result = [];

	    //var css_bef;

	    var selected = false;
	    for(var node of first.parentNode.childNodes){
		if(selected){
		    //if(css_bef != node.style.top) result += '\n';
		    //css_bef = node.style.top;
		    result.push(node);
		    
		    if(node == last) break;
		    continue;
		} 
		
		if(node == last) first = [last, last = first][0];;
		if(node == first){
		    selected = true;
		    
		    result.push(node);

		    if(node == last) break;

		    //css_bef = first.style.top;
		}
	    }

	    return result
	}

	window.paint_all = function(lista, color){for(var node of lista) node.style["background-color"] = color;}

	window.colors=['Yellow','Blue','Brown','Cyan','Fuchsia','Gold','Gray','Grey','Green','Lime','Magenta','Olive','Orange','Pink','Purple','Red','Turquoise','Violet']; window.color=0; 

	//document.onkeyup = ((ev) => {if(ev.keyCode==13){document.getSelection().anchorNode.parentNode.style["background-color"] = window.colors[window.color];} else if(ev.keyCode==8){document.getSelection().anchorNode.parentNode.style["background-color"] = "";} else if(ev.keyCode==65){window.color = (window.color-1) % window.colors.length;} else if(ev.keyCode==83){window.color = (window.color+1) % window.colors.length;}})

	document.onkeyup = ((ev) => {if(ev.keyCode==13){window.paint_all(window.all_selection(), window.colors[window.color]);} else if(ev.keyCode==8){window.paint_all(window.all_selection(), '');} else if(ev.keyCode==65){window.color = (window.color-1) % window.colors.length;} else if(ev.keyCode==83){window.color = (window.color+1) % window.colors.length;}})

