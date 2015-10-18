// Read rowing data from a WaterRower Series 4 (IV) - S4 - Performance Monitor
// and save to a Keen.IO collection.

// To use this:
// - plug in a USB cable to your S4
// - create a Keen.IO collection and get the the project ID and write keys
// - replace KEENPROJECTID and KEENWRITEKEY (below) with your values
// - npm install

// S4 information can be found at http://www.waterrower.com/products_s4.php
// Keen.IO information can be found at https://keen.io/

// This code was started with the example from https://github.com/jamesnesfield/node-waterrower

var waterrower = require("./Waterrower");

// milliseconds between data collection intervals
var collectionInterval = 5000;

// Configure a Keen instance for your project
var Keen = require('keen-js');


var client = new Keen({
    projectId: "KEENPROJECTID",
    writeKey: "KEENWRITEKEY"
});

var readWaterrower = function () {

    // read data from the S4 for each field
    var strokeCount = waterrower.readStrokeCount();
    var totalSpeed = waterrower.readTotalSpeed();
    var averageSpeed = waterrower.readAverageSpeed();
    var distance = waterrower.readDistance();
    var heartRate = waterrower.readHeartRate();

    // output it to stdout
    console.log();                                   // newline between output intervals for visibility
    console.log("Stroke Rate ....." + strokeCount);  // [ - ]
    console.log("Total Speed ....." + totalSpeed);   // [cm/s]
    console.log("Average Speed ..." + averageSpeed); // [cm/s]
    console.log("Distance... ....." + distance);     // [ m ]
    console.log("Heart Rate ......" + heartRate);    // [ bpm ]

    // Create a data object with the properties you want to send to Keen
    var event = {
        item: "event",
        strokeRate: strokeCount,
        totalSpeed: totalSpeed,
        averageSpeed: averageSpeed,
        distance: distance,
        heartRate: heartRate,
        keen: {
            timestamp: new Date().toISOString()
        }
    };

    if (waterrower.readStrokeCount() > 0) {
        client.addEvent("session", event, function (err, res) {
            if (err) {
                console.log("error Keen:", err);
            }
            else {
                // uncomment if you want a warm fuzzy that it is working
                // console.log("event:sent");
            }
        });
    } else {
        console.log("no strokes detected, not sending data");
    }

}


setInterval(readWaterrower, collectionInterval);

