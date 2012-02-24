var http = require('http'),
express = require('express'),
blackjack = require('./blackjack'),
io = require('socket.io');

var hosting = {
	port : process.argv[2] 
			|| process.env.PORT 
			|| process.env.C9_PORT 
			|| 80
};

var casino = new blackjack.Casino();
var application = express.createServer();

application.configure(function() {
	application.set('view engine', 'jade');
	application.set('view options', {layout:false});
	application.use(express.static(__dirname+'/scripts'));
	application.use(express.static(__dirname+'/css'));
});

application.get('/', function(req, res){
	res.render('casino.jade', {});
	//res.render('iotable.jade', {playerId:player, table:table});
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

var listener = io.listen(application);
listener.sockets.on('connection', function (socket) {
	var table = casino.getFreeTable();
	
	if(table.isGameComplete()){
		table.startNextGame();
	}
	
	player = table.dealHand();
	
	socket.emit("connectedToTable", table);
	
	socket.set("player", player);
	socket.set("table", table.Id);
	
	socket.on("twist", function(){
		socket.get("table", function(err, tableId){
			socket.get("player", function(err, playerId){
				console.log("Player "+playerId+" on table "+tableId+" just twisted");
				var table = casino.getTable(tableId)
				table.draw(playerId);
				
				checkForCompleteGame(table, playerId);
			});
		});
	});
	
	socket.on("stick", function(){
		socket.get("table", function(err, tableId){
			socket.get("player", function(err, playerId){
				console.log("Player "+playerId+" on table "+tableId+" just stuck");
				var table = casino.getTable(tableId)
				table.stick(playerId);
				
				checkForCompleteGame(table, playerId);
			});
		});
	});
});

function checkForCompleteGame(table, playerId){
	if(table.isGameComplete()){
		while(table.dealer.score() <= 16)
			table.dealer.draw();
		
		listener.sockets.emit('dealerchange', table.dealer);
		//res.render('result.jade', {playerId:player, table:table});
	}
	//else
		//res.render('table.jade', {playerId:player, table:table});
	
	listener.sockets.emit('playerchange', table.players[playerId]);
}