// Write your helper functions here!

require("cross-fetch/polyfill");
//using the provided HTML format populate the missionTarget div section
//function to populate the missionTarget div with planet info
function addDestinationInfo(
    document,
    name,
    diameter,
    star,
    distance,
    moons,
    imageUrl
) {
    const missionTarget = document.getElementById("missionTarget");
    if (missionTarget) {
        missionTarget.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
                <li>Name: ${name}</li>
                <li>Diameter: ${diameter}</li>
                <li>Star: ${star}</li>
                <li>Distance from Earth: ${distance}</li>
                <li>Number of Moons: ${moons}</li>
            </ol>
            <img src="${imageUrl}">
        `;
    } else {
        console.error("Element with ID 'missionTarget' not found.");
    }
}
//function to validate user input and testInput
function validateInput(testInput) {
    //this function will be used to validate the form inputs
    if (testInput === '') {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

//function to handle form submission and validation
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    //convert fuel and cargo strings to numbers
    const fuelLevelNum = Number(fuelLevel);
    const cargoMassNum = Number(cargoMass);

    // validate the inputs 
    const pilotValid = validateInput(pilot);
    const copilotValid = validateInput(copilot);
    const fuelLevelValid = validateInput(fuelLevel);
    const cargoMassValid = validateInput(cargoMass);

    //alert user if invalid input and prevent form submission
    if (pilotValid !== "Not a Number") {
        alert('pilot name must be a non-empty string.');
        formSubmission.preventDefault();//prevent default form submission w3school listed it as an alternative to prevetDefault() to stop form submission
    }
    if (copilotValid !== "Not a Number") {
        alert('copilot name must be a non-empty string.');
        formSubmission.preventDefault();
    }
    if (fuelLevelValid !== "Is a Number") {
        alert('fuel level must be a non-empty number.');
        formSubmission.preventDefault()
    }
    if (cargoMassValid !== "Is a Number") {
        alert('cargo mass must be a non-empty number.');
        formSubmission.preventDefault();
    }

    //track shuttle readiness
    isReady = true;

    //function to update the launch status text and color and make faultyItems visible
    //i was having trouble figuring out how to get this to work until i put it in as function
    //returning isReady or !isReady was not working
    function updateLaunchStatus(isReady) {
        const launchStat = document.getElementById('launchStatus');
        const faultyListVisible = document.getElementById('faultyItems')
        if (isReady) {
            launchStat.textContent = "Shuttle is Ready for Launch";
            launchStat.style.color = "green";
            faultyListVisible.style.visibility = 'visible'
        } else {
            launchStat.textContent = "Shuttle Not Ready for Launch";
            launchStat.style.color = "red";
            faultyListVisible.style.visibility = 'visible';
        }
    }

    //check fuel and cargo levels and update the status accordingly
    if (fuelLevelNum < 10000 && cargoMassNum > 10000) {
        document.getElementById("fuelStatus").textContent = `Fuel level too low for launch`;
        document.getElementById("cargoStatus").textContent = 'Cargo mass too heavy for launch';
        updateLaunchStatus(!isReady);
    } else if (fuelLevelNum < 10000 && cargoMassNum <= 10000) {
        document.getElementById("fuelStatus").textContent = `Fuel level too low for launch`;
        document.getElementById("cargoStatus").textContent = 'Cargo mass low enough for launch';
        updateLaunchStatus(!isReady);
    } else if (fuelLevelNum >= 10000 && cargoMassNum > 10000) {
        document.getElementById("fuelStatus").textContent = 'Fuel level high enough for launch';
        document.getElementById("cargoStatus").textContent = 'Cargo mass too heavy for launch';
        updateLaunchStatus(!isReady);
    } else {
        document.getElementById("fuelStatus").textContent = 'Fuel level high enough for launch';
        document.getElementById("cargoStatus").textContent = 'Cargo mass low enough for launch';
        updateLaunchStatus(isReady)
    };

    //update pilot and copilot status
    document.getElementById('pilotStatus').textContent = `Pilot ${pilot} is ready for launch`;
    document.getElementById('copilotStatus').textContent = `Co-pilot ${copilot} is ready for launch`;

};

//fetch the planet data from the url using fetch
//await the response and parse it to JSON using response.json()
//return the parsed JSON data of the planets
async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json(); //convert the response to JSON
    });

    return planetsReturned;
}

//use Math.random to generate a random number (0-1) .floor rounds a number down to the nearest integer
//returns planet at random index
function pickPlanet(planets) {
    const random = Math.floor(Math.random() * planets.length);
    return planets[random];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
