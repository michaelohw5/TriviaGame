var maintimer;
var subtimer;

var game = {

    timerElem: $("#timer"),
    startBtn: $("#start"),
    ans1: $("#answer1"),
    ans2: $("#answer2"),
    ans3: $("#answer3"),
    ans4: $("#answer4"),
    qSection: $("#question"),
    maxTime: 15,
    timeRem: 15,
    // timer1: null,
    // timer2: null,
    timer2max: 3,
    timer2left: 3,

    questions: [
        {
            qid: 0,
            q: "The Earth's air is composed of about what percentage of CO2?",
            potentialA: ["7.14%", "0.04%", "13.28%", "18%"],
            a: "0.04%"
        },
        {
            qid: 1,
            q: "How many time zones are there in the world?",
            potentialA: ["12", "5", "24", "16"],
            a: "24"
        },
        {
            qid: 2,
            q: "How heavy is 1L of water in kilograms?",
            potentialA: ["1kg", "3.42kg", "2.5kg", "5kg"],
            a: "1kg"
        },
        {
            qid: 3,
            q: "An octopus can fit through any hole larger than its what?",
            potentialA: ["Eyes", "Two legs", "Brain", "Beak"],
            a: "Beak"
        },
        {
            qid: 4,
            q: "Which bird has the largest wingspan?",
            potentialA: ["Pelican", "Albatross", "Ostrich", "Cassowary"],
            a: "Albatross"
        },
        {
            qid: 5,
            q: "What is the fastest insect?",
            potentialA: ["Hawk Moth", "Wasp", "Dragonfly", "Ant"],
            a: "Dragonfly"
        },
        {
            qid: 6,
            q: "What is the heaviest organ in the human body?",
            potentialA: ["Heart", "Liver", "Brain", "Lung"],
            a: "Liver"
        },
        {
            qid: 7,
            q: "Who discovered Penicillin?",
            potentialA: ["William Bell", "Alexander Fleming", "Hideyo Noguchi", "Elizabeth Blackwell"],
            a: "Alexander Fleming"
        },
        {
            qid: 8,
            q: "In which Island did Charles Darwin began formulating 'The origin of Spieces'?",
            potentialA: ["Fashion", "Ryukyu", "Jamaica", "the Galapagos"],
            a: "the Galapagos"
        },
    ], //end of questions


    state: {
        newQuestions: [],
        currentObj: {},
        currentQId: 0,
        currentQ: "",
        potentialAnswers: [],
        answer: "",
        numCorrect: 0,
        numWrong: 0,
        questionsDone: [],
        numQuestionsDone: 0,
        chosenAns: "",
    }, //end of state

    chooseQ: function () {
        var chosenQid = 0;
        if (game.state.newQuestions.length <= 0) {
            game.stopTimer2(); // why wont you stop
            game.stopTimer1(); // please stop
            clearInterval(maintimer); // i tell you again stop
            clearInterval(subtimer); // seriously stop
            game.qSection.text("Game Over! You had " + game.state.numCorrect +
                " Correct Answers, and " + game.state.numWrong + " Wrong Answers.");
            console.log("game.question: " + game.question);
            console.log("game.state.newQuestion: " + game.state.newQuestion);
            game.stopTimer2(); // why wont you stop
            game.stopTimer1(); // please stop
            clearInterval(maintimer); // i tell you again stop
            clearInterval(subtimer); // seriously stop
        }
        else if (game.state.newQuestions.length > 0) {
            var theQ = game.state.newQuestions[chosenQid];
            game.state.currentObj = theQ;
            game.state.currentQ = theQ.q;
            game.state.currentQId = theQ.qid;
            game.state.potentialAnswers = theQ.potentialA;
            game.state.answer = theQ.a;
            game.state.newQuestions.shift();
            game.display();
        }

    },

    compareAnswer: function () {
        if (game.state.chosenAns === game.state.answer) {
            game.state.numCorrect++;
            game.qSection.text("YOU ARE CORRECT!!");
        }
        else {
            game.state.numWrong++;
            game.qSection.text("Too Bad!! Correct Answer is " + game.state.answer);
        }
    },

    display: function () {
        game.qSection.text(game.state.currentQ);
        game.timerElem.text(game.timeRem);
        game.ans1.text(game.state.potentialAnswers[0]);
        game.ans2.text(game.state.potentialAnswers[1]);
        game.ans3.text(game.state.potentialAnswers[2]);
        game.ans4.text(game.state.potentialAnswers[3]);
    },

    initGame: function () {
        game.state.newQuestions = game.questions;
        game.chooseQ();
    },

    resetGame: function () {
        game.state.currentObj = {};
        game.state.currentQId = 0;
        game.state.currentQ = "";
        game.state.potentialAnswers = [];
        game.state.answer = "";
        game.state.numCorrect = 0;
        game.state.numWrong = 0;
        game.state.questionsDone = [];
        game.state.numQuestionsDone = 0;
        game.state.chosenAns = "";
        game.maxTime = 15;
        game.timeRem = 15;
        game.timer2max = 3;
        game.timer2left = 3;
        game.state.newQuestions = game.questions;
    },


    timer2Run: function () {
        subtimer = setInterval(game.decrement2, 1000);
    },

    stopTimer2: function () {
        clearInterval(subtimer);
    },

    timer1Run: function () {
        maintimer = setInterval(game.decrement, 1000);
    },

    stopTimer1: function () {
        clearInterval(maintimer);

    },

    decrement: function () {
        if (game.state.newQuestions.length > 0) {
            game.timeRem--;
            game.timerElem.text(game.timeRem);
            if (game.timeRem === 0) {
                game.state.numWrong++;
                game.qSection.text("Too Bad!! Correct Answer is: " + game.state.answer);
                //game.nextQTimer();
                game.stopTimer2();
                game.timer2Run();
                game.stopTimer1();
            }
        }
    },

    decrement2: function () {
        game.timer2left--;
        if (game.timer2left === 0) {
            game.stopTimer2();
            game.chooseQ();
            game.timer2left = game.timer2max;
            game.timeRem = game.maxTime;
            game.timerElem.text(game.timeRem);
            game.timer1Run();
            console.log(game.state.newQuestions);
        }
    },

    play: function () {
        $(document).ready(function () {
            game.initGame();

        })
    } //end of play

}
//====START BUTTON FUNCTION====
game.startBtn.click(function () {
    game.resetGame();
    game.startBtn.text("Restart");
    game.stopTimer1();
    game.timer1Run();
    game.play();
    $("#start-btn-div").empty();
});

//====ANSWER BUTTON FUNCTIONS====
game.ans1.click(function () {
    game.state.chosenAns = game.ans1.text();
    game.compareAnswer();
    game.stopTimer1();
    game.stopTimer2();
    game.timer2Run();

});
game.ans2.click(function () {
    game.state.chosenAns = game.ans2.text();
    game.compareAnswer();
    game.stopTimer1();
    game.stopTimer2();
    game.timer2Run();

});
game.ans3.click(function () {
    game.state.chosenAns = game.ans3.text();
    game.compareAnswer();
    game.stopTimer1();
    game.stopTimer2();
    game.timer2Run();

});
game.ans4.click(function () {
    game.state.chosenAns = game.ans4.text();
    game.compareAnswer();
    game.stopTimer1();
    game.stopTimer2();
    game.timer2Run();

});


