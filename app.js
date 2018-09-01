// Requiring packages
const express = require('express');
const socket = require('socket.io');
const Message = require('./db/models.js');

// Declaring an express app
const app = express();

// Settings
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

// Preparing the server
const server = app.listen(8080, function () {
    console.log('Listening to port 8080');

    // Routing
    app.get('/:username', function (req, res) {

        console.log('Request made');

        // Handling the username
        let user = req.params.username;

        // Recieving all the messages in the database

        let messages = []; // The array that will contain all the messages

        // Returns all the collections in the table Message
        Message.find({}, function (err, result) {

            // Handling errors
            if (err) {
                console.log(err);
            } else {

                messages = result;

                // Rendering the html page and sending messages as responses
                res.render('home', {
                    username: user,
                    messages: messages
                });

            }

        });
    });

});

// Preparing the socket
const io = socket(server);

// Opening the connection
io.on('connection', function (socket) {

    console.log('The socket is open');

    // Recieving any data labled with message
    socket.on('message', function (data) {

        // Making a new instance of the message model
        let msg = new Message({
            username: data.username,
            content: data.content
        });

        // Saving the message as a record in the database
        msg.save(function () {
            console.log('Message saved');
        });

        // Sending data labled message to all sockets
        io.sockets.emit('message', {
            username: data.username,
            content: data.content
        });
    });
});