async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatContainer = document.getElementById('chat-container');

    // Add the user's message to the chat container
    const userMessageElement = document.createElement('div');
    userMessageElement.textContent = `You: ${userInput}`;
    chatContainer.appendChild(userMessageElement);

    try {
        // Replace '/api/chat' with your actual endpoint URL
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: userInput }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Assuming the response contains a field 'text' with the reply
        const aiMessage = data.choices[0].text.trim();

        // Add the AI's response to the chat container
        const aiMessageElement = document.createElement('div');
        aiMessageElement.textContent = `AI: ${aiMessage}`;
        chatContainer.appendChild(aiMessageElement);
    } catch (error) {
        console.error("Failed to fetch the AI response: ", error);
    }
}
