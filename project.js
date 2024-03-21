// script.js
const username = 'RTXGAMIINGGG'; // Replace with your GitHub username
const token = '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'; 

const reposContainer = document.getElementById('repos-container');

async function getRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Authorization: `token ${token}`
            }
        });
        const repos = await response.json();
        displayRepos(repos);
    } catch (error) {
        console.error('Error fetching repositories:', error);
    }
}

function getLanguageImage(language) {
    switch(language.toLowerCase()) {
        case 'javascript':
            return 'https://cdn.jsdelivr.net/npm/programming-languages-logos/src/javascript/javascript.png';
        case 'python':
            return 'https://cdn.jsdelivr.net/npm/programming-languages-logos/src/python/python.png';
        // Add cases for other languages as needed
        default:
            return 'https://cdn.jsdelivr.net/npm/programming-languages-logos/src/default.png';
    }
}

function displayRepos(repos) {
    repos.forEach(repo => {
        const repoElement = document.createElement('div');
        repoElement.classList.add('repo');
        repoElement.innerHTML = `
            <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
            <p>${repo.description || 'No description'}</p>
            <img src="${getLanguageImage(repo.language)}" alt="Language Logo" width="50">
            <p>Stars: ${repo.stargazers_count}</p>
        `;
        reposContainer.appendChild(repoElement);
    });
}

getRepos();