var suits = ["hearts", "diamonds", "clubs", "spades"];
var values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];   
var pre = "cards/";
var ext = ".png";
var cardsDrawn = 0;
var bet = 0;
var money = 1000;

function bid(dec)
{
  if(dec == "up")
  {
    bet += 20;
    money -= 20;
  }
  else if(dec == "down")
  {
    bet -= 20;
    money += 20;
  }
  for(bet = bet; bet < 0; bet++)
  {
    money--;
  }
  for(bet = bet; bet > 500; bet--)
  {
    money++;
  }
  for(money = money; money < 0; money++)
  {
    bet--;
  }
  if(money < bet)
  {
    document.getElementById('na').style.display='none';
  }
  if(money >= bet)
  {
    document.getElementById('na').style.display='table-row';
  }
  var count = document.getElementById('totalbet');
  count.innerHTML = bet;
  
  var counter = document.getElementById('totalmoney');
  counter.innerHTML = money;
}

var playerHand = new Array();
var dealerHand = new Array();

//lets create a card Object
function Card(suit, value, precedent, filename) {
  this.suit = suit;
  this.value = value;
  this.imageFile = filename;
  this.precedent = precedent;
}

function draw()
{
  cardsDrawn++;
  return deck.pop();
}

function shuffle(deck)
{
  var counter = deck.length, temp, index;
  while(counter > 0)
  {
    // Pick a random index
    index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    temp = deck[counter];
    deck[counter] = deck[index];
    deck[index] = temp;
  }
  return deck;
}

var deck;

function createDeck()
{
  cardsDrawn = 0;
  deck = new Array();
  playerHand.length = 0;
  dealerHand.length = 0;
  //lets create the deck
  //lets go through the suits
  for(var suit = 0; suit < suits.length; suit++)
  {
    for(var value = 0; value < values.length; value++)
    {
      var imageFile = pre + values[value] + "_of_" + suits[suit] + ext;
      var card = new Card(suits[suit], values[value], value, imageFile);
      deck.push(card);
    }
  }

  //lets shuffle the deck
  shuffle(deck);
  //lets deal the cards
  playerHand.push(draw());
  playerHand.push(draw());
  dealerHand.push(draw());
  dealerHand.push(draw());
}

function getScore(hand)
{
  hand.sort(function(a, b) {return a.precedent - b.precedent});
  var score = 0;
  for(var index = 0; index < hand.length; index++)
  {
    var precedent = hand[index].precedent;
    if(precedent < 8) //found 2-10
    {
      score += precedent + 2;
    }
    else if(precedent == 12) //ace
    {
        if(score == 11)
        {
          score += 1;
        }else if(score < 11)
        {
          score += 11;
        }else{
          score += 1;
        }
    }else //found King, Queen, or Jack
    {
      score += 10;
    }
  }
  return score;
}

function loadImages(sources, callback) {
  var cardImages = new Array();
  var loadedImages = 0;
  var numImages = cardsDrawn;

  var card_back = new Image();
  card_back.src = pre + "card_back" + ext;

  for(var index = 0; index < cardsDrawn; index++) {
    cardImages[index] = new Image();
    cardImages[index].onload = function() {
      if(++loadedImages >= numImages) {
        callback(cardImages, card_back);
      }
    };
    cardImages[index].src = sources[index];
  }
  loadedImages = 0;
}

var canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
canvas.height = 515;
var context = canvas.getContext('2d');


function load(stand)
{
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  var sources = new Array();
  for(var index = 0; index < dealerHand.length; index++)
  {
    sources.push(dealerHand[index].imageFile);
  }
  for(var index = 0; index < playerHand.length; index++)
  {
    sources.push(playerHand[index].imageFile);
  }

  //card back
  loadImages(sources, function(cardImages, card_back) {
    var cardX = 20;
    var cardY = 30;
    for(var index = 0; index < cardsDrawn; index++)
    {
      if(index == dealerHand.length)
      {
        cardX = 20;
        cardY = 300;
      }

      //print out hand total
      if(index == 0 && !stand){
        context.drawImage(card_back, cardX += card_back.width*.25/3, cardY, card_back.width*.25, card_back.height*.25);
      }else{
        context.drawImage(cardImages[index], cardX += cardImages[index].width*.25/3, cardY, cardImages[index].width*.25, cardImages[index].height*.25);
      }

       if(index%2 != 0) //odd index
      {
        context.font = '40pt century gothic';
        context.fillStyle = 'white';
        if(index == 3) //print player hand total
        {
          context.fillText(getScore(playerHand), window.innerWidth/3, window.innerHeight/8*4);
        }
      }
    }
    if(stand)
    {
      var newGame = confirm(getWinner() + "Play another round?");
      if(newGame)
      {
        createDeck();
        load();
      }
    }
  });
}

function getWinner()
{
  var playerBust = "BUST! Dealer wins! ";
  var dealerBust = "The dealer BUSTED! You win! ";
  var dealerWins = "Dealer wins! ";
  var playerWins = "You win! ";
  if(getScore(playerHand) > 21)
  {
    bet = 0;
    var count = document.getElementById('totalbet');
    count.innerHTML = bet;
    document.getElementById('na').style.display='table-row';
    document.getElementById('in').style.display='table-row';
    document.getElementById('de').style.display='table-row';
    context.fillText(getScore(dealerHand), window.innerWidth/3, window.innerHeight/8*1.5);
    return playerBust;
  }else if(getScore(dealerHand) > 21)
  {
    money = bet*1.5 + money;
    var counter = document.getElementById('totalmoney');
    counter.innerHTML = money;
    bet = 0;
    var count = document.getElementById('totalbet');
    count.innerHTML = bet;
    document.getElementById('na').style.display='table-row';
    document.getElementById('in').style.display='table-row';
    document.getElementById('de').style.display='table-row';
    context.fillText(getScore(dealerHand), window.innerWidth/3, window.innerHeight/8*1.5);
    return dealerBust;
  }else if(getScore(dealerHand) > getScore(playerHand)){
    bet = 0;
    var count = document.getElementById('totalbet');
    count.innerHTML = bet;
    document.getElementById('na').style.display='table-row';
    document.getElementById('in').style.display='table-row';
    document.getElementById('de').style.display='table-row';
    context.fillText(getScore(dealerHand), window.innerWidth/3, window.innerHeight/8*1.5);
    return dealerWins;
  }else if(getScore(playerHand) > getScore(dealerHand)){
    money = bet*1.5 + money;
    var counter = document.getElementById('totalmoney');
    counter.innerHTML = money;
    bet = 0;
    var count = document.getElementById('totalbet');
    count.innerHTML = bet;
    document.getElementById('na').style.display='table-row';
    document.getElementById('in').style.display='table-row';
    document.getElementById('de').style.display='table-row';
    context.fillText(getScore(dealerHand), window.innerWidth/3, window.innerHeight/8*1.5);
    return playerWins;
  }else{
    money = money + bet;
    var counter = document.getElementById('totalmoney');
    counter.innerHTML = money;
    bet = 0;
    var count = document.getElementById('totalbet');
    count.innerHTML = bet;
    document.getElementById('na').style.display='table-row';
    document.getElementById('in').style.display='table-row';
    document.getElementById('de').style.display='table-row';
    context.fillText(getScore(dealerHand), window.innerWidth/3, window.innerHeight/8*1.5);
    return "PUSH! It's a tie! ";
  }

}

function hit(hand)
{
  document.getElementById('in').style.display='none';
  document.getElementById('de').style.display='none';
  document.getElementById('na').style.display='none';
  if(hand == 'player')
  {
    console.log('player');
    playerHand.push(draw());
    load();
  }
  else
  {
    console.log('dealer');
    dealerHand.push(draw());
  }
  if(getScore(playerHand) > 21)
  {
    load(true);
  }
}

function stand()
{
  while(getScore(dealerHand) < 17)
  {
    hit('dealer');
  }
  load(true);
}




 function split()
 {
  alert("This function is coming soon!");
 }




 function doubleDown() 
 {
  document.getElementById('in').style.display='none';
  document.getElementById('de').style.display='none';
  money = money - bet;
  bet = bet*2;
  var counter = document.getElementById('totalmoney');
  counter.innerHTML = money;
  var count = document.getElementById('totalbet');
  count.innerHTML = bet;
  playerHand.push(draw());
  if(getScore(playerHand) < 21)
  {
    while(getScore(dealerHand) < 17)
    {
      hit('dealer');
    }
    load(true);
  }
  
  else if(getScore(playerHand) > 21)
  {
    load(true);
  }
 }









 function getR()
{
  alert("In this game, you will be playing against the computer, an AI. The main objective of the game is to have a hand of cards which total as close to 21 as possible. A hand of 21 is considered a winning hand. You will recieve two cards, and so will the AI. You will be able to see both of your cards, but only one of the AI's. Now when you first receive your first two cards on the screen, you can either choose to HIT or STAND by clicking the appropriate buttons. HITTING will add one more card to your hand. Choosing STAND will keep your hand the same. The value of the number cards are as they read, face cards are all worth 10, and aces are worth either one or eleven; you decide.  If the total value of your cards exceeds 21, you have busted and automatically lose. Now surprise, this is gambling, so you have the option to bet. You start out with $1000. If you win, your payout is 3 to 2. If you lose, you lose your bet. To nter your bet, click the INCREASE BET and DECREASE BET buttons. This will increment and decrement your bet by $20 at a time. The minimum bid you must enter is $0, if you want to play casually, and the maximum base bet is $500. You are allowed to double down on your $500 if you have enough money though. The double down button makes you automatically hit once, double your original bet, and then immediately stand. Remember, you only have $1000, so bid wisely. If you ever want to reset your bank roll to $1000, refresh the webpage. Your starting hand is already displayed, so start whenever you want. Good luck and enjoy the game.");
}
createDeck();
load();
