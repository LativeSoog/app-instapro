import { posts } from "../index.js";
import { renderHeaderComponent } from "./header-component.js";

export function renderUserPostsPageComponent({ appEl }) {
    // TODO: реализовать рендер постов из api - done
    const appHtml = posts
        .map((post, index) => `
    <div class="page-container">
    <div class="header-container">
    <ul class="posts">
      <li class="post">
        <div class="post-image-container">
          <img class="post-image" src="${post.imageUrl}">
        </div>
        <div class="post-likes">
          <button data-post-id="${post.id}" class="like-button">
            <img src="./assets/images/like-active.svg">
          </button>
          <p class="post-likes-text">
            Нравится: <strong>${post.likes.length > 1 ? `${post.likes[0].name} и ещё ${post.likes.length - 1}` : `${post.likes.name}`}</strong>
          </p>
        </div>
        <p class="post-text">
          <span class="user-name">${post.user.name}</span>
          ${post.description}
        </p>
        <p class="post-date">
          ${post.createdAt}
        </p>
      </li>
        </div>
        </div>
        </div>`).join("")
        ;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
        element: document.querySelector(".header-container"),
    });
}


