// Wait for the document to load before executing the script
document.addEventListener('DOMContentLoaded', function() {
    const randomFactButton = document.getElementById('getRandomFactButton');
    const randomFactModal = document.getElementById('randomFactModal');
    const randomFactMessage = document.getElementById('randomFactMessage');
    const closeModalButton = document.getElementById('closeModalButton');

    // When the button is clicked
    randomFactButton.addEventListener('click', async function() {
        try {
            // Send a GET request to the API to get a random fact
            const response = await fetch('https://boysrfapi.onrender.com/api/facts/random');
            
            // If the response is successful
            if (response.ok) {
                const data = await response.json(); // Parse the response as JSON
                
                // Update the message inside the modal
                randomFactMessage.textContent = data.fact;

                // Show the modal
                randomFactModal.style.display = 'flex';
            } else {
                alert('Error: Could not fetch a random fact.');
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });

    // Close the modal when the user clicks the close button
    closeModalButton.addEventListener('click', function() {
        randomFactModal.style.display = 'none'; // Hide the modal
    });

    // Close the modal when the user clicks outside of the modal
    window.addEventListener('click', function(event) {
        if (event.target === randomFactModal) {
            randomFactModal.style.display = 'none'; // Hide the modal if clicked outside
        }
    });
});
