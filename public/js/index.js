// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Initialize a new socket connection
    const socket = io();

    // Function to send messages
    /**
     * Sends a message to the server.
     */
    function sendMessage() {
        // Get the message input element
        const messageInput = document.getElementById('messageInput');
        // Get the value of the message input
        const message = messageInput.value;
        // Clear the message input
        messageInput.value = '';
        // Emit a sendMessage event with the message and room name
        socket.emit('sendMessage', { content: message, roomName: 'general' }); // You need to handle room selection
    }

    // Attach the sendMessage function to the button click event
    document.querySelector('button').addEventListener('click', sendMessage);

    // Allow sending messages with the Enter key
    document.getElementById('messageInput').addEventListener('keypress', function (e) {
        // If the key pressed is Enter, send the message
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Listen for incoming messages
    socket.on('message', (message) => {
        // Get the messages div
        const messagesDiv = document.getElementById('messages');
        // Append the new message to the messages div
        messagesDiv.innerHTML += `<p>${message.content}</p>`; // Display new message
    });
});