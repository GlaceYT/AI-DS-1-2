// Sample data representing question-answer pairs
const data = {
    "I know only coding but don't know where to start": "You can start by learning the basics of programming languages like Python or JavaScript. There are many online resources and tutorials available to help you get started.",
    "I know Java": "Great! If you already know Java, you can consider learning more advanced topics such as data structures, algorithms, or frameworks like Spring.",
    "I know C": "That's a good foundation! You can continue to expand your knowledge by learning C++ or exploring application areas like systems programming or embedded systems."
};

// Function to calculate similarity between two strings
function calculateStringSimilarity(str1, str2) {
    // Convert strings to lowercase for case-insensitive comparison
    const lowerStr1 = str1.toLowerCase();
    const lowerStr2 = str2.toLowerCase();

    // Calculate Levenshtein distance between the two strings
    const distance = Array.from(Array(lowerStr1.length + 1), (_, i) => [i])
    .concat(Array.from(Array(lowerStr2.length + 1), (_, i) => [i]))
    .map((row, i) => {
        if (i === 0) return row;
        return row.map((_, j) => {
            if (j === 0) return [i];
            return [0];
        });
    });

    for (let i = 1; i <= lowerStr1.length; i++) {
        for (let j = 1; j <= lowerStr2.length; j++) {
            const cost = lowerStr1[i - 1] === lowerStr2[j - 1] ? 0 : 1;
            distance[i][j] = Math.min(
                distance[i - 1][j] + 1,
                distance[i][j - 1] + 1,
                distance[i - 1][j - 1] + cost
            );
        }
    }

    // Calculate similarity score
    const maxLen = Math.max(lowerStr1.length, lowerStr2.length);
    const similarity = 1 - distance[lowerStr1.length][lowerStr2.length] / maxLen;

    return similarity;
}

// Function to get a response using similarity matching
function getSimilarResponse(userInput) {
    let maxSimilarity = -1;
    let bestMatch = null;

    // Iterate through questions in the dataset
    for (const question in data) {
        const similarity = calculateStringSimilarity(userInput, question);
        // Update best match if similarity is higher than current maximum
        if (similarity > maxSimilarity) {
            maxSimilarity = similarity;
            bestMatch = question;
        }
    }

    // If similarity is above a certain threshold, return the corresponding response
    if (maxSimilarity >= 0.7 && bestMatch !== null) {
        return data[bestMatch];
    }

    return null; // Return null if no matching response is found or similarity is too low
}

// Function to display user message in chat interface
function displayUserMessage(message) {
    const responseContainer = document.getElementById('responseContainer');
    const userMessageElement = document.createElement('p');
    userMessageElement.classList.add('user-message');
    userMessageElement.innerText = message;
    responseContainer.appendChild(userMessageElement);
    responseContainer.scrollTop = responseContainer.scrollHeight; // Scroll to bottom
}

// Function to display bot response in chat interface
function displayBotResponse(response) {
    const responseContainer = document.getElementById('responseContainer');
    const botMessageElement = document.createElement('p');
    botMessageElement.classList.add('bot-message');
    botMessageElement.style.opacity = 0; // Initially set opacity to 0 for fade-in effect

    // Set the response text
    botMessageElement.innerText = response;

    // Append the bot message to the response container
    responseContainer.appendChild(botMessageElement);

    // Trigger fade-in animation using requestAnimationFrame
    let opacity = 0;
    const fadeInInterval = setInterval(function() {
        opacity += 0.1; // Increase opacity by 0.1 in each frame
        botMessageElement.style.opacity = opacity; // Update the opacity style
        if (opacity >= 1) {
            clearInterval(fadeInInterval); // Stop the animation when opacity reaches 1
        }
    }, 50); // Adjust animation speed as needed (milliseconds per frame)
}

// Function to handle search button click
function handleSearchButtonClick() {
    const userInput = document.getElementById('searchInput').value.trim();
    
    if (userInput === '') {
        displayBotResponse('Please enter a question.');
        return;
    }

    // Check for a response using similarity matching
    let response = getSimilarResponse(userInput);

    if (response) {
        displayUserMessage(userInput);
        displayBotResponse(response);
    } else {
        displayBotResponse('No matching response found. Please try a different question.');
    }
}

document.getElementById('searchButton').addEventListener('click', handleSearchButtonClick);
