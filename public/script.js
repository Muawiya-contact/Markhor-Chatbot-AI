// Select DOM elements
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Add event listeners
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

// Function to send a message
function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    displayMessage(userMessage, "You", "user");
    userInput.value = "";

    // Send message to backend
    fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
    })
    .then((response) => response.json())
    .then((data) => {
        displayMessage(data.reply, "Markhor AI", "assistant");
    })
    .catch(() => {
        displayMessage("Error: Server is unreachable.", "Markhor AI", "assistant");
    });
}

// Function to display messages
function displayMessage(message, sender, role) {
    const messageContainer = document.createElement("div");
    messageContainer.className = `message ${role}`;
    messageContainer.innerHTML = `<span><strong>${sender}:</strong> ${message}</span>`;
    chatBox.appendChild(messageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;
}
