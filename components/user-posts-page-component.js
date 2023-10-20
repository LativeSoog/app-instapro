import { likeUserPost, posts, user } from "../index.js";
import { renderHeaderComponent } from "./header-component.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from 'date-fns/locale'

export function renderUserPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api - done
  const appHtml = posts
    .map((post, index) => ` 
        <div class="page-container">
        <div class="header-container"></div>
        <div class="posts-user-header"></div>
        <ul class="posts">
          <li class="post">
            <div class="post-image-container">
              <img class="post-image" src="${post.imageUrl}">
            </div>
            <div class="post-likes">
              <button data-post-id="${post.id}" class="like-button">
              ${post.isLiked ? '<img src="./assets/images/like-active.svg">' : '<img src="./assets/images/like-not-active.svg">'}
              </button>
              <p class="post-likes-text">
              Нравится: <strong>${post.likes.length === 0 ? `0` : `${post.likes.length >= 2 ? `${post.likes[0].name} и ещё ${post.likes.length - 1}` : `${post.likes[0].name}`}`}</strong>
              </p>
            </div>
            <p class="post-text">
              <span class="user-name">${post.user.name}</span>
              ${post.description}
            </p>
            <p class="post-date">
            ${formatDistanceToNow(new Date(post.createdAt), { locale: ru })} назад
            </p>
          </li>
            </div>
            </div>`).join("")
    ;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  function renderPostUserHeader({ element }) {
    element.innerHTML = `
        <div class="posts-user-header">
        <img src="${posts[0].user.imageUrl}" class="posts-user-header__user-image">
        <p class="posts-user-header__user-name">Публикации пользователя <strong>${posts[0].user.name}</strong></p>
    </div>
      `;
    return element;
  }

  renderPostUserHeader({
    element: document.querySelector(".posts-user-header")
  })

  for (let likeEl of document.querySelectorAll(".like-button")) {
    likeEl.addEventListener("click", () => {
      if (!user) {
        alert("Ставить Like могут только авторизованные пользователи")
        return;
      }
      likeUserPost({ postId: likeEl.dataset.postId })
    })
  }
}
