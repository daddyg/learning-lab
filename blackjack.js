exports.Card = function(){
	this.CardNumber = Math.floor(Math.random()*13);
	this.Suit = Math.floor(Math.random()*4);
	
	this.toString = function(){
		return exports.Card.PossibleValues[this.CardNumber] + " "+ exports.Card.PossibleSuits[this.Suit];
	}
	
	this.toCardString = function(){
		return this.CardNumber > 0 && this.CardNumber < 10 ? exports.Card.PossibleValues[this.CardNumber] : exports.Card.PossibleValues[this.CardNumber].substring(0,1);
	}
	
	this.value = function(){
		return this.CardNumber+1 > 10 ? 10 : this.CardNumber+1;
	}
}
exports.Card.PossibleValues = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
exports.Card.PossibleSuits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

exports.Hand = function(){
	this.draw = function(){
		this.cards.push(new exports.Card());
	}
	
	this.scores = function(){
		var scores = [0];
		var anyAces = false;
		for(var i=0;i<this.cards.length;i++){
			if(this.cards[i].CardNumber == 0){
				anyAces = true;
			}
			
			scores[0] += this.cards[i].value();
		}
		
		if(anyAces && scores[0]+10 <= 21){
			scores.push(scores[0]+10);
		}
		
		return scores;
	}
	
	this.score = function(){
		return this.scores().pop();
	}
	
	this.isBust = function(){
		return this.score() > 21;
	}
	
	this.cards = [];
	this.draw();
	this.draw();
};

exports.Table = function(){
	this.dealer = new exports.Hand();
	this.players = [];
	this.currentPlayer = 0;
	
	this.dealHand = function(){
		var id = this.players.push(new exports.Hand()) - 1;
		this.players[id].Id = id;
		return id;
	}
	
	this.draw = function(player){
		if(!this.players[player].isBust()) {
			this.players[player].draw();
			
			if(this.players[player].isBust()){
				this.currentPlayer++;
			}
		}
	}
	
	this.stick = function(player){
		this.currentPlayer++;
	}
	
	this.isGameComplete = function(){
		return this.currentPlayer >= this.players.length;
	}
	
	this.startNextGame = function(){
		this.currentPlayer = 0;
		this.players = [];
		this.dealer = new exports.Hand();
		for(var i=0;i<this.players.length;i++){
			this.players[i] = new exports.Hand();
		}
	}
}