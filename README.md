# waterrower-s4-keen
Read rowing data from a WaterRower Series 4 (IV) - S4 - Performance Monitor and save to a Keen.IO collection.
The Keen collection session name will be the timestamp of when the script was started.
If the stroke value == 0 then no data will be sent to Keen.

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
