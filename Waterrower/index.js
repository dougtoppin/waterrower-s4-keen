// Read rowing data from a WaterRower Series 4 (IV) - S4 - Performance Monitor
// and save to a Keen.IO collection.

// To use this:
// Refer to: https://github.com/dougtoppin/waterrower-s4-keen/blob/master/README.md

// S4 information can be found at http://www.waterrower.com/products_s4.php
// Keen.IO information can be found at https://keen.io/

// This code was started with the example from https://github.com/jamesnesfield/node-waterrower

var waterrower = require("../node-waterrower/Waterrower");

// milliseconds between data collection intervals
var collectionInterval = 5000;

// Configure a Keen instance for your project
var Keen = require('keen-js');


var client = new Keen({
    projectId: "KEENPROJECTID",
    writeKey: "KEENWRITEKEY"
});

// uniquely identify this session for the keen data collection
var session = "session-" + new Date().toISOString();

// only send to Keen if the stroke count has increased
var previousStrokeCount=0;

var readWaterrower = function () {

    // read data from the S4 for each field
    var strokeCount = waterrower.readStrokeCount();
    var totalSpeed = waterrower.readTotalSpeed();
    var averageSpeed = waterrower.readAverageSpeed();
    var distance = waterrower.readDistance();
    var heartRate = waterrower.readHeartRate();

    // output it to stdout
    console.log();                                   // newline between output intervals for visibility
    console.log("Stroke Count....." + strokeCount);  // [ - ]
    console.log("Total Speed ....." + totalSpeed);   // [cm/s]
    console.log("Average Speed ..." + averageSpeed); // [cm/s]
    console.log("Distance... ....." + distance);     // [ m ]
    console.log("Heart Rate ......" + heartRate);    // [ bpm ]

    // Create a data object with the properties you want to send to Keen
    var event = {
        item: "event",
        strokeCount: strokeCount,
        totalSpeed: totalSpeed,
        averageSpeed: averageSpeed,
        distance: distance,
        heartRate: heartRate,
        keen: {
            timestamp: new Date().toISOString()
        }
    };

    // only record the data if it looks like we are actually rowing
    if (strokeCount > previousStrokeCount) {
        previousStrokeCount = strokeCount;
        client.addEvent(session, event, function (err, res) {
            if (err) {
                console.log("error Keen:", err);
            }
            else {
                // uncomment if you want a warm fuzzy that it is working
                // console.log("event:sent");
            }
        });
    } else {
        console.log("no new strokes detected, not sending data");
    }

}

// note the keen collection session name for this run
console.log("session:", session);

setInterval(readWaterrower, collectionInterval);

