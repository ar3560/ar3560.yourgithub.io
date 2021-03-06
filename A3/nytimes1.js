var headlines = [];
var the = [
  "the", "The"];


function preload() {

  // Assemble url for API call
  var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
  var apikey = "b849eb6d180c4cfab298bcf573781bdf"; // see: https://developer.nytimes.com
  url += "?api-key=" + apikey;

  nytResponse = loadJSON(url);
  // loadJSON() is asynchronous, but calling it inside preload() guarantees
  // we'll have a response before setup() and draw() is run.
}

function setup() {
  createCanvas(640, 1000);
  background(0);

  textSize(14);
  textAlign(LEFT);

  noLoop(); // since we're not animating, one frame is sufficient: run draw() just once

  extractHeadlines();
}

function draw() {
  background(0);

  var lineheight = 30;
  var margin = 30;
  translate(margin, margin);

  for (var i = 0; i < headlines.length; i++) {
    var words = split(headlines[i], ' ');
    //console.log(words);

    var nextX = 0;

//only have the punctuation show up

    for (var j = 0; j < words.length; j++) {


      if (the.includes(words[j])) {
        noStroke();
        fill("white");
      } else {
        fill(0);
      }
      
      textStyle(BOLD);
      text(words[j]+' ', nextX, i*lineheight);
      nextX += textWidth(words[j]+' ');
    };
  }
}

function extractHeadlines() {

  // console.log(nytResponse); // take a look at the full API response structure

  for (var i = 0; i < nytResponse.results.length; i++) {
    var h = nytResponse.results[i].title;
    // besides .title, other text data available to you include:
    // .abstract, .byline, .section, etc. etc.
    append(headlines, h);
  }

  // console.log(headlines); // make sure counted data looks as expected
}