import { createSpinner } from "./spinner.js";

function renderTopNews() {
  const articleSection = document.getElementById('topNewsList');

  createSpinner(articleSection);

  setTimeout(async () => {
    try {
      const response = await fetch('../data/top.json');
      const { articles } = await response.json();
      const articleList = articles.map((article) => createTopNewsElement(article));

      articleSection.append(...articleList);
    }
    catch (e) {
      console.log(e);
    }
    finally {
      hidenSpinner(articleSection);
    }
  }, 1500);
}

function createTopNewsElement(article) {
  const { title, summary, link, thumbnailImage } = article;

  const anchor = document.createElement('a');
  anchor.setAttribute('href', link);
  anchor.innerHTML = `
    <article class="news">
      <div class="information">
        <h3 class="title">${title}</h3>
        <p class="description">${summary}</p>
      </div>
      <div class="thumbnail-area">
        <img src="${thumbnailImage}" alt="thumbnail" class="thumbnail" />
      </div>
    </article>`;

  return anchor;
}

async function renderLatestNews() {
  const latestNewsList = document.querySelector('.latest-news-list');

  createSpinner(latestNewsList);
  
  try {
    const response = await fetch('../data/latest.json');
    const { articles } = await response.json();
    const articleList = articles.map((article) => createLatestNewsElement(article));
    
    latestNewsList.append(...articleList);
  }
  catch (e) {
    console.log(e);
  }
  finally {
    hidenSpinner(latestNewsList);
  }
}

function createLatestNewsElement(article) {
  const { title, link } = article;

  const listItem = document.createElement('li');
  const anchor = document.createElement('a');

  anchor.setAttribute('href', link);
  anchor.textContent = title;

  listItem.classList = 'latest-news-item';
  listItem.append(anchor);

  return listItem;
}

function hidenSpinner(parent) {
  const spinnerArea = parent.querySelector('.spinner-area');
  spinnerArea.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  renderTopNews();
  renderLatestNews();
});

