/**
 * @copyright vavercak.pato@gmail.com
 */

class JsonQuizParser {

    constructor({divId, jsonPath, answerClass, questionClass, labelClass, 
        correctAnswerClass, wrongAnswerClass, explanationClass, submitButtonId}) {
        this.quiz = [];
        this.quizData = null;
        this.quizDataPath = jsonPath;
        this.quizContainer = document.getElementById(divId);
        this.answerClass = answerClass;
        this.questionClass = questionClass;
        this.labelClass = labelClass;
        this.correctAnswerClass = correctAnswerClass;
        this.wrongAnswerClass = wrongAnswerClass;
        this.explanationClass = explanationClass;
        this.submitButton = document.getElementById(submitButtonId);
    }

    parseQuizFromJson = () => {
        return new Promise((resolve, reject) => {
            fetch(this.quizDataPath)
                .then(response => response.json())
                .then(data => this.quizData = data.quizData)
                .then(() => this.buildHTMLQuiz())
                .then(() => resolve())
                .catch(err => reject());
        })
    }

    displayHTMLQuiz = () => {
        this.quizContainer.innerHTML = this.quiz.join('');
    }

    /**
     * 
     */
    buildHTMLQuiz = () => {
        this.quizData.forEach(
            (question, index) => {

                let options = [];

                for (let option in question.answers) {
                    options.push(
                        `<label class="${this.labelClass}">
                        <input type="radio" name="q${index}" value="${option}"/>
                        ${option} :
                        ${question.answers[option]}
                        </label>`
                    );
                }

                this.quiz.push(
                    `<div>
                    <div class="${this.questionClass}"> ${question.question} </div>
                    <div class="${this.answerClass}"> ${options.join('')} </div>
                    <div class="${this.explanationClass}">${question.explanation}</div>
                    </div>`
                );
            }
        );

        this.submitButton.addEventListener('click', this.checkQuizAnswers);
    }

    /**
     * 
     */
    checkQuizAnswers = () => {
        let answerContainers = this.quizContainer.querySelectorAll(`.${this.answerClass}`);
        let numCorrect = 0;

        this.quizData.forEach(
            (question, index) => {
                let answerContainer = answerContainers[index];
                const selector = `input[name=q${index}]:checked`;
                const userAnswer = (answerContainer.querySelector(selector) || {}).value;

                if (userAnswer === question.correctAnswer) {
                    numCorrect++;
                    answerContainers[index].classList.add(this.correctAnswerClass);
                    answerContainers[index].classList.remove(this.wrongAnswerClass);
                } else {
                    answerContainers[index].classList.remove(this.correctAnswerClass);
                    answerContainers[index].classList.add(this.wrongAnswerClass);
                }
            }
        );

        document.getElementById("results").innerHTML = `${numCorrect} out of ${this.quizData.length}`;
    }
}
