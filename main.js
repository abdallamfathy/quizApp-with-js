// set variables
let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets")
let bulletsContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let asnwersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results")
let countDownSpan = document.querySelector(".countdown")

// set options 
let currentIndex = 0;
let currentAnswer = 0;
let countDownInterval;

// Ajax request
function getQuestions() {
    let myRequest = new XMLHttpRequest();
  
    myRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        let questionsObject = JSON.parse(this.responseText);
        let qCount = questionsObject.length;
  
        // Create Bullets + Set Questions Count
        createBullets(qCount);

        // Create addQuestions
        addQuestions(questionsObject[currentIndex],qCount)

        // count down function
        countdown(5,qcount)
        // Add on submit
        submitButton.onclick = () =>{
            // get the right answer
            let rightAnswer = questionsObject[currentIndex].right_answer;

            // increment the counter
            currentIndex++;
            
            // Trigger the check answer function
            checkAnswer(rightAnswer,qCount);

            // Empty the answered question 
            quizArea.innerHTML = "";
            asnwersArea.innerHTML = "";

            // Create addQuestions
            addQuestions(questionsObject[currentIndex],qCount)

            // Start CountDown
            clearInterval(countDownInterval);
            countdown(3, qCount);

            // trigger bullets function
            handleBullets();

            // trigger show function
            showResults(qCount);
        }
        };
        

        
      }
    myRequest.open("GET", "html_questions.json", true);
    myRequest.send();
  };
  
  getQuestions();
  
// create  bullets function
function createBullets(num) {
    // Add number of bullets to count
    countSpan.innerHTML = num;

    
    // loop over num and make spans
    for (let i = 0; i < num; i++) {
        // create span
        let theBullet = document.createElement("span");
        // check if index
        if (i === 0) {
        theBullet.className = "on";
        }
        // Append 
        bulletsContainer.appendChild(theBullet);
        
    }
}

// create addQuestions function
function addQuestions(obj,count) {
    
    if ( currentIndex < count) {
        // create title
    let title = document.createElement("h2");
    // create text to title
    let titleText = document.createTextNode(obj.title);
    // Add text to title
    title.appendChild(titleText);
    // Append the title to container
    quizArea.appendChild(title);

    // Loop to show questions
    for (let i = 1; i <= 4; i++) {
        
        // Create div that will hold answers
        let answersDiv = document.createElement("div");
        // Add classname
        answersDiv.className = "answer";

        // Create the input
        let answersInput = document.createElement("input");
        // Add type, name , id , data-set
        answersInput.type = "radio";
        answersInput.name = "question";
        answersInput.id = `answer_${i}`;
        answersInput.dataset.answer = obj[`answer_${i}`];

        // Make first answer sleected
        if (i === 1) {
            answersInput.checked = true;
        }
        // Create label
        let label = document.createElement("label");
        // Add for attribute
        label.htmlFor = `answer_${i}`;
        // Create text
        let labelText = document.createTextNode(obj[`answer_${i}`]);
        // Add text to label
        label.appendChild(labelText);

        // Append input,label to answersDiv
        answersDiv.appendChild(answersInput);
        answersDiv.appendChild(label);

        // Append div to answers area
        asnwersArea.appendChild(answersDiv);
        
    }

    }
    
};

function checkAnswer(rAnswer,count) {
    // get all answers
    let answers = document.getElementsByName("question");
    let chosenAnswer;

    // loop over answer to get chosen one
    for (let i = 0; i < answers.length; i++) {
        
        if (answers[i].checked) {
           chosenAnswer = answers[i].dataset.answer
        }
        
    }
    
    if (rAnswer === chosenAnswer) {
        
        // Increment right answers number
        currentAnswer++;
        
    }
}

// function handle bullets
function handleBullets() {
    
    // get all spans
    let spans = document.querySelectorAll(".bullets .spans span");
    let spansArray = Array.from(spans);
    spansArray.forEach((span,index) => {
        if ( currentIndex === index) {
            span.className = "on";
        }
    });
}

// function show results
function showResults(count) {
    let theResults;
    if (currentIndex === count) {
        quizArea.remove();
        asnwersArea.remove();
        submitButton.remove();
        bullets.remove();    

        if (currentAnswer > count / 2 && currentAnswer < count) {
            theResults = `<span class="good">Good</span>, ${currentAnswer} From ${count}`;
          } else if (currentAnswer === count) {
            theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
          } else {
            theResults = `<span class="bad">Bad</span>, ${currentAnswer} From ${count}`;
          }
      
          resultsContainer.innerHTML = theResults;
          resultsContainer.style.padding = "10px";
          resultsContainer.style.backgroundColor = "white";
          resultsContainer.style.marginTop = "10px";
    }

}

function countdown(duration, count) {
    if (currentIndex < count) {
      let minutes, seconds;
      countDownInterval = setInterval(function () {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);
  
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;
  
        countdownElement.innerHTML = `${minutes}:${seconds}`;
  
        if (--duration < 0) {
          clearInterval(countDownInterval);
          submitButton.click();
        }
      }, 1000);
    }
  }