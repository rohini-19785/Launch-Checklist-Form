// Write your JavaScript code here!


window.addEventListener("load", function() {

   let form = document.querySelector("form");

   form.addEventListener("submit", function(event) {

      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");

      //check values are entered in all the fields
      if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields are required!");
         // stop the form submission
         event.preventDefault();
         return;
      }

      //check if pilot name is a valid string and not a number
      if(isNaN(pilotNameInput.value) == false)
      {
         alert("Please enter appropriate Pilot Name.");
         pilotNameInput.focus();
         event.preventDefault();
         return;
      }
      
      //check if co-pilot name is a valid string and not a number
      if(isNaN(copilotNameInput.value) == false)
      {
         alert("Please enter appropriate Co-pilot Name.");
         copilotNameInput.focus();
         event.preventDefault();
         return;
      }

      //check fuel level value is a number
      if(isNaN(fuelLevelInput.value) == true)
      {
         alert("Please enter numberic value for Fuel Level.");
         fuelLevelInput.focus();
         event.preventDefault();
         return;
      }

      //check cargo mass value is a number
      if(isNaN(cargoMassInput.value) == true)
      {
         alert("Please enter numberic value for Cargo Mass.");
         cargoMassInput.focus();
         event.preventDefault();
         return;
      }

      //if we've reached this point means all fields have valid values entered by the user
      //update the li elements pilotStatus and copilotStatus to include the pilot's name and the co-pilot's name.
      const pilotStatusli = document.getElementById("pilotStatus");
      const copilotStatusli = document.getElementById("copilotStatus");

      pilotStatusli.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
      copilotStatusli.innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch`;

      //If the user submits a fuel level that is too low (less than 10,000 liters), 
      //change faultyItems to visible with an updated fuel status stating that there is not enough fuel for the journey

      //The text of the h2 element, launchStatus, should also change to "Shuttle not ready for launch" and the color should change to red
      let cancelEvent = false;
      if(Number(fuelLevelInput.value) < 10000)
      {
         document.getElementById("faultyItems").style.visibility="visible";
         document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";

         const launchStatusH2 = document.getElementById("launchStatus");
         launchStatusH2.innerHTML = "Shuttle not ready for launch";
         launchStatusH2.style.color = "Red";
         
         cancelEvent=true;

      }
      else
      {
         document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
      }

      //If the user submits a cargo mass that is too large (more than 10,000 kilograms), 
      //change the list to visible with an updated cargo status stating that there is too much mass for the shuttle to take off. 
      //The text of launchStatus should also change to "Shuttle not ready for launch" and the color should change to red
      if(Number(cargoMassInput.value) > 10000)
      {
         document.getElementById("faultyItems").style.visibility="visible";
         document.getElementById("cargoStatus").innerHTML = "Cargo mass too high for launch";

         const launchStatusH2 = document.getElementById("launchStatus");
         launchStatusH2.innerHTML = "Shuttle not ready for launch";
         launchStatusH2.style.color = "Red";

         cancelEvent=true;

      }
      else
      {
         document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
      }

      if(cancelEvent)
      {
         event.preventDefault();
         return;
      }

      //If the shuttle is ready to launch, change the text of launchStatus to green and display "Shuttle is ready for launch".
      const launchStatusH2 = document.getElementById("launchStatus");
      launchStatusH2.innerHTML = "Shuttle ready for launch";
      launchStatusH2.style.color = "Green";

      document.getElementById("faultyItems").style.visibility="visible";

      let minJsonDataIndex = 0;
      let maxJsonDataIndex = 5;
      
      var randomIndex = Math.floor(Math.random() * (maxJsonDataIndex - minJsonDataIndex + 1)) + minJsonDataIndex;


      //fetch the json data
      fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
            response.json().then( function(json) {
               const div = document.getElementById("missionTarget");
               // Add HTML that includes the JSON data
               div.innerHTML = `
                  <h2>Mission Destination</h2>
                  <ol id="destinationOl">
                     <li>Name: ${json[randomIndex].name}</li>
                     <li>Diameter: ${json[randomIndex].diameter}</li>
                     <li>Star: ${json[randomIndex].star}</li>
                     <li>Distance from Earth: ${json[randomIndex].distance}</li>
                     <li>Number of Moons: ${json[randomIndex].moons}</li>
                  </ol>
                  <img src="${json[randomIndex].image}">
               `;
            });
         });


         //Added preventDefault to avoid form submission and loosing the values. In actual form submissions this won't be needed
         event.preventDefault();


   });
});



/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
<li>Name: ${}</li>
<li>Diameter: ${}</li>
<li>Star: ${}</li>
<li>Distance from Earth: ${}</li>
<li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
