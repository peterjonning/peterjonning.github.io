const cardContent = document.querySelector('.card__content');
const btnComplete = document.querySelector('.btn__complete');
const btnReveal = document.querySelector('.btn__reveal');

// var tasksRaw = JSON.parse(https://raw.githubusercontent.com/peterjonning/peterjonning.github.io/main/tasks.json);

// var tasksRaw = JSON.stringify('https://raw.githubusercontent.com/peterjonning/peterjonning.github.io/main/tasks.json'); //(with path)
// https://raw.githubusercontent.com/peterjonning/peterjonning.github.io/main/tasks.json

// fetch("https://raw.githubusercontent.com/peterjonning/peterjonning.github.io/main/tasks.json")
// .then(response => {
//    return response.json();
// })
// .then(data => tasksRaw = data);

// var tasksRaw = []

// tasksRaw = getJSON();

// function getJSON(){

var taskList = [];


function run() {
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://raw.githubusercontent.com/peterjonning/peterjonning.github.io/main/tasks.json');
	ourRequest.onload = function(){
		tasksRaw = JSON.parse(ourRequest.responseText);
		console.log(tasksRaw[0]);
		console.log(tasksRaw);
		var e = document.getElementById("heatSelect");
		var heatLevel = e.value;
		var e = document.getElementById("numPlayersSelect");
		var numPlayers = e.value;
		var e = document.getElementById("types");
		var playerType = e.value;

		for (var i = 0; i < tasksRaw.length; i++) {
			var obj = tasksRaw[i];
			if (obj['heat'] == heatLevel) {
				for (var j = 0; j < obj['playerNum'].length; j++) {
					if (obj['playerNum'][j] == numPlayers) {
						for (var k = 0; k < obj['players'].length; k++) {
							if (obj['players'][k] == playerType) {
								taskList.push(obj['task']);
							}
						}
					}
				}
			}
		};
		genColour();
	};
	ourRequest.send();
};

function getColor() { 
  return "hsl(" + 360 * Math.random() + ',' +
             (25 + 70 * Math.random()) + '%,' + 
             (85 + 10 * Math.random()) + '%)'
};

function genColour() {
	// var hue = Math.floor(Math.random() * 360);
	// var randomColor = 'hsl(' + hue + ', 100%, 80%)';
	randomColor = getColor();
	console.log(randomColor);
	document.getElementById('card__front').style.backgroundColor = randomColor;
	document.getElementById('card__back').style.backgroundColor = randomColor;

	document.getElementById('card__content').style.display = "block";
	document.getElementById('gameSetup').style.display = "none";
}

function flipCard() {
  cardContent.classList.toggle('is-flipped');
}

function addTask() {
	task = taskList.splice(Math.floor(Math.random()*taskList.length), 1);
	document.getElementById('card__back__content').innerHTML ="<h4>" + task + "</h4>";
	document.getElementById('btn__reveal').style.display = "none";
	document.getElementById('btn__complete').style.display = "inline";
}

function cardBack() {
	document.getElementById('card__back__content').innerHTML ="<h4>" + task + "</h4>";
	
}

function completed() {
	flipCard();
	genColour();
	document.getElementById('btn__reveal').style.display = "inline";
	document.getElementById('btn__complete').style.display = "none";
	document.getElementById('card__back__content').innerHTML ="";
}

	
btnComplete.addEventListener('click', completed);
btnReveal.addEventListener('click', addTask);