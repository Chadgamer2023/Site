// Firebase configuration and initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getDatabase, ref, onValue, set, increment } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

// Firebase configuration (add your config here)
const firebaseConfig = {
    apiKey: "AIzaSyDViywB4Oyq6GF1alYLqzeDjeSz-P8iDYo",
    authDomain: "messagestorage7346562.firebaseapp.com",
    databaseURL: "https://messagestorage7346562-default-rtdb.firebaseio.com",
    projectId: "messagestorage7346562",
    storageBucket: "messagestorage7346562.appspot.com",
    messagingSenderId: "858210728204",
    appId: "1:858210728204:web:6bc76cd4b4c0c4153ef129"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Visitor count logic
const visitorCountRef = ref(database, 'visitorCount');

// Function to increment visitor count
export function incrementVisitorCount() {
    set(visitorCountRef, increment(1)); // Increment by 1 in Firebase
}

// Function to get the current visitor count and update the page
export function fetchVisitorCount(callback) {
    onValue(visitorCountRef, (snapshot) => {
        const count = snapshot.val();
        callback(count || 0); // Pass the count to the callback
    });
}
