# waterrower-s4-keen
Read rowing data from a WaterRower Series 4 (IV) - S4 - Performance Monitor and save to a Keen.IO collection.
The Keen collection session name will be the timestamp of when the script was started.
If the stroke value == 0 then no data will be sent to Keen.

While the script is running it will output to stdout the latest data read from the S4.
When it first starts it should look something like this before you start rowing:

    Stroke Count.....0
    Total Speed .....0
    Average Speed ...0
    Distance... .....0
    Heart Rate ......0
    no strokes detected, not sending data

Once you start rowing the data should start updating:
    
    Stroke Count.....100
    Total Speed .....35
    Average Speed ...0
    Distance... .....69
    Heart Rate ......0

The event data sent to the Keen collection will look something like this:

    {
    "distance": 74,
    "heartRate": 0,
    "item": "event",
    "strokeCount": 122,
    "keen": {
        "timestamp": "2015-10-18T17:50:50.171Z",
        "created_at": "2015-10-18T17:50:50.307Z",
        "id": "5623dbfa6f31a22fff42b561"
    },
    "totalSpeed": 0,
    "averageSpeed": 0
    }   

### To use this:
* plugin USB cable to your S4
* create a Keen.IO collection and get the the project ID and write keys
* git clone https://github.com/dougtoppin/waterrower-s4-keen.git
* cd node-waterrower
* git clone https://github.com/jamesnesfield/node-waterrower.git
* npm install serialport
* npm install keen-js
* node Waterrower/index.js

### Environment
This was written and tested using in the following environment
* OSX 10.11.1 Beta (El Capitan)
* NodeJS v4.2.1
* Python 2.7.10

### Information Sources
* S4 information can be found at http://www.waterrower.com/products_s4.php
* Keen.IO information can be found at https://keen.io/

### Planned Improvements
* move package installation into package.json
* better UI for showing latest event data
* environment variables for keen info, collection interval

### Notes
This code was started with the example from https://github.com/jamesnesfield/node-waterrower
