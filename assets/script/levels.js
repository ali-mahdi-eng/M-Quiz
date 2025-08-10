let language = localStorage.getItem("language") || "ar";
let title = document.querySelector(".title");
let levelsContainer = document.querySelector(".levels-container");




const translation = {
    "en": {
        "title": "Levels",
        "level-text": "Level"
    },
    
    "ar": {
        "title": "المستويات",
        "level-text": "المستوى"
    }
}











async function initializeLevelPage() {
    document.querySelector("title").textContent = translation[language]["title"];
    title.textContent = translation[language]["title"];
    const data = await fetchLevelsData();
    showAllLevels(data);
}
initializeLevelPage();



async function fetchLevelsData() {
    try {
        let url = `./data/questions-${language}.json`;
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        return data;
    }
    catch (error) {
        console.error("!! Error while fetching or parsing JSON:", error);
    }
}



async function showAllLevels(allLevels) {
    let levelIndex = 0;
    let levelsFragment = document.createDocumentFragment();
    for (let level in allLevels) {
        // Don't Show Empty Level (with no questions inside).
        if (allLevels[level].length === 0) { continue; }
        let levelElement = document.createElement("li");
            levelElement.className = "level";
            let span = document.createElement("span");
                span.innerHTML = `<span class="level-text">${translation[language]["level-text"]}</span>  <span class="level-number">${levelIndex + 1}</span>`;
            levelElement.appendChild(span);
            levelElement.setAttribute("data-level", level);
            levelElement.addEventListener("click", goToLevel);
        levelsFragment.appendChild(levelElement);
        levelIndex++;
    }
    levelsContainer.appendChild(levelsFragment);
}


function goToLevel(e) {
    let selectedLevel = e.target.dataset.level; // Examples Return: "level-1"
    let selectedLevelNumber = selectedLevel.match(/-(\d+)$/)[1]; // Examples Return: "1"
    let nextPage = "questions.html";
    let dataToSend = `level=${selectedLevelNumber}`;
    window.location.href = nextPage + "?" + dataToSend;
}
