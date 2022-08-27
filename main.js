// set variables
let countSpan = document.querySelector(".quiz-info .count");

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
}