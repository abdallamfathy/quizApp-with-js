// set variables
let countSpan = document.querySelector(".count span");
let bulletsContainer = document.querySelector(".bullets .spans")

// Ajax request
function getQuestions() {
    let myRequest = new XMLHttpRequest();
  
    myRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        let questionsObject = JSON.parse(this.responseText);
        let qCount = questionsObject.length;
  
        // Create Bullets + Set Questions Count
        createBullets(qCount);
        };
      }
    myRequest.open("GET", "html_questions.json", true);
    myRequest.send();
  };
  
  getQuestions();
  
// create create bullets function
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