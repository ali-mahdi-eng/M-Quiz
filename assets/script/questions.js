let helpsContainer = document.querySelector(".helps-container");
let remove2answersBtn = document.querySelector(".remove2answers-btn");
let hintBtn = document.querySelector(".hint-btn");
let solveQuestionBtn = document.querySelector(".solve-question-btn");
let questionCounter = document.querySelector(".question-counter");
let totalQuestionCounter = document.querySelector(".total-question-counter");
let main = document.querySelector(".main");
let question = document.querySelector(".question");
let questionContainer = document.querySelector(".question-container");
let answersContainer = document.querySelector(".answers-container");
let footer = document.querySelector(".footer");
let footerText = document.querySelector(".footer-text");
let nextBtn = document.querySelector(".next-btn");

let soundEffect = document.querySelector(".sound-effect");







const gameState = {
    difficulty: localStorage.getItem("difficulty") ||  "hard", // default: hard.
    previewCorrectAnswer: localStorage.getItem("preview-correct-answer") || "show", // default: show.
    enableSoundEffect: (localStorage.getItem("enable-sound-effect") === "disable") ? (false) : (true), // default: enable.
    level: 1, // start from 1.
    index: 0, // start from 0.
    total: 0, // total number of questions in this level (start from 1 to infinite if not empty).
    power: 3, // max power = 3.
    wrong: 0, // 0 <= wrong <= power.
    correct: 0, // correct <= total.
}
let data; // defuault: undefined.
let allQuestions = [];
let language = localStorage.getItem("language") || "ar";




const translation = {
    "en": {
        "text--level": "Level",
        "next-btn": "Next",
        "done-btn": "Done",
        "go-to-next-level-btn": "Next Level",
        "try-again-btn": "Try Again",
        "score": "Score",
        "mistakes": "Mistakes",
        "still-power": "Still Power",
        "win-title": "Level Completed!",
        "lose-title": "Game Over",
        "good-job": "Good Job!",
        "try-again": "Not Bad, Try Again",
        "text--hint": "Hint",
        "text--get-it": "Get It",
        "text--one-answer-deleted": "One Answer Has Deleted",
        "comming-soon": "Comming Soon..",
        "hint-system": "Hint System",
        "ok-btn": "ok",
        "msg-correct-answer": "Good Job!",
        "msg-wrong-answer": "Oops! Try your best next time!",
    },
    
    "ar": {
        "text--level": "المستوى",
        "next-btn": "التالي",
        "done-btn": "تم",
        "go-to-next-level-btn": "المستوى التالي",
        "try-again-btn": "أعِد المحاولة",
        "score": "النقاط",
        "mistakes": "الاخطاء",
        "still-power": "الطاقة المتبقية",
        "win-title": "أكملت المستوى!",
        "lose-title": "إنتهت اللعبة",
        "good-job": "عمل جيد!",
        "try-again": "ليس سيء، حاول مرة اخرى",
        "text--hint": "تلميح",
        "text--get-it": "فهمت",
        "text--one-answer-deleted": "تم حذف إجابة",
        "comming-soon": "قادم قريباً..",
        "hint-system": "نظام التلميحات",
        "ok-btn": "حسناً",
        "msg-correct-answer": "أحسنت عملاً!",
        "msg-wrong-answer": "محاولة جيدة، ابذل جهدك في المرة القادمة!",
    }
}


function translate(className) {
    if (Array.isArray(className)) {
        // Translate using element className
        // translate(["ok-btn"]);
        return translation[language][className];
    }
    else {
        // Escape Translation
        // translate("OK Button");
        return className;
    }
}




function initializeTranslation() {
    // Change File Direction Automatically (rtl || ltr).
    let direction = language === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.style.direction = direction;
}
document.addEventListener("DOMContentLoaded", initializeTranslation);




function getCurrentLevelFromURL() {
    let params = new URLSearchParams(window.location.search);
    let currentLevel = +(params.get("level")) || 1;
    document.querySelector("title").textContent = `${translate(["text--level"])} ${currentLevel}`;
    gameState.level = currentLevel;
    return currentLevel;
}
getCurrentLevelFromURL();





async function fetchQuestionsData() {
    let url = `./data/${gameState.difficulty}/questions-${language}.json`;
    try {
        let response = await fetch(url);
        if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }
        data = await response.json();
        
        await initApp(data);
        return data;
    }
    catch (error) {
        console.error("!! Error while fetching or parsing JSON:", error);
    }
}
fetchQuestionsData();




function initApp(data) {
    if (!data) {
        window.history.back(); // Back To Levels Page.
        return; // stop function
    }
    // Reset Game State to initial values
    gameState.index = 0;
    gameState.wrong = 0;
    gameState.correct = 0;
    // Reset power to initial value and in UI:
    resetPower();
    // Show Helps Box
    document.querySelector(".helps-container").style.display = "flex";
    // Get Questions Of This Level
    allQuestions = data[`level-${gameState.level}`];
    // Show Questions Randomly
    allQuestions = shuffleArray(allQuestions);
    displayCurrentQuestion(allQuestions[gameState.index]);
    displayCurrentQuestion(allQuestions[gameState.index]);
    // Update initial UI (user interface) with correct data:
    gameState.total = allQuestions.length;
    totalQuestionCounter.textContent = gameState.total || "--";
    questionCounter.textContent = (gameState.index + 1) || "--";  // counter start from 1 not from 0.
    
    nextBtn.textContent = translate(["next-btn"]);
}



// Make Array Randomly Indexed
function shuffleArray(array) {
    for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
        const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}



function displayCurrentQuestion(question) {
    // Handle Question
    questionContainer.textContent = question.question;
    // Handle Answers
    let answersFragment = document.createDocumentFragment();
    let allAnswers = shuffleArray(question.allAnswers);
    allAnswers.forEach(function (answerText) {
        let answer = document.createElement("li");
            answer.className = "answer";
            answer.textContent = answerText;
            answer.addEventListener("click", function (e) {
                if (isAnswerCorrect(answerText, question)) {
                    e.target.classList.add("correct-answer");
                    handleCorrectAnswer();
                    // sound Effects
                    if (gameState.enableSoundEffect) {
                        soundEffect.currentTime = 0;
                        soundEffect.src = "./assets/fx/correct-answer.wav"
                        soundEffect.play();
                    }
                }
                else {
                    e.target.classList.add("incorrect-answer");
                    handleWrongAnswer();
                    // sound Effects
                    if (gameState.enableSoundEffect) {
                        soundEffect.currentTime = 0;
                        soundEffect.src = "./assets/fx/incorrect-answer.wav"
                        soundEffect.play();
                    }
                    // Check If Game Is End
                    if (gameState.power === 0) {
                        showResult();
                        return;
                    }
                }
                main.style.pointerEvents = "none";
                helpsContainer.style.pointerEvents = "none";
                remove2answersBtn.style.pointerEvents = "none";
                helpsContainer.style.opacity = "0.7";
                // footer.hidden = false;
                
                footer.classList.remove("footer-out")
                footer.classList.add("footer-in")
                footer.style.display = "flex";
                setTimeout(function() {;
                    footer.classList.remove("footer-in")
                }, 250);
                nextBtn.addEventListener("click", handleNextBtn);
            });
        answersFragment.appendChild(answer);
    });
    answersContainer.innerHTML = "";
    answersContainer.appendChild(answersFragment);
}

function isAnswerCorrect(currentAnswer, question) {
    // Check if answer true or false.
    return currentAnswer === question.correctAnswer;
}

function handleCorrectAnswer(question) {
    gameState.correct += 1;
    footerText.innerHTML = `<span class="msg-correct-answer"> ${translate(["msg-correct-answer"])} </span>`;
    footerText.style.fontSize = "1.1rem";
    // footer.style.background = "#2ecc71";
}

function handleWrongAnswer(question) {
    gameState.wrong += 1;
    gameState.power -= 1;
    updatePowerUI();
    footerText.innerHTML = `<span class="msg-wrong-answer"> ${translate(["msg-wrong-answer"])} </span>`;
    footerText.style.fontSize = "1rem";
    // footer.style.background = "#e74c3c";
    // Show Correct Answer (if preview enable)
    if (gameState.previewCorrectAnswer === "show") {
        [...data["level-" + gameState.level][gameState.index].allAnswers].map((e)=>{
            if (e === data["level-" + gameState.level][gameState.index].correctAnswer) {
                [...document.querySelectorAll(".answer")].map((ans)=>{
                    if(e === ans.textContent) {
                        ans.style.background = "hsl(152,68%,80%)";
                    }
                });
            }
        });
    }
}

function handleNextBtn() {
    main.style.pointerEvents = "auto";
    helpsContainer.style.pointerEvents = "auto";
    helpsContainer.style.opacity = "1";
    remove2answersBtn.style.pointerEvents = "auto";
    remove2answersBtn.style.opacity = "1";
    console.log(gameState.index);
    if (gameState.index === gameState.total -2) {
        nextBtn.textContent = translate(["done-btn"]);
    }
    
    if (gameState.index === gameState.total -1) {
        showResult();
    }
    else {
        gameState.index += 1;
        questionCounter.textContent = gameState.index + 1; // counter start from 1 not 0.
        if (allQuestions.length > 0) {
            displayCurrentQuestion(allQuestions[gameState.index]);
            displayCurrentQuestion(allQuestions[gameState.index]);
        }
    }
    document.querySelectorAll(".answer").forEach(function (e) {
        e.classList.remove("correct-answer", "incorrect-answer");
    });
    // footer.hidden = true;
    footer.classList.remove("footer-in");
    footer.classList.add("footer-out");
    setTimeout(function() {
        footer.style.display = "none";
        footer.classList.remove("footer-out");
    }, 250);
    nextBtn.removeEventListener("click", handleNextBtn);
}

function showResult() {
    // Prevent Extra Touch
    main.style.pointerEvents = "none";
    // footer.hidden = true;
    footer.classList.remove("footer-in");
    footer.classList.add("footer-out");
    setTimeout(function() {
        footer.style.display = "none";
        footer.classList.remove("footer-out");
    }, 250);
    // Show Results
    const gameResult = {
        scores: gameState.correct,
        mistakes: gameState.wrong,
        power: gameState.power
    }
    setTimeout(function() {
        showAlert(gameResult);
    },500);
}



function resetPower() {
    gameState.power = 3;
    // Clear DOM:
    document.querySelector(".power-container").innerHTML = "";
    // Regenerate DOM:
    for (let i = 0; i < gameState.power; i++) {
        let powerElement = document.createElement("span");
            powerElement.className = "power";
            powerElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30" fill="none"><path fill="#ffffff" d="M11.5 13.8H10.1299C8.72143 13.8 8.01721 13.8 7.72228 13.3385C7.42735 12.8769 7.72321 12.2379 8.31493 10.9597L11.0463 5.06006C11.4205 4.25182 11.6075 3.8477 11.8038 3.89091C12 3.93413 12 4.37946 12 5.27013V9.7C12 9.9357 12 10.0536 12.0732 10.1268C12.1464 10.2 12.2643 10.2 12.5 10.2H13.8701C15.2786 10.2 15.9828 10.2 16.2777 10.6615C16.5726 11.1231 16.2768 11.7621 15.6851 13.0402L12.9537 18.9399C12.5795 19.7482 12.3925 20.1523 12.1962 20.1091C12 20.0659 12 19.6205 12 18.7299V14.3C12 14.0643 12 13.9464 11.9268 13.8732C11.8536 13.8 11.7357 13.8 11.5 13.8Z"/></svg>`;
        document.querySelector(".power-container").appendChild(powerElement);
    }
}


function updatePowerUI() {
    // change icon style depending on still power:
    if (gameState.power >= 0 && gameState.wrong > 0) {
        for(let i = 0; i < gameState.wrong; i++) {
            let SelectedPowerElement = document.querySelectorAll(".power svg path")[i];
                // SelectedPowerElement.style.fill = "#3393FF";
                // color effect when losing power.
                SelectedPowerElement.style.fill = "#ff6347";
                setTimeout(function() {
                    SelectedPowerElement.style.fill = "#fff5";
                }, 500);
        }
    }
}




hintBtn.addEventListener("click", function() {
    let hint = data["level-" + gameState.level][gameState.index].helps.hint;
    Swal.fire({
        title: `<span class="comming-soon">${translate(["text--hint"])}</span>`,
        html: `<span class="hint-system"> ${hint} </span>`,
        icon: "info",
        confirmButtonText: `<span class="ok-btn"> ${translate(["text--get-it"])}! </span>`,
    });
});

remove2answersBtn.addEventListener("click", function() {
    let arr = data["level-" + gameState.level][gameState.index].allAnswers;
    let answerDeleted = data["level-" + gameState.level][gameState.index].helps.remove2answers[Math.round(Math.random())]; // deleteOneAnswer [0] OR [1]
    let newArr = arr.map((e) => {
        if (e === answerDeleted) {
            [...document.querySelectorAll(".answer")].map((ans) => {
                if (e === ans.textContent)
                ans.remove();
                remove2answersBtn.style.pointerEvents = "none";
                remove2answersBtn.style.opacity = "0.6";
            });
        } 
    });
    
    Swal.fire({
        title: `<span class="comming-soon">${translate(["text--one-answer-deleted"])}!</span>`,
        html: `<span class="hint-system"><del> ${answerDeleted} </del></span>`,
        icon: "warning",
        confirmButtonText: `<span class="ok-btn"> ${translate(["text--get-it"])}! </span>`,
    });
});



/*
helpsContainer.addEventListener("click", function() {
    Swal.fire({
        title: `<span class="comming-soon">${translate(["comming-soon"])}</span>`,
        html: `<span class="hint-system"> ${translate(["hint-system"])} </span>`,
        icon: "warning",
        confirmButtonText: `<span class="ok-btn"> ${translate(["ok-btn"])} </span>`,
    });
});
*/


function showAlert(gameResult) {
    // Add default value if there is no value.
    const { scores = 0, mistakes = 0, power = 0 } = gameResult;
    // Add Sweet Alert Notification
    let iconType = (gameResult.power > 0) ? "success" : "error";
    let resultTitleText = (gameResult.power > 0) ? `<span class="win-title"> ${translate(["win-title"])} </span>`   :   `<span class="lose-title"> ${translate(["lose-title"])} </span>`;
    let htmlText = (gameResult.power > 0) ? `<span class="good-job"> ${translate(["good-job"])} </span>`   :   `<span class="try-again"> ${translate(["try-again"])} </span>`;
    let confirmBtnText = (gameResult.power > 0) ? `<span class="back-to-home-btn"> ${translate(["go-to-next-level-btn"])} </span>`   :   `<span class="try-again-btn"> ${translate(["try-again-btn"])}! </span>`;
    
    Swal.fire({
        icon: iconType,
        title: `<span class="result-title"> ${resultTitleText} </span>`,
        html: `
            <div class="results-container">
                <span class="result-item"> <span class="score"> ${translate(["score"])} </span>: ${gameResult.scores}</span>
                <!-- <br> -->
                <span class="result-item"> <span class="mistakes"> ${translate(["mistakes"])} </span>: ${gameResult.mistakes}</span>
                <!-- <br> -->
                <span class="result-item"> <span class="still-power"> ${translate(["still-power"])} </span>: ${gameResult.power}</span>
            </div>
            <!-- <span> ${htmlText} </span> -->
            `,
        confirmButtonText: confirmBtnText,
    }).then((result)=>{
        main.style.pointerEvents = "auto";
        // if [backdrop area] clicked: go to levels page (level +1).
        if (result.isDismissed) {
            window.history.back();
        }
        // if [confirmButton] clicked: go next level (Or try again this level if player lose).
        if (result.isConfirmed) {
            if (power === 0) { /* lose */
                // Try Again.
                initApp(data);
            }
            if (power > 0) { /* win */
                // Go Next Level.
                if (gameState.level < Object.keys(data).length) {
                    gameState.level += 1;
                    window.location.href = `questions.html?level=${gameState.level}`;
                } else {
                    // If Not Levels More In Data Object
                    window.history.back();
                }
            }
        }
    });
}

