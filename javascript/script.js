// Initialize quiz questions
var quizQuestions = [
  {
    question: "1. Inside which HTML element do we put the JavaScript?",
    answers: {
      a: "a. <javascript>",
      b: "b. <scripting>",
      c: "c. <script>",
      d: "d. <js>",
    },
    correctAns: "c",
  },

  {
    question: "2. Where is the correct place to insert a JavaScript?",
    answers: {
      a: "a. The <body> section",
      b: "b. Both the <head> and the <body> section",
      c: "c. The <head> section",
      d: "d. None of the above",
    },
    correctAns: "b",
  },

  {
    question: "3. How do you create a function in JavaScript?",
    answers: {
      a: "a. function = myFunction()",
      b: "b. function myFunction()",
      c: "c. function:myFunction()",
      d: "d. function is myFunction()",
    },
    correctAns: "b",
  },

  {
    question: "4. How does a WHILE loop start?",
    answers: {
      a: "a. while i = 1 to 10",
      b: "b. while (i <=10; i++)",
      c: "c. while (i <= 10)",
      d: "d. while i == 10",
    },
    correctAns: "c",
  },

  {
    question: "5. How to write an IF statement in JavaScript?",
    answers: {
      a: "a. if i = 5",
      b: "b. if (i == 5)",
      c: "c. if i == 5 then",
      d: "d. if i = 5 then",
    },
    correctAns: "b",
  },
];

// Quesry the content elements
var introContent = document.querySelector(".introduction");
var timeLabel = document.querySelector(".information");
var startBtn = document.querySelector(".btn");
var quesContainer = document.createElement("ques");

// Adds an event listener to start the quiz button
document.querySelector(".btn").addEventListener("click", startQuiz);

// Initialize the variables
var counter = 75;
var answered = true;
var questionNum = 0;
var score = 0;

function startQuiz() {
  questionNum = 0;
  //   Start the timer interval
  var timerVar = setInterval(function () {
    //   display the remaining time continiously
    timeLabel.textContent = "Time Remaining: " + counter;
    if (questionNum < quizQuestions.length) {
      counter--;
    }

    // display next question after answering the current question
    if (answered && questionNum <= quizQuestions.length) {
      answered = false;
      displayQuestion();
    }

    // stop timer after running out of time
    if (counter == 0) {
      clearInterval(timerVar);
      storeTheScore();
    }
  }, 1000);
}

// Display the questions sequencially
function displayQuestion() {
  if (questionNum == 0) {
    introContent.removeChild(startBtn);
  } else {
    quesContainer.innerHTML = "";
    document.querySelector("body").removeChild(quesContainer);
  }

  if (questionNum >= quizQuestions.length) {
    answered = false;
    storeTheScore();

    return;
  }

  var ques = document.createElement("h4");
  ques.textContent = quizQuestions[questionNum].question;
  quesContainer.appendChild(ques);

  for (letter in quizQuestions[questionNum].answers) {
    // ...add an html click button
    var ans = document.createElement("submit");
    ans.textContent = quizQuestions[questionNum].answers[letter];
    ans.setAttribute("id", letter);
    ans.addEventListener("click", function (event) {
      if (event.target.id == quizQuestions[questionNum].correctAns) {
        score++;
      } else {
        //   reduce remaining time if wrong answer is selected
        counter -= 10;
      }

      questionNum++;

      if (questionNum < quizQuestions.length) {
        answered = false;
        displayQuestion();
      } else {
        answered = true;
      }
    });
    quesContainer.appendChild(ans);
  }

  document.querySelector("body").appendChild(quesContainer);
}

// store the quiz score after finishing all the questions
function storeTheScore() {
  var done = document.createElement("h4");
  done.textContent = "All Done! Enter your initials and submit";
  quesContainer.appendChild(done);
  var yourScore = document.createElement("h6");
  var highScore = localStorage.getItem("highScore");
  if (highScore == null) {
    yourScore.textContent = "Your Score is: " + score;
  } else {
    yourScore.textContent = `High Score: ${highScore};  Your Score is: ${score}`;
  }
  quesContainer.appendChild(yourScore);
  // Create an input text type.
  var textElement = document.createElement("input");
  textElement.setAttribute("margin-left", "200px");
  // Create the submit button.
  var buttonElement = document.createElement("button");
  buttonElement.textContent = "Submit";
  quesContainer.appendChild(textElement);
  quesContainer.appendChild(buttonElement);

  //   store the quiz score qith the user name
  buttonElement.addEventListener("click", function () {
    if (textElement.textContent != "") {
      localStorage.setItem(textElement.textContent, score);
    }

    // if current score is the highest, then store the highest score
    var prevScore = localStorage.getItem("highScore");
    if (prevScore == null || prevScore < score) {
      localStorage.setItem("highScore", score);
    }
    // reload the page after finishing the quiz to re-start
    window.location.reload(false);
  });

  document.querySelector("body").appendChild(quesContainer);
}
