// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
<script>
var firebaseConfig = {
    apiKey: "AIzaSyBgifRoH8DL7YdB6wr_w7b2OhHUABJavr8",
    authDomain: "train-scheduler-36350.firebaseapp.com",
    databaseURL: "https://train-scheduler-36350.firebaseio.com",
    projectId: "train-scheduler-36350",
    storageBucket: "train-scheduler-36350.appspot.com",
    messagingSenderId: "153686637797",
    appId: "1:153686637797:web:91390757fb9b0728b8680c"
  };
  firebase.initializeApp(firebaseConfig);
  </script>
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    // was empName
    var trainName = $("#train-name-input").val().trim();
    // was empRole
    var trainDestination = $("#destination-input").val().trim();
    //was empRate
    var trainFrequency = $("#frequency-input").val().trim();
    //was empStart
    var nextArrival = moment($("#next-arrival-input").val().trim(), "MM/DD/YYYY").format("X");
    //was empStart, THIS MUST BE CALCULATED SOME HOW
    var minutesAway = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");

    
  
    // Creates local "temporary" object for holding employee data
    //was newEmp
    var newTrain = {
    //was empName, empRole, empStart, empRate
      name: trainName,
      destination: trainDestination,
      frequency: trainFrequency
      arrival: nextArrival
      calculation: minutesAway ,
      
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.trainDestination);
    console.log(newTrain.trainFrequency);
    console.log(newTrain.nextArrival);
    console.log(newTrain.minutesAway);
    
  
    alert("New train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    //ALSO KNOWN AS FIRST TRAIN TIME IN THE FORM
    $("#next-arrival-input").val("");
    //I DON'T THINK YOU NEED ONE FOR MINUTES-AWAY-INPUT BECAUSE IT DOESN'T REQUIRE A USER INPUT

  });
  
  // 3. Create Firebase event for adding trains to the database and a row in the html when the user makes an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    //WHAT ARE THESE . AT THE END? ARE THOSE METHODS?
    //was empName
    var trainName = childSnapshot.val().name;
    //was empRole
    var trainDestination = childSnapshot.val().role;
    //was empRate
    var trainFrequency = childSnapshot.val().rate;
    //was empStart
    var nextArrival = childSnapshot.val().start;
    //created this one
    var minutesAway = childSnapshot.val()
 
  
    // Employee Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(nextArrival);
    console.log(trainFrequency);
    //DON't NEED ONE FOR MINUTES AWAY BC IT IS CALCULATED
  
    // CALCULATE THE MINUTES AWAY USING NEXT ARRIVAL AND FREQUENCY SOMEHOW
    //was empStartPretty
    var nextArrival = moment.unix(trainTime).format("HH/mm a");
  
    // Create the new row
    var newRow = $("<tr>").append(
    //was empName
    $("<td>").text(trainName),
    //was empRole
    $("<td>").text(trainDestination),
    //was empMonths
    $("<td>").text(trainFrequency),
    //was empRate
    $("<td>").text(nextArrival),
    //was empStartPretty
    $("<td>").text(minutesAway),
     
  
      
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  