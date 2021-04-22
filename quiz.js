/**
 * @copyright vavercak.pato@gmail.com
 */

class Quiz {
    /**
     * divId - id of div element where to put parsed quiz
     * jsonPath - path for .json file containing questions
     * answerClass - specifies styling class for answers
     * questionClass - specifies styling class for questions
     * labelClass - specifies styling class for each option in answers
     * correctAnswerClass - styling class for correct answers
     * wrongAnswerClass - styling class for wrong answers
     * explanationClass - styling class for explanation text
     * submitButtonId - id of a button for quiz submission
     * @param {Object} - an object of type JSON specifying class names and ids of quiz
     */
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

    /**
     * Loads json from file and builds quiz string containing html elements.
     * @returns promise
     */
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

    /**
     * Appends quiz string containing html elements to quiz container
     */
    displayHTMLQuiz = () => {
        this.quizContainer.innerHTML = this.quiz.join('');
    }

    /**
     * Builds a string containing html elements that are parsed from input JSON file
     */
    buildHTMLQuiz = () => {
        this.quizData.forEach(
            (question, index) => {

                let options = [];

                for (let option in question.answers) {
                    options.push(
                        `<label class="${this.labelClass}">
                        <input type="radio" name="q${index}" value="${option}"/>
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
     * Evaluates all parsed answers on sumbit button click
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
