GLOBAL.DEBUG = true;

var http = require('http');
var express = require('express');
var blackjack = require('./blackjack');

var hosting = {
	port : process.argv[2] 
			|| process.env.PORT 
			|| process.env.C9_PORT 
			|| 80
};

var application = express.createServer();

application.configure(function() {
	application.set('view engine', 'jade');
	application.set('view options', {layout:false});
	application.use(express.static(__dirname+'/scripts'));
});


application.get('/', function(req, res){
	var table = new blackjack.Table();
	table.dealHand();
	
	storeTable(table);
	
	res.render('table.jade', table);
});

application.get('/twist', function(req, res){
	var tableId = req.query.table;
	var table = getTable(tableId);
	
	table.you.draw();
	
	res.render('table.jade', table);
});

application.get('/stick', function(req, res){
	var tableId = req.query.table;
	var table = getTable(tableId);
	
	while(table.dealer.score() <= table.you.score() && table.dealer.score() <= 16)
		table.dealer.draw();
	
	res.render('result.jade', table);
});

var tables = [];
function storeTable(table){
	var tableId = tables.push(table)-1;
	table.Id = tableId;
	
	return table;
}

function getTable(tableId){
	return tables[parseInt(tableId)];
}

application.listen(hosting.port);