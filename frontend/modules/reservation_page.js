import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them'

  try{
  const response = await fetch(`${config.backendEndpoint}/reservations`);
  const jsonData = await response.json();
  return jsonData;
  }
  catch(err){
    return null;
  }
  // console.log(jsonData);
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
//  console.log(reservations);

 if(reservations.length === 0){
      document.getElementById("no-reservation-banner").style.display = "block";
      document.getElementById("reservation-table-parent").style.display = "none";
    }
  else{
      document.getElementById("no-reservation-banner").style.display = "none";
      document.getElementById("reservation-table-parent").style.display = "block";
    }

    const tabelBody = document.querySelector("#reservation-table");
    reservations.forEach((ele)=>{
      
      
      const localDate = new Date(ele.date).toLocaleDateString('en-IN');
      
      let localTime = new Date(ele.time).toLocaleDateString('en-IN',{
        year : "numeric",
        day : "numeric",
        month : "long",
        hour : "numeric",
        minute: "numeric",
        second : "numeric",
        hour12 : true
      }).replace(' at ', ', ');

      const tableRow = `
      <tr>
      <th scope="col">${ele.id}</td>
      <td scope="col">${ele.name}</td>
      <td scope="col">${ele.adventureName}</td>
      <td scope="col">${ele.person}</td>
      <td scope="col">${localDate}</td>
      <td scope="col">${ele.price}</td>
      <td scope="col">${localTime}</td>
      <td scope="col">
      <button id=${ele.id} class="reservation-visit-button"><a href ="../detail/?adventure=${ele.adventure}">Vist Adventure</a> </button></td>
      </tr>`
      tabelBody.innerHTML+=tableRow;
     
    })

//  const parent = document.getElementById("reservation-table");

//  reservations.forEach((res) => {

//   const dateVariable  = new Date(res.date).toLocaleDateString('en-IN');
//   // console.log(dateVariable);
      
//       let time = new Date(res.time).toLocaleDateString('en-IN',{
//         year : "numeric",
//         day : "numeric",
//         month : "long",
//         hour : "numeric",
//         minute: "numeric",
//         second : "numeric",
//         hour12 : true
//       }).replace(' at ', ', ');
//       // console.log(time);

//       let tr = document.createElement("tr");
      
      
//       tr.innerHTML = `
                          
//                           <th scope="col">  ${res.id}                </td>
//                           <td  scope="col">  ${res.name}              </td>
//                           <td  scope="col">  ${res.adventureName}    </td>
//                           <td  scope="col">  ${res.person}                </td>
//                           <td  scope="col">  ${dateVariable}                     </td>
//                           <td scope="col">  ${res.price}                    </td>
//                           <td scope="col">  ${time}             </td>
//                           <td scope="col"> <button id=${res.id} class="reservation-visit-button"><a href ="../detail/?adventure=${res.adventure}">Vist Adventure</a> </button></td> 
                          
//   `;
//   parent.appendChild(tr);

//  })

}

export { fetchReservations, addReservationToTable };
