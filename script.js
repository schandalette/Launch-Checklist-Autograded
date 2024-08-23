// Write your JavaScript code here!

window.addEventListener("load", function () {

  let listedPlanets;

  // fetch planet data and store it in listedPlanets
  let listedPlanetsResponse = myFetch();
  listedPlanetsResponse.then(function (result) {
    listedPlanets = result;
    console.log(listedPlanets);
  }).then(function () {
    console.log(listedPlanets);

    // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
    const launchForm = document.getElementById('launchForm');

    launchForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission behavior
      const pilotName = document.getElementById('pilotName').value;
      const copilotName = document.getElementsByName('copilotName')[0].value; //have to use the [0] because getElementByName returns array
      const fuelLevel = document.getElementsByName('fuelLevel')[0].value;
      const cargoMass = document.getElementsByName('cargoMass')[0].value;

      // Call formSubmission with retrieved form values
      formSubmission(document, listedPlanets, pilotName, copilotName, fuelLevel, cargoMass);

      const selectedPlanet = pickPlanet(listedPlanets);
      console.log(selectedPlanet);

      //update missionTarget div with the selected planet info
      addDestinationInfo(
        document,
        selectedPlanet.name,
        selectedPlanet.diameter,
        selectedPlanet.star,
        selectedPlanet.distance,
        selectedPlanet.moons,
        selectedPlanet.image
      );

    });
  });

});