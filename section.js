
function AgeInDays() {

      var birthYear = prompt(" what is your Age");
      var ageInDays = (2023-birthYear) * 365;
      var h1 = document.createElement('h1');
      var textAnswer = document.createTextNode('you are ' + ageInDays+ 'days old');
      h1.setAttribute('id', 'AgeInDays' );
      h1.appendChild(textAnswer);
      document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('AgeInDays').remove();
}

//cat

function generatorCat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src="https://cataas.com/cat/gif"
    div.appendChild(image);


}


// rock

function rpsGame(yourChoice){
  console.log(yourChoice);
  var humanChoice,botChoice;
  humanChoice = yourChoice.id;
  botChoice = numberToChoice(rpsRndm());
  console.log('ComputerChoice:',botChoice);
  results = decideWinner(humanChoice,botChoice); //(0,1) botwon
  console.log(results);
  message = finalMessage(results) //you won!
  console.log(message);
  rpsFront(yourChoice.id,botChoice,message);
}

function rpsRndm(){
    return Math.floor(Math.random()*3)
}

function numberToChoice(number){
    return ['rock' ,'paper','scissors'][number];

}

function decideWinner(YourChoice,ComputerChoice){
    var rpsData = {
        'rock':{'scissors':1, 'rock':0.5, 'paper':0},
        'paper':{'rock':1 , 'paper':0.5, 'scissors':0},
        'scissors':{'paper':1,'scissors':0.5,'rock':0},
    };
  var YourScore =rpsData[YourChoice][ComputerChoice];
  var ComputerScore = rpsData[ComputerChoice][YourChoice];


  return [YourScore,ComputerScore];
}

function finalMessage([YourScore,ComputerScore]){
    if(YourScore ===0 ){
        return{'message':'You Lost!' , 'color': 'red'}
    }
    else if (YourScore === 0.5){
        return{'message':'Draw' , 'color': 'yellow'}

    }
    else {
        return{'message':'You Won!' , 'color': 'green'}

    }
}

function rpsFront(humanImagechoice,botImagechoice ,finalMessage){
    var ImageData = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src,
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();
   
    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
   
    humanDiv.innerHTML = "<img src='" + ImageData[humanImagechoice] + "' style= 'box-shadow: 0px 10px 50px rgba(37,50,233,1)' >"
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size:60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + ImageData[botImagechoice] + "' style= 'box-shadow: 0px 10px 50px rgba(243,38,24,1)' >"
    
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);

    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

// chane color button
var allButton = document.getElementsByTagName('button');


var copyAllButton = [];

for(let i=0; i<allButton.length; i++){
    copyAllButton.push(allButton[i].classList[1]);
}
  console.log(copyAllButton);

function buttonColorChange(buttonThing){
    if(buttonThing.value === 'red'){
        buttonRed();
    }
    else if (buttonThing.value ==='green'){
        buttonGreen();

    }
     else if( buttonThing.value === 'reset'){
        buttonReset();
     }
     else if (buttonThing.value ==='random'){
        randomColor();
     }
}

function buttonRed(){
    for(let i=0; i<allButton.length;i++){
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add('btn-danger');
    }
}

function buttonGreen(){
    for(let i=0; i<allButton.length;i++){
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add('btn-success');
    }
}
function buttonReset(){
    for(let i=0; i<allButton.length;i++){
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add(copyAllButton[i]);
    }
}


function randomColor(){
    var choices = ['btn-primary', 'btn-danger', 'btn-success','btn-warning'];

    for(let i=0;i<allButton.length;i++){
        let randomNumber = Math.floor(Math.random()*4);
        allButton[i].classList.remove(allButton[i].classList[1]);
        allButton[i].classList.add(choices[randomNumber]);
    }
    
}

//Blackjack

let blackjackGame = {
    'you':{ 'scoreSpan':'#your-blackjack-result','div': '#your-box','score':0},
    'dealer':{ 'scoreSpan':'#dealer-blackjack-result','div': '#dealer-box','score':0},
     'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
     'cardMap': {'2': 2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
     'wins': 0,
     'losses': 0,
     'draw':0,
     'isStand':false,
     'turnOver':false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer']

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound =new Audio('sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackhit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackhit() {
    
  if (blackjackGame['isStand']=== false){
     let card =randomCards();
     showCard( card,YOU);
     updateScore(card,YOU);
     showScore(YOU);
   } 

}

function randomCards(){
    let randomIndex = Math.floor(Math.random() *13);
    return blackjackGame['cards'][randomIndex];
}

function showCard( card,activePlayer){
    if(activePlayer['score'] <= 21){
     let cardImage = document.createElement('img');
     cardImage.src=  `images/${card}.png`
     document.querySelector(activePlayer['div']).appendChild(cardImage);
     hitSound.play();
    }
}
    
function blackjackDeal(){
    //showResult(computeWinner())   another wa//
    //let winner =computeWinner()
    //showResult(winner);
 if(blackjackGame['turnOver'] === true){
       
    blackjackGame['isStand'] =false;
        let yourImage =document.querySelector('#your-box').querySelectorAll('img');
        let dealerImage =document.querySelector('#dealer-box').querySelectorAll('img')
        
        for(let i=0; i<yourImage.length; i++){
            yourImage[i].remove();
        }
        for(let i=0; i<dealerImage.length; i++){
            dealerImage[i].remove();
        }
        YOU['score'] =0;
        DEALER['score'] =0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0; //need color

        document.querySelector('#blackjack-result').textContent = "let's play";
        document.querySelector('#blackjack-result').style.color = 'black';

        blackjackGame['turnOver'] = true;
    }
}


function updateScore(card,activePlayer){
    if(card === 'A'){
        // if adding 11 keeps me below 21, add 11 , otherwise ,1 add
    if(activePlayer['score'] + blackjackGame['cardMap'][card][1] <=21){
     activePlayer['score'] +=blackjackGame['cardMap'][card][1]
    }
    else{
        activePlayer['score'] +=blackjackGame['cardMap'][card][0];
    }
  } 
  else{
    activePlayer['score'] +=blackjackGame['cardMap'][card];
  }

}

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent ='BUST';
        document.querySelector(activePlayer['scoreSpan']).style.color='red';

    }
    else{
   document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

 function sleep(ms){
        return  new Promise(resolve => setTimeout(resolve,ms));
   }

    async function dealerLogic() {

        blackjackGame['isStand'] =true;  

    while (DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card =randomCards();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER); 
        await sleep(1000);
    }   

    blackjackGame['turnOver']=true;
    let winner = computeWinner();
    showResult(winner);
    
    }


//winner
//update wins

function computeWinner(){
    let winner;

    if(YOU['score'] <=21){
        // high score than dealer or dealer lust -you won
        if(YOU['score'] > DEALER['score']  || (DEALER['score'] >21)){
          blackjackGame['wins']++;
          winner = YOU;
        }
        else if (YOU['score']  < DEALER['score']){
        blackjackGame['losses']++;
        winner=DEALER;
        }
        else if(YOU['score'] === DEALER['score']){
            blackjackGame['draw']++;
        }
    }
    else if (YOU['score'] >21 && DEALER['score'] <=21){
           blackjackGame['losses']++;
           winner=DEALER;

    }
   else if(YOU['score'] > 21 && DEALER['score'] >21){
          blackjackGame['draw']++;

   }
  //console.log('winner is', winner);
     console.log(blackjackGame);
   return winner;


}

function showResult(winner){

    if(blackjackGame['turnOver'] === true){

        
        let message, messageColor;
        if(winner=== YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'you won';
            messageColor = 'green';
            winSound.play();
        }
        else if(winner === DEALER){
            document.querySelector('#losses').textContent=blackjackGame['losses'];
            message = 'you lost';
            messageColor = 'red';
            lossSound.play();
        }
        else{
            document.querySelector('#draw').textContent =blackjackGame['draw'];
            message = 'drew';
            messageColor = 'black';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}