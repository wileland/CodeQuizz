let questions = [
    {
        question: "What does the `alt` attribute in an `<img>` tag stand for, and why is it important?",
        answers: [
            "Alteration Text: It's used for animation effects.",
            "Alternate Text: Displayed when the image cannot be loaded.",
            "Alert Text: Pops up an alert when an image is clicked.",
            "Aligned Text: Aligns the text around an image."
        ],
        correct: 1
    },
    {
        question: "Which of the following is the correct way to include a CSS comment?",
        answers: [
            "<!-- This is a comment -->",
            "// This is a comment",
            "-- This is a comment --",
            "/* This is a comment */"
        ],
        correct: 3
    },
    {
        question: "What will the following code output? `console.log(1 + '2' + '2');`",
        answers: ["5", "122", "12", "3"],
        correct: 1
    },
    {
        question: "Which of the following elements defines a thematic break or a change in the content?",
        answers: ["<div>", "<break>", "<section>", "<hr>"],
        correct: 3
    },
    {
        question: "If you want to create a CSS class named `important-text` that sets text to bold and color to red, which of the following is correct?",
        answers: [
            ".important-text { text-style: bold; font-color: red; }",
            "#important-text { font-weight: bold; color: red; }",
            "important-text { font-style: bold; color: red; }",
            ".important-text { font-weight: bold; color: red; }"
        ],
        correct: 3
    }
];

let currentQuestion = 0;
let score = 0;
let time = 60;
let timer;

document.getElementById("start").addEventListener("click", startQuiz);

function startQuiz() {
    document.getElementById("start").hidden = true;
    document.getElementById("description").hidden = true;
    document.getElementById("question-container").hidden = false;

    timer = setInterval(function() {
        time--;
        if (time <= 0) endQuiz();
    }, 1000);

    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        endQuiz();
        return;
    }

    let q = questions[currentQuestion];
    document.getElementById("question").innerText = q.question;

    let answers = document.getElementById("answers");
    answers.innerHTML = "";

    q.answers.forEach((answer, i) => {
        let li = document.createElement("li");
        let btn = document.createElement("button");
        btn.innerText = answer;
        btn.addEventListener("click", function() {
            if (i === q.correct) score++;
            else time -= 10;
            currentQuestion++;
            showQuestion();
        });
        li.appendChild(btn);
        answers.appendChild(li);
    });
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById("question-container").hidden = true;
    document.getElementById("end-container").hidden = false;
    document.getElementById("score").innerText = score;
    document.getElementById("save").addEventListener("click", saveScore);
}

function saveScore() {
    let initials = document.getElementById("initials").value;
    let highscores = JSON.parse(localStorage.getItem("highscores") || "[]");
    highscores.push({ initials, score });
    localStorage.setItem("highscores", JSON.stringify(highscores));
    alert("Score saved!");
}
