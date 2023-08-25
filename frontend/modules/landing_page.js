import config from "../conf/index.js";

let allCities = []; // Store all cities fetched from the API

async function init() {
  //Fetches list of all cities along with their images and description
  allCities = await fetchCities();

  const searchInput = document.getElementById("searchInput");
  const dataContainer = document.getElementById("data");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    const filterdCities = filterCities(query, allCities);

    populateCities(filterdCities, dataContainer);
  });

  populateCities(allCities, dataContainer);
}

// Filter cities based on input provided in search box
function filterCities(query, cities) {
  return cities.filter((item) =>
    item.city.toLowerCase().includes(query.toLowerCase())
  );
}

function populateCities(cities, container) {
  container.innerHTML = ""; // Clear existing content

  cities.forEach((item) => {
    addCityToDOM(item.id, item.city, item.description, item.image);
  });
}

//Implementation of fetch cities using the Backend API and return the data
async function fetchCities() {
  try {
    let citiesresponse = await fetch(`${config.backendEndpoint}/cities`);
    let citiesJSON = await citiesresponse.json();
    return citiesJSON;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  const parent = document.getElementById("data");

  parent.innerHTML += ` 
                        <div class="col-lg-3 col-sm-6 col-xs-12 mb-4">
                          <a href="pages/adventures/?city=${id}" id=${id}>
                            <div class="tile">
                              <div class="tile-text text-white">
                                <h5>${id}</h5>
                                <p>${description}</p>
                              </div>
                             <img class="img-fluid" src="placeholder.jpg" data-src="image.jpg" alt="City" loading="lazy">

                            </div>
                          </a>
                        </div>
                      `;
}

export { init, fetchCities, addCityToDOM };
