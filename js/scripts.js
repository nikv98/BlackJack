var suits = ["hearts", "diamonds", "clubs", "spades"];
var values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];   
var ext = "png";

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
    var imageFile = values[value] + "_of_" + suits[suit] + "." + ext;
    var card = new Card(suits[suit], values[value], imageFile);
    deck.push(card);
  }
}

//lets print out the deck
console.log(deck);
shuffle(deck);

var stage = new Kinetic.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});
var layer = new Kinetic.Layer();

var cardX = 20;
var cardImages = new Array();
for(var index = 0; index < deck.length; index++)
{
  var cardView = new Image();
  cardImages.push(cardView);
  cardView.onload = function() {
    var yoda = new Kinetic.Image({
      x: cardX += 106 + 5,
      y: 50,
      image: cardView,
      width: 106,
      height: 118
    });

    // add the shape to the layer
    layer.add(yoda);

    // add the layer to the stage
    stage.add(layer);
  };
  cardView.src = "cards/" + deck[index].imageFile;
}
