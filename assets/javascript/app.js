var queryURL =
  "https://opentdb.com/api.php?amount=15&difficulty=medium&type=multiple";
var questions = [];
var questionBank = [];
var questionAnswers = [];
var correctAnswer;
var wins = 0;
var loss = 0;
var count = 0;

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  // console.log(response);

  for (let i = 0; i < response.results.length; i++) {
    var mystring = response.results[i].question;
    mystring = mystring
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&eacute;/g, "é");

    console.log(mystring);

    // var string = mystring.replaceAll("^\"|\"$", "");

    questions.push(response.results[i]);
    // questionBank.push(response.results[i].question);
    questionBank.push(mystring);
    questionAnswers.push(response.results[i].correct_answer);
  }

  console.log(questionAnswers);
  console.log(questionBank);
  setQuestion();
});

function setQuestion() {
  $(".ques").empty();
  $(".quest").empty();
  $(".ques").text(questionBank[count]);
  var a = questions[count].incorrect_answers[0]
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&eacute;/g, "é");
  var b = questions[count].incorrect_answers[1]
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&eacute;/g, "é");
  var c = questions[count].incorrect_answers[2]
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&eacute;/g, "é");
  var d = questions[count].correct_answer
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&eacute;/g, "é");

  // var newQuestion = [questions[count].incorrect_answers[0], questions[count].incorrect_answers[1], questions[count].incorrect_answers[2], questions[count].correct_answer];
  var newQuestion = [a, b, c, d];

  var k = shuffle(newQuestion);

  //adds questions into question divs
  for (let i = 0; i < newQuestion.length; i++) {
    $(".q" + i).text(k[i]);
  }
  correctAnswer = questions[count].correct_answer;
}

$(document).on("click", ".q0", function() {
  var k = $(".q0").text();
  if (k == correctAnswer) {
    wins++;
    $("#ques").text("CORRECT ANSWER!! ");
    $(".winLog").text("Wins: " + wins);
    middleCard();
  } else {
    $(".answer").text("WRONG!  Correct Answer: " + correctAnswer);
    loss++;
    $(".lossLog").text("Losses: " + loss);
  }
});
$(document).on("click", ".q1", function() {
  var k = $(".q1").text();
  if (k == correctAnswer) {
    $(".answer").text("CORRECT ANSWER!! ");
    wins++;
    $(".winLog").text("Wins: " + wins);
    middleCard();
  } else {
    $(".answer").text("WRONG!  Correct Answer: " + correctAnswer);
    loss++;
    $(".lossLog").text("Losses: " + loss);
  }
});
$(document).on("click", ".q2", function() {
  var k = $(".q2").text();
  if (k == correctAnswer) {
    $(".answer").text("CORRECT ANSWER!! ");
    wins++;
    $(".winLog").text("Wins: " + wins);
    middleCard();
  } else {
    $(".answer").text("WRONG!  Correct Answer: " + correctAnswer);
    loss++;
    $(".lossLog").text("Losses: " + loss);
  }
});
$(document).on("click", ".q3", function() {
  var k = $(".q3").text();

  if (k == correctAnswer) {
    $(".answer").text("CORRECT ANSWER!! ");
    wins++;
    $(".winLog").text("Wins: " + wins);
    middleCard();
  } else {
    $(".answer").text("WRONG!  Correct Answer: " + correctAnswer);
    loss++;
    $(".lossLog").text("Losses: " + loss);
  }
});

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

var number = 0;
var intervalId;
var bool = false;
function decrement() {
  number--;
  $("#show-number").html("<h2>" + number + "</h2>");
  if (number === 0 && bool == true) {
    number = 15;
    $(".answer").empty();
    setQuestion();
    bool = false;
    $(".answer").empty();
  } else if (number === 0 && bool == false) {
    // setQuestion();
    middleCard();
  }
}

function run() {
  clearInterval(intervalId);
  number = 15;
  intervalId = setInterval(decrement, 1000);
}

function middleCard() {
  $(".answer").text("Correct Answer!" + questions[count].correct_answer);
  count++;
  clearInterval(intervalId);
  number = 5;
  intervalId = setInterval(decrement, 1000);
  bool = true;
}

run();
