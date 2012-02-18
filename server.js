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

var casino = new blackjack.Casino();

application.get('/', function(req, res){
	var table = casino.getFreeTable();
	
	if(table.isGameComplete()){
		table.startNextGame();
	}
	
	player = table.dealHand();
	
	res.redirect('/'+table.Id+'/'+player);
});

application.get('/:tableid/:playerid', function(req, res){
	var player = req.params.playerid;
	var tableId = req.params.tableid;
	
	var table = casino.getTable(parseInt(tableId));
	
	res.render('table.jade', {playerId:player, table:table});
});

application.get('/:tableid/:playerid/twist', function(req, res){
	var tableId = req.params.tableid;
	var table = casino.getTable(tableId);
	var playerId = parseInt(req.params.playerid);
	table.draw(playerId);
	
	checkForCompleteGame(table, playerId, res);
});

application.get('/:tableid/:playerid/stick', function(req, res){
	var tableId = req.params.tableid;
	var table = casino.getTable(tableId);
	var playerId = parseInt(req.params.playerid);
	
	table.stick(playerId);
	
	checkForCompleteGame(table, playerId, res);
});

function checkForCompleteGame(table, playerId, res){
	if(table.isGameComplete()){
		while(table.dealer.score() <= 16)
			table.dealer.draw();
		
		res.render('result.jade', {playerId:playerId, table:table});
	}
	else
		res.render('table.jade', {playerId:playerId, table:table});
}

application.listen(hosting.port);