function handleMessage(message ,sender, sendMessage) {
	var mapping = [{"P60281":"Supplément de"},{"P60259":"Supplément de"},{"P60256":"Publié avec"},{"P60245":"Mis à jour par"},{"P60303":"Met à jour"},{"P60576":"Suite de"},{"P60276":"Suite partielle de"},{"P60480":"Remplace"},{"P60479":"Remplace partiellement"},{"P60574":"Absorbe"},{"P60575":"Absorbe partiellement"},{"P60505":"Fusion de"},{"P60277":"Séparé de"},{"P60306":"Devient/Redevient"},{"P60199":"Devient partiellement"},{"P60104":"Remplacé par"},{"P60103":"Remplacé partiellement par"},{"P60247":"Absorbé par"},{"P60248":"Absorbé partiellement par"},{"P60503":"Scindé en.."},{"P60504":"Fusionne (avec...) pour donner"},{"hasVersion":"Autre édition sur un autre (ou le même) support"}];
	var constructHttpsRdfUri = "https://www.sudoc.fr/" + message.content + ".rdf";
  $.ajax({
   type: "POST",
   url: constructHttpsRdfUri
}).done(function( response) {
	var fields = $.xml2json(response).Periodical;
	var links = [];
	$.each(fields, function( index, value ) {
			   var found = $.map(mapping, function(val) {
           return val[index];
            });
			if(found != '') {	   
             links.push({type:found[0],title:value.Document.bibliographicCitation,ppn:value.Document["rdf:about"]});  
			}
            });
			sendMessage({response: {id:message.content,label:fields.title,links:links}});

});
  return true;
} 
function handleMessageLocs(message ,sender, sendMessage) { 
 var constructMultiwhereUrl = "https://www.sudoc.fr/services/multiwhere/" + message.contentLocs + ".xml";	
 $.ajax({
   type: "GET",
   url: constructMultiwhereUrl
}).done(function( response) {
	var locs = [];
   var libraries= $.xml2json(response).query.result.library;
		if($.isArray(libraries)) {
			$.each(libraries, function( idx, obj) {
	 $.each(obj, function(key, value) {
    if(key == "shortname"){
     locs.push({bib:value});
   }
});	
	});			
	}
	else{
     locs.push({bib:libraries.shortname});
	}	

	sendMessage({response: {locs:locs}});
});
return true;
}

browser.runtime.onMessage.addListener(handleMessage);
browser.runtime.onMessage.addListener(handleMessageLocs);