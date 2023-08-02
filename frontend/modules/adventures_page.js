
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
 
  console.log(search);
  const city = search.split("=")[1];

  console.log(city);
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
  let response = await fetch(`${config.backendEndpoint}/adventures/?city=${city}`);
  let jsonData = await response.json();
  return jsonData;
  }
  catch(err){
    return null;
  }
  // console.log(jsonData);

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // console.log(adventures);
  adventures.forEach( adventure => {
    
  const parent = document.getElementById("data");

    parent.innerHTML +=  ` 
                            <div class="col-lg-3 col-sm-6 col-xs-12 mb-4">
                            
                               <a href="detail/?adventure=${adventure.id}" id=${adventure.id}>
                               
                               <div class="activity-card">
                               <div class="category-banner">${adventure.category}</div>
                               
                                         
                                     <img  class="activity-card-img"  src="${adventure.image}"  alt="${adventure.id}"/>
                                      
                                     <div class="adventure-card-text">
                                        <h5>${adventure.name}</h5>
          
                                        <h5>&#8377;${adventure.costPerHead}</h5>
                                     
                                        <h5>Duration</h5>
          
                                        <h5>${adventure.duration} Hours</h5>
                                       </div>

                                   </div>

                               </a>
                            </div> `
    
  });


}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let listByDuration = [];

  list.forEach( adv => {
    if(adv.duration >= low && adv.duration <= high)
          listByDuration.push(adv);
  } )
  return listByDuration;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  
  
    //let  filterdList = list.filter( (adv) =>  {
    //     return  adv.category === categoryList[0] || adv.category === categoryList[1]  || adv.category === categoryList[2] || adv.category === categoryList[3]
    //       || adv.category === categoryList[4]
    //   } 
    //     );
    
  const filterdList = list.filter((item)=>{
    if(categoryList.find((it)=> it === item.category) !== undefined)
    return item;
});


  return filterdList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  
  // console.log(filters);
  
  let arrayDuration = filters.duration.split("-");
  // console.log(arrayDuration);

  let min = arrayDuration[0];
  let max = arrayDuration[1];

  // console.log(filters.duration.length);
  // console.log(filters.category.length);

  if(filters.duration.length == 0 && filters.category.length == 0){
    return list;
}

if(filters.duration.length != 0 && filters.category.length != 0) {
        let helperListByDuration = filterByDuration(list,min,max);
        return filterByCategory(helperListByDuration,filters.category);         
}

if(filters.duration.length != 0 && filters.category.length == 0 ){
  return filterByDuration(list,min,max);    
}

else {   
  return  filterByCategory(list,filters.category);
}
  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem('filters',JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  return JSON.parse(localStorage.getItem('filters'));
  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  
  for(let i=0; i<filters.category.length; i++){
    

    const parent = document.getElementById("category-list");
    const child = document.createElement("span");

    child.classList.add("badge" , "rounded-pill" , "bg-light" , "text-dark" , "border" , "border-yellow"
                               , "px-3" , "my-3" , "mx-2") ;

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
