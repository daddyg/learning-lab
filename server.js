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

var table = new blackjack.Table();
application.get('/', function(req, res){
	var player = req.query.player 
	
	if(table.isGameComplete())
	{
		table.startNextGame();
	}
	
	if(player == null){
		player = table.dealHand();
	}
	
	storeTable(table);
	
	res.render('table.jade', {playerId:player, table:table});
});

application.get('/twist', function(req, res){
	var tableId = req.query.table;
	var table = getTable(tableId);
	var playerId = parseInt(req.query.player);
	table.draw(playerId);
	
	res.render('table.jade', {playerId:playerId, table:table});
});

application.get('/stick', function(req, res){
	var tableId = req.query.table;
	var table = getTable(tableId);
	var playerId = parseInt(req.query.player);
	
	table.stick(playerId);
	
	if(table.isGameComplete()){
		while(table.dealer.score() <= 16)
			table.dealer.draw();
		
		res.render('result.jade', {playerId:playerId, table:table});
	}
	else
		res.render('table.jade', {playerId:playerId, table:table});
});

var tables = [];
function storeTable(table){
	//var tableId = tables.push(table)-1;
	table.Id = 0;//tableId;
	
	return table;
}

function getTable(tableId){
	return table;//tables[parseInt(tableId)];
}

application.listen(hosting.port);