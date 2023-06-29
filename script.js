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


async function bestRatedMovie(param) {
  try {
    const response = await fetch('http://localhost:8000/api/v1/' + param);
    const data = await response.json();
    //console.log(data);
    //return data;
    let bestMovie = data.results[0].image_url;
    console.log(bestMovie)
  } catch (error) {
    console.error(error);
  }
}

bestRatedMovie('titles/?sort_by=-imdb_score')
// let bestMovie = await listMovies.results

// console.log('****** RESULTAT ******')
// console.log(bestMovie)