var game = {

    timerElem: $("#timer"),
    startBtn: $("#start"),
    ans1: $("#answer1"),
    ans2: $("#answer2"),
    ans3: $("#answer3"),
    ans4: $("#answer4"),
    qSection: $("#question"),
    maxTime: 5,
    timeRem: 5,
    timer1: null,
    timer2: null,
    timer2max: 3,
    timer2left: 3,
    //rand number generator
    randNumGen: function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }, //works cuz copy pasta

    questions: [
        {
            qid: 0,
            q: "Q1: answer is 2",
            potentialA: ["A1", "A2", "A3", "A4"],
            a: "A2"
        },
        {
            qid: 1,
            q: "Q2: answer is 1",
            potentialA: ["A1", "A2", "A3", "A4"],
            a: "A1"
        },
        {
            qid: 2,
            q: "Q3 answer is 4",
            potentialA: ["A1", "A2", "A3", "A4"],
            a: "A4"
        },
        {
            qid: 3,
            q: "Q4 answer is 2",
            potentialA: ["A1", "A2", "A3", "A4"],
            a: "A2"
        },
        {
            qid: 4,
            q: "Q5 answer is 1",
            potentialA: ["A1", "A2", "A3", "A4"],
            a: "A1"
        },
        {
            qid: 5,
            q: "Q6 answer is 3",
            potentialA: ["A1", "A2", "A3", "A4"],
            a: "A3"
        },
        {
            qid: 6,
            q: "Q7 answer is 4",
            potentialA: ["A1", "A2", "A3", "A4"],
            a: "A4"
        },
        {
            qid: 7,
            q: "Q8 1",
            potentialA: ["A1", "A2", "A3", "A4"],
            a: "A1"
        },
        {
            qid: 8,
            q: "Q9 3",
            potentialA: ["A1", "A2", "A3", "A4"],
            a: "A3"
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
        if (game.state.newQuestions.length === undefined) {
            game.qSection.text("Game Over! You had " + game.state.numCorrect +
                " Correct Answers, and " + game.state.numWrong + " Wrong Answers.");
        }
        else {
            var theQ = game.questions[chosenQid];
            game.state.currentObj = theQ;
            game.state.currentQ = theQ.q;
            game.state.currentQId = theQ.qid;
            game.state.potentialAnswers = theQ.potentialA;
            game.state.answer = theQ.a;
            game.questions.shift();
            game.display();
            console.log(game.state.questionsDone);
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
        game.maxTime = 5;
        game.timeRem = 5;
        game.timer2max = 5;
        game.timer2left = 5;
    },


    timer2Run: function () {
        game.timer2 = setInterval(game.decrement2, 1000);
    },

    stopTimer2: function () {
        clearInterval(game.timer2);
    },

    timer1Run: function () {
        game.timer1 = setInterval(game.decrement, 1000);
    },

    stopTimer1: function () {
        clearInterval(game.timer1);
    },

    decrement: function () {
        game.timeRem--;
        game.timerElem.text(game.timeRem);
        if (game.timeRem === 0) {
            game.state.numWrong++;
            game.qSection.text("Too Bad!! Correct Answer is: " + game.state.answer);
            //game.nextQTimer();
            game.timer2Run();
            game.stopTimer1();
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
        }
    },

    // nextQTimer: function () {
    //     game.timer2left = game.timer2max;
    //     setInterval(function () {
    //         game.timer2left--;
    //         if (game.timer2left === 0) {
    //             game.chooseQ();
    //             clearInterval(game.timer2left);
    //             game.timeRem = game.maxTime;
    //             game.timerElem.text(game.timeRem);
    //             game.timer1Run();
    //         }
    //     }, 1000);
    // },


    play: function () {
        $(document).ready(function () {
            game.initGame();
            
        })
    } //end of play

}
//====START BUTTON FUNCTION====
game.startBtn.click(function () {
    game.resetGame();
    game.stopTimer1();
    game.timer1Run();
    game.play();
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


