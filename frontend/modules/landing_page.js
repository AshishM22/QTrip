import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);
  
 
  //Updates the DOM with the cities
  cities.forEach( item => {
    addCityToDOM(item.id, item.city, item.description, item.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data

  try{
  let citiesresponse = await fetch(`${config.backendEndpoint}/cities`);
  let citiesJSON = await citiesresponse.json();
  // console.log(citiesJSON);
  return citiesJSON;
  }
  catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM]
  const parent = document.getElementById("data");

  parent.innerHTML +=  ` 
  <div class="col-lg-3 col-sm-6 col-xs-12 mb-4">
  <a href="pages/adventures/?city=${id}" id=${id}>
    <div class="tile">
      <div class="tile-text text-white">
        <h5>${id}</h5>
        <p>${description}</p>
      </div>
      <img  class="img-fluid"  src="${image}"  alt="${id}"/>
    </div>
  </a>
</div>`


}

export { init, fetchCities, addCityToDOM };
