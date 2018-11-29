$(document).ready(function () {
    //variables
    var questions = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"];
    var answers = [{ ans1: "a1", ans2: "a2", ans3: "a3", ans4: "a4" } //A1
        , { ans1: "a5", ans2: "a6", ans3: "a7", ans4: "a8" } //A2
        , { ans1: "a9", ans2: "a10", ans3: "a11", ans4: "a12" } //A3
        , { ans1: "a13", ans2: "a14", ans3: "a15", ans4: "a16" } //A4
        , { ans1: "a17", ans2: "a18", ans3: "a19", ans4: "a20" } //A5
        , { ans1: "a21", ans2: "a22", ans3: "a23", ans4: "a24" } //A6
        , { ans1: "a25", ans2: "a26", ans3: "a27", ans4: "a28" }]; //A7
    var currentQ;
    var currentA;
    var timerElem = $("#timer");
    var startBtn = $("#start");
    var ans1 = $("#answer1");
    var ans2 = $("#answer2");
    var ans3 = $("#answer3");
    var ans4 = $("#answer4");
    var chosenAns = 0;
    var maxTime = 15;
    //rand number generator
    var randNumGen = function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    } //works cuz copy pasta

    var chooseQuestion = function() {
        var temp = randNumGen(0, 6);
        currentQ = questions[temp];
        currentA = answers[temp];
        ans1.text(currentA.ans1);
        ans2.text(currentA.ans2);
        ans3.text(currentA.ans3);
        ans4.text(currentA.ans4);
    }

    //button functions
    startBtn.click(function () {
        initGame();
    }); //start button

    ans1.click(function () {
        chosenAns = 1;
    }); //answer #1

    ans2.click(function () {
        chosenAns = 2;
    }); //answer #2

    ans3.click(function () {
        chosenAns = 3;
    }); //answer #3

    ans4.click(function () {
        chosenAns = 4;
    }); //answer #4

    var initGame = function () {
        timerElem.text("15");
        startBtn.text("Restart");
        chooseQuestion();
        console.log(currentQ);
        console.log(currentA);
    }


});