async function requeteAPI() {
  try {
    const response = await fetch('http://localhost:8000/api/v1/titles/');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

requeteAPI();
