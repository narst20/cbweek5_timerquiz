
var panel = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [{
  question: "Who is not a Weasley",
  answers: ["Bill", "Barney", "Percy", "Ron", "George"],
  correctAnswer: "Barney",
  image: "assets/images/weasley.gif"
}, {
  question: "Who was never Hogwarts Headmaster?",
  answers: ["Armando Dipple", "Phineas Black", "Albus Dumbledore", "Alastar Moody", "Dolores Umbridge"],
  correctAnswer: "Alastor Moody",
  image: "assets/images/moody.gif"
}, {
  question: "How many Horcruxes did Lord Voldermot make",
  answers: ["5", "6", "7", "8", "9"],
  correctAnswer: "7",
  image: "assets/images/horcrux.gif"
}, {
  question: "Who was part of the group that totured Frank and Alice Longbottom?",
  answers: ["Igor Karkaroff", "Lucius Malfoy", "Evan Rosier", "Peter Pettigrew", "Rabastan Lestrange"],
  correctAnswer: "Rabastan Lestrange",
  image: "assets/images/long.gif"
}, {
  question: "Who was not a Defense of the Dark Arts Teacher?",
  answers: ["Wilhelmina Grubbly-Plank", "Severus Snape", "Remus Lupin", "Dolores Umbridge", "Gilderoy Lockhart"],
  correctAnswer: "Wilhelmina Grubbly-Plank",
  image: "assets/images/dada.gif"
}, {
  question: "What is the charm to cast a Patronus?",
  answers: ["Wingardium Leviosa", "Expecto Patronum", "Portus", "Ascendio", "Accio"],
  correctAnswer: "Expecto Patronum",
  image: "assets/images/charm.gif"
}, {
  question: "What position did Ron play on the Griffindor Quidditch team?",
  answers: ["Chaser", "Seeker", "Keeper", "Beater", "Announcer" ],
  correctAnswer: "Keeper",
  image: "assets/images/myrtle.gif"
},{
  question: "Which animal killed Moaning Myrtle?",
  answers: ["Spider", "Hippogriff", "Basilisk", "Grindylow", "Manticore" ],
  correctAnswer: "Basilisk",
  image: "assets/images/myrtle.gif"
},{
  question: "Which animal killed Moaning Myrtle?",
  answers: ["Spider", "Hippogriff", "Basilisk", "Grindylow", "Manticore" ],
  correctAnswer: "Basilisk",
  image: "assets/images/myrtle.gif"
}, {
  question: "Who was NOT a Hogwarts Founder?",
  answers: ["Godric Gryffindor", "Helena Hufflepuff", "Rowena Ravenclaw", "Deadalus Diggle", "Salazar Slytherin"],
  correctAnswer: "Deadalus Diggle",
  image: "assets/images/sigh.gif"
}];

// Variable to hold our setInterval
var timer;
//quiz object
var quiz = {
//variables
  questions: questions,
  currentQ: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,
//counter
  countdown: function() {
    quiz.counter--;
    $("#counter-number").html(quiz.counter);
    console.log(quiz.counter);
    if (quiz.counter === 0) {
      console.log("No More time!");
      quiz.timeUp();
    }
  },
//questions and answers
  loadQ: function() {

    timer = setInterval(quiz.countdown, 1000);

    panel.html("<h2>" + questions[this.currentQ].question + "</h2>");

    for (var i = 0; i < questions[this.currentQ].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQ].answers[i]
      + "'>" + questions[this.currentQ].answers[i] + "</button>");
    }
  },
//get next question
  nextQ: function() {
    quiz.counter = countStartNumber;
    $("#counter-number").html(quiz.counter);
    quiz.currentQ++;
    console.log(quiz.currentQ);
    quiz.loadQ();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(quiz.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQ].correctAnswer);
    panel.append("<img src='" + questions[this.currentQ].image + "' />");

    if (quiz.currentQ === questions.length - 1) {
      setTimeout(quiz.results, 3000);
    }
    else {
      setTimeout(quiz.nextQ, 3000);
    }
  },

  results: function() {

    clearInterval(timer);

    panel.html("<h2>Quills downs, here are your results...</h2>");

    $("#counter-number").html(quiz.counter);

    panel.append("<h3>Correct Answers: " + quiz.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + quiz.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (quiz.incorrect + quiz.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQ].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    quiz.incorrect++;

    clearInterval(timer);

    panel.html("<h2>Nope!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[quiz.currentQ].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[quiz.currentQ].image + "' />");

    if (quiz.currentQ === questions.length - 1) {
      setTimeout(quiz.results, 3 * 1000);
    }
    else {
      setTimeout(quiz.nextQ, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    quiz.correct++;

    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[quiz.currentQ].image + "' />");

    if (quiz.currentQ === questions.length - 1) {
      setTimeout(quiz.results, 3 * 1000);
    }
    else {
      setTimeout(quiz.nextQ, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQ = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQ();
  }
};

// Button action

$(document).on("click", "#start-over", function() {
  quiz.reset();
});

$(document).on("click", ".answer-button", function(e) {
  quiz.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  quiz.loadQ();
});
