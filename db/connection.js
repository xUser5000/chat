// Requiring mongoose
const mongoose = require('mongoose');

// Database name
const db = 'chat';

// Establishing the connection
mongoose.connect('mongodb://localhost/' + db);

// Assert the connectio success
mongoose.connection.once('open', function () {
    console.log('Connection was made');
}).on('error', function (error) {
    console.log(error);
});