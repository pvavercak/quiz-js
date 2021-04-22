# quiz-js
Lightweight javascript ulitily for parsing json to html quiz.

All you have to do is to call a set of the following functions:
```javascript
    quiz = new Quiz({
        divId: "yourOwnClass",
        jsonPath: "qs.json",
        answerClass: "yourOwnClass",
        questionClass: "yourOwnClass",
        labelClass: "yourOwnClass",
        correctAnswerClass: "yourOwnClass",
        wrongAnswerClass: "yourOwnClass",
        explanationClass: "yourOwnClass",
        submitButtonId: "buttonId"});

    // this is a promise function since it loads a json file using fetch()
    quiz.parseQuizFromJson().then(() => {
        quiz.displayHTMLQuiz();
    });
```

JSON file with answers `MUST HAVE` the following structure
```json
{
    "quizData": [
        {
            "question": "Your own question?",
            "answers": {
                "a": "Your option a",
                "b": "Your option b"
            },
            "correctAnswer": "a",
            "explanation": "Explanation why 'a' is a correct answer"
        },
        {
            ...
        }
    ]
}
```

`See example folder for more info.`