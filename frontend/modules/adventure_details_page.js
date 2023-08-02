import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  // console.log(search);
  let adventureID = search.split("=")[1];

  // console.log(adventureID);

  // Place holder for functionality to work in the Stubs
  return adventureID;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  // console.log(adventureId)

  try{
    let response = await fetch(`${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`);
    let jsonData = await response.json();
    
    return jsonData;
  }
  catch(err){
    return null;
  }



  // Place holder for functionality to work in the Stubs
  // return jsonData;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").textContent = adventure.name;
  document.getElementById("adventure-subtitle").textContent = adventure.subtitle;

  const carouselExampleIndicators = document.getElementById("photo-gallery");
  const images = adventure.images;
  images.forEach(
    img => {
      const newDiv = document.createElement("div");
      const newImg = document.createElement("img");

      newImg.setAttribute("class","activity-card-image")
      newImg.setAttribute("src",img);
      newDiv.append(newImg);
      document.getElementById("photo-gallery").append(newDiv);
    }
  );
  document.getElementById("adventure-content").textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
 
  const photoGallery = document.getElementById("photo-gallery");

  const crouselInner = document.createElement("div");
  crouselInner.setAttribute("class","carousel-inner")
  images.forEach((item)=>{
      const crouselItem = `
      <div class="carousel-item">
      <img src="${item}" class="activity-card-image" class="d-block">
      </div>`;
      crouselInner.innerHTML +=crouselItem;
  })

  photoGallery.innerHTML =`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>


  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
  </button>
</div>`;

 document.getElementById("carouselExampleIndicators").appendChild(crouselInner);
 
 document.querySelector("#carouselExampleIndicators > div.carousel-inner > div:nth-child(1)").setAttribute("class" , "carousel-item active");


}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure);

  let soldOutPanel = document.getElementById("reservation-panel-sold-out");
  let reservationForm =  document.getElementById("reservation-panel-available");
  let cost =  document.getElementById("reservation-person-cost");
  

  if(adventure.available) {
    // document.getElementById("reservation-panel-sold-out").setAttribute("display","none");
    soldOutPanel.style.display = "none";  
    reservationForm.style.display = "block";
    cost.innerHTML = adventure.costPerHead;
  }
  else {
    soldOutPanel.style.display = "block"; 
    reservationForm.style.display = "none";   
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const totalCost = persons * adventure.costPerHead;
  console.log(totalCost);
  document.getElementById("reservation-cost").textContent = totalCost;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");

  form.addEventListener("submit",async (e) => {
    e.preventDefault();
    // console.log(e);
    console.log(adventure);

    const formData =  {
      name : form.elements.name.value,
      date : form.elements.date.value,
      person : form.elements.person.value,
      adventure : adventure.id
    };
    try{
      await sendFormData(formData);
      alert("Success");
      location.reload();

    }
    catch{
      alert("Failed");
    }
    });

    async function sendFormData(formData){
      const response = await fetch(`${config.backendEndpoint}/reservations/new`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers : {   "Content-type" : "application/json; charset=UTF-8"  }

      }
      );
      const jsonData = await response.json();
      console.log(jsonData);


    }


}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  const banner = document.getElementById("reserved-banner");
  if(adventure.reserved)   
      banner.style.display = "block";
  else banner.style.display = "none";    


}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
