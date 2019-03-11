// Adam and I worked on this HW assignment together. For some things we coded together on one computer and for other stuff we worked on it separately and then shared via Slack or GitHub.
// This is the function that loads the page once all the JS is ready.
$(document).ready(function() {
  // This was the bank of variables we made that we wanted to be global so we could call them for any function.
  // This variable is an array that holds all the content for the questions (correct answers, incorrect answers, etc) and keeps it in object/array forms.
  var questionContent = [];
  // This array holds the same info as above except in a string format
  var questionBank = [];
  // this will hold all the correct answers for all the questions
  var questionAnswers = [];
  // this variable will be the exact correct answer fo a specific question depending on which one is asked.
  var correctAnswer;
  // the number that tracks how many questions were answered correctly
  var answeredCorrectly = 0;
  // number that tracks how many questions were answered incorrectly
  var answeredIncorrectly = 0;
  // tracks which question we are on/which spot in the array we are at
  var count = 0;
  // just declaring the variable so we can manipulate it per question later.
  var time;
  // this is our game start function.
  $(".gameStart").on("click", function gameStart() {
    // this controls the number of questions the user wants to answer
    var numberOfQuestions = $(".numberSelect").val();
    // lets the user choose how many questions they want to answer
    var difficulty = $(".difficulty").val();
    // lets the user choose the question category
    var genre = $(".genre").val();
    var genreVal;
    if (genre == "General Knowledge") {
      genreVal = "9";
    } else if (genre == "Art") {
      genreVal = "25";
    } else if (genre == "Comics") {
      genreVal = "29";
    } else if (genre == "History") {
      genreVal = "23";
    } else if (genre == "Film") {
      genreVal = "11";
    } else if (genre == "Literature") {
      genreVal = "10";
    }
    // this variable take all the choices the user made and creates the link to the API that generates questions based on the user's selections.
    var newURL =
      "https://opentdb.com/api.php?amount=" +
      numberOfQuestions +
      "&category=" +
      genreVal +
      "&difficulty=" +
      difficulty +
      "&type=multiple";

    $(".gameStart").css({ display: "none" });
    $(".askForm").css({ display: "none" });
    // this is what actually accesses the website and pulls information for the game.
    $.ajax({
      url: newURL,
      method: "GET"
    }).then(function(response) {
      for (let i = 0; i < response.results.length; i++) {
        //  this makes the questions into strings
        var mystring = response.results[i].question;
        mystring = mystring
          //  we tried to get rid of all the weird markings that come up when there are quote marks and stuff in the generated information but it only kind of works.
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'")
          .replace(/&eacute;/g, "é");
        //this tells the api where to literally push the information pulled into the appropriate array.
        questionContent.push(response.results[i]);
        questionBank.push(mystring);
        questionAnswers.push(response.results[i].correct_answer);
      }
      // this function sets the question for the user to answer
      setQuestion();
    });
  });

  function setQuestion() {
    if (count < questionContent.length) {
      run();
      //  we tried to use $(".quest").on("click").off() and then turn it back on what the code switched up the divs to display the answers but we couldn't get that to work so we had to do .css("pointer-events").
      //  we just didn't want the user to be able to continue guessing after they had initally gotten it right or wrong because our counter for incorrect and correct answers would just continue to go up.
      $(".quest").css({ "pointer-events": "auto" });
      $(".quest").removeClass("wrongHL");
      $(".quest").removeClass("highlight");
      $(".answer").empty();
      correctAnswer = questionContent[count].correct_answer;
      $(".ques").empty();
      $(".quest").empty();
      $(".ques").text(questionBank[count]);
      var a = questionContent[count].incorrect_answers[0]
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&eacute;/g, "é");
      var b = questionContent[count].incorrect_answers[1]
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&eacute;/g, "é");
      var c = questionContent[count].incorrect_answers[2]
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&eacute;/g, "é");
      var d = questionContent[count].correct_answer
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&eacute;/g, "é");
      var newQuestion = [a, b, c, d];
      var k = shuffle(newQuestion);
      //adds questionContent into question divs
      for (let i = 0; i < newQuestion.length; i++) {
        $(".q" + i).text(k[i]);
      }
    } else {
      endScreen();
    }
    count++;
  }

  $(document).on("click", ".quest", function() {
    var k = $(this).text();
    if (k == correctAnswer) {
      gotRight();
      $(this).addClass("highlight");
    } else {
      gotWrong();
      $(this).addClass("wrongHL");
      for (let i = 0; i < 4; i++) {
        if ($(".q" + i).text() == correctAnswer) {
          $(".q" + i).addClass("highlight");
        }
      }
    }
    $(".quest").css({ "pointer-events": "none" });
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

  var myVar;
  function gotRight() {
    stop();
    answeredCorrectly++;
    $(".answer").text("Correct Answer! Nice job ;)");
    $(".correctAnswerDisplay").text("Correct Answers: " + answeredCorrectly);
    myVar = setTimeout(setQuestion, 3000);
  }

  function gotWrong() {
    stop();
    answeredIncorrectly++;
    $(".answer").text("WRONG!  Correct Answer: " + correctAnswer);
    $(".incorrectAnswerDisplay").text(
      "Incorrect Answers: " + answeredIncorrectly
    );
    myVar = setTimeout(setQuestion, 3000);
  }
  function timeLoss() {
    stop();
    answeredIncorrectly++;
    $(".answer").text("Times Up!  Correct Answer: " + correctAnswer);
    $(".incorrectAnswerDisplay").text(
      "Incorrect Answers: " + answeredIncorrectly
    );
    myVar = setTimeout(setQuestion, 3000);
  }

  function endScreen() {
    console.log("working! eS");
    stop();

    // $('#show-number').css({ 'display': 'none' })
    $(".answer").empty();
    $(".correctAnswerDisplay").empty();
    $(".incorrectAnswerDisplay").empty();
    $(".ques").empty();
    $(".questionContainer").empty();
    $(".gameOver").html(
      "SCORE: <br>" +
        answeredCorrectly +
        " CORRECT <br>" +
        answeredIncorrectly +
        " INCORRECT"
    );

    var newGame = $("<button>").text("New Game?");
    $(".newGame").append(newGame);
  }
  $(".newGame").on("click", function() {
    location.reload();
  });
  var intervalId;

  function decrement() {
    if (time == 0) {
      clearInterval(intervalId);
      timeLoss();
    } else {
      time--;
      $("#show-number").html("<h2>" + time + "</h2>");
    }
  }
  function stop() {
    // console.log('stop working!')
    clearInterval(intervalId);
    $("#show-number").css({ display: "none" });
    time = 3;
  }

  function run() {
    clearInterval(intervalId);
    time = 5;
    $("#show-number").css({ display: "initial" });
    intervalId = setInterval(decrement, 1000);
  }
});
