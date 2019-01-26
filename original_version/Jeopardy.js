function removeLetters(){
	document.getElementById("jepBoard").style.display = "none";
}

function displayBoard(removeID){
	document.getElementById("jepBoard").style.display = "block";
	document.getElementById(removeID).style.display = "none";
}

function checkDailyDouble(answerStr, questionStr, answerID, boxID, dailyDouble){
	
	// Shows daily double graphic if true
	if ( dailyDouble == true ) {
		
		// Creates container div
		container = document.createElement("DIV");
		container.setAttribute("id", "container");
		
		container.style = "width: 100%; height: 400px; background: yellow;";
		
		// Creates paragraph element for 'Daily Double' text
		newText = document.createElement("P");
		newText.setAttribute("id", "dailyDouble");
		newTextNode = document.createTextNode("Daily Double!");
		newText.appendChild(newTextNode);
		
		newText.style = "line-height: 400px; text-align: center; font-size: 100px;";
		
		// Appends both to body
		container.appendChild(newText);
		document.body.appendChild(container);
		
		
		// Pauses execution for one second and then runs removeDailyDouble function
		window.setTimeout(function() {
			// Gets div element containing 'Daily Double' text and removes it
			document.body.removeChild(document.getElementById("container"));
	
			// Runs function that displays the answer
			revealAnswer(answerStr, questionStr, answerID, boxID);
		}, 2500);
		
	}
	
	// Runs function that displays the answer
	else {
		revealAnswer(answerStr, questionStr, answerID, boxID);
	}
}
	
	
function revealAnswer(answerStr, questionStr, answerID, boxID) {
	var revealed = false;
	
	var answerPar = document.createElement("P");
	answerPar.setAttribute("ID", answerID);
	answerPar.setAttribute("class", "text");
	var answerText = document.createTextNode(answerStr);
	answerPar.appendChild(answerText);
	document.body.appendChild(answerPar);

	// Creates question
	var Answer = document.getElementById(answerID);
	var questionPar = document.createElement("P");
	var Text = document.createTextNode(questionStr);
	questionPar.appendChild(Text);
	questionPar.setAttribute("ID", "question");
	questionPar.setAttribute("class", "text");
	document.body.insertBefore(questionPar, Answer);
	document.getElementById("question").style.display = "none";
	
	
	// *************************************************
	// Creates 'Reveal' button
	var reveal = document.createElement("A");
	var Label = document.createTextNode("Reveal");
	reveal.appendChild(Label);
	reveal.setAttribute("class", "buttons");
	reveal.setAttribute("href", "#test");
	reveal.setAttribute("ID", "reveal");
	
	// Adds an onclick funtion to the 'Reveal' button; reveals question
	reveal.onclick = function() {
		// Hides answer in order to display questionStr
		Answer.style.display = "none";
		
		// Shows question
		document.getElementById("question").style.display = "block";
		
		// Hides 'Reveal' button
		document.getElementById("reveal").style.display = "none";
		
		revealed = true;
	};
	
	// Appends 'Reveal' button to body
	document.body.appendChild(reveal);
	
	// *************************************************
	// Creates 'Back' button
	var back = document.createElement("A");
	var newLabel = document.createTextNode("Back");
	back.appendChild(newLabel);
	back.setAttribute("class", "buttons");
	back.setAttribute("href", "#test");
	back.setAttribute("ID", "back");
	
	// Adds an onclick function to 'Back' button; returns to menu
	back.onclick = function() {
		// Re-displays jeopardyBoard, deletes everything else
		document.getElementById("jepBoard").style.display = "block";
		
		// Deletes 'Back' button
		document.body.removeChild(document.getElementById("back"));
		
		// Deletes 'Reveal' button
		document.body.removeChild(document.getElementById("reveal"));
		
		// Deletes question
		document.body.removeChild(document.getElementById("question"));
		
		// Deletes answer
		document.body.removeChild(document.getElementById(answerID));
		
		if ( revealed ) { // If 'Reveal' button has been clicked the corresponding box on the jeopardy board is blacked out
			box = document.getElementById(boxID);
			
			placement = box.parentNode;
			
			box.parentNode.removeChild(box);
			
			var textEl = document.createElement("P");
			console.log(boxID.slice(3,6));
			var Text = document.createTextNode(boxID.slice(3,6));
			textEl.appendChild(Text);
			textEl.setAttribute("class", "clickedBox");
			console.log()
			
			placement.appendChild(textEl);
		}
	};
	
	document.body.appendChild(back);
	
}

function revealQuestion(boxID, answerID, questionString) {
	var Answer = document.getElementById(answerID);
	
	// Creates text and appends to body
	var questionPar = document.createElement("P");
	var Text = document.createTextNode(questionString);
	questionPar.appendChild(Text);
	document.getElementById(boxID).insertBefore(questionPar, Answer);
	
	// Hides answer in order to display questionString
	Answer.style.display = "none";
}