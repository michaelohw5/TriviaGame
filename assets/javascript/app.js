$(document).ready(function () {
    //variables
    var questions = [{q:"Q1", ans1: "a1", ans2: "a2", ans3: "a3", ans4: "a4", correct: "a1", used: false} //A1
    , {q:"Q2",  ans1: "a5", ans2: "a6", ans3: "a7", ans4: "a8", correct: "a6", used: false } //A2
    , {q:"Q3",  ans1: "a9", ans2: "a10", ans3: "a11", ans4: "a12", correct: "a11", used: false } //A3
    , {q:"Q4",  ans1: "a13", ans2: "a14", ans3: "a15", ans4: "a16", correct: "a16", used: false } //A4
    , {q:"Q5",  ans1: "a17", ans2: "a18", ans3: "a19", ans4: "a20", correct: "a18", used: false } //A5
    , {q:"Q6",  ans1: "a21", ans2: "a22", ans3: "a23", ans4: "a24", correct: "a21", used: false } //A6
    , {q:"Q7",  ans1: "a25", ans2: "a26", ans3: "a27", ans4: "a28", correct: "a26", used: false }]; //A7
    // var questions = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"];

    var questionIndex;
    var currentQ;
    var currentA;
    var correctA;
    var numCorrect = 0;
    var numWrong = 0;
    var timerElem = $("#timer");
    var startBtn = $("#start");
    var ans1 = $("#answer1");
    var ans2 = $("#answer2");
    var ans3 = $("#answer3");
    var ans4 = $("#answer4");
    var qSection = $("#question");
    var chosenAns = 0;
    var maxTime = 5;
    var time = 5;
    var intervalId;
    var fiveSecIntervalId;
    //rand number generator
    var randNumGen = function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    } //works cuz copy pasta

    var run = function () {
        intervalId = setInterval(decrement, 1000);
    }

    var fiveSecTimer = function () {
        fiveSecIntervalId = setInterval(nextQ, 5000);
    }

    var nextQ = function () {
        clearInterval(fiveSecIntervalId);
        restartGame();
        run();
    }

    var restartGame = function() {
        chooseQuestion();
    }

    var decrement = function () {
        time--;
        timerElem.text(time);
        if (time === 0) {
            stop();
            //run wrong answer page
            pickedWrong();
            //start 5sec timer
        }
    }

    var stop = function () {
        clearInterval(intervalId);
    }

    var checkIfDone = function() {
        var questionsDone = 0;
        for (var i = 0; i<questions.length; i++) {
            if (questions[i].used === true) {
                questionsDone++;
            }
        }
        if (questionsDone === questions.length) {
            return true;
        }
        else {
            return false;
            chooseQuestion();
        }
    }

    var chooseQuestion = function () {
        questionIndex = randNumGen(0, 6);
        if (answers[questionIndex.used === false]) {
            answers[questionIndex.used] = true;
            currentQ = questions[questionIndex];
            currentA = answers[questionIndex].correct;
            qSection.text(currentQ);
            ans1.text(currentA.ans1);
            ans2.text(currentA.ans2);
            ans3.text(currentA.ans3);
            ans4.text(currentA.ans4);
            time = maxTime;
    }

    var pickedRight = function () {
        console.log("yay");
        numCorrect++;
        qSection.text("You Are Correct!!");
        stop();
        fiveSecTimer();
    }

    var pickedWrong = function (answer) {
        console.log("nay");
        numWrong++;
        qSection.text("Buzz!! Correct Answer is " + answer);
        stop();
        fiveSecTimer();
    }

    var compareAnswer = function () {
        correctA = answers[questionIndex].correct;
        if (chosenAns === answers[questionIndex].correct) {
            pickedRight();
        }
        else {
            pickedWrong(correctA);
        }
    }

    //button functions
    startBtn.click(function () {
        initGame();
        stop();
        run();//timer
    }); //start button

    ans1.click(function () {
        chosenAns = ans1.text();
        compareAnswer();
        console.log(chosenAns);
    }); //answer #1

    ans2.click(function () {
        chosenAns = ans2.text();
        compareAnswer();
    }); //answer #2

    ans3.click(function () {
        chosenAns = ans3.text();
        compareAnswer();
    }); //answer #3

    ans4.click(function () {
        chosenAns = ans4.text();
        compareAnswer();
    }); //answer #4

    var initGame = function () {
        timerElem.text("5");
        startBtn.text("Restart");
        chooseQuestion();
        console.log(currentQ);
        console.log(currentA);
    }

});



    // var answers = [{ ans1: "a1", ans2: "a2", ans3: "a3", ans4: "a4", correct: "a1", used: false} //A1
    //     , { ans1: "a5", ans2: "a6", ans3: "a7", ans4: "a8", correct: "a6", used: false } //A2
    //     , { ans1: "a9", ans2: "a10", ans3: "a11", ans4: "a12", correct: "a11", used: false } //A3
    //     , { ans1: "a13", ans2: "a14", ans3: "a15", ans4: "a16", correct: "a16", used: false } //A4
    //     , { ans1: "a17", ans2: "a18", ans3: "a19", ans4: "a20", correct: "a18", used: false } //A5
    //     , { ans1: "a21", ans2: "a22", ans3: "a23", ans4: "a24", correct: "a21", used: false } //A6
    //     , { ans1: "a25", ans2: "a26", ans3: "a27", ans4: "a28", correct: "a26", used: false }]; //A7