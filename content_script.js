(function() {
if($( "img[alt^='Périodiques']" ).length != 0 && $( "span.tab1" ).text() == "Notice détaillée"){
//document.body.style.border = "5px solid red";
$('.tabbar').append('<span class="tabsep">|</span><span class="tab1" id="toogleGraph">Afficher/masquer le graphe</span>');	
$('.tabbar').append('<div class="filiation" id="network" style="height:400px;width:600px;border:1px solid lightgray;background-color:#e4ebf5;float:left;"></div><div class="filiation" id="locs" style="background-color:white;columns:3 100px"></div>');
	var nodes = new vis.DataSet();
    var edges = new vis.DataSet();
//$(".filiation") .hide();  

  var container = document.getElementById('network');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {
			interaction:{hover:true, navigationButtons: true},
            layout:{
    hierarchical: true
  }			
		};
  var network = new vis.Network(container, data, options);
  network.once('startStabilizing', function() { var scaleOption = { scale : 0.8 }; network.moveTo(scaleOption); }); 
   network.on("hoverNode", function (params) {
	   document.getElementById("locs").innerHTML = "";	
       getLocs(params.node);		   
    });
	 network.on("selectNode", function (params) {
		createGraphBranch(params.nodes[0]);
    });	
	
}
$( "#toogleGraph" ).on( "click", function() {
      runEffect();
    });	
	
function runEffect() {
      var options = {};
      $( ".filiation" ).toggle( "blind", options, 500 );
    };
function createGraphBranch(ppn)	{	
 browser.runtime.sendMessage({content: ppn})
  .then(handleResponse);
}	

function getLocs(ppn){
	 browser.runtime.sendMessage({contentLocs: ppn})
  .then(handleResponseLocs);	
}

function handleResponseLocs(message) {
     $.each(message.response.locs, function(key, value){
   $("#locs").append('<h6><bold>'+ value.bib+'</bold></h6');
         });
}
function handleResponse(message) {
     $.each(message.response.links, function(key, value){
    nodes.add([{id: ((((value.ppn).split("http://www.sudoc.fr/"))[1]).split("/"))[0], label: value.title}]); 
    edges.add([{from: message.response.id, to: ((((value.ppn).split("http://www.sudoc.fr/"))[1]).split("/"))[0], label: value.type, arrows:'to'}]);	
	
         });
}

function sendMessageFirst(e) {	
var ppn = $('table[summary="title presentation"] tr:first').find(" td.rec_title span a").html().split("http://www.sudoc.fr/").pop(); 
var titre = $('table[summary="title presentation"] td.rec_lable:contains("Titre")').next().find("div span a").text();
nodes.add([{id: ppn, label: titre}]);
  browser.runtime.sendMessage({content: ppn})
  .then(handleResponse);
}

window.addEventListener("load", sendMessageFirst, false);
})();