var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES FOR testAPI
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
