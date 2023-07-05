// ********    CA ON SAIT QUE CA MARCHE   *****


async function interrogerAPI(param) {
  try {
    const response = await fetch('http://localhost:8000/api/v1/' + param);
    const data = await response.json();
    return data
  } catch (error) {
    console.error(error);
  }
}



const categories = {
  "cat1": "Romance",
  "cat2": "Comedy",
  "cat3": "Sci-Fi"
}

let index_init_best = 0;
let storedTopRatedMovies = [];
let storedCat1Movies = [];
let storedCat2Movies = [];
let storedCat3Movies = [];
let cat1Param = "titles/?sort_by=-imdb_score&genre_contains=" + categories["cat1"];
let cat2Param = "titles/?sort_by=-imdb_score&genre_contains=" + categories["cat2"];
let cat3Param = "titles/?sort_by=-imdb_score&genre_contains=" + categories["cat3"];

const dictionnaire = {
  "catI": storedTopRatedMovies,
  "cat1": storedCat1Movies,
  "cat2": storedCat2Movies,
  "cat3": storedCat3Movies
}

function bestRatedCarousel() {
  let indexHTML = 1;

  for (let i = 0; i < storedTopRatedMovies.length && i < 4; i++) {
    try {
      imgURL = storedTopRatedMovies[i].image_url;
      imageContainer = document.getElementById('catI_img_' + indexHTML);
      //console.log(i + " : " + imgURL);
      imageContainer.style.backgroundImage = `url(${imgURL})`;
      indexHTML++;
    } catch (error) {
      console.error('Erreur de récup : ' + error + ' indexHTML : ' + indexHTML);
    }
  }
}

function categoryCarousel(category, movieList) {
  let indexHTML = 1;
  let listToUse = movieList;
  document.querySelector("." + category + "_title").innerText = categories[category];

  for (let i = 0; i < listToUse.length && i < 4; i++) {
    try {
      imgURL = listToUse[i].image_url;
      imageContainer = document.getElementById(category + '_img_' + indexHTML);
      imageContainer.style.backgroundImage = `url(${imgURL})`;
      indexHTML++;
    } catch (error) {
      console.error(error);
    }
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
    console.error("Erreur fonction load : " + error);
  }
}

function bestRatedMovie() {
  try {
    const bestMovieURL = storedTopRatedMovies[0].image_url;
    const imageContainer = document.getElementById('best_movie_img');
    imageContainer.style.backgroundImage = `url(${bestMovieURL})`;
    document.querySelector(".star_movie_title").innerText = storedTopRatedMovies[0].title;
    id_star_movie = storedTopRatedMovies[0].id;
    id_star_resume = "";
    interrogerAPI('titles/' + id_star_movie).then((data) => {
      id_star_resume = data.description;
      document.querySelector(".star_movie_resume").innerText = id_star_resume;
    });

  } catch (error) {
    console.error(error);
  }
}

async function loadMovies(param, storedmovieList) {
  let movieList = storedmovieList
  //let param = param;
  await loadDatas(param, movieList);
  storedmovieList = movieList;
}

function swipeRight(movieList) {
  console.log("Yclick")
  let firstMovie = movieList.shift();
  movieList.push(firstMovie);
}

function swipeLeft(movieList) {
  let lastMovie = movieList.pop();
  movieList.unshift(lastMovie);
}


// Chargement initial de la page
window.addEventListener('load', () => {
  loadMovies('titles/?sort_by=-imdb_score', storedTopRatedMovies).then(() => {
    bestRatedMovie();
    bestRatedCarousel();
  });
  loadMovies(cat1Param, storedCat1Movies).then(() => {
    categoryCarousel("cat1", storedCat1Movies);
  });
  loadMovies(cat2Param, storedCat2Movies).then(() => {
    categoryCarousel("cat2", storedCat2Movies);
  });
  loadMovies(cat3Param, storedCat3Movies).then(() => {
    categoryCarousel("cat3", storedCat3Movies);
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const bestNavRight = document.querySelector(".best-nav-right");
  const bestNavLeft = document.querySelector(".best-nav-left");
  const cat1NavRight = document.querySelector(".cat1-nav-right");
  const cat1NavLeft = document.querySelector(".cat1-nav-left");
  const cat2NavRight = document.querySelector(".cat2-nav-right");
  const cat2NavLeft = document.querySelector(".cat2-nav-left");
  const cat3NavRight = document.querySelector(".cat3-nav-right");
  const cat3NavLeft = document.querySelector(".cat3-nav-left");

  bestNavRight.addEventListener("click", function () {
    swipeRight(storedTopRatedMovies);
    bestRatedCarousel();
  });

  bestNavLeft.addEventListener("click", function () {
    swipeLeft(storedTopRatedMovies);
    bestRatedCarousel();
  });


  cat1NavRight.addEventListener("click", function () {
    swipeRight(storedCat1Movies);
    categoryCarousel("cat1", storedCat1Movies);
  });

  cat1NavLeft.addEventListener("click", function () {
    swipeLeft(storedCat1Movies);
    categoryCarousel("cat1", storedCat1Movies);
  });

  cat2NavRight.addEventListener("click", function () {
    swipeRight(storedCat2Movies);
    categoryCarousel("cat2", storedCat2Movies);
  });

  cat2NavLeft.addEventListener("click", function () {
    swipeLeft(storedCat2Movies);
    categoryCarousel("cat2", storedCat2Movies);
  });

  cat3NavRight.addEventListener("click", function () {
    swipeRight(storedCat3Movies);
    categoryCarousel("cat3", storedCat3Movies);
  });

  cat3NavLeft.addEventListener("click", function () {
    swipeLeft(storedCat3Movies);
    categoryCarousel("cat3", storedCat3Movies);
  });
});



// **** CODE LIE A LA MODALE ****
//Obtenir les références des éléments HTML
//var openModalBtn = document.getElementById('openModalBtn');
var modal = document.getElementById('modal');
var closeBtn = document.getElementsByClassName('close')[0];

// Fermer la fenêtre modale lorsque le bouton de fermeture est cliqué
closeBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});



// **** Tests sur les modales ****
const carouselImages = document.getElementsByClassName("carousel_img");

for (let i = 0; i < carouselImages.length; i++) {
  carouselImages[i].addEventListener("click", openModal);
}

function openModal(event) {
  console.log("Y clic");
  // Récupérer l'élément parent de l'image cliquée
  const idElement = event.target.id;
  //console.log("Element id =" + idElement);
  // Récupérer le numéro de l'image cliquée en extrayant le dernier caractère de l'ID
  const imageNumber = idElement.slice(-1);
  //console.log("Image number =" + imageNumber);
  const categID = idElement.slice(0, 4);
  //console.log("Categ ID =" + categID);
  //console.log("Top movies" + storedTopRatedMovies)
  //console.log("Top movies 2" + dictionnaire["cat1"])
  // Récupérer l'identifiant du film
  let varListe = dictionnaire[categID];
  //console.log(dictionnaire)
  //console.log(varListe)
  const idMovie = varListe[imageNumber - 1].id;
  // Récupérer les datas du films
  let modalDatas = [];
  interrogerAPI('titles/' + idMovie).then((data) => {

    modalDatas = data;

    // Afficher les informations dans la fenêtre modale
    var modal = document.getElementById("modal");


    document.querySelector(".modal_title").innerText = modalDatas.title;
    document.querySelector(".poster").src = modalDatas.image_url;
    document.querySelector(".description").innerText = "Synopsis : " + modalDatas.description;
    document.querySelector(".genre").innerText = "Genres : " + modalDatas.genres;
    document.querySelector(".director").innerText = "Réalisateur : " + modalDatas.directors;
    document.querySelector(".actors").innerText = "Acteurs : " + modalDatas.actors;
    document.querySelector(".origin").innerText = "Pays d'origine : " + modalDatas.countries;
    document.querySelector(".duration").innerText = "Durée : " + modalDatas.duration + " minutes";
    document.querySelector(".rating").innerText = "Note spectateurs : " + modalDatas.rated;
    document.querySelector(".imdb_score").innerText = "Note iMDB : " + modalDatas.imdb_score;
    document.querySelector(".release_date").innerText = "Date de sortie : " + modalDatas.date_published;
    //document.querySelector(".box_office").innerText = "Résultats au box office : " + modalDatas.worldwide_gross_income + " " + modalDatas.budget_currency;



    // Afficher la fenêtre modale
    modal.style.display = "block";

  });





}