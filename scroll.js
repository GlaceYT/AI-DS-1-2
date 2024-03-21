// Get the breaking news element
const breakingNews = document.querySelector('.breakingnews');

// Get the article inside the breaking news element
const article = breakingNews.querySelector('article');

// Restart the animation when it finishes
article.addEventListener('animationiteration', () => {
  article.style.animation = 'none'; // Disable the animation temporarily
  void article.offsetWidth; // Trigger reflow
  article.style.animation = 'marquee 23s linear infinite'; // Restart the animation
});

