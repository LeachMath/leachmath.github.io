document.getElementById("price-button").addEventListener('click', validateStuff);
populateFoodBrands();

function brandToggle() {

  let foodStatus = document.getElementById("supplyFoodField");
  let brandrow = document.getElementById("foodbrandrow");

  if (foodStatus.checked == true) brandrow.classList.remove(("collapse"));
  else brandrow.classList.add(("collapse"));
}

function validateStuff() {
  let visits = document.getElementById("numVisitsField")
  if (visits.checkValidity() == false) {
    document.getElementById("cost-summary").classList.add("d-none")
    document.getElementById("invalidVisitsError").classList.add("d-block");
  }
  else
    document.getElementById("invalidVisitsError").classList.remove("d-block");

  let cats = document.getElementById("numCatsField")
  if (cats.checkValidity() == false) {
    document.getElementById("cost-summary").classList.add("d-none")
    document.getElementById("invalidCatsError").classList.add("d-block");
  }
  else
    document.getElementById("invalidCatsError").classList.remove("d-block");

  let serviceDate = document.getElementById("dateField");
  if (serviceDate.checkValidity() == false) {
    document.getElementById("cost-summary").classList.add("d-none")
    document.getElementById("invalidDateError").classList.add("d-block");
  }
  else
    document.getElementById("invalidDateError").classList.remove("d-block");

  let todayUnix = new Date().getTime();
  let serviceDateUnix = new Date(serviceDate.value).getTime();
  if (todayUnix > serviceDateUnix) {
    document.getElementById("passedDateError").classList.add("d-block");
    document.getElementById("cost-summary").classList.add("d-none")
    dateNotPassed = false;
  }
  else {
    document.getElementById("passedDateError").classList.remove("d-block");
    dateNotPassed = true;
  }
  if (visits.checkValidity() && cats.checkValidity() && serviceDate.checkValidity() && dateNotPassed) {
    displayTotalCost();
  }
}

function displayTotalCost() {
  document.getElementById("cost-summary").classList.remove("d-none");

  let numVisits = Number.parseInt(document.getElementById("numVisitsField").value);
  let numCats = Number.parseInt(document.getElementById("numCatsField").value);
  let waterPlants = document.getElementById("waterPlantsField");
  let supplyFood = document.getElementById("supplyFoodField");
  let checkMail = document.getElementById("checkMailField");
  let customService = document.getElementById("other");
  let extraPhotos = document.getElementById("photosField");


  let dayTot = 10 * numVisits;
  let foodTot = numCats * numVisits * supplyFood.checked;
  let mailTot = numVisits * checkMail.checked;
  let plantTot = numVisits * waterPlants.checked;
  let numPhotos = numVisits * (numCats - 2) * extraPhotos.checked;
  if (numPhotos < 0) numPhotos = 0;
  let photoTot = numPhotos * 0.5;
  let grandTotal = dayTot + foodTot + mailTot + plantTot + photoTot;

  document.getElementById("numdays").innerHTML = numVisits;
  document.getElementById("dayTot").innerHTML = "$" + dayTot.toFixed(2);
  document.getElementById("numFood").innerHTML = foodTot;
  document.getElementById("foodTot").innerHTML = "$" + foodTot.toFixed(2);
  document.getElementById("numMail").innerHTML = mailTot;
  document.getElementById("mailTot").innerHTML = "$" + mailTot.toFixed(2);
  document.getElementById("numPlant").innerHTML = plantTot;
  document.getElementById("plantTot").innerHTML = "$" + plantTot.toFixed(2);
  document.getElementById("numPlant").innerHTML = numVisits * waterPlants.checked;
  document.getElementById("foodTot").innerHTML = "$" + foodTot.toFixed(2);

  document.getElementById("numPhoto").innerHTML = numPhotos;
  document.getElementById("photoTot").innerHTML = "$" + photoTot.toFixed(2);
  document.getElementById("grandTotal").innerHTML = "$" + grandTotal.toFixed(2);

}

function populateFoodBrands() {
  let catFoodBrands = ["Iams", "Meow Mix", "Purina", "Nutrish", "Fancy Feast"];
  let b = document.getElementById("foodbrandrow")

  for (var i = 0; i < catFoodBrands.length; i++) {
    newDiv = document.createElement("div");
    newDiv.classList.add("form-check");
    k = document.createElement("input");
    k.classList.add("form-check-input");
    k.name = "brandselect";
    k.type = "radio";
    k.id = catFoodBrands[i];
    k.value = catFoodBrands[i];

    lab = document.createElement("label");
    lab.classList.add("form-check.label");
    lab.setAttribute("for", catFoodBrands[i])
    lab.innerHTML = catFoodBrands[i];

    newDiv.appendChild(k);
    newDiv.appendChild(lab);
    b.appendChild(newDiv);
  }

}