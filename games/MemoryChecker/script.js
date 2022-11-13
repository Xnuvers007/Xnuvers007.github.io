window.onload=tailGeneration;
			

function tailGeneration(){
	var divs = "";
	for(i=1;i<=20;i++)
	{
		divs = divs +'<div class="tail" id="ta'+i+'" ><img src="img/back.png" onclick="openTail('+i+')" /></div>';
		
		if (i%5==0) divs = divs +'<div style="clear:both" ></div>';
		
	}
		
	document.getElementById("break").innerHTML=divs;
	
	generate();
	
}


var id = new Array(3);
var pict = new Array(3);

		


var pictures =new Array(20); 



function generate(){
	
	for (i=0;i<10;i++)
	{
		pictures[i]=i+1;
	}
	
	for (i=10;i<20;i++)
	{
		pictures[i]=i-9;
	}
	
	var step =20;
	var images =new Array(20); 
	
	for (i=0;i<20;i++)
	{
		var number = Math.floor(Math.random() * step);
		
		images[i]=pictures[number];
		pictures[number]=pictures[step-1];
		step=step-1;
		
	}
	pictures=images;
	
	
}

var cardOpened = 0;

function openTail(nr){
	
	var pictureNr = pictures[nr-1];
	
	document.getElementById("ta"+nr).innerHTML='<img height="200px" width="200px" src="img/im'+pictureNr+'.png" />'
	
	
	
	cardOpened++;
	
	
	if (cardOpened==1) 
	{
		pict[0]=pictures[nr-1];
						
		id[0]=nr;
	}
	else if (cardOpened==2) 
	{
		pict[1]=pict[0];
		pict[0]=pictures[nr-1];
		
		id[1]=id[0];
		id[0]=nr;
		
	}
	else if (cardOpened==3) 
	{
		pict[2]=pict[1];
		pict[1]=pict[0];
		pict[0]=pictures[nr-1];
		
		id[2]=id[1];
		id[1]=id[0];
		id[0]=nr;
						
	}
					
	if (cardOpened>2) 
	{
		closeTail(id[2]);
		cardOpened=cardOpened-1;
		
		
	}	
	
	if(pict[0]==pict[1])
	{
		trafione(id[0],id[1]);
		cardOpened=cardOpened-2;
		
	}
	
}

function closeTail(numerTail){
	
	document.getElementById("ta"+numerTail).innerHTML='<img src="img/back.png" onclick="openTail('+numerTail+')" />';

}

var licznik=0;
function trafione(firstTail,secondTail){

	
	document.getElementById("ta"+firstTail).innerHTML=null;
	document.getElementById("ta"+firstTail).style.boxShadow="none";
	document.getElementById("ta"+firstTail).style.background="none";
	document.getElementById("ta"+firstTail).style.border="none";
	document.getElementById("ta"+firstTail).style.width="202px";
	document.getElementById("ta"+firstTail).style.height="202px";
	
	document.getElementById("ta"+secondTail).innerHTML=null;
	document.getElementById("ta"+secondTail).style.boxShadow="none";
	document.getElementById("ta"+secondTail).style.background="none";
	document.getElementById("ta"+secondTail).style.border="none";
	document.getElementById("ta"+secondTail).style.width="202px";
	document.getElementById("ta"+secondTail).style.height="202px";
	
	licznik++
	if(licznik==10){
	
		document.getElementById("title").innerHTML='<span id="bravo">Congratulations !!! </span><br /> <input type="button" value="Play again!" onclick="location.reload()">';
		document.getElementById("title").style.paddingTop="100px";
		document.getElementById("bravo").style.fontSize="48px";
		
					
	}
}
			