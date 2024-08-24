//this waits for the page to load before running the script
window.addEventListener("load", function () {
  //stores fetched planet data
  let listedPlanets;

  // fetch planet data from the urel and store it in listedPlanets
  //myFetch is in the helper script
  let listedPlanetsResponse = myFetch();
  listedPlanetsResponse.then(function (result) {
    listedPlanets = result;
    console.log(listedPlanets); //fetched planet data. console logged for debugging
  }).then(function () {
    console.log(listedPlanets);

    //call pickPlanet after fetching data. picks a random planet from the list
    const selectedPlanet = pickPlanet(listedPlanets);
    console.log(selectedPlanet); //console log selected planet for debugging

    //update missionTarget div with the selected planet info. moved to above form submission 
    //so that it populates when loaded and doesn't change unless page reloaded
    addDestinationInfo(
      document,
      selectedPlanet.name,
      selectedPlanet.diameter,
      selectedPlanet.star,
      selectedPlanet.distance,
      selectedPlanet.moons,
      selectedPlanet.image
    );

    //use for launch form element
    const launchForm = document.getElementById('launchForm');

    //event listener for the form submission
    launchForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission behavior
      //form field values
      //have to use the [0] because getElementByName returns array
      const pilotName = document.getElementById('pilotName').value;
      const copilotName = document.getElementsByName('copilotName')[0].value;
      const fuelLevel = document.getElementsByName('fuelLevel')[0].value;
      const cargoMass = document.getElementsByName('cargoMass')[0].value;

      // Call formSubmission with retrieved form values
      formSubmission(document, listedPlanets, pilotName, copilotName, fuelLevel, cargoMass);


    });
  });

});