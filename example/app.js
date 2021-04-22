let quizObject = null;

function init() {
    quizObject = new Quiz({
        divId: "quiz",
        jsonPath: "qs.json",
        answerClass: "answer",
        questionClass: "question",
        labelClass: "radio-label",
        correctAnswerClass: "correct-answer",
        wrongAnswerClass: "wrong-answer",
        submitButtonId: "submit"});
    quizObject.parseQuizFromJson().then(() => {
        quizObject.displayHTMLQuiz()
    });
}
