// ********    CA ON SAIT QUE CA MARCHE   *****
function bestRatedMovie() {
  try {
    const bestMovieURL = storedTopRatedMovies[0].image_url;
    const imageContainer = document.getElementById('best_movie_img');
    imageContainer.style.backgroundImage = `url(${bestMovieURL})`;

  } catch (error) {
    console.error(error);
  }
}

async function interrogerAPI(param) {
  try {
    const response = await fetch('http://localhost:8000/api/v1/' + param);
    const data = await response.json();
    return data
  } catch (error) {
    console.error(error);
  }
}

let index_init_best = 0;
let storedTopRatedMovies = [];

function bestRatedCarousel() {
  let indexHTML = 1;
  try {
    for (let i = index_init_best; i < i + 4; i++) {
      imgURL = storedTopRatedMovies[i].image_url;
      //console.log(imgURL);
      imageContainer = document.getElementById('best_img_' + indexHTML);
      imageContainer.style.backgroundImage = `url(${imgURL})`;
      indexHTML++;
    }
  } catch (error) {
    console.error(error);
  }
}



async function loadDatas(param, movieList) {
  try {
    const response = await interrogerAPI(param);

    for (let i = 0; i < response.results.length; i++) {
      movieList.push(response.results[i]);
    }
    const response2 = await interrogerAPI(param + '&page=2');
    for (let i = 0; i < 2; i++) {
      movieList.push(response2.results[i]);
    }
  } catch (error) {
    console.error(error);
  }
}




async function loadTopRatedMovies() {
  let topRatedMovies = [];
  let param = 'titles/?sort_by=-imdb_score';
  await loadDatas(param, topRatedMovies);
  storedTopRatedMovies = topRatedMovies;
}




// Chargement initial de la page
window.addEventListener('load', () => {
  loadTopRatedMovies().then(() => {
    bestRatedMovie();
    bestRatedCarousel();
  });
});


