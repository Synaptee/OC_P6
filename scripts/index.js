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
const carouselImages = document.querySelector('.carousel-images');
const carouselContainer = document.querySelector('.carousel-container');
const carouselImageElements = document.querySelectorAll('.carousel-image');

// N'afficher que 4 affiches
carouselImageElements.forEach((image, index) => {
  if (index >= 4) {
    image.style.display = 'none';
  }
});

// Centrer les 4 affiches
carouselContainer.style.justifyContent = 'center';
carouselImages.style.width = 'fit-content';







