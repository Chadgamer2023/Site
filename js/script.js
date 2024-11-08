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

// Handle Fact Submission
document.getElementById('factForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();  // Prevent form submission

    // Get form values
    const fact = document.getElementById('fact').value;
    const category = document.getElementById('category').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
    const author = document.getElementById('author').value;

    // Prepare the data to be sent to the backend
    const factData = { fact, category, tags, author };

    try {
        // Send the data to the backend using a POST request
        const response = await fetch('https://boysrfapi.onrender.com/api/facts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(factData)
        });

        const result = await response.json();

        // Display the result message
        if (response.ok) {
            document.getElementById('resultMessage').textContent = `Fact Submitted: ${result.fact.fact}`;
        } else {
            document.getElementById('resultMessage').textContent = `Error: ${result.error}`;
        }
    } catch (error) {
        document.getElementById('resultMessage').textContent = `Error: ${error.message}`;
    }
});

// Handle Fetch Random Fact
document.getElementById('getRandomFact')?.addEventListener('click', async function() {
    try {
        // Send GET request to fetch a random fact
        const response = await fetch('https://boysrfapi.onrender.com/api/facts/random');

        // Parse the response to JSON
        const randomFact = await response.json();

        // Display the random fact
        if (response.ok) {
            document.getElementById('randomFact').textContent = `Random Fact: ${randomFact.fact}`;
        } else {
            document.getElementById('randomFact').textContent = `Error: ${randomFact.error}`;
        }
    } catch (error) {
        document.getElementById('randomFact').textContent = `Error: ${error.message}`;
    }
});

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
