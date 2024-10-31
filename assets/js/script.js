// Chave de API da NASA
const apiKey = "V80HGxNt8G3UJPfbr7aBD6xAKwrvbPmfzY2su8uN";
const url = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${apiKey}`;

async function fetchAsteroids() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const asteroids = data.near_earth_objects.slice(0, 3); // Pega apenas os primeiros 3 asteroides

    const dataContainer = document.querySelector(".data-section .container");
    dataContainer.innerHTML = "<h2>Asteroides Próximos à Terra</h2>";

    asteroids.forEach((asteroid) => {
      const asteroidCard = document.createElement("div");
      asteroidCard.classList.add("data-card");

      asteroidCard.innerHTML = `
           <h3>${asteroid.name}</h3>
           <p>Diâmetro: ${asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(
             2
           )} km</p>
           <p>Distância da Terra: ${(
             asteroid.close_approach_data[0].miss_distance.kilometers / 1000000
           ).toFixed(2)} milhões de km</p>
         `;

      dataContainer.appendChild(asteroidCard);
    });
  } catch (error) {
    console.error("Erro ao buscar dados da NASA API:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchAsteroids);
