function drawTable(table){
	$(".hands").empty();
	
	drawHand(table.dealer, $(".dealer .hand"));
	var i=0;
	for(i;i<table.players.length;i++){
		var div = $("<div />", {id:"player"+table.players[i].Id, 'class':'playerhand'}).appendTo(".hands");
		drawHand(table.players[i], div);
	}
}

function drawHand(hand, container){
	var i=0;
	container.empty();
	
	for(i;i<hand.cards.length;i++){
		var card = hand.cards[i];
		var cardId = createCardId(card);
		
		$('<canvas width="50" height="75" class="card" id="'+cardId+'"/>').appendTo(container);
		
		drawCard(cardId, card.CardString, card.CardNumber, card.Suit);
		
	}
}

function createCardId(card){
	return card.CardNumber+"_"+card.Suit+"_"+Math.floor(Math.random()*1000);
}