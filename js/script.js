// Wait for the document to load before executing the script
document.addEventListener('DOMContentLoaded', function() {
    const randomFactButton = document.getElementById('getRandomFactButton');
    const randomFactDisplay = document.getElementById('randomFact');

    // When the button is clicked
    randomFactButton.addEventListener('click', async function() {
        try {
            // Send a GET request to the API to get a random fact
            const response = await fetch('https://boysrfapi.onrender.com/api/facts/random');
            
            // If the response is successful
            if (response.ok) {
                const data = await response.json(); // Parse the response as JSON
                randomFactDisplay.textContent = `Random Fact: ${data.fact}`; // Display the random fact
            } else {
                randomFactDisplay.textContent = 'Error: Could not fetch a random fact.'; // Display an error message
            }
        } catch (error) {
            randomFactDisplay.textContent = `Error: ${error.message}`; // Display any errors
        }
    });
});
