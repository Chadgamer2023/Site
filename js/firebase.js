// Firebase configuration and initialization
const firebaseConfig = {
  
  };

// Initialize Firebase (using legacy Firebase global object)
firebase.initializeApp(firebaseConfig);
const database = firebase.database(); // Initialize Firebase database

// Function to post message to Firebase
function postMessage(username, message) {
    const messagesRef = firebase.database().ref('messages');
    const newMessageRef = messagesRef.push();
    newMessageRef.set({
        username: username || 'Anonymous',  // Default to 'Anonymous' if no username is provided
        message: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP // Add server timestamp
    });
}


// Listen for updates from Firebase
firebase.database().ref('messages').on('value', (snapshot) => {
    const messages = snapshot.val();
    displayMessages(messages);  // Call the function to display the messages in script.js
});

// Fetch visitor count from Firebase
function fetchVisitorCount(callback) {
    const visitorCountRef = database.ref('visitorCount');

    visitorCountRef.once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                const currentCount = snapshot.val();
                callback(currentCount); // Pass the current count to the callback
            } else {
                console.log("No visitor count data available.");
                callback(0); // If no data, return 0
            }
        })
        .catch((error) => {
            console.error("Error fetching visitor count:", error);
        });
}

// Increment visitor count in Firebase
function incrementVisitorCount() {
    const visitorCountRef = database.ref('visitorCount');

    visitorCountRef.once('value')
        .then((snapshot) => {
            let currentCount = snapshot.val() || 0; // Default to 0 if no count exists
            currentCount += 1; // Increment count

            // Update the count in Firebase
            visitorCountRef.set(currentCount)
                .then(() => {
                    console.log("Visitor count incremented successfully.");
                })
                .catch((error) => {
                    console.error("Error incrementing visitor count:", error);
                });
        })
        .catch((error) => {
            console.error("Error fetching visitor count for increment:", error);
        });
}