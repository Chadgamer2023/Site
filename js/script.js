// Handle Fact Submission
const factForm = document.getElementById('factForm');
const resultMessage = document.getElementById('resultMessage');
const quoteMessage = document.getElementById('quoteMessage');

// Check if the fact form exists on the page
if (factForm) {
    factForm.addEventListener('submit', async function(event) {
        event.preventDefault();  // Prevent form submission

        // Get form values
        const fact = document.getElementById('fact').value;
        const category = document.getElementById('category').value;

        // Clear previous messages
        quoteMessage.textContent = '';
        resultMessage.textContent = '';

        // Validate form inputs
        if (!fact || !category) {
            resultMessage.textContent = 'Error: Both fact and category are required!';
            return;
        }

        // Prepare data to send to API
        const factData = { fact, category };

        try {
            const response = await fetch('https://boysrfapi.onrender.com/api/facts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(factData),
            });

            if (response.ok) {
                const data = await response.json();
                resultMessage.textContent = `Fact Submitted: ${data.fact}`;
            } else {
                resultMessage.textContent = 'Error: Failed to submit the fact.';
            }
        } catch (error) {
            resultMessage.textContent = `Error: ${error.message}`;
        }
    });
}

// Get Random Fact
const randomFactButton = document.getElementById('randomFactButton');
const randomFactDisplay = document.getElementById('randomFactDisplay');

// Check if the random fact button exists on the page
if (randomFactButton) {
    randomFactButton.addEventListener('click', async function() {
        try {
            const response = await fetch('https://boysrfapi.onrender.com/api/facts/random');
            if (response.ok) {
                const data = await response.json();
                randomFactDisplay.textContent = `Random Fact: ${data.fact}`;
            } else {
                randomFactDisplay.textContent = 'Error: Could not fetch a random fact.';
            }
        } catch (error) {
            randomFactDisplay.textContent = `Error: ${error.message}`;
        }
    });
}
