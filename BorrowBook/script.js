document.addEventListener("DOMContentLoaded", function () {
  var browseButton = document.querySelector(".button");
  var bookDetailSection = document.getElementById("bookDetail");
  browseButton.addEventListener("click", function (event) {
    event.preventDefault();
    bookDetailSection.scrollIntoView({ behavior: "smooth" });
  });

  var plusButton = document.querySelector(".plus-button");
  plusButton.addEventListener("click", function (event) {
    event.preventDefault();
    openAddBookModal();
  });
  loadRandomVideo();
  loadBookDetails();
});

async function loadBookDetails() {
  var bookData = await fetch("book.json").then(function (response) {
    return response.json();
  });

  var bookContainer = document.querySelector(".book-card-container");
  bookContainer.innerHTML = "";

  for (var bookTitle in bookData) {
    if (bookData.hasOwnProperty(bookTitle)) {
      var book = bookData[bookTitle];
      var bookCard = document.createElement("div");
      bookCard.className = "book-card";

      bookCard.innerHTML = `
    ${
      book.image
        ? `
        <div class="book-image">
            <img src="${book.image}" alt="${bookTitle}" style="max-width: 100px;">
        </div>
    `
        : ""
    }
    <div class="book-details" style="${
      !book.image ? "text-align: center;" : ""
    }">
        <h2>${bookTitle ?? "未知書籍"}</h2>
        <p>${book.description ?? "沒有關於這本書籍介紹。"}</p>
        <h4>${book.status ? "✔️可借用" : "❌已被借用"}</h4>
    </div>
    `;

      bookContainer.appendChild(bookCard);
    }
  }
}

function loadRandomVideo() {
  var videoFiles = [
    "public/bath.webm",
    "public/both.webm",
    "public/cake.webm",
    "public/corn.webm",
    "public/cotton.webm",
    "public/food.webm",
    "public/friend.webm",
    "public/looking.webm",
    "public/prairie.webm",
    "public/watermelon.webm",
  ];
  var randomVideo = videoFiles[Math.floor(Math.random() * videoFiles.length)];

  var video = document.getElementById("video-background");
  video.getElementsByTagName("source")[0].src = randomVideo;
  video.load();
}

function updateVideoSize() {
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var video = document.getElementById("video-background");
  var videoAspectRatio = video.videoWidth / video.videoHeight;
  var windowAspectRatio = windowWidth / windowHeight;
  if (windowAspectRatio > videoAspectRatio) {
    video.style.width = "100%";
    video.style.height = "auto";
  } else {
    video.style.width = "auto";
    video.style.height = "100%";
  }
}

window.onload = updateVideoSize();
window.onresize = updateVideoSize;

function openAddBookModal() {
  var modal = document.getElementById("addBookModal");
  modal.style.display = "block";
}

function closeAddBookModal() {
  var modal = document.getElementById("addBookModal");
  modal.style.display = "none";
}

document
  .getElementById("bookForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    var bookData = {};
    for (var pair of formData.entries()) {
      bookData[pair[0]] = pair[1];
    }
    console.log("Book data:", bookData);
    closeAddBookModal();
  });
