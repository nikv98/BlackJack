var suits = ["hearts", "diamonds", "clubs", "spades"];
var values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];   
var pre = "cards/";
var ext = ".png";

//lets create a card Object
function Card(suit, value, filename) {
  this.suit = suit;
  this.value = value;
  this.imageFile = filename
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
    // var imageFile = pre + values[value] + "_of_" + suits[suit] + ext;
    var imageFile = pre + "card_back.png";
    var card = new Card(suits[suit], values[value], imageFile);
    deck.push(card);
  }
}

//lets print out the deck
console.log(deck);
shuffle(deck);

function loadImages(sources, callback) {
  var images = new Array();
  var loadedImages = 0;
  var numImages = deck.length;

  for(var index = 0; index < deck.length; index++) {
    images[index] = new Image();
    images[index].onload = function() {
      if(++loadedImages >= numImages) {
        callback(images);
      }
    };
    images[index].src = sources[index];
  }
}
var canvas = document.getElementById('myCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext('2d');

var sources = new Array();
for(var index = 0; index < deck.length; index++)
{
  sources.push(deck[index].imageFile);
}

loadImages(sources, function(images) {
  var cardX = 20;
  for(var index = 0; index < deck.length; index++)
  {
    context.drawImage(images[index], cardX += images[index].width*.25/3, 30, images[index].width*.25, images[index].height*.25);
  }
});

function drawCards()
{

}
// var stage = new Kinetic.Stage({
//   container: 'container',
//   width: window.innerWidth,
//   height: window.innerHeight
// });
// var layer = new Kinetic.Layer();
