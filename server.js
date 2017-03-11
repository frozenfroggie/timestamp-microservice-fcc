var express = require('express');
var moment = require("moment");
var app = express();

app.get('/', function(req, res) {
  res.send('<h2><b>Pass a unix timestamp or a natural date (for example: January 1, 2016) as a parameter in url.</b></h2>');
});

app.get('/:date', function(req, res) {

  var outputObj = {
    "unix_timestamp": null,
    "natural_date": null
  };
  var userInput = req.params.date;

  if (!isNaN(parseInt(userInput))) { // if unix units
    var dateFormat = new Date(userInput * 1000);
    if (moment(dateFormat).isValid()) { // and succesfully formated to normal date
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      var year = dateFormat.getFullYear();
      var month = months[dateFormat.getMonth()];
      var date = dateFormat.getDate();
      outputObj["natural_date"] = month + " " + date + ", " + year;
      outputObj["unix_timestamp"] = parseInt(userInput);
    }
  }
  else if (!isNaN(Date.parse(userInput))) { // if normal date
    outputObj["natural_date"] = userInput;
    outputObj["unix_timestamp"] = Date.parse(userInput) / 1000; // there's nothing to check- date always will be formated to number without any problems
  }
  else {
    outputObj["natural_date"] = null;
    outputObj["unix_timestamp"] = null;
  }

  res.send(outputObj);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('Example app listening on port: ' + port);
});
