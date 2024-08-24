// Write your helper functions here!

require("cross-fetch/polyfill");
//using the provided HTML format populate the missionTarget div section

//function to populate the missionTarget div with planet info
//used in script.js
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



//function to handle form submission and validation. calls launchInfoUpdate function if all input is valid
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {

    const pilotValid = validateInput(pilot);
    const copilotValid = validateInput(copilot);
    const fuelLevelValid = validateInput(fuelLevel);
    const cargoMassValid = validateInput(cargoMass);

    if (pilotValid !== "Not a Number") {
        alert(`Pilot name should not be "${pilotValid}"`);
        return false;
    }

    if (copilotValid !== "Not a Number") {
        alert(`Copilot name should not be "${copilotValid}"`);
        return false;
    }

    if (fuelLevelValid !== "Is a Number") {
        alert(`Fuel Level should not be "${fuelLevelValid}"`);
        return false;
    }

    if (cargoMassValid !== "Is a Number") {
        alert(`Cargo mass should not be "${cargoMassValid}"`);
        return false;
    }

    else {
        launchInfoUpdate(document, pilot, copilot, fuelLevel, cargoMass)

    };

}



// function to update readiness status. calls the updateLaunchStatus function
function launchInfoUpdate(document, pilot, copilot, fuelLevel, cargoMass) {

    launchReady = true
    //convert fuel and cargo strings to numbers
    const fuelLevelNum = Number(fuelLevel);
    const cargoMassNum = Number(cargoMass);

    let fuelStat = ''
    let cargoStat = ''

    if (fuelLevelNum < 10000) {
        fuelStat = 'Fuel level too low for launch';
        launchReady = false;
    } else {
        fuelStat = 'Fuel level high enough for launch';
    }

    if (cargoMassNum > 10000) {
        cargoStat = 'Cargo mass too heavy for launch';
        launchReady = false;
    } else {
        cargoStat = 'Cargo mass low enough for launch';
    }

    document.getElementById('pilotStatus').textContent = `Pilot ${pilot} is ready for launch`;
    document.getElementById('copilotStatus').textContent = `Co-pilot ${copilot} is ready for launch`;
    document.getElementById("fuelStatus").textContent = fuelStat;
    document.getElementById("cargoStatus").textContent = cargoStat;
    updateLaunchStatus(document, launchReady);
}

// function to update the launch status text and color and make faultyItems visible
function updateLaunchStatus(document, launchReady) {
    const launchStat = document.getElementById('launchStatus');
    const faultyListVisible = document.getElementById('faultyItems');
    if (!launchReady) {
        launchStat.textContent = `Shuttle Not Ready for Launch`;
        launchStat.style.color = "red";
        faultyListVisible.style.visibility = 'visible';

    } else {
        launchStat.textContent = `Shuttle is Ready for Launch`;
        launchStat.style.color = "green";
        faultyListVisible.style.visibility = 'visible'
    }

}

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
