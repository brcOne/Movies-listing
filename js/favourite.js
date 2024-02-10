window.onload = function () {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites.forEach((movie) => {
    addToFavorites(
      movie.poster_path,
      movie.title,
      movie.release_date,
      movie.overview,
      movie.id
    );
  });
};

let moivesContainer = document.querySelector(".favourite-moives");

function addToFavorites(image, title, date, overview, id) {
  const movie = document.createElement("div");

  movie.classList.add("movie");

  const favouriteImage = document.createElement("img");
  favouriteImage.src = "https://image.tmdb.org/t/p/w500/" + image;
  favouriteImage.alt = "";
  movie.appendChild(favouriteImage);

  const itemsContainer = document.createElement("div");
  itemsContainer.classList.add("items");

  const titleP = document.createElement("p");
  titleP.innerHTML = title;
  const dateP = document.createElement("p");
  dateP.innerHTML = date;
  const overviewP = document.createElement("p");
  overviewP.innerHTML = overview;

  const iconsContainer = document.createElement("div");
  iconsContainer.classList.add("icons");

  // Create and append star icon
  const starIcon = document.createElement("div");
  starIcon.classList.add("circle");
  starIcon.innerHTML =
    '<i class="fa-solid fa-star" style="font-size: 10px;"></i>';
  iconsContainer.appendChild(starIcon);
  iconsContainer.innerHTML += "<span>Your rating</span>";

  // Create and append heart icon
  const heartIcon = document.createElement("div");
  heartIcon.classList.add("circleh");
  heartIcon.innerHTML =
    '<i class="fa-solid fa-heart" style="color: #ffffff; font-size: 10px;"></i>';
  iconsContainer.appendChild(heartIcon);
  iconsContainer.innerHTML += "<span>Favourite</span>";

  // Create and append remove icon
  const removeIcon = document.createElement("div");

  removeIcon.onclick = function () {
    removeFromFavorites(id);
    // Remove the movie div from the favorites page
    moivesContainer.removeChild(movie);
  };

  removeIcon.classList.add("circle");
  removeIcon.innerHTML =
    '<i class="fa-solid fa-xmark" style="font-size: 10px;"></i>';
  iconsContainer.appendChild(removeIcon);

  const spanElement = document.createElement("span");
  spanElement.textContent = "Remove";
  iconsContainer.appendChild(spanElement);

  itemsContainer.appendChild(titleP);
  itemsContainer.appendChild(dateP);
  itemsContainer.appendChild(overviewP);
  itemsContainer.appendChild(iconsContainer);
  movie.appendChild(itemsContainer);

  moivesContainer.appendChild(movie);
}

function removeFromFavorites(movieId) {
  // Retrieve favorites from local storage
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Find the index of the movie with the given ID in favorites
  const indexToRemove = favorites.findIndex((movie) => movie.id === movieId);

  // Remove the movie from the favorites array
  if (indexToRemove !== -1) {
    favorites.splice(indexToRemove, 1);

    // Update local storage with the modified favorites array
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}
