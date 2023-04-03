var doc_start = document.querySelector("#start");
var btn_start = document.querySelector("#start_btn");

var doc_quiz = document.querySelector("#quiz");
var doc_question = document.querySelector("#question");

var btn_opt1 = document.querySelector("#opt_1");
var btn_opt2 = document.querySelector("#opt_2");
var btn_opt3 = document.querySelector("#opt_3");
var btn_opt4 = document.querySelector("#opt_4");

var doc_answer = document.querySelector("#answer");
var doc_state = document.querySelector("#state");

var doc_intial = document.querySelector("#user");
var txt_intial = document.querySelector("#user-initial");
var btn_submit = document.querySelector("#user-submit");

var doc_highscore = document.querySelector("#highscore");
var list_score = document.querySelector("#hs_list");
var btn_restart = document.querySelector("#restart");
var btn_clear = document.querySelector("#clear");

var q1 = {
    question:"What is the syntax for declaring a variable in JavaScript?",
    options:["let myLet = 10","const myConst = 10","All of the above"],
    answer:"var myVar = 10"
};
var q2 = {
    question:"What is the correct syntax for a for loop?",
    options:["for (int i = 1; i <= 10; i = i+1) { }","for (int i = 0; i >= 10; i++) { }","for (int i = 0; i < 10; i--) { }"],
    answer:"for (int i = 0; i < 10; i++) { }"
};
var q3 = {
    question:"What is the difference between == and === in JavaScript?",
    options:["There is no difference.","== compares the types and values and === compares the values.","== is used for arithmetic operations and === is used for comparison operations."],
    answer:"== compares the values and === compares the types and values."
};
var q4 = {
    question:"What is the syntax for creating an array in JavaScript?",
    options:["{1, 2, 3}","array(1, 2, 3)","(1, 2, 3)"],
    answer:"[1,2,3]"
};
var q5 = {
    question:"What is the keyword used to declare a function in JavaScript?",
    options:["method","declare","init"],
    answer:"function"
};

var qs = [q1, q2, q3, q4, q5];
var act_q = 0;
var questions ;

var score=0;
var time_score=59;

doc_start.setAttribute("style", "display:block;");

btn_start.addEventListener("click", function (event) {
    doc_start.setAttribute("style", "display:none;");
    doc_quiz.setAttribute("style", "display:flex;");
    
    setQuestion();

});

btn_opt1.addEventListener("click", function(event){
    if(questions[0] == qs[act_q].answer){
        doc_state.textContent = "Correct!";
    }else{
        doc_state.textContent = "Wrong :c";
    }

    sleep();
});
btn_opt2.addEventListener("click", function(event){
    if(questions[1] == qs[act_q].answer){
        doc_state.textContent = "Correct!";
    }else{
        doc_state.textContent = "Wrong :c";
    }
    sleep();

});
btn_opt3.addEventListener("click", function(event){
    if(questions[2] == qs[act_q].answer){
        doc_state.textContent = "Correct!";
    }else{
        doc_state.textContent = "Wrong :c";
    }
    sleep();
});
btn_opt4.addEventListener("click", function(event){
    if(questions[3] == qs[act_q].answer){
        doc_state.textContent = "Correct!";
    }else{
        doc_state.textContent = "Wrong :c";
    }
    sleep();
});

function setQuestion(){
    
    var question = qs[act_q].question 
    questions = [qs[act_q].options[0], qs[act_q].options[1], qs[act_q].options[2], qs[act_q].answer];
    
    for (var i = questions.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
            
        var aux = questions[i];
        questions[i] = questions[j];
        questions[j] = aux;
      }

    doc_question.textContent = question;

    btn_opt1.textContent = questions[0];
    btn_opt2.textContent = questions[1];
    btn_opt3.textContent = questions[2];
    btn_opt4.textContent = questions[3];

}

function sleep(){
    var timeLeft = 1;
    doc_answer.setAttribute("style", "display:block;");
    var timeInterval = setInterval(function () {
        if(timeLeft==0){
            doc_answer.setAttribute("style", "display:none;");
            clearInterval(timeInterval)
        }          
        timeLeft--;
    },1000);
    act_q++;
    if(act_q<5){
        setQuestion();
    }else{
        console.log("Out");
        doc_quiz.setAttribute("style", "display:none;");
        doc_intial.setAttribute("style", "display:flex;");
    }
}

