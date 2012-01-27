function drawCard(id, cardNumber, suit){
	var drawingCanvas = document.getElementById(id);
	if(drawingCanvas.getContext) {
	var context = drawingCanvas.getContext('2d');
		drawCardBack(context);
		drawRank(context, cardNumber, suit >= 2);
		switch(suit){
			case 0:
				drawHeart(context);
				break;
				
			case 1:
				drawDiamond(context);
				break;
				
			case 2:
				drawClub(context);
				break;
				
			case 3:
				drawSpade(context);
				break;
		}
	}
}

function drawCardBack(context){
	context.fillStyle = "#ff0000";
	context.strokeStyle = "#ff0000";
	context.beginPath();
	context.moveTo(15,0);
	context.lineTo(185,0);
	context.quadraticCurveTo(185,0,200,15);
	context.lineTo(200,285);
	context.quadraticCurveTo(200,285,185,300);
	context.lineTo(15,300);
	context.quadraticCurveTo(15,300,0,285);
	context.lineTo(0,15);
	context.quadraticCurveTo(0,15,15,0);
	context.closePath();
	context.stroke();
}

function drawRank(context, cardNumber, isBlack){
	if(isBlack)
		context.fillStyle    = '#000';
	else
		context.fillStyle    = '#f00';
		
	context.font         = 'bold 30px sans-serif';
	context.textBaseline = 'top';
	var text = cardNumber+1;
	if(cardNumber == 10)
		text = "J";
	else if(cardNumber == 11)
		text  = "Q";
	else if(cardNumber == 12)
		text  = "K";
	
	context.textAlign = "left";
	context.fillText(text, 10, 10);
	context.textAlign = "right";
	context.fillText(text, 185, 265);
}

function drawHeart(context){
	var x = 100;
	var y = 75;
	var width = 100;
	var height = 150;
	context.beginPath();
	var topCurveHeight = height * 0.3;
	context.moveTo(x, y + topCurveHeight);
	// top left curve
	context.bezierCurveTo(
		x, y, 
		x - width / 2, y, 
		x - width / 2, y + topCurveHeight
	);
	// bottom left curve
	context.bezierCurveTo(
		x - width / 2, y + (height + topCurveHeight) / 2, 
		x, y + (height + topCurveHeight) / 2, 
		x, y + height
	);
	// bottom right curve
	context.bezierCurveTo(
		x, y + (height + topCurveHeight) / 2, 
		x + width / 2, y + (height + topCurveHeight) / 2, 
		x + width / 2, y + topCurveHeight
	);
	// top right curve
	context.bezierCurveTo(
		x + width / 2, y, 
		x, y, 
		x, y + topCurveHeight
	);
	context.closePath();
	context.fillStyle = "red";
	context.fill();
}

function drawDiamond(context){
	context.fillStyle = "#ff0000";
	context.strokeStyle = "#ff0000";
	context.beginPath();
	context.moveTo(100,80);
	context.lineTo(150,150);
	context.lineTo(100,220);
	context.lineTo(50,150);
	context.closePath();
	context.stroke();
	context.fill();
}

function drawClub(context){
	var x = 100;
	var y = 75;
	var width = 100;
	var height = 150;
	var circleRadius = width * 0.3;
	var bottomWidth = width * 0.5;
	var bottomHeight = height * 0.35;
	context.fillStyle = "black";
	// top circle
	context.beginPath();
	context.arc(
		x, y + circleRadius + (height * 0.05), 
		circleRadius, 0, 2 * Math.PI, false
	);
	context.fill();
	// bottom right circle
	context.beginPath();
	context.arc(
		x + circleRadius, y + (height * 0.6), 
		circleRadius, 0, 2 * Math.PI, false
	);
	context.fill();
	// bottom left circle
	context.beginPath();
	context.arc(
		x - circleRadius, y + (height * 0.6), 
		circleRadius, 0, 2 * Math.PI, false
	);
	context.fill();
	// center filler circle
	context.beginPath();
	context.arc(
		x, y + (height * 0.5), 
		circleRadius / 2, 0, 2 * Math.PI, false
	);
	context.fill();
	// bottom of club
	context.moveTo(x, y + (height * 0.6));
	context.quadraticCurveTo(
		x, y + height, 
		x - bottomWidth / 2, y + height
	);
	context.lineTo(x + bottomWidth / 2, y + height);
	context.quadraticCurveTo(
		x, y + height, 
		x, y + (height * 0.6)
	);
	context.closePath();
	context.fill();
}

function drawSpade(context){
	var x = 100;
	var y = 75;
	var width = 100;
	var height = 150;
	var bottomWidth = width * 0.7;
	var topHeight = height * 0.7;
	var bottomHeight = height * 0.3;
	context.fillStyle = "black";
	context.beginPath();
	context.moveTo(x, y);
	context.bezierCurveTo(
		x, y + topHeight / 2, // control point 1
		x - width / 2, y + topHeight / 2, // control point 2
		x - width / 2, y + topHeight // end point
	);
	// bottom left of spade
	context.bezierCurveTo(
		x - width / 2, y + topHeight * 1.3, // control point 1
		x, y + topHeight * 1.3, // control point 2
		x, y + topHeight // end point
	);
	// bottom right of spade
	context.bezierCurveTo(
		x, y + topHeight * 1.3, // control point 1
		x + width / 2, y + topHeight * 1.3, // control point 2
		x + width / 2, y + topHeight // end point
	);
	// top right of spade
	context.bezierCurveTo(
		x + width / 2, y + topHeight / 2, // control point 1
		x, y + topHeight / 2, // control point 2
		x, y // end point
	);
	context.closePath();
	context.fill();
	// bottom of spade
	context.beginPath();
	context.moveTo(x, y + topHeight);
	context.quadraticCurveTo(
		x, y + topHeight + bottomHeight, // control point
		x - bottomWidth / 2, y + topHeight + bottomHeight // end point
	);
	context.lineTo(x + bottomWidth / 2, y + topHeight + bottomHeight);
	context.quadraticCurveTo(
		x, y + topHeight + bottomHeight, // control point
		x, y + topHeight // end point
	);
	context.closePath();
	context.fillStyle = "black";
	context.fill();
	context.restore();
}