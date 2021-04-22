let quizContainer = null;
let quizData = null;

function setQuizData(data) {
    quizData = data;
}

function createHTMLQuiz(div_id) {
    fetch('./qs.json')
        .then(response => response.json())
        .then(data => setQuizData(data.quizData))
        .then(() => buildHTMLQuiz(div_id))
        .catch(err => console.log(err));
}

function buildHTMLQuiz(div_id) {
    quizContainer = document.getElementById(div_id);

    let quiz = [];

    quizData.forEach(
        (question, index) => {

            let options = [];

            for (let option in question.answers) {
                options.push(
                    `<label class="radio-label">
                <input type="radio" name="q${index}" value="${option}"/>
                ${option} :
                ${question.answers[option]}
                </label>`
                );
            }

            quiz.push(
                `<div class="question"> ${question.question} </div>
            <div class="answers"> ${options.join('')} </div>`
            );
        });

    quizContainer.innerHTML = quiz.join('');
}

function checkQuizAnswers() {
    let answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;

    quizData.forEach(
        (question, index) => {
            let answerContainer = answerContainers[index];
            const selector = `input[name=q${index}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === question.correctAnswer) {
                numCorrect++;
                answerContainers[index].classList.add("correct-answer");
                answerContainers[index].classList.remove("wrong-answer");
            } else {
                answerContainers[index].classList.remove("correct-answer");
                answerContainers[index].classList.add("wrong-answer");
            }
        }
    );

    document.getElementById("results").innerHTML = `${numCorrect} out of ${quizData.length}`;
}
