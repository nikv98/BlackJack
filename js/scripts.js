var suits = ["hearts", "diamonds", "clubs", "spades"];
var values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];   
var pre = "cards/";
var ext = ".png";

var playerHand = new Array();
var dealerHand = new Array();

//lets create a card Object
function Card(suit, value, filename) {
  this.suit = suit;
  this.value = value;
  this.imageFile = filename;
  this.flipped = false;
}

function draw()
{
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

var deck = new Array();
//lets create the deck
//lets go through the suits
for(var suit = 0; suit < suits.length; suit++)
{
  for(var value = 0; value < values.length; value++)
  {
    var imageFile = pre + values[value] + "_of_" + suits[suit] + ext;
    var card = new Card(suits[suit], values[value], imageFile);
    deck.push(card);
  }
}

//lets print out the deck
console.log(deck);
//lets shuffle the deck
shuffle(deck);
//lets deal the cards
playerHand.push(draw());
playerHand.push(draw());
dealerHand.push(draw());
dealerHand.push(draw());

function loadImages(sources, callback) {
  var cardImages = new Array();
  var loadedImages = 0;
  var numImages = 4;

  var card_back = new Image();
  card_back.src = pre + "card_back" + ext;

  for(var index = 0; index < 4; index++) {
    cardImages[index] = new Image();
    cardImages[index].onload = function() {
      if(++loadedImages >= numImages) {
        callback(cardImages, card_back);
      }
    };
    cardImages[index].src = sources[index];
  }
}

var canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');

//load hands into View
var sources = new Array();
sources.push(dealerHand[0].imageFile);
sources.push(dealerHand[1].imageFile);
sources.push(playerHand[0].imageFile);
sources.push(playerHand[1].imageFile);

//card back
loadImages(sources, function(cardImages, card_back) {
  var cardX = 20;
  var cardY = 30;
  for(var index = 0; index < 4; index++)
  {
    if(index == 2)
    {
      cardX = 20;
      cardY = 300;
    }
    if(index == 0 || index == 2){
      context.drawImage(card_back, cardX += card_back.width*.25/3, cardY, card_back.width*.25, card_back.height*.25);
    }else{
      context.drawImage(cardImages[index], cardX += cardImages[index].width*.25/3, cardY, cardImages[index].width*.25, cardImages[index].height*.25);
    }
  }
});

function getScore(hand)
{

}
