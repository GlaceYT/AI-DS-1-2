const introduction = document.getElementById('introduction');
const chatContainer = document.getElementById('chat-container');
const usernameInput = document.getElementById('usernameInput');
const startButton = document.getElementById('startButton');
const chatDiv = document.getElementById('chat');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

let username = '';
const socket = new WebSocket('wss://sconnect.onrender.com');

socket.onmessage = (event) => {
  const messageData = JSON.parse(event.data);
  if (messageData.type === 'message') {
    appendMessage(messageData);
  }
};

startButton.addEventListener('click', startChat);

usernameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    startChat();
  }
});

sendButton.addEventListener('click', sendMessage);

messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

function startChat() {
  const enteredUsername = usernameInput.value.trim();

  const usernameRegex = /^[a-zA-Z0-9_-]+$/;

  if (enteredUsername === '') {
    alert('Please enter a valid username.');
  } else if (enteredUsername.length < 4 || enteredUsername.length > 14) {
    alert('Username must be between 4 and 10 characters.');
  } else if (!usernameRegex.test(enteredUsername)) {
    alert('Username can only contain letters, numbers, underscores, and hyphens.');
  } else {
    username = enteredUsername;

    introduction.style.display = 'none';
    chatContainer.style.display = 'flex';

    socket.send(JSON.stringify({ type: 'getChatHistory' }));
  }
}



function sendMessage() {
  const message = messageInput.value.trim();
  if (message === '') {
    displayWarning('Please enter a message to send. The page will automatically reload.');
    setTimeout(() => {
      window.location.reload();
    }, 3000); 
  } else {
    socket.send(JSON.stringify({ type: 'message', username, message }));
    appendMessage({ username, message, timestamp: Date.now() });
    messageInput.value = '';
  }
}

function appendMessage(messageData) {
  const messageContainer = document.createElement('div');
  messageContainer.className = 'message-container';


  if (messageData.username === 'vsvcvm1') {
    messageContainer.classList.add('vsvcvm1');
    messageData.username = 'Shiva'; 
  } else if (messageData.username === 'vsvcvm2') {
    messageContainer.classList.add('vsvcvm2');
    messageData.username = 'Vivek'; 
  } else if (messageData.username === 'vsvcvm3') {
    messageContainer.classList.add('vsvcvm3');
    messageData.username = 'Mahesh'; 
  }


  const messageContent = document.createElement('div');
  messageContent.className = 'message-content';


  const boldUsername = document.createElement('strong');
  boldUsername.textContent = `${messageData.username} : `;

  boldUsername.style.fontWeight = '700';
  messageContent.appendChild(boldUsername);

  messageContent.append(messageData.message);

  messageContainer.appendChild(messageContent);


  const timestamp = new Date(messageData.timestamp).toLocaleTimeString();
  const messageTimestamp = document.createElement('div');
  messageTimestamp.className = 'message-timestamp';
  messageTimestamp.textContent = timestamp;
  messageContainer.appendChild(messageTimestamp);

  chatDiv.appendChild(messageContainer);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}


function displayWarning(message) {
  const warningElement = document.getElementById('warning-message');
  warningElement.textContent = message;
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.style.opacity = 0; 
  setTimeout(() => {
    loadingScreen.style.display = 'none'; 
  }, 400); 
}

setTimeout(hideLoadingScreen, 1000);

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('goToChatButton').addEventListener('click', function () {
    document.getElementById('container-about').style.display = 'none';
    document.getElementById('container-chat').style.display = 'flex';
    document.querySelector('.prelogin-body').classList.add('buttons-hidden');
  });
});
