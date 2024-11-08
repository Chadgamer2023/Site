// Wait for the document to load before executing the script
document.addEventListener('DOMContentLoaded', function() {
    const randomFactButton = document.getElementById('getRandomFactButton');
    const randomFactDropdown = document.getElementById('randomFactDropdown');

    // When the button is clicked
    randomFactButton.addEventListener('click', async function() {
        try {
            // Send a GET request to the API to get a random fact
            const response = await fetch('https://boysrfapi.onrender.com/api/facts/random');
            
            // If the response is successful
            if (response.ok) {
                const data = await response.json(); // Parse the response as JSON
                
                // Enable the dropdown to display the fetched fact
                randomFactDropdown.disabled = false;
                
                // Add the random fact as an option in the dropdown
                const option = document.createElement('option');
                option.value = data.fact;  // Set the option value to the fact text
                option.textContent = data.fact;  // Set the option text to the fact text
                
                // Append the new option to the dropdown
                randomFactDropdown.appendChild(option);
            } else {
                alert('Error: Could not fetch a random fact.');
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });
});
