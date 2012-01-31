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
	var hand = new blackjack.Hand();
	
	var table = storeHand(hand);
	
	res.render('index.jade', {table:table, you:hand});
});

application.get('/twist', function(req, res){
	var table = req.query.table;
	var hand = getHand(table);
	
	hand.draw();
	
	res.render('index.jade', {table:table, you:hand});
});

application.get('/stick', function(req, res){
	var table = req.query.table;
	var hand = getHand(table);
	
	var dealer = new blackjack.Hand();
	
	while(dealer.score() <= hand.score() && dealer.score() <= 16)
		dealer.draw();
	
	res.render('result.jade', {table:table, you:hand, dealer:dealer});
});

var hands = [];
function storeHand(hand){
	var table = hands.push(hand)-1;
	return table;
}

function getHand(table){
	return hands[parseInt(table)];
}

application.listen(hosting.port);