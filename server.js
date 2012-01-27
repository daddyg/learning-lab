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

var hand;
application.get('/', function(req, res){
	hand = new blackjack.Hand();
	
	res.render('index.jade', hand);
});

application.get('/twist', function(req, res){
	hand.draw();
	
	res.render('index.jade', hand);
});

application.get('/stick', function(req, res){
	var dealer = new blackjack.Hand();
	
	while(dealer.score() <= 16)
		dealer.draw();
		
	res.render('result.jade', {you:hand, dealer:dealer});
});

application.listen(hosting.port);