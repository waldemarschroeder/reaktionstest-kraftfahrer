// Controller
let numRightAnswers = 0;
let numWrongAnswers = 0;
let arrReactionTimes = [];
let round = 1;
let totalRounds = 30;
let currentStage = 1;

// Function to check key and return reaction time
function checkKey(e) {
    e = e || window.event;
    const currentTime = new Date().getTime();
    let userAnswer;

    switch (e.keyCode) {
        case 38: userAnswer = "up"; break;
        case 40: userAnswer = "down"; break;
        case 37: userAnswer = "left"; break;
        case 39: userAnswer = "right"; break;
        default:
            // Handle other cases or do nothing
            break;
    }

    // user pressed right key
    if (rightAnswer === userAnswer) {
        const reactionTime = currentTime - lastKeyPressTime;
        lastKeyPressTime = currentTime;
        return reactionTime;
    }
    // user pressed wrong key
    else {
        lastKeyPressTime = currentTime;
        return -1;
    }
}

// Function to handle key presses for each stage
function handleStageKey(e) {
    const reactionTime = checkKey(e);

    const stage2Cells = [
        "cell-0-1",
        "cell-1-0",
        "cell-1-2",
        "cell-2-1"
    ];

    // user pressed right key
    if (reactionTime > 0) {
        numRightAnswers++;
        arrReactionTimes.push(reactionTime);
        if (currentStage == 1 || currentStage == 3) { appendIcon("cell-1-1"); }
        if (currentStage == 2) { appendIcon(getRandomItem(stage2Cells)); }
    }
    // user pressed wrong key
    else {
        numWrongAnswers++;
        if (currentStage == 1 || currentStage == 3) { appendIcon("cell-1-1"); }
        if (currentStage == 2) { appendIcon(getRandomItem(stage2Cells)); }
    }

    // Increment the round
    round++;

    // If the current stage is completed, print results
    if (round > totalRounds) {
        return true
    }

    return false;
}

// helper function
function resetGlobalVar() {
    numRightAnswers = 0;
    numWrongAnswers = 0;
    arrReactionTimes = [];
    round = 1;
}

document.onkeydown = function (e) {
    let icon = document.getElementById("icon");
    if (!icon) { return; }

    let stageFinished = handleStageKey(e);
    if (stageFinished) {
        rmElementById("icon");
        appendResult("Anzahl richtiger / falscher Antworten: " + numRightAnswers + " / " + numWrongAnswers +
            " | Durchschnitt. Reaktionszeit in ms: " + Math.round(calcAvg(arrReactionTimes)));
        resetGlobalVar();
        
        switch(currentStage) {
            case 1:
                startBtn = document.getElementById("startBtn");
                startBtn.textContent = "Start Teil 2";
                startBtn.style.visibility = "visible";
                currentStage++
                break;
            case 2:
                startBtn = document.getElementById("startBtn");
                startBtn.textContent = "Start Teil 3";
                startBtn.style.visibility = "visible";
                totalRounds = 100;
                currentStage++
                break;
            case 3:
        }
    }

};

function calcAvg(arr) {
    if (arr.length === 0) {
        return 0; // Return 0 for an empty array to avoid division by zero
    }

    const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const average = sum / arr.length;

    return average;
}

// helper function to display results
function appendResult(text) {
    
    // always updating result
    rmElementById("result");
    
    // where to append stageName
    menuContainer = document.getElementById("menuContainer");

    // build stageName
    const result = document.createElement("h2");
    result.id = "result";
    result.innerHTML = text;
    menuContainer.appendChild(result);

}



