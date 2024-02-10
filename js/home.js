const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjJiYmJiMDFiZWE2MzY3NjBkMzI5YjNjMDgxNjI4MiIsInN1YiI6IjY1NWY2Nzk1MWQzNTYzMDBmZTJiMzY5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eqcwmDVqxCSLFhhiSrW68sSpBuYXRgZTebjTqhKkMdg";
  const apiUrl = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

let searchInput = document.getElementById('inputSearch');
let endPoints = ["popular", "now_playing", "top_rated"];
let apiData;
let cardContainer = document.getElementById("container"); 

fetch(apiUrl, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${accessToken}`, 
    Accept: "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    apiData = data.results;
    console.log(apiData)
    cardContainer.innerHTML = "";

    apiData.forEach((movie) => {
      createCard(
        movie.poster_path,
        movie.title,
        movie.popularity,
        movie.id,
        movie.vote_average.toFixed(1)
      );
    });
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });


    
function createCard(imgCover, title, popularity, id, rating) {
  // Create card
  const card = document.createElement("div");
  card.classList.add("card");

  // Create image
  const image = document.createElement("img");
  image.classList.add("img-cover");
  image.src = "https://image.tmdb.org/t/p/w500/" + imgCover;

  const rateDiv = document.createElement("div");
  rateDiv.classList.add("rate");

  // Create the star icon
  const starIcon = document.createElement("i");
  starIcon.className = "fa-solid fa-star fa-2xl";
  starIcon.style.color = "#F5C71E";
  starIcon.style.fontSize = "14px";

  // Create the rate value paragraph
  const rateValueParagraph = document.createElement("p");
  rateValueParagraph.innerHTML = rating;
  rateDiv.appendChild(starIcon);
  rateDiv.appendChild(rateValueParagraph);

  // Create title
  const titleP = document.createElement("p");
  titleP.classList.add("card-title");
  titleP.innerHTML = title;
  titleP.onclick = function () {
    goToFilmDetails(id);
  };

  // Create popularity
  const popularityP = document.createElement("p");
  popularityP.classList.add("popular");
  popularityP.innerHTML = "Popularity:";

  // Create popularity number
  const popularityNum = document.createElement("span");
  popularityNum.classList.add("numP");
  popularityNum.innerHTML = popularity;

  card.appendChild(image);
  card.appendChild(rateDiv);
  card.appendChild(titleP);
  card.appendChild(popularityP);
  popularityP.appendChild(popularityNum);

  // Create container for the favorite checkbox
  const containerFavourite = document.createElement("div");
  containerFavourite.classList.add("container-f");

  // Create unique ID for the checkbox
  const checkboxId = "heart-" + id;

  // Create checkbox input
  const checkboxInput = document.createElement("input");
  checkboxInput.type = "checkbox";
  checkboxInput.id = checkboxId;

  checkboxInput.addEventListener("change", function () {
    const isChecked = this.checked;
    if (isChecked) {
      addToFavorites(id);
    } else {
      removeFromFavorites(id);
    }
  });
  // Create label for the checkbox
  const label = document.createElement("label");
  label.htmlFor = checkboxId;
  label.innerHTML = "❤";

  containerFavourite.appendChild(checkboxInput);
  containerFavourite.appendChild(label);
  card.appendChild(containerFavourite);

  // Append card to the card container
  cardContainer.appendChild(card);
}
function goToFilmDetails(id) {
  // Redirect to the film details page with the specific id
  window.location.href = "details.html#" + id;
}



function addToFavorites(movieId) {
  // Find the selected movie from the apiData
  const selectedMovie = apiData.find((movie) => movie.id === movieId);

  // Store the selected movie in local storage
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.push(selectedMovie);
  localStorage.setItem("favorites", JSON.stringify(favorites));
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


//--------------------      -------------------------//
//--------------------search-------------------------//
//--------------------       ------------------------//

function search(){
    const getValue= searchInput.value.toLowerCase();
    const searchMoive = apiData.filter((movie)=>{
      const movieTitle = movie.title.toLowerCase();
      return movieTitle.includes(getValue);
    })
  
    afterSearch(searchMoive);
  }
  function afterSearch(searchMovie){
    let cardContainer = document.getElementById("container");
    cardContainer.innerHTML="";
    searchMovie.forEach((searchMov)=>{
      createCard(
        searchMov.poster_path,
        searchMov.title,
        searchMov.popularity,
        searchMov.id,
        searchMov.vote_average.toFixed(1))
       })
      }
      searchInput.addEventListener('input',search)
  