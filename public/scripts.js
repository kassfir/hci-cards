//press enter or space to do stuff

var tutorialFlag = true;
var locked = false;
$("body").keypress(function(e) {
    if(e.which === 13 || e.which === 32) {
      if(tutorialFlag){
        if(!findOne && locked){
          freshStart();
          return
        }
        else{
          checkTaskTutorial();
          return;
        }
      }else{
        if(!locked){
          checkTask();
          return;
        }
        return;
      }
    }
  })


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



//###############################################################
//########### EVERYTHING TO DO WITH CARD CREATION ###############
//###############################################################
let cards;
const taskMax = 9;
const cardCount = 16;
const allChars = 'abcdefghijklmnopqrstuvwxyz';
const vowels = 'aeiou';
const consonants = 'bcdfghjklmnpqrstvwxz';

let hardTaskOrder = [1,2,3];        //
let fontOrder = ['times', 'arial'];//, 'trebuchet', 'georgia'];
let taskCount = 0;                  //
var allTaskCount = 0;               //
var blockDB = false;         //
var startTime = Date.now();
var findOne = false;


let iter;

//calls the functions needed to populate the
function populateDeck (){
  iter = 0;
  var j = 0;
	//symmetrical strings 1 - 3
	for (j = 0; j < (1 + Math.floor(Math.random()*3)); j++) {
    createSymmetricalString();
	}

	//consonants and vowels 1 - 2 each
	for (j = 0; j < (1 + Math.floor(Math.random())*2); j++) {
    createVowelString();
	}

	for (j = 0; j < (1 + Math.floor(Math.random())*2); j++){
    createConsonantString();
	}

	//random strings
	while (iter < cardCount){
    createRegularString();
	}
}

//creates the <div> necessary for a card
function createCard (cardString, decoy){
  $(".memory-game").append('<div class = "memory-card" data-str = '+
  cardString + '> <p>' +
  cardString.substr(0,7) + "<br>" +
  cardString.substr(7,8) +
  '</p></div>');

  iter++;

      //createDecoy basically creates a highly similar string, and if it is called
        //the second time, it will not allow creating another one.
  if (decoy === false && iter < cardCount){
    createDecoy (cardString);
  }
      //there's a 60% chance a second decoy will be created.
	if ((Math.random() < 0.6) && iter < cardCount -2  && decoy === false){
		createDecoy(cardString);
	}
}

//create 15 chars long random string
function createRegularString(){
  var cardString = "";
	for (var j = 0; j < 15; j++){
		cardString = cardString + charGen(allChars);
	}
  createCard(cardString, false);
}

//create 15 chars long random vowel string
function createVowelString(){
  var cardString = "";
	for (var j = 0; j < 15; j++){
		cardString = cardString + charGen(vowels);
	}
  createCard(cardString, false);
	// return cardString;
}

//create 15 chars long random consonant string
function createConsonantString(){
  var cardString = "";
	for (var j = 0; j < 15; j++){
		cardString = cardString + charGen(consonants);
	}
  createCard(cardString, false);
	// return cardString;
}

//create 7 + 1 + 7 chars long random string
function createSymmetricalString(){
  var cardString = "";
	for (var j = 0; j < 7; j++){
		cardString = cardString + charGen(allChars);
	}
	cardString = cardString + charGen(allChars) + reverse(cardString);
  createCard(cardString, false);
	// return cardString;
}

//makes a string that is only slightly different to
  //confuse the user
function createDecoy (cardString){
	var decoyString = cardString;

	for (var i = 3; i < 12; i++){
		if (Math.random() < 0.4){
			decoyString = setCharAt(decoyString, i, allChars);
      //function setCharAt(str, index, permitted)
		}
	}
	 if (decoyString  === cardString){
	    createDecoy(cardString);
	 }
	 else {
	 	createCard (decoyString, true);
	 }
}

//helper for createSymmetricalString
function reverse (str){
	var tempStr = "";
	for (var i = (str.length - 1); i >= 0; i--){
		tempStr += str.charAt(i);
	}
	return tempStr;
}

//returns a random character; helper for the create string functions
function charGen(permitted){
	return permitted.charAt(Math.floor(Math.random() * permitted.length));
}

//changes a char at index; helper for createDecoy
function setCharAt(str, index, permitted) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + charGen(permitted)
          + str.substr(index+1, str.length - index - 1);
}

//mixes cards to obfuscate pattern and turns them into buttons
function shuffle (){

  cards = document.querySelectorAll('.memory-card');

	cards.forEach(card => {
    card.addEventListener('click', selectCard);

		let randomPos = Math.floor(Math.random()*cardCount);
		card.style.order = randomPos;
	});
}

//do the font function more intelligently
function changeFont(font){
  //fontOrder = Math.floor(Math.random()*3);
  for (var i = 0; i < fontOrder.length; i++){
    $(".memory-game").removeClass(fontOrder[i]);
  }
  $(".memory-card").addClass(fontOrder[allTaskCount]);//css("font-family", "Impact");
}

//function and global for toggle selecting card
let hasSelectedCard = false;
function selectCard(){
  if (findOne){
    for (var i = 0; i < cardCount; i++){
      cards[i].classList.remove('selected');
    }
    this.classList.add('selected');
    hasSelectedCard = true;
    return;
  }

	if (!this.classList.contains('selected')){
  		hasSelectedCard = true;
  		this.classList.add('selected');
  		return;
	} else {
  		hasSelectedCard = false;
  		this.classList.remove('selected');
	}
}

//###############################################################
//########## EVERYHTHING TO DO WITH TASK CREATION ###############
//###############################################################

let taskArray = [];
let pastTask = "";
//changes the formatting to check if the card is right

//finds all strings and cards
function checkTask(){

  //if no card is selected, doesn't allow to check the task
  if (!hasSelectedCard){
    return;
  }
  var answerCount = 0;
  var wrong = 0;
  var right = 0;
  var time = (Date.now() - startTime)/1000;
    //if a card is the same as an array object and is selected, it gets
      //added the class "right" and becomes green. Otherwise,
      //there is a class called "actually" added, and it becomes blue.
	for (var i = 0; i < cardCount; i++){
    var abort = false;

    for (var j = 0; j < taskArray.length && !abort; j++){

      if (cards[i].dataset.str === taskArray[j]){
        answerCount++;

        if (cards[i].classList.contains('selected')){
          showEvaluation(i, 'right');
          right++;
        } else {
          showEvaluation(i, 'actually');
        }
            //clears this task and continues the second loop
        taskArray.splice(taskArray.indexOf(taskArray[j]), 1)
        abort = true;
      }
    }

    //if the card doesn't match the correct answer, and
        //it's selected, the class "wrong" is added.
    if (cards[i].classList.contains('selected')){
      showEvaluation(i, 'wrong');
      wrong++;
    }
	}
  hasSelectedCard = false;
//  if (!blockDB){
//    uploadToDatabase(fontOrder[allTaskCount], taskCount, time, answerCount, right, wrong);
//  }

  taskController();
}

async function showEvaluation(i, addClass){
  cards[i].classList.remove('selected');
  cards[i].classList.add(addClass);
  await sleep (1500);
  if (tutorialFlag === true){
    while (locked === true){
      await sleep (150);
    }
  }
  cards[i].classList.remove(addClass);
}



  //provides one specific string finding task
function findSingleString(){
  findOne = true;

  do{
    var randomPos = Math.floor(Math.random()*cardCount);
    taskArray[0] = cards[randomPos].dataset.str;
  } while (taskArray[0] === pastTask)

  pastTask = taskArray[0];

  $('.task-list').append('<div class="task"><p>Find this exact string: '+taskArray[0]+'</p></div>');
}

  //provides vowel, consonant, and symmetry task depending on hardTaskOrder
function findManyStrings (hardTaskNum){
    findOne = false; //toggle for selectCard

    for (var i = 0; i < cardCount; i++){
      var temp = cards[i].dataset.str;
      var abort = false;

      switch (hardTaskNum){
          //finds strings that are all consonants
            //basically, if a vowel is found, it is ignored
        case 1:
            for (var j = 0; j < vowels.length && !abort; j++){
              if (temp.indexOf(vowels[j]) !== -1){
                abort = true;
              }
            }

            if (!abort)
              taskArray.push(temp);
            break;

            //finds strings that are all vowels
              //analogically, if a consonant is found, the string is ignored
        case 2:
            for (var j = 0; j < consonants.length && !abort; j++){
              if (temp.indexOf(consonants[j]) !== -1){
                abort = true;
              }
            }

            if (!abort)
              taskArray.push(temp);
            break;

            //find all symmestrical strings
        case 3:
            for (j = 0; (j < temp.length/2) && !abort; j++){
              if (temp.charAt(j) !== temp.charAt(temp.length - 1 - j))
                abort = true;
            }
            if (!abort)
              taskArray.push(temp);

            break;
      }
    }

    switch (hardTaskNum){
      case 1:
        $('.task-list').append('<div class="task"><p>select all strings containing consonants only</p></div>');
        break;

      case 2:
        $('.task-list').append('<div class="task"><p>select all strings containing vowels only</p></div>');
        break;

      case 3:
        $('.task-list').append('<div class="task"><p>select all symmetrical strings</p></div>');
        break;
    }
}



//document.getElementsByClassName('resetButton').addEventListener('click', clearCards);


//###############################################################
//#################### BEGIN ANEW FUNCTIONS #####################
//###############################################################


async function initRestart(){
  //await sleep (1500);
  await sleep (1500);
  clearCards();
  clearTasks();

  freshStart();
}

function clearCards(){
  $("div").remove(".memory-card");
}

function clearTasks(){
  $("div").remove(".task");
}



function taskController(){
  $('.task').addClass('done');
  if (taskCount === taskMax){
    initRestart();
    allTaskCount++;
    locked = true;
    return;
  }

  else{
    taskCount++;
    if (taskCount % 3 === 0){
      findManyStrings(hardTaskOrder[(taskCount / 3) - 1]);
    }
    else {
      findSingleString();
    }
  }
  startTime=Date.now();
}


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // you'll find more details about that syntax in later chapters
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}


//function to call to (re)start everything
function freshStart(){
  tutorialFlag = false;
  locked = false;

  clearTasks();
  clearCards();

  if (allTaskCount >= fontOrder.length){
    if(blockDB === false){
      $('.task-list').append('<div class="task"><p>You\'re done! Thanks! Feel free to try breaking this.</p></div>');
      window.alert('You\'re done! Thanks! Feel free to try breaking this.');
    }
    blockDB = true;
  }

  taskCount = 0;
	populateDeck();
  if (blockDB){
    allTaskCount = 1 + Math.floor(Math.random()*fontOrder.length)
  }

  changeFont(fontOrder[allTaskCount]);
	shuffle();
  taskController();
}

//freshStart();


async function createTutorial(){
  $('.task-list').append('<div class="task"><p>Hi! This was a part of HCI research by Kaspars Eglitis. This experiment no longer registers data ' +
  'but thanks for partaking. You can try it and ask me about it or comment on it at kaspars.eglitis@datoriki.lv or fb.com/kassfir</p></div>');
  await sleep(3000);
  $('.task').addClass('done');

  $('.task-list').append('<div class="task"><p>There are two kinds of tasks. Here is an example of the first. </p></div>');
  await sleep(2000);

  $('.task-list').append('<div class="task"><p>Select the card containing only A\'s.</p></div>');

  findSingleStringTutorial();

  // cardSel = $('.selected');
  while ($('.selected').length === 0){
    await sleep (300);
    // cardSel = $('.selected');
  }

  $('.task').addClass('done');

  //pause until AAAAAAA is selected;
  $('.task-list').append('<div class="task"><p>Notice that if you click another card, it will deselect the first one.</p></div>');
  await sleep(1000);

  $('.task-list').append('<div class="task"><p>Once ready, press Enter.</p></div>');

  while ($('.selected').length !== 0){
    await sleep (300);
    // cardSel = $('.selected');
  }
  clearTasks();

  $('.task-list').append('<div class="task"><p>OK, cool. Now for the second kind of task.</p></div>');

  await sleep(2000);
  clearCards();


  $('.task-list').append('<div class="task"><p>Find all cards containing exactly one kind of character.</p></div>');

  await sleep(2000);
  clearCards();

  $('.task-list').append('<div class="task"><p>You can select multiple cards.</p></div>');
  findManyStringsTutorial();

  while ($('.selected').length === 0){
    await sleep (300);
    // cardSel = $('.selected');
  }
  while (($('.right').length === 0) && ($('.wrong').length === 0) && ($('.actually').length === 0) ){
    await sleep (300);
    // cardSel = $('.selected');
  }

  clearTasks();
  shuffleArray(hardTaskOrder);
  shuffleArray(fontOrder);

  $('.task-list').append('<div class="task"><p>Ok, I have to admit I lied' +
    ' about this particular task.</p></div>');

    await sleep(2000);

  $('.task-list').append('<div class="task"><p>I froze the evaluations to let ' +
  'you have a closer look at the evaluation colors.</p></div>');

  $('.task-list').append('<div class="task"><p>The ones you get right' +
  ' became green. Red would be wrong and blue - the ones you missed.</p></div>');

  $('.task-list').append('<div class="task"><p>This is everything that goes into the test.' +
  ' There will be in ' + fontOrder.length + ' different decks, '+ taskMax + ' tasks each.</p></div>');

  await sleep(2000);
  $('.task-list').append('<div class="task"><p>Press Enter to begin. </p></div>');


  }


function checkTaskTutorial(){

  //if no card is selected, doesn't allow to check the task
  if (!hasSelectedCard && !locked){
    return;
  }

    //if a card is the same as an array object and is selected, it gets
      //added the class "right" and becomes green. Otherwise,
      //there is a class called "actually" added, and it becomes blue.
	for (var i = 0; i < cardCount; i++){
    var abort = false;

    for (var j = 0; j < taskArray.length && !abort; j++){

      if (cards[i].dataset.str === taskArray[j]){

        if (cards[i].classList.contains('selected')){
          showEvaluation(i, 'right');
        } else {
          showEvaluation(i, 'actually');
        }
            //clears this task and continues the second loop
        taskArray.splice(taskArray.indexOf(taskArray[j]), 1)
        abort = true;
      }
    }

    //if the card doesn't match the correct answer, and
        //it's selected, the class "wrong" is added.
    if (cards[i].classList.contains('selected')){
      showEvaluation(i, 'wrong');
    }
	}
  hasSelectedCard = false;
  locked = true;
}

function findSingleStringTutorial (hardTaskNum){
    findOne = true; //toggle for selectCard
    locked = false;

    iter = 0;
    createCard('AAAAAAAAAAAAAAA', true);
    while (iter < cardCount){
      createRegularString();
    }
    shuffle();
    taskArray[0] = 'AAAAAAAAAAAAAAA';
}

function findManyStringsTutorial (){
    findOne = false; //toggle for selectCard
    locked = false;

    iter = 0;
    createCard('aaaaaaaaaaaaaaa', true);
    createCard('bbbbbbbbbbbbbbb', true);
    createCard('ccccccccccccccc', true);
    createCard('ddddddddddddddd', true);
    createCard('jssyzgntnlgrtkk', true);


    while (iter < cardCount){
      createRegularString();
    }
    shuffle();

    taskArray[0] = 'aaaaaaaaaaaaaaa';
    taskArray[1] = 'bbbbbbbbbbbbbbb';
    taskArray[2] = 'ddddddddddddddd';
    taskArray[4] = 'jssyzgntnlgrtkk';
}

shuffleArray(hardTaskOrder);
shuffleArray(fontOrder);
createTutorial();
//freshStart();
