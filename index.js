'use strict'

//global variables
let quizNumber = 0;
let score = 0;

//Quiz Data
const STORE = [
    {question: 'How many were in the Fellowship of the Ring?',
    answerOptions: [{answer:'7', correct: false},
                    {answer:'8', correct: false},
                    {answer:'9', correct: true},
                    {answer:'10', correct: false}]
    },
    {question: 'Who created the ring?',
    answerOptions: [{answer:'Gollum', correct: false},
                    {answer:'Saruman', correct: false},
                    {answer:'Sauron', correct: true},
                    {answer:'The Witch-King', correct: false}]
    },
    {question: 'Which hobbit is the ring bearer?',
    answerOptions: [{answer:'Samwise', correct: false},
                    {answer:'Frodo', correct: true},
                    {answer:'Pippin', correct: false},
                    {answer:'Merry', correct: false}]
    },
    {question: 'What is the one way to destroy the ring?',
    answerOptions: [{answer:'With an Elf made blade', correct: false},
                    {answer:'Stab it with a basilisk fang', correct: false},
                    {answer:'Any ole sword will do', correct: false},
                    {answer:'In the fires of Mt. Doom', correct: true}]
    },
    {question: 'Where did the elves Arwen and Elrond live?',
    answerOptions: [{answer:'Rivendell', correct: true},
                    {answer:'The Shire', correct: false},
                    {answer:'Mordor', correct: false},
                    {answer:'Gondor', correct: false}]
    },
    {question: 'What is the name of the land of the "Horse-Lords"',
    answerOptions: [{answer:'Gondor', correct: false},
                    {answer:'Rohon', correct: true},
                    {answer:'Minas Tirith', correct: false},
                    {answer:'Rivendell', correct: false}]
    },
    {question: 'At what inn did the hobbits first meet Strider?',
    answerOptions: [{answer:'The Dragon\'s Breath', correct: false},
                    {answer:'The Prancing Pony', correct: true},
                    {answer:'The Elven Rest', correct: false},
                    {answer:'Mines of Moria Inn', correct: false}]
    },
    {question: 'Who is the heir of Isildur?',
    answerOptions: [{answer:'Aragorn', correct: true},
                    {answer:'Boramir', correct: false},
                    {answer:'Gimli', correct: false},
                    {answer:'Gandalf', correct: false}]
    },
    {question: 'What property of the blade "Sting" alerts its owner to the presence of orcs or goblins?',
    answerOptions: [{answer:'Smoking', correct: false},
                    {answer:'Vibrating', correct: false},
                    {answer:'Glowing', correct: true},
                    {answer:'Singing', correct: false}]
    },
    {question: 'What was Gollum\'s original name before he found the ring?',
    answerOptions: [{answer:'Bilbo', correct: false},
                    {answer:'Samwise', correct: false},
                    {answer:'Deagol', correct: false},
                    {answer:'Smeagol', correct: true}]
    }];


/*** Event Listeners***/

//Gets things started after the intro page and moves into the first question
//hide the intro page and show the question page
//update the question number 
//pull the question information from the STORE array.
$('.start-btn').click(e=>{
    $('.intro').hide();
    $('.question-page').show();
    renderQuestion(quizNumber);
});

//On submission of the answer, check to see if the answer is correct
//That is pull the answer and look at the correct key
//if correct, move to the correct-page and update score
//if incorrect, move to the incorrect-page
//hide quiz page
$('.submit-answer').click(e=>{
    let choice = $('input[type=radio][name=answer-option]:checked').val();
    STORE[quizNumber].answerOptions[choice].correct ? 
        (score++, $('.score').text(score), $('.correct-page').show()) : 
        ($('.incorrect-page').show(), $('.correct-answer').text(findAnswer(quizNumber)));
    $('.question-page').hide();
});

//Incorrect page and correct page
//hide the current page (incorrect or correct)
//update the question number to retrieve the correct question info
//show question page
//and update STORE info on question page.
//also clear the checked radio input buttons
$('.next-question').click(e=>{
    quizNumber++;
    $('.incorrect-page').hide();
    $('.correct-page').hide();
    quizNumber < 10 ? 
        ($('.question-page').show(), renderQuestion(quizNumber)) : 
        $('.quiz-end').show();
});

//Final page
//Display the final page, display score,
//If on reset click, reset quiz number and score
//and update to the respective elements
//hide final page and show intro page.
$('.reset').click(e=>{
    quizNumber=0;
    score=0;
    $('.questionNumber').text(quizNumber);
    $('.score').text(score);
    $('.quiz-end').hide();
    $('.intro').show();
});


  
/***Helper Functions ***/


//Function that finds the correct answer object and returns the answer string
function findAnswer(index){
    let tempi = STORE[index].answerOptions.map(el=> el.correct).indexOf(true);
    return STORE[index].answerOptions[tempi].answer;
    }


//renders the question in sequential order
//clear radio buttons 
function renderQuestion(index){
    $('.question').text(STORE[index].question);
    for(let i=0; i<4; i++){
        $(`.answer${i}`).text(STORE[index].answerOptions[i].answer);
    }
    $('.questionNumber').text(index+1);
    $('input[type=radio]:checked').each(function(){
        this.checked = false;
    });
}


$(function(){
    $('.question-page').hide();
    $('.incorrect-page').hide();
    $('.correct-page').hide();
    $('.quiz-end').hide();
});
    