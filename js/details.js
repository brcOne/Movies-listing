let id = window.location.hash.substring(1);

const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZjJiYmJiMDFiZWE2MzY3NjBkMzI5YjNjMDgxNjI4MiIsInN1YiI6IjY1NWY2Nzk1MWQzNTYzMDBmZTJiMzY5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eqcwmDVqxCSLFhhiSrW68sSpBuYXRgZTebjTqhKkMdg";

const apiUrl =
  "https://api.themoviedb.org/3/movie/" + id + "?language=en-US&page=1";

  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      details(
        data.poster_path,data.title,data.overview, data.original_language,data.runtime,data.release_date,data.status, data.vote_average.toFixed(1)
      );
    });
function convertRuntime(runtime) {
  if (runtime > 60) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return { hours, minutes };
  }
}

function createCircleDiv(iconClass, iconColor) {
  const circleDiv = document.createElement("div");
  circleDiv.className = "circle";

  const icon = document.createElement("i");
  icon.className = `fa-solid ${iconClass}`;
  icon.style.color = iconColor;

  circleDiv.appendChild(icon);
  return circleDiv;
}

function details(poster, title, overview, lang, time, date, statu, rating) {
  const container = document.getElementById("det");

 
  // Create the cover container
  const coverContainer = document.createElement("div");
  coverContainer.className = "cover-container";

  // Create the cover image
  const coverImage = document.createElement("img");
  coverImage.className = "cover";
  coverImage.src = "https://image.tmdb.org/t/p/w500/" + poster;
  coverImage.alt = "";

  // Append the cover image to the cover container
  coverContainer.appendChild(coverImage);

  // Create the content container
  const contentContainer = document.createElement("div");
  contentContainer.className = "contenu";

  const genreParagraph = document.createElement('p');
  genreParagraph.classList.add('genre');
  genreParagraph.textContent = 'Drama • History • Comedy';

  // Create the title paragraph
  const titleParagraph = document.createElement("p");
  titleParagraph.classList.add("titleF");
  titleParagraph.innerHTML = title;

  // Create the infos paragraph
  const infosParagraph = document.createElement("p");
  infosParagraph.className = "infos";
  const { hours, minutes } = convertRuntime(parseInt(time));
  infosParagraph.innerHTML = `${date} • ${lang} • ${hours}h ${minutes}m`;

  // Create the tools container
  const toolsContainer = document.createElement("div");
  toolsContainer.className = "tools";

  // Create the rate div
  const rateDiv = document.createElement("div");
  rateDiv.className = "rate";

  // Create the star icon
  const starIcon = document.createElement("i");
  starIcon.className = "fa-solid fa-star fa-2xl";
  starIcon.style.color = "#F5C71E";
  starIcon.style.marginTop = "12px";
  starIcon.style.fontSize = "20px";

  // Create the rate value paragraph
  const rateValueParagraph = document.createElement("p");
  rateValueParagraph.innerHTML = rating;


  rateDiv.appendChild(starIcon);
  rateDiv.appendChild(rateValueParagraph);

  // Create the heart and star circle divs
  const heartCircleDiv = createCircleDiv("fa-heart", "#ffffff");
  const starCircleDiv = createCircleDiv("fa-star", "#ffffff");

  // Create the play div
  const playDiv = document.createElement("div");
  playDiv.classList.add("play");

  // Create the play icon
  const playIcon = document.createElement("i");
  playIcon.className = "fa-solid fa-play";
  playIcon.style.color = "#ffffff";
  playIcon.style.marginTop = "0.7rem";

  // Create the Play Trailer paragraph
  const playTrailerParagraph = document.createElement("p");
  playTrailerParagraph.classList.add("play-text");
  playTrailerParagraph.innerHTML = "Play Trailer";

  playDiv.appendChild(playIcon);
  playDiv.appendChild(playTrailerParagraph);

  // Append the rate, heart, star, and play divs to the tools container
  toolsContainer.appendChild(rateDiv);
  toolsContainer.appendChild(heartCircleDiv);
  toolsContainer.appendChild(starCircleDiv);
  toolsContainer.appendChild(playDiv);

  // Create the overview and overview content paragraphs
  const overviewParagraph = document.createElement("p");
  overviewParagraph.classList.add("overview");
  overviewParagraph.innerHTML = "Overview";

  const overviewContentParagraph = document.createElement("p");
  overviewContentParagraph.classList.add("overview-contenu");
  overviewContentParagraph.innerHTML = overview;

  // Create the filmmaker name and role paragraphs
  const filmmakerNameParagraph = document.createElement("p");
  filmmakerNameParagraph.className = "filmmaker-name";
  filmmakerNameParagraph.innerHTML = "Status";

  const filmmakerRoleParagraph = document.createElement("p");
  filmmakerRoleParagraph.className = "filmmaker-role";
  filmmakerRoleParagraph.innerHTML = statu;

  

  contentContainer.appendChild(genreParagraph);
  contentContainer.appendChild(titleParagraph);
  contentContainer.appendChild(infosParagraph);
  contentContainer.appendChild(toolsContainer);
  contentContainer.appendChild(overviewParagraph);
  contentContainer.appendChild(overviewContentParagraph);
  contentContainer.appendChild(filmmakerNameParagraph);
  contentContainer.appendChild(filmmakerRoleParagraph);


  container.appendChild(coverContainer);
  container.appendChild(contentContainer);
}


