const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb://localhost/bookshelf');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
autoIncrement.initialize(db);

const usersSchema = mongoose.Schema({
  username: String,
  password_hash: String,
  full_name: String,
  role: String,
  occupation: String,
  age: Number,

});

usersSchema.methods.comparePassword = (raw, encrypted) => bcrypt.compareSync(raw, encrypted);

usersSchema.plugin(autoIncrement.plugin, 'Users');
const Users = mongoose.model('users', usersSchema);

module.exports = Users;
