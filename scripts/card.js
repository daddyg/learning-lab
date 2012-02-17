function drawCard(id, cardText, cardNumber, suit){
	var drawingCanvas = document.getElementById(id);
	if(drawingCanvas.getContext) {
	var context = drawingCanvas.getContext('2d');
		drawCardOutline(context);
		drawRank(context, cardText, suit >= 2);
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

function drawCardBack(id){
	var drawingCanvas = document.getElementById(id);
	if(drawingCanvas.getContext) {
	var context = drawingCanvas.getContext('2d');
		drawCardOutline(context);
		drawCardPattern(context);
	}
}

function drawRoundedRectangle(context, x,y,width,height,radius)
{
	context.fillStyle = "#ff0000";
	context.strokeStyle = "#ff0000";
	context.beginPath();
	context.moveTo(x+radius,y);
	context.lineTo(x+width-radius,y);
	context.quadraticCurveTo(x+width-radius,y,x+width,y+radius);
	context.lineTo(x+width,y+height-radius);
	context.quadraticCurveTo(x+width,y+height-radius,x+width-radius,y+height);
	context.lineTo(x+radius,y+height);
	context.quadraticCurveTo(x+radius,y+height,x,y+height-radius);
	context.lineTo(x,y+radius);
	context.quadraticCurveTo(x,y+radius,x+radius,y);
	context.closePath();
	context.stroke();
}

function drawCardPattern(context){
	drawRoundedRectangle(context, 10,10,30,55,4);
	context.fill();
}

function drawCardOutline(context){
	drawRoundedRectangle(context, 0,0,50,75,4);
}

function drawRank(context, cardText, isBlack){
	if(isBlack)
		context.fillStyle    = '#000';
	else
		context.fillStyle    = '#f00';
		
	context.font         = 'bold 12px sans-serif';
	context.textBaseline = 'top';
	
	context.textAlign = "left";
	context.fillText(cardText, 4, 4);
	context.textAlign = "right";
	context.fillText(cardText, 46, 60);
}

function drawHeart(context){
	var x = 25;
	var y = 15;
	var width = 30;
	var height = 45;
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
	context.moveTo(25,15);
	context.lineTo(40,37);
	context.lineTo(25,60);
	context.lineTo(10,37);
	context.closePath();
	context.stroke();
	context.fill();
}

function drawClub(context){
	var x = 25;
	var y = 15;
	var width = 30;
	var height = 45;
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
	var x = 25;
	var y = 15;
	var width = 30;
	var height = 45;
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