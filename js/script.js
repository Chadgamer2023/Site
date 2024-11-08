// Dark Mode Toggle Logic
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    darkModeToggle.textContent = body.classList.contains('dark-mode') ? 'Enable Light Mode' : 'Enable Dark Mode';
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
});

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = 'Enable Light Mode';
}

// Handle message form submission
const messageForm = document.getElementById('messageForm');
const leftColumn = document.getElementById('messageDisplayLeft');  // Left column for anonymous
const rightColumn = document.getElementById('messageDisplayRight');  // Right column for named users

if (messageForm) {
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim() || 'Anonymous';
        const message = document.getElementById('message').value.trim();

        // List of banned words
        const bannedWords = ['nigger', 'Nigger', 'Faggot'];

        // Count the number of banned words in the message
        const bannedWordCount = bannedWords.reduce((count, word) => {
            return count + (message.match(new RegExp(word, 'gi')) || []).length;
        }, 0);

        // Prevent posting if the message is empty
        if (message === '') {
            alert('Message cannot be empty!');
            return;
        }

        // Handle banned word logic
        if (bannedWordCount > 2) {
            alert('Your message contains too many banned words!');
        } else if (bannedWordCount === 2) {
            const starredMessage = message.replace(new RegExp(bannedWords.join("|"), 'gi'), '*****');
            alert('Message will be posted with censorship: ' + starredMessage);
            postMessage(username, starredMessage);  // Save censored message to Firebase
        } else {
            alert('Message posted successfully!');
            postMessage(username, message);  // Save original message to Firebase
        }

        // Clear the message textarea after submission
        document.getElementById('message').value = '';
    });
}

// Function to display the message in the appropriate column
function displayMessage(username, message) {
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + " " + now.toLocaleDateString();
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerText = @${timestamp} ${username} said: "${message}";

    // If the user is "Anonymous", display the message in the left column
    if (username === 'Anonymous') {
        leftColumn.appendChild(messageElement);
        leftColumn.scrollTop = leftColumn.scrollHeight;  // Auto-scroll to the bottom of the left column
    } 
    // If the user provided a name, display the message in the right column
    else {
        rightColumn.appendChild(messageElement);
        rightColumn.scrollTop = rightColumn.scrollHeight;  // Auto-scroll to the bottom of the right column
    }
}

// Handle TOS popup (if this functionality is needed)
const vrcButton = document.getElementById('vrcButton');
const tosPopup = document.getElementById('tosPopup');
const tosYes = document.getElementById('tosYes');
const tosNo = document.getElementById('tosNo');

vrcButton?.addEventListener('click', function() {
    tosPopup.style.display = 'block';
});

tosYes?.addEventListener('click', function() {
    window.location.href = 'vrchat-page.html'; // Redirect to message board page
});

tosNo?.addEventListener('click', function() {
    tosPopup.style.display = 'none'; // Close the popup
});

// Listen for message updates from Firebase (this uses the Firebase functionality in firebase.js)
firebase.database().ref('messages').on('value', (snapshot) => {
    const messages = snapshot.val();
    console.log(messages);  // Log to confirm messages are being retrieved
    displayMessages(messages);  // Call function to display messages
});


function displayMessages(messages) {
    // Get references to the message display areas
    const leftColumn = document.getElementById('messageDisplayLeft');
    const rightColumn = document.getElementById('messageDisplayRight');

    // Clear current messages to prevent duplication
    leftColumn.innerHTML = '';
    rightColumn.innerHTML = '';

    // Check if messages is not null
    if (messages) {
        // Loop through each message in the messages object from Firebase
        for (const messageId in messages) {
            if (messages.hasOwnProperty(messageId)) {
                const messageData = messages[messageId];
                const username = messageData.username || 'Anonymous';
                const message = messageData.message;
                const timestamp = messageData.timestamp; // Get the stored timestamp

                // Check if timestamp exists
                if (timestamp) {
                    // Convert timestamp to a Date object
                    const date = new Date(timestamp);
                    // Format the date to a human-readable format
                    const formattedTime = ${date.toLocaleDateString()} ${date.toLocaleTimeString()};

                    // Create the message HTML with the timestamp
                    const messageHtml = 
                        <div class="message">
                            <strong>${username}</strong>: ${message} <br>
                            <small>${formattedTime}</small>
                        </div>
                    ;

                    // Append to the appropriate column (anonymous to left, named users to right)
                    if (username === 'Anonymous') {
                        leftColumn.innerHTML += messageHtml;
                    } else {
                        rightColumn.innerHTML += messageHtml;
                    }
                }
            }
        }
    } else {
        console.log("No messages found");
    }
}

// Prevent F12 and Ctrl+Shift+I
document.addEventListener('keydown', function(event) {
    if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
        event.preventDefault();
        alert('DevTools is disabled on this site.');
    }
});

// Disable right-click
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    alert('Right-click is disabled on this site.');
});

// Detect if DevTools is open
const devtools = { open: false };

const element = new Image();
Object.defineProperty(element, 'id', {
    get: function() {
        devtools.open = true;
        alert('DevTools is not allowed on this site.');
        return '';
    }
});

console.log(element);

// Disable console logs in production
if (process.env.NODE_ENV === 'production') {
    console.log = function() {};
}
