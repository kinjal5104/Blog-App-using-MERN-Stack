 // Array of quotes, add as many as you like
 const quotes = [
    "अस्माकं तु वनं राजा दशरथो येन संवृतः। विश्रुतो धर्मपर्याये सत्यवादी धृतव्रतः।।6.18.28।। \n  King Dasaratha, who observed truth and righteousness, and who was reputed for maintaining dharma, was the one who had sealed this forest for us.",
    "सहायो न एव राज्याय विश्रुतः स एव हि मे। राक्षसेन्द्र वधे लङ्कामागमिष्यति मामकः।।3.22.52।। \n I, who am reputed, will not come to the kingdom along with the king. My son will indeed come to Lanka to kill the king of demons." ,
    "श्रीराम राम रामेति रमे रामे मनोरमे। सहस्रनाम तत्तुल्यं रामनाम वरानने॥" This shloka extols the power and sweetness of the name of Lord Rama. It emphasizes the significance of chanting the name of Rama, which is believed to purify the mind and soul.",
    "धर्मे चार्थे च कामे च मोक्षे च भरतर्षभ। यदि यत्प्रीयते देव तत्तदेव करोम्यहम्॥ "Spoken by Lord Rama, this shloka reflects his commitment to righteousness and duty. It signifies the importance of fulfilling one's responsibilities while adhering to dharma (righteousness) and striving for the greater good.",
];

// Function to get a random quote from the array
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Function to display a new quote
function displayNewQuote() {
    const quoteTextElement = document.getElementById("quote-text");
    const newQuote = getRandomQuote();
    quoteTextElement.innerHTML = newQuote;
}

displayNewQuote();

window.addEventListener('scroll', function() {
    var title = document.querySelector('.website_title');
    var scrollPosition = window.scrollY;

    // Adjust the position of the title based on the scroll position
    title.style.top = 50 - scrollPosition * 0.1 + '%';
});

var chatContainer = document.getElementById("chat-container");

function toggleChat() {
    chatContainer.style.display = chatContainer.style.display === "block" ? "none" : "block";
}

// Function to send user message when Enter key is pressed
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendUserMessage();
    }
}

// Attach handleKeyPress function to input field
document.getElementById("user-input").addEventListener("keypress", handleKeyPress);

// Function to send user message
function sendUserMessage() {
    var userInput = document.getElementById("user-input").value;
    if (userInput !== "") {
        appendUserMessage(userInput);
        getUserResponse(userInput);
        document.getElementById("user-input").value = "";
    }
}

// Function to append user message to chat box
function appendUserMessage(message) {
    var chatBox = document.getElementById("chat-box");
    var userDiv = document.createElement("div");
    userDiv.classList.add("user");
    var userMessage = document.createElement("p");
    userMessage.textContent = message;
    userDiv.appendChild(userMessage);
    chatBox.appendChild(userDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to append bot message to chat box
function appendBotMessage(message) {
    var chatBox = document.getElementById("chat-box");
    var botDiv = document.createElement("div");
    botDiv.classList.add("chat-bot");
    var botMessage = document.createElement("p");
    botMessage.textContent = message;
    botDiv.appendChild(botMessage);
    chatBox.appendChild(botDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to get bot response
function getUserResponse(userInput) {
    // Dummy fetch function, replace it with your actual fetch request
    fetch("/get?msg=" + userInput)
    .then(response => response.text())
    .then(data => {
        appendBotMessage(data);
    });
}
