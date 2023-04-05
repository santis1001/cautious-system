//Initialize HTML elements variables
var doc_nav = document.querySelector("#nav");

var view_score = document.querySelector("#vw_hs");
var view_time = document.querySelector("#vw_tm");

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
var doc_score = document.querySelector("#user_score");
var txt_intial = document.querySelector("#user-initial");
var btn_submit = document.querySelector("#initials");

var doc_highscore = document.querySelector("#highscore");
var list_score = document.querySelector("#hs_list");
var btn_restart = document.querySelector("#restart");
var btn_clear = document.querySelector("#clear");
var doc_isclear = document.querySelector("#isClear");

var active_doc ;

//Questions Banks, Options and Answer.
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

//Global Variables
//Questions object array
var qs = [q1, q2, q3, q4, q5];
var act_q = 0;
var questions ;
//Global usable varibales
var score=0;
var time_score=60;
var final_score=0;
var scoretimer;
var std_scores = [];
view_time.textContent = "Time: "+time_score
//Display the Start Quiz screen
doc_start.setAttribute("style", "display:flex;");
active_doc = doc_start;

//start quiz button, hides start quiz and displays the question conten screen
//call the timer function 
btn_start.addEventListener("click", function (event) {
    doc_start.setAttribute("style", "display:none;");
    doc_quiz.setAttribute("style", "display:flex;");
    active_doc = doc_quiz;
    setQuestion();
    start_timer();
});

//Quiz answer options, compares its variable with the actual cuestion object answer
btn_opt1.addEventListener("click", function(event){
    if(questions[0] == qs[act_q].answer){
        doc_state.textContent = "Correct!";
        score = score+10;
        time_score = time_score + 10;
    }else{
        doc_state.textContent = "Wrong :c";
        time_score = time_score - 10;
    }

    hr_state();
});
btn_opt2.addEventListener("click", function(event){
    if(questions[1] == qs[act_q].answer){
        doc_state.textContent = "Correct!";
        score = score+10;
        time_score = time_score + 10;
    }else{
        doc_state.textContent = "Wrong :c";
        time_score = time_score - 10;
    }
    hr_state();

});
btn_opt3.addEventListener("click", function(event){
    if(questions[2] == qs[act_q].answer){
        doc_state.textContent = "Correct!";
        score = score+10;
        time_score = time_score + 10;
    }else{
        doc_state.textContent = "Wrong :c";
        time_score = time_score - 10;
    }
    hr_state();
});
btn_opt4.addEventListener("click", function(event){
    if(questions[3] == qs[act_q].answer){
        doc_state.textContent = "Correct!";
        score = score+10;
        time_score = time_score + 10;
    }else{
        doc_state.textContent = "Wrong :c";
        time_score = time_score - 10;
    }
    hr_state();
});

//User initials screen
//this button will retract the values of the initials and score to stored them in the localStorage
//this event will display the highscore screen, and render the scores into the <ul> element
btn_submit.addEventListener("submit", function(event){
    event.preventDefault();

    var initials = txt_intial.value.trim();
    var local_scores = final_score;
    if(initials!=""){
        std_scores =JSON.parse(localStorage.getItem("highscore"));

        if(std_scores==null){
            std_scores = [];
        }
        let newscore = {user_initials: initials, user_score:local_scores}
        std_scores.push(newscore);
    
    
        localStorage.setItem("highscore", JSON.stringify(std_scores));
    
        doc_intial.setAttribute("style", "display:none;");
        doc_highscore.setAttribute("style", "display:flex;"); 
        doc_nav.setAttribute("style", "display:none;");
       
        active_doc = doc_highscore;
        txt_intial.value = "";
        
        render_score();    
    }    
});
//this event is trigger with the View Highscore in the nav bar
//this event will display the highscore screen, and render the scores into the <ul> element
view_score.addEventListener("click", function(event){
    event.preventDefault();

    active_doc.setAttribute("style","display:none;");
    doc_highscore.setAttribute("style","display:flex;");
    doc_nav.setAttribute("style", "display:none;");

    active_doc = doc_highscore;
    render_score();
    clearInterval(scoretimer);
});
//this event will reset the globar usable variables and display the Start quiz screen
btn_restart.addEventListener("click", function(event){
    doc_highscore.setAttribute("style","display:none;");
    doc_start.setAttribute("style","display:flex;");
    doc_nav.setAttribute("style", "display:flex;");

    active_doc = doc_start;
    restartquiz();
});
//this event will clear the localStorage and re-render the scores
btn_clear.addEventListener("click", function(){
    localStorage.clear();

    hr_state_clear();
    render_score();
});
//this function sets the values to the question content html elements
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
//this function shows a message when the localStorage is cleared
function hr_state_clear(){
    var timeLeft = 1;
    doc_isclear.setAttribute("style", "display:block;");
    var timeInterval = setInterval(function () {
        if(timeLeft==0){
            doc_isclear.setAttribute("style", "display:none;");
            clearInterval(timeInterval)
        }          
        timeLeft--;
    },1000);
    
}
//this function shows a message when a option is selected
//shows if the option selected was correct or wrong
//validates in which question the quiz is actually established
//once all the questions were traveled the question content screen is closed and the user initial is displayed
//the final score variables is calculated
function hr_state(){
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
    if(act_q<qs.length){
        setQuestion();
    }else{
        clearInterval(scoretimer);
        doc_quiz.setAttribute("style", "display:none;");
        doc_intial.setAttribute("style", "display:flex;");
        active_doc=doc_intial;
        final_score = score+time_score;
        doc_score.textContent = "Final Score: "+final_score;
    }
}
//this function start the quiz timer
//when the timer get down to 0 the question content is forced to close, and open the user initial input screen
function start_timer(){
    
    scoretimer = setInterval(function () {
        if(time_score<=0){
            doc_quiz.setAttribute("style", "display:none;");
            doc_intial.setAttribute("style", "display:flex;");
            clearInterval(scoretimer)
        }else{
            view_time.textContent = "Time: "+time_score
        }         
        time_score--;
    },1000);    
}
//this function renders the score list and display it into the <ul> element
//get the list from the localStorage
//sets the limit to 5 or the length of the list if less than 5
//sort the list from gratest to least
//creates the <li> element with the user initials and score in the textContent  
// appends <li> to <ul>
function render_score(){
    std_scores =JSON.parse(localStorage.getItem("highscore"));
    list_score.innerHTML="";

    if(std_scores!==null){

        var limit;
        if(std_scores.length<5){
            limit = std_scores.length;
        }else{
            limit=5;
        }
        std_scores.sort((a, b) => b.user_score - a.user_score);

        for(var i=0;i<limit ;i++){
            var aux_scores = (i+1)+". "+std_scores[i].user_initials+" - "+std_scores[i].user_score;
            
            var li = document.createElement("li");

            li.textContent = aux_scores;
            li.setAttribute("data-index", i);
            list_score.appendChild(li);   
        }  
    }   
}
//this functions resets the usable variables to redo the quiz
function restartquiz(){
    act_q = 0;
        
    score=0;
    time_score=60;
    final_score=0;    

    view_time.textContent = "Time: "+time_score;
    clearInterval(scoretimer);
}

