// https://api.themoviedb.org/3/movie/343611?api_key=a2bf12ab60f87e1ff69ef7b00f747938

const moviePage = document.querySelector(".movie-page");
const addButton = document.querySelector(".add-movie");
const moviePoster = document.querySelector(".movie-poster");

const imgBaseW200 = "https://image.tmdb.org/t/p/w200";

function GetURLParameter(sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split("&");
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParameterName = sURLVariables[i].split("=");
    if (sParameterName[0] == sParam) {
      return sParameterName[1];
    }
  }
}

const movieId = GetURLParameter("movie");

// FETCH MOVIE WITH THE ID

fetch(
  `https://api.themoviedb.org/3/movie/${movieId}?api_key=a2bf12ab60f87e1ff69ef7b00f747938`
)
  .then((response) => response.json())
  .then((data) => {
    moviePoster.setAttribute("src", imgBaseW200 + data.poster_path);
  })
  .catch((error) => console.log(error));

// REFACTORED TO WORK WITH THE CLASSES (DONT WORK THO XD)
function getCurrentUserImages() {
  const currentUser = db.getCurrentUser();
  const images = currentUser.images;

  if (!images) {
    return [];
  } else {
    return images;
  }
}

function saveNewMovie() {
  const url = moviePoster.getAttribute("src");
  const imagesArray = getCurrentUserImages();

  const updatedImagesArray = [...imagesArray, url];
  // GET THE current user
  const currentUser = db.getCurrentUser();
  // update and set the current user object (add the new images array)
  currentUser.images = updatedImagesArray;
  db.setCurrentUser(currentUser);

  // update the current user in the array of all the `users` in the localStorage
  // get users array from localStorage
  const users = db.getAllUsers();

  // Find the current user object in the `users` array
  users.forEach((user) => {
    if (currentUser.email === user.email) {
      // update the current user object in the `users` array
      user.images = updatedImagesArray;
    }
  });

  const updatedUsersStr = JSON.stringify(users);

  localStorage.setItem("users", updatedUsersStr);
}

addButton.addEventListener("click", saveNewMovie);

// 51-70 refactor it into one Database method - updateCurrentUserImages
// pass it a updatedImagesArray
