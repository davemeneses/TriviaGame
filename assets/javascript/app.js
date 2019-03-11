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
      // this removes the highlted div for the incorrectly guessed answer from the last question.
      $(".quest").removeClass("wrongHL");
      // this removes the highlted div for the right answer from the last question.
      $(".quest").removeClass("highlight");
      // this empties the answer from the last question if they guessed incorrectly
      $(".answer").empty();
      // this tells the computer which correct answer from the array to use for the question
      correctAnswer = questionContent[count].correct_answer;
      // these next two empty out the question asked and possible answers from the last question
      $(".ques").empty();
      $(".quest").empty();
      // this inserts the current question from the questionBank array onto the .ques div
      $(".ques").text(questionBank[count]);
      // these next 3 variables all are grabbing incrorrect answers from the object in the question content array. [count] is how the computer knows which ones to grab.
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
      // this assigns var d with the correct answer from the question content array. same principle as above.
      var d = questionContent[count].correct_answer
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&eacute;/g, "é");
      // this creates a variable "newQuestion" which is the last 4 variables put together in an array.
      var newQuestion = [a, b, c, d];
      // this calls our shuffle function to mix up the last 4 variables before we display them on the page.
      var k = shuffle(newQuestion);
      //adds questionContent into question divs
      for (let i = 0; i < newQuestion.length; i++) {
        $(".q" + i).text(k[i]);
      }
    } else {
      // if there are no more questions to add from our array we go to the end screen
      endScreen();
    }
    // again, count is how we keep track of which question we are on.
    count++;
  }
  // this is how we tell which answer is clicked by the user and check it against our objects in the array we bult to see if it matches with var d, correct_answer
  $(document).on("click", ".quest", function() {
    var k = $(this).text();
    if (k == correctAnswer) {
      // if the person got it right we call our "gotRight" function
      gotRight();
      // it also highlights the correct selection
      $(this).addClass("highlight");
    } else {
      // if they chose anything else besides the correct answer we trigger our "gotWrong" function
      gotWrong();
      // it also adds the "wrongHl" (aka wrong highlight) class which shows what the user chose
      $(this).addClass("wrongHL");
      // we also see the correct answer highlighted in green by using a for loop to check the rest of the answers for the correctAnswer variable which we assigned the correct_answer quesiton to above.
      for (let i = 0; i < 4; i++) {
        if ($(".q" + i).text() == correctAnswer) {
          // the correct answer becomes highlighted in green
          $(".q" + i).addClass("highlight");
        }
      }
    }
    // this disables the user from clicking after they have made a selection so they cannot keep guessing for that particular question
    $(".quest").css({ "pointer-events": "none" });
  });
  // this is the function that shuffles our incorrect answers with the correct answers. we found this function online that adds a "temporary value" to each item so that the it will randomize the answers in their array
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  // things got wonky in this part and we had to declare var myVar here othewise we had trouble defining it later.
  var myVar;
  // this is the function that ran if the user guessed correctly.
  function gotRight() {
    // first we call the stop function, then add to the counter that tracks correct guesses
    stop();
    answeredCorrectly++;
    // then we display on the screen the following text
    $(".answer").text("You got it! Great guess!");
    // and this displays how many questions the user has gotten correct so far
    $(".correctAnswerDisplay").text("Correct Answers: " + answeredCorrectly);
    // this adds a 3 second pause so the user has time to look at the information and then sets the next question.
    myVar = setTimeout(setQuestion, 3000);
  }
  // this is the funciton that runs if the user guesses incorrectly
  function gotWrong() {
    // it runs stop, then adds the the counter that tracks incorrect guesses
    stop();
    answeredIncorrectly++;
    // next it displays the following text, the correct answer, and how many questions the user has gotten wrong
    $(".answer").text("Incorrect!  Correct Answer: " + correctAnswer);
    $(".incorrectAnswerDisplay").text(
      "Incorrect Answers: " + answeredIncorrectly
    );
    myVar = setTimeout(setQuestion, 3000);
  }
  // this function runs if the user takes too long to guess and the clock goes down to zero. It counts the same as guess incorrectly.
  function timeLoss() {
    stop();
    answeredIncorrectly++;
    $(".answer").text("Time out!  Correct Answer: " + correctAnswer);
    $(".incorrectAnswerDisplay").text(
      "Incorrect Answers: " + answeredIncorrectly
    );
    myVar = setTimeout(setQuestion, 3000);
  }

  // this is the last function that runs that tells the game to stop looping through questions
  function endScreen() {
    // console.log("it works!");
    stop();

    // it empties out all the divs then displays the user's final score.
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
    // then we give the user the option to start a new game and if they choose to they can click "new game" which then reloads the page
    var newGame = $("<button>").text("New Game?");
    $(".newGame").append(newGame);
  }
  $(".newGame").on("click", function() {
    location.reload();
  });
  var intervalId;

  // this is our timer functions. this one tells the clock to count down and displays it on the screen. it also will trigger the timeLoss function if the clock goes down to 0
  function decrement() {
    if (time == 0) {
      clearInterval(intervalId);
      timeLoss();
    } else {
      time--;
      $("#show-number").html("<h2>" + time + "</h2>");
    }
  }
  // this is the funciton that runs between questions so the user has time to read the right answer
  function stop() {
    // console.log('stop is working')
    clearInterval(intervalId);
    $("#show-number").css({ display: "none" });
    time = 5;
  }
  //this is the function that starts the timer and set the clock to 15 seconds for each question
  function run() {
    clearInterval(intervalId);
    time = 15;
    $("#show-number").css({ display: "initial" });
    intervalId = setInterval(decrement, 1000);
  }
});
