var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Person     = require('./app/models/person');

mongoose.connect('mongodb://root:123@ds147659.mlab.com:47659/test_api_db');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8090;

// ROUTES FOR testAPI
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /person
router.route('/person')

// create a person (accessed at POST http://localhost:8090/person)
  .post(function(req, res) {

    var person = new Person();      // create a new instance of the Bear model
    person.personId = req.body.personId;
    person.firstName = req.body.firstName;
    person.lastName = req.body.lastName;
    person.email = req.body.email;

    // save the person and check for errors
    person.save(function(err) {
      if (err)
        res.status(400).send('Persons couldn’t have been created.')

      res.status(204).send('Persons succesfully created.')
    });

  })

  // get all the persons (accessed at GET http://localhost:8090/person)
  .get(function(req, res) {
    Person.find(function(err, persons) {
      if (err)
        res.send(err);

      res.status(200).json(persons);
    }).limit(req.params.limit>=11 && req.params.limit<=1000 ? req.params.limit : 11);
  })

  .put(function(req, res) {

    // use our bear model to find the bear we want
    Person.findOne({ 'personId': req.body.personId }, function (err, person) {

      if (err)
        res.send(err);

      person.firtName = req.body.firtName;  // update the person info
      person.lastName = req.body.lastName;
      person.email = req.body.email;

      // save the person
      person.save(function(err) {
        if (err)
          res.send(err);

        var arr = [];
        arr.push(person);
        res.status(200).json(arr);
      });

    });
  });

// on routes that end in /person/:personId
// ----------------------------------------------------
router.route('/person/:personId')

// get the person with that id (accessed at GET http://localhost:8090/person/:personId)
  .get(function(req, res) {
    Person.findOne({ 'personId': req.params.personId }, function (err, person) {
      if (err)
        res.send(err);
      res.status(200).json(person);
    });
  });



// Register routes
app.use(router);

// START THE SERVER
// =============================================================================
app.listen(port);
