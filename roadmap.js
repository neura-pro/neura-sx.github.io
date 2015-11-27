function loadXMLDoc(filename) {
	if (window.ActiveXObject) {
		xhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} else {
		xhttp = new XMLHttpRequest();
	}
	xhttp.open("GET", filename, false);
	try {xhttp.responseType = "msxml-document"} catch(err) {}
	xhttp.send("");
	return xhttp.responseXML;
}
function displayResult(inputXML,inputXSL) {
	var div = document.createElement('div');
	document.getElementsByTagName('body')[0].appendChild(div);
	xml = loadXMLDoc(inputXML);
	xsl = loadXMLDoc(inputXSL);
	if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
  		ex = xml.transformNode(xsl);
  		div.innerHTML = ex;
  	} else if (document.implementation && document.implementation.createDocument) {
		xsltProcessor = new XSLTProcessor();
		xsltProcessor.importStylesheet(xsl);
		resultDocument = xsltProcessor.transformToFragment(xml, document);
		div.appendChild(resultDocument);
	}
}