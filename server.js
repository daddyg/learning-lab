var http = require('http');
var express = require('express');
var blackjack = require('./blackjack');
var mongo = require('mongodb');

var mongoBlackjack = new mongo.Db('blackjack', new mongo.Server("127.0.0.1", 27017, {}),
    test = function (err, collection) {
      collection.insert({a:2}, function(err, docs) {

        collection.count(function(err, count) {
          
        });

        // Locate all the entries using find
        collection.find().toArray(function(err, results) {
          

          // Let's close the db
          mongoBlackjack.close();
        });
      });
    });

mongoBlackjack.open(function(err, p_client) {
  mongoBlackjack.collection('test_insert', test);
});

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
	
	
	
	res.render('index.jade', hand);
});

application.get('/twist', function(req, res){
	var hand = getHand(req.data.id);
	hand.draw();
	
	res.render('index.jade', hand);
});

application.get('/stick', function(req, res){
	var hand = getHand(req.data.id);
	
	var dealer = new blackjack.Hand();
	
	while(dealer.score() <= 16)
		dealer.draw();
		
	res.render('result.jade', {you:hand, dealer:dealer});
});

function getHand(id){
	return null;
}

application.listen(hosting.port);