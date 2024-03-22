
let currentPage = 1; 

document.addEventListener('DOMContentLoaded', function() {
    getTechNews();
    document.getElementById('refreshButton').addEventListener('click', refreshNews);
});

async function getTechNews() {
    const apiKey = '70d0f2132af84e27818b5349d00c8b61';
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=technology&page=${currentPage}&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

function refreshNews() {
    currentPage++; 
    getTechNews(); 
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; 

    articles.forEach(article => {
        const articleElement = document.createElement('article');
        const imageUrl = article.urlToImage ? article.urlToImage : './img/technews.jpg'; 
        const description = article.description ? article.description : 'click below to get more information'; 

        articleElement.innerHTML = `
            <img src="${imageUrl}" alt="Article Image" class="article-image">
            <div class="article-content">
                <h2 class="article-title">${article.title}</h2>
                <p class="article-description">${description}</p>
                <a href="${article.url}" target="_blank" class="article-readmore">Read more</a>
            </div>
        `;

        newsContainer.appendChild(articleElement);
    });
}
