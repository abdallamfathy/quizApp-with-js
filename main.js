// set variables
let countSpan = document.querySelector(".count span");
let bulletsContainer = document.querySelector(".bullets .spans");
let quizQuestions = document.querySelector(".quiz-area");
let asnwersArea = document.querySelector(".answers-area")


// set options 
let currentIndex = 0;
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
    
    // create title
    let title = document.createElement("h2");
    // create text to title
    let titleText = document.createTextNode(obj.title);
    // Add text to title
    title.appendChild(titleText);
    // Append the title to container
    quizQuestions.appendChild(title);

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