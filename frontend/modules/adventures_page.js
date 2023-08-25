import config from "../conf/index.js";

//Implementation to extract city from URL's query params
function getCityFromURL(search) {
  const city = search.split("=")[1];
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  try {
    let response = await fetch(
      `${config.backendEndpoint}/adventures/?city=${city}`
    );
    let jsonData = await response.json();
    return jsonData;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  adventures.forEach((adventure) => {
    const parent = document.getElementById("data");

    parent.innerHTML += ` 
                            <div class="col-lg-3 col-sm-6 col-xs-12 mb-4">
                            
                               <a href="detail/?adventure=${adventure.id}" id=${adventure.id}>
                               
                               <div class="activity-card">
                               <div class="category-banner">${adventure.category}</div>
                               
                                         
                              <img  class="activity-card-img"  src="${adventure.image}"  loading="lazy" alt="${adventure.id}"/>
                                      
                                     <div class="adventure-card-text">
                                        <h5>${adventure.name}</h5>
          
                                        <h5>&#8377;${adventure.costPerHead}</h5>
                                     
                                        <h5>Duration</h5>
          
                                        <h5>${adventure.duration} Hours</h5>
                                       </div>

                                   </div>

                               </a>
                            </div> `;
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  let listByDuration = [];

  list.forEach((adv) => {
    if (adv.duration >= low && adv.duration <= high) listByDuration.push(adv);
  });
  return listByDuration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  const filterdList = list.filter((item) => {
    if (categoryList.find((it) => it === item.category) !== undefined)
      return item;
  });

  return filterdList;
}

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together
// filters object looks like this filters = { duration: "", category: [] };

function filterFunction(list, filters) {
  let arrayDuration = filters.duration.split("-");

  let min = arrayDuration[0];
  let max = arrayDuration[1];

  if (filters.duration.length == 0 && filters.category.length == 0) {
    return list;
  }

  if (filters.duration.length != 0 && filters.category.length != 0) {
    let helperListByDuration = filterByDuration(list, min, max);
    return filterByCategory(helperListByDuration, filters.category);
  }

  if (filters.duration.length != 0 && filters.category.length == 0)
    return filterByDuration(list, min, max);
  else return filterByCategory(list, filters.category);
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

const getFiltersFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("filters"));

function generateFilterPillsAndUpdateDOM(filters) {
  for (let i = 0; i < filters.category.length; i++) {
    const parent = document.getElementById("category-list");
    const child = document.createElement("span");

    child.classList.add(
      "badge",
      "rounded-pill",
      "bg-light",
      "text-dark",
      "border",
      "border-yellow",
      "px-3",
      "my-3",
      "mx-2"
    );

    child.textContent = filters.category[i];

    parent.append(child);
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
