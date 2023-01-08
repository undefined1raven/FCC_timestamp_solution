// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function isUnix(input) {
  return parseInt(input) != NaN && parseInt(input) > 10000000;
}

app.get("/api/", (req, res) => {
  res.json({ unix: Date.now(), utc: new Date().toUTCString() })
})//handle empty cases

app.get("/api/*", function(req, res) {
  let raw_date = req.url.split('/')[2];//get date from request url
  let decoded_date = new Date(decodeURI(raw_date));//decode date if to test if its in the right format

  if (decoded_date != 'Invalid Date') {
    res.json({ unix: Number(Math.floor(decoded_date.getTime())), utc: decoded_date.toUTCString() })
  } else {
    if (isUnix(raw_date)) {
      let date = new Date(parseInt(raw_date));
      res.json({ unix: parseInt(raw_date), utc: date.toUTCString() })
    } else {
      let date = new Date(raw_date);
      if (date != 'Invalid Date') {
        res.json({ unix: Number(Math.floor(date.getTime())), utc: date.toUTCString() })
      } else {
        res.json({ error: 'Invalid Date' })
      }
    }
  }


});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
