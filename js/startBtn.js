startBtn = document.getElementById("startBtn");

startBtn.addEventListener('click', () => {
    let countdown = 3; // Set the initial countdown value

    // Update the button text with the current countdown value
    startBtn.textContent = countdown;

    rmElementById("result");

    // first stage Reaktionsfähigkeit
    switch(currentStage) {
        case 1: appendStageName("Teil 1: Reaktionsf&auml;higkeit"); break;
        case 2: appendStageName("Teil 2: Konzentration"); break;
        case 3: appendStageName("Teil 3: Aufmerksamkeitsbelastung"); break;
    }
    

    // Create an interval that updates the countdown every second
    const interval = setInterval(() => {
        countdown--;

        // Update the button text with the current countdown value
        startBtn.textContent = countdown;

        // Check if the countdown has reached 0
        if (countdown === 0) {
            // Perform any action when the countdown reaches 0
            //startBtn.textContent = "Countdown finished!";
            clearInterval(interval); // Stop the interval
            startBtn.style.visibility = "hidden";
            lastKeyPressTime = new Date().getTime();
            appendIcon("cell-1-1");
            
        }
    }, 1000); // Update every 1000 milliseconds (1 second)
    
});

// helper function
function appendStageName(name) {
    
    // always updating stageName
    rmElementById("stageName");
    
    // where to append stageName
    menuContainer = document.getElementById("menuContainer");

    // build stageName
    const stageName = document.createElement("h2");
    stageName.id = "stageName";
    stageName.innerHTML = name;
    menuContainer.appendChild(stageName);

}

// helper function
function rmElementById(id) {
    document.getElementById(id) && document.getElementById(id).remove();
}

var rightAnswer;
const Answers = [
    "left",
    "right",
    "up",
    "down"
];
// helper functiom
function getIconClassName() {
    switch(rightAnswer) {
        case "left": return "bx bxs-chevrons-left"; break;
        case "right": return "bx bxs-chevrons-right"; break;
        case "up": return "bx bxs-chevrons-up"; break;
        case "down": return "bx bxs-chevrons-down"; break;
    }
} 

// helper function
function appendIcon(cell) {

    // always updating icon
    rmElementById("icon");

    // where to append ico
    cell = document.getElementById(cell);

    newRightAnswer = getRandomItem(Answers);
    // always a different icon
    while (newRightAnswer === rightAnswer) {
      newRightAnswer = getRandomItem(Answers);  
    }
    rightAnswer = newRightAnswer;
    // Get a random class name
    const randomClassName = getIconClassName();

    // Build the icon
    const icon = document.createElement("i");
    icon.id = "icon"
    icon.className = randomClassName;
    cell.appendChild(icon);
}

// Helper function to get a random item from an array
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}


