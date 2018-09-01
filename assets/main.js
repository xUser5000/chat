/* global document, console */

// Preparing the socket
const socket = io.connect('http://localhost:8080');

// Elements
var textbox = document.getElementById('text'), // The message input
    view = document.querySelector('.top'), // The messages viewer
    username = window.location.pathname; // The username

// Extracting the username from the path
username = username.slice(1, username.length);

// Toggling the placeholder when focusing on the textbox :

// Focus
textbox.addEventListener('focus', function () {
    this.placeholder = '';
});

// Blur
textbox.addEventListener('blur', function () {
    this.placeholder = 'Type your message';
});


// Sending the mmessage
textbox.addEventListener('keyup', function (event) {

    // Sending data to the socket labled message when pressing enter
    if (event.keyCode === 13) {

        // Send
        socket.emit('message', {
            username: username,
            content: textbox.value
        });

        // CLearing out the textbox
        this.value = '';
    }

});


// Recieving the messages as socket data
socket.on('message', function (data) {
    addMessage(data.username, data.content);
});


// Functions :

// A function for adding new messages in the viewer
function addMessage(user, content) {
    'use strict';

    // Message element
    let message = '',
        type = '';

    // Indicating if the message was typed by host or guest
    if (user === username) {
        type = 'host';
    } else {
        type = 'guest';
    }

    message = 
        '<div class="message ' + type +'">' +
            '<span class="name">' + user + '</span> ' +
            '<span class="content">' + content + '</span>' +
        '</div>';
    
    // Appending the message to the html
    view.innerHTML += message + '<div class="clear"></div>';

}