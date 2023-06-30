// async function requeteAPI() {
//   try {
//     const response = await fetch('http://localhost:8000/api/v1/titles/');
//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// }

// requeteAPI();

// ********    CA ON SAIT QUE CA MARCHE   *****
// async function bestRatedMovie(param) {
//   try {
//     const response = await fetch('http://localhost:8000/api/v1/' + param);
//     const data = await response.json();
//     const bestMovieURL = data.results[0].image_url;
//     const imageContainer = document.getElementById('best_movie_img');
//     imageContainer.style.backgroundImage = `url(${bestMovieURL})`;

//   } catch (error) {
//     console.error(error);
//   }
// }


// window.addEventListener('load', bestRatedMovie('titles/?sort_by=-imdb_score'));


//let imageURL; // Déclaration de la variable en dehors de la fonction

async function interrogerAPI(param) {
  try {
    const response = await fetch('http://localhost:8000/api/v1/' + param);
    const data = await response.json();
    return data
  } catch (error) {
    console.error(error);
  }
}

async function afficherImageURL() {
  let imageURL;
  imageURL = await interrogerAPI('titles/?sort_by=-imdb_score');
  imageURL = imageURL.results[0]// Appel de la fonction pour récupérer l'URL de l'image
  console.log(imageURL); // Affichage de l'URL de l'image dans la console
}

afficherImageURL(); // Appel de la fonction pour afficher l'URL de l'image




// ******** CODE LIE AU CAROUSSEL ********
const carouselContainer = document.querySelector('.carousel-container');
const carouselImages = document.querySelector('.carousel-images');
const carouselNavLeft = document.querySelector('.carousel-nav-left');
const carouselNavRight = document.querySelector('.carousel-nav-right');
let currentIndex = 0;

function nextImage() {
  currentIndex++;
  if (currentIndex > 3) {
    currentIndex = 3;
  }
  carouselImages.style.transform = `translateX(-${currentIndex * 25}%)`;
}

function previousImage() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = 0;
  }
  carouselImages.style.transform = `translateX(-${currentIndex * 25}%)`;
}

carouselNavLeft.addEventListener('click', previousImage);
carouselNavRight.addEventListener('click', nextImage);
