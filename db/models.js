// Requiring mongoose
const mongoose = require('mongoose');

// Importing the connection file
require('./connection.js');

// Schema
const Schema = mongoose.Schema;

// The schema of the model
const messageSchema = new Schema({
    username: String,
    content: String
});

// Defining the model
const MessageModel = mongoose.model('message', messageSchema);

// Exporting the model
module.exports = MessageModel;