//FUNCTIONS DECLARATIONS:

//Handlers:
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text");
    if (id === "option_" + correctOption) {
        event.target.innerHTML = "";
        last = document.getElementById(id);
        event.target.appendChild(last);
        levelReload();
    }
}

function homeLogoHandler(event) {
    window.location.replace("index.html");
}

function launchButtonHandler(event) {
    location.replace("game_screen.html");
}

function rulesButtonHandler(event) {
    const button = event.target;
    const rulesWrapper = document.getElementById("rules_wrapper");
    if (button.innerHTML === "Pravidlá") {
        button.innerHTML = "Zatvoriť";
        rulesWrapper.style.display = "flex";
    } else {
        button.innerHTML = "Pravidlá";
        rulesWrapper.style.display = "none";
    }
}

function helpButtonHandler(event) {
    const button = event.target;
    const helpWrapper = document.getElementById("help_wrapper");
    if (button.innerHTML === "Nápoveda") {
        button.innerHTML = "Zatvoriť";
        helpWrapper.style.display = "flex";
    } else {
        button.innerHTML = "Nápoveda";
        helpWrapper.style.display = "none";
    }
}

function solveButtonHandler(event) {
    const correctOptionDnd = document.getElementById("option_" + correctOption);
    correctOptionDnd.style.color = "white";
    correctOptionDnd.style.backgroundColor = "black";
    correctOptionDnd.style.borderColor = "black";
    setTimeout(function () {
        correctOptionDnd.style.color = "black";
        correctOptionDnd.style.backgroundColor = "white";
        correctOptionDnd.style.borderColor = "white";
    }, 500);
}

function loadJSON(filePath) {
    const request = new XMLHttpRequest();
    request.open("GET", filePath, false);
    request.send(null);

    return JSON.parse(request.responseText);
}

//Game-logic functions:
function localStorageInitialization() {
    let tmpLevels = loadJSON("levels.json");
    tmpLevels = tmpLevels.sort(() => 0.5 - Math.random());
    localStorage.setItem("levels", JSON.stringify(tmpLevels));
    levelReload();
}

function levelReload() {
    backgroundPath = backgroundPath.sort(() => 0.5 - Math.random());

    levels = JSON.parse(localStorage.getItem("levels"));

    if (levels.length !== 0) {
        currentLevel = levels.shift();
        console.log(levels);
        correctOption = currentLevel.correctOptionId;
        localStorage.setItem("levels", JSON.stringify(levels));
        localStorage.setItem("currentLevel", JSON.stringify(currentLevel));
        localStorage.setItem("correctOption", correctOption);


        let gameBody = document.getElementById("game_body");
        let paint = document.getElementById("paint");
        let dndControlPanel = document.getElementById("dnd_control_panel");
        let answer = document.getElementById("answer");
        let option1 = document.getElementById("option_1");
        let option2 = document.getElementById("option_2");
        let option3 = document.getElementById("option_3");
        let option4 = document.getElementById("option_4");
        let helpPanel = document.getElementById("help_panel");

        gameBody.style.background = "url(\"" + backgroundPath[0] + "\") center center  fixed no-repeat";
        gameBody.style.backgroundSize = "cover";
        paint.setAttribute("src", currentLevel.imagePath);
        if (last) {
            dndControlPanel.appendChild(last);
        }
        answer.innerHTML = "Odpoveď potiahni sem";
        option1.innerHTML = currentLevel.options[0].artistName + " - " + currentLevel.options[0].pictureName;
        option2.innerHTML = currentLevel.options[1].artistName + " - " + currentLevel.options[1].pictureName;
        option3.innerHTML = currentLevel.options[2].artistName + " - " + currentLevel.options[2].pictureName;
        option4.innerHTML = currentLevel.options[3].artistName + " - " + currentLevel.options[3].pictureName;
        helpPanel.innerHTML = currentLevel.help;
    } else {
        localStorageInitialization();
    }
}

function levelLoad() {
    backgroundPath = [
        "media_files/backgrounds/louvre_interior_1.jpg",
        "media_files/backgrounds/louvre_interior_2.jpg",
        "media_files/backgrounds/louvre_interior_3.jpg",
        "media_files/backgrounds/louvre_interior_4.jpg",
        "media_files/backgrounds/louvre_interior_5.jpg",
    ];
    backgroundPath = backgroundPath.sort(() => 0.5 - Math.random());
    levels = JSON.parse(localStorage.getItem("levels"));
    currentLevel = JSON.parse(localStorage.getItem("currentLevel"));
    correctOption = localStorage.getItem("correctOption");

    if ((levels == null) || (currentLevel == null) || (correctOption == null)) {
        localStorageInitialization();
    }

    let gameBody = document.getElementById("game_body");
    let paint = document.getElementById("paint");
    let answer = document.getElementById("answer");
    let option1 = document.getElementById("option_1");
    let option2 = document.getElementById("option_2");
    let option3 = document.getElementById("option_3");
    let option4 = document.getElementById("option_4");
    let helpPanel = document.getElementById("help_panel");

    gameBody.style.background = "url(\"" + backgroundPath[0] + "\") center center  fixed no-repeat";
    gameBody.style.backgroundSize = "cover";
    paint.setAttribute("src", currentLevel.imagePath);
    answer.innerHTML = "Odpoveď potiahni sem";
    option1.innerHTML = currentLevel.options[0].artistName + " - " + currentLevel.options[0].pictureName;
    option2.innerHTML = currentLevel.options[1].artistName + " - " + currentLevel.options[1].pictureName;
    option3.innerHTML = currentLevel.options[2].artistName + " - " + currentLevel.options[2].pictureName;
    option4.innerHTML = currentLevel.options[3].artistName + " - " + currentLevel.options[3].pictureName;
    helpPanel.innerHTML = currentLevel.help;
}

navigator.serviceWorker.register("service_worker.js")
    .then((reg) => {
        console.log("service worker registered", reg);
    })
    .catch((err) => {
        console.log("error", err);
    });
