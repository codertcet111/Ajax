var xmlHttp=createXmlHttpRequestObject();

//important function-------------------------------------------------*********************************
function createXmlHttpRequestObject(){
	var xmlHttp;
	
	if(window.ActiveXObject){
		try{
			xmlHttp=new ActiveXObject("Microsoft.XMLHttp");
		}catch(e){
			xmlHttp=false;
		}
	}else{
		try{
			xmlHttp=new XMLHttpRequest();
		}catch(e){
			xmlHttp=false;
		}
	}
	if(!xmlHttp)
		alert('cant create that object');
	else
		return xmlHttp;
}
//----------------------------------------------------------------------********************************
function process(){
	if(xmlHttp.readyState==0 || xmlHttp.readyState==4){
		food = encodeURIComponent(document.getElementById('userInput').value);
		xmlHttp.open('GET','AjaxPractice/foodstore.php?food=' + food,true);
		xmlHttp.onreadystatechange=handleServerResponse;
		xmlHttp.send(null);    //for post direct message
	}else{
		setTimeout('process()',1000);
	}
}

function handleServerResponse(){
	if(xmlHttp.readyState==4){
		if(xmlHttp.status==200){
			xmlResponse=xmlHttp.responseXML; //xml file
			xmlDocumentElement=xmlResponse.documentElement; //root of file
			message = xmlDocumentElement.firstChild.data; //since response is first child in xml doc//
			document.getElementById('underInput').innerHTML = message;
			setTimeout('process()',1000);
		}else{
			alert('Something went wrong');
		}
	}
}
		