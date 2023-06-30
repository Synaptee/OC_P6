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


let imageURL; // Déclaration de la variable en dehors de la fonction

async function interrogerAPI() {
  try {
    const response = await fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score');
    const data = await response.json();
    imageURL = data.results[0]; // Assignation de la valeur à la variable
  } catch (error) {
    console.error(error);
  }
}

async function afficherImageURL() {
  await interrogerAPI(); // Appel de la fonction pour récupérer l'URL de l'image
  console.log(imageURL); // Affichage de l'URL de l'image dans la console
}

afficherImageURL(); // Appel de la fonction pour afficher l'URL de l'image
