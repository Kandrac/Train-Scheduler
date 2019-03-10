
var config = {
    apiKey: "AIzaSyD8X8Vi9nwaTogtQ5hNR5CyJHjlVaOESc0",
    authDomain: "train-sched-7a0ba.firebaseapp.com",
    databaseURL: "https://train-sched-7a0ba.firebaseio.com",
    projectId: "train-sched-7a0ba",
    storageBucket: "train-sched-7a0ba.appspot.com",
    messagingSenderId: "439733595164"
};
  firebase.initializeApp(config);
  
  var trainData = firebase.database();
 
  $("#add-train-btn").on("click", function() {
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainUnix = moment($("#firstTrain").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequency").val().trim();
    var newTrain = {
      name: trainName,
      destination: destination,
      firstTrain: firstTrainUnix,
      frequency: frequency
    };
     
    trainData.ref().push(newTrain);
  
    alert("Added train confirmed");
  
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");
    return false;
  });
  

  trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {
    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tFrequency = childSnapshot.val().frequency;
    var tFirstTrain = childSnapshot.val().firstTrain;
    var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
    var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency;
    var tMinutes = tFrequency - tRemainder;
    var tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>"
    + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
  });
  
  