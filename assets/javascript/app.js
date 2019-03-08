var queryURL =
  "https://opentdb.com/api.php?amount=3&difficulty=medium&type=multiple";
var questions = [];
var correctAnswer;
var wins = 0;
var loss = 0;

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);

  for (let i = 0; i < response.results.length; i++) {
    // if (response.question.indexOf('"') > -1) {
    //     console.log('working');

    //     myQuestion.replace('&#039', "'");
    //     myQuestion.replace('&quot;', " ");
    //     myQuestion.replace('&#039;', " ");

    //     $(".ques").text(myQuestion);
    // }
    // else

    questions.push(response.results[i]);
  }
  correctAnswer = questions[0].correct_answer;

  setQuestion();
});

function setQuestion() {
  $(".ques").empty();
  $(".quest").empty();

  $(".ques").text(questions[0].question);

  // console.log(questions[0].incorrect_answers[0]);

  var newQues = [
    questions[0].incorrect_answers[0],
    questions[0].incorrect_answers[1],
    questions[0].incorrect_answers[2],
    questions[0].correct_answer
  ];
  var correct = questions[0].correct_answer;

  console.log(newQues);

  var k = shuffle(newQues);

  //adds questions into question divs
  for (let i = 0; i < newQues.length; i++) {
    $(".q" + i).text(k[i]);
  }
}

// $(document).on('click', ".q0", function () {
//     console.log(this);
//     var k = $('.q0').text();
//     if (k == correctAnswer) {
//         // alert("yeet");
//         wins++;
//         $('.answer').text("CORRECT ANSWER!!")
//         $('.winLog').text(wins);
//     }

//     else {
//         $('.answer').text("WRONG!  Correct Answer: " + correctAnswer)
//         loss++;
//         $('.lossLog').text(loss);
//     }
// })
$(document).on("click", ".q0", function() {
  console.log(this);
  var k = $(".q0").text();
  if (k == correctAnswer) {
    // alert("yeet");
    wins++;
    $(".answer").text("CORRECT ANSWER!!");
    $(".winLog").text(wins);
  } else {
    $(".answer").text("WRONG!  Correct Answer: " + correctAnswer);
    loss++;
    $(".lossLog").text(loss);
  }
});
$(document).on("click", ".q1", function() {
  var k = $(".q1").text();
  if (k == correctAnswer) {
    // alert("yeet");
    $(".answer").text("CORRECT ANSWER!!");
    wins++;
    $(".winLog").text(wins);
  } else {
    $(".answer").text("WRONG!  Correct Answer: " + correctAnswer);
    loss++;
    $(".lossLog").text(loss);
  }
});
$(document).on("click", ".q2", function() {
  var k = $(".q2").text();
  if (k == correctAnswer) {
    // alert("yeet");
    $(".answer").text("CORRECT ANSWER!!");
    wins++;
    $(".winLog").text(wins);
  } else {
    $(".answer").text("WRONG!  Correct Answer: " + correctAnswer);
    loss++;
    $(".lossLog").text(loss);
  }
});
$(document).on("click", ".q3", function() {
  var k = $(".q3").text();

  if (k == correctAnswer) {
    // alert("yeet");
    $(".answer").text("CORRECT ANSWER!!");
    wins++;
    $(".winLog").text(wins);
  } else {
    $(".answer").text("WRONG!  Correct Answer: " + correctAnswer);
    loss++;
    $(".lossLog").text(loss);
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

var number = 15;
var intervalId;
function decrement() {
  number--;
  $("#show-number").html("<h2>" + number + "</h2>");
  if (number === 0) {
    stop();

    alert("Time Up!");
  }
}

function stop() {
  clearInterval(intervalId);
  clockRunning = false;
}
function run() {
  clearInterval(intervalId);
  intervalId = setInterval(decrement, 1000);
}
run();
