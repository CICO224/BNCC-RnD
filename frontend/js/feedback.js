// js/feedback.js

// 1. Select the form element from your HTML
const form = document.getElementById('feedback-form');
const messageElement = document.getElementById('message');

// 2. Define your Backend URL (Make sure this matches your server.js PORT)
const API_URL = 'http://localhost:3001/api/feedback'; 

// 3. Add an Event Listener for the "Submit" button
form.addEventListener('submit', async (e) => {
    
    // CRITICAL: Stop the browser from reloading the page
    e.preventDefault(); 
    
    messageElement.textContent = 'Sending data...';
    messageElement.style.color = 'blue';

    // 4. Gather data from the HTML inputs
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // 5. Convert "rating" from a string ("5") to a number (5)
    // The backend expects a number for the rating
    data.rating = parseInt(data.rating);

    try {
        // 6. Send the data using fetch()
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Tell backend we are sending JSON
            },
            body: JSON.stringify(data), // Convert JS object to JSON string
        });

        const result = await response.json();

        // 7. Handle the response
        if (response.ok) {
            messageElement.textContent = `Success! Feedback ID: ${result.id}`;
            messageElement.style.color = 'green';
            form.reset(); // Clear the form inputs
        } else {
            messageElement.textContent = `Error: ${result.message}`;
            messageElement.style.color = 'red';
        }
    } catch (error) {
        console.error('Fetch error:', error);
        messageElement.textContent = 'Failed to connect to the server. Is the Backend running?';
        messageElement.style.color = 'red';
    }
});