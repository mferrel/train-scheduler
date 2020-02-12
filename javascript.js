
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
  
  var database = firebase.database();
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
    var firstTrain= $("#first-train-input").val().trim();
  
    var newTrain = {
    
      name: trainName,
      destination: trainDestination,
      frequency: trainFrequency,
      firstTrain: firstTrain
      
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    alert("New train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");

  });
  
//this displays all the children from firebase (retrieval)
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    //was empName
    var trainName = childSnapshot.val().name;
    //was empRole
    var trainDestination = childSnapshot.val().destination;
    //was empRate
    var trainFrequency = childSnapshot.val().frequency;
    //was empStart
    var firstTrain = childSnapshot.val().firstTrain;

    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrain);
    console.log(trainFrequency);

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Assumptions
    var tFrequency = trainFrequency;

    var firstTime = firstTrain;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    minutesAway = tMinutesTillTrain;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    nextArrival = moment(nextTrain).format("hh:mm a");

    // Create the new row
    var newRow = $("<tr>").append(
 
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextArrival),
  
    $("<td>").text(minutesAway)
    );
  
    // Append the new row to the table
    $("#table-row").append(newRow);
  });
  