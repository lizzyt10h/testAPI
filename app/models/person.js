var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PersonSchema   = new Schema({
  personId: Number,
  firstName: String,
  lastName: String,
  email: String,
});

module.exports = mongoose.model('Person', PersonSchema);