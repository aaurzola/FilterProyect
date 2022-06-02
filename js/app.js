//DOM Selectors
const resultTableSelector = document.querySelector("#result-table");
const brandSelector = document.querySelector("#marca");
const yearSelector = document.querySelector("#year");
const minPriceSelector = document.querySelector("#minimo");
const maxPriceSelector = document.querySelector("#maximo");
const doorSelector = document.querySelector("#puertas");
const transmisionSelector = document.querySelector("#transmision");
const colorSelector = document.querySelector("#color");
const resultsCounter = document.querySelector("#results-counter");
const resetBtn = document.querySelector("#reset-button");


//global variables
const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;
const searchObject = {
  brand: "",
  year: "",
  minPrice: "",
  maxPrice: "",
  doors: "",
  transmision: "",
  color: "",
};


//app starts
document.addEventListener("DOMContentLoaded", () => {
  resultsCounter.textContent = `${autos.length} Resultados`;
  loadElements(autos); //initial elements
  yearDropdown(); //year dropdown options
});


//events
brandSelector.addEventListener("change", e => {
  searchObject.brand = e.target.value;
  carFilter(autos);
});

yearSelector.addEventListener("change", e => {
  searchObject.year = parseInt(e.target.value);
  carFilter(autos);
});

minPriceSelector.addEventListener("change", e => {
  searchObject.minPrice = e.target.value;
  carFilter(autos);
});

maxPriceSelector.addEventListener("change", e => {
  searchObject.maxPrice = e.target.value;
  carFilter(autos);
});

doorSelector.addEventListener("change", e => {
  searchObject.doors = parseInt(e.target.value);
  carFilter(autos);
});

transmisionSelector.addEventListener("change", e => {
  searchObject.transmision = e.target.value;
  carFilter(autos);
});

colorSelector.addEventListener("change", e => {
  searchObject.color = e.target.value;

  carFilter(autos);
});

resetBtn.addEventListener("click", () => {
  loadElements(autos);
  brandSelector.value = "";
  yearSelector.value = "";
  minPriceSelector.value = "";
  maxPriceSelector.value = "";
  doorSelector.value = "";
  transmisionSelector.value = "";
  colorSelector.value = "";
  resultsCounter.textContent = `${autos.length} Resultados`;
  for (i in searchObject) {
    console.log(i);
    searchObject[i] = "";
  }
});


//functions
function loadElements(carArray) {
  clearHTML();
  carArray.forEach(car => {
    const { marca, modelo, year, precio, puertas, color, transmision } = car
    const carLine = document.createElement("tr");
    carLine.innerHTML = `
      <td>${marca} ${modelo}</td>
      <td>${year}</td>
      <td>${precio}</td>
      <td>${puertas}</td>
      <td>${color}</td>
      <td>${transmision}</td>
    `;
    resultTableSelector.appendChild(carLine);
  });
}

//filter functions
function carFilter(baseArray) {
  const filteredResult = baseArray.filter(brandFilter).filter(yearFilter).filter(minPriceFilter).filter(maxPriceFilter).filter(doorFilter).filter(transmisionFilter).filter(colorFilter);

  if (filteredResult.length) {
    loadElements(filteredResult);
  } else {
    noMatch();
  }
  resultsCounter.textContent = `${filteredResult.length} Resultados`;
}

function brandFilter(testCar) {
  if (searchObject.brand) {
    return searchObject.brand === testCar.marca;
  }
  return testCar;
}

function yearFilter(testCar) {
  if (searchObject.year) {
    return searchObject.year === testCar.year;
  }
  return testCar;
}

function minPriceFilter(testCar) {
  if (searchObject.minPrice) {
    return searchObject.minPrice < testCar.precio;
  }
  return testCar;
}

function maxPriceFilter(testCar) {
  if (searchObject.maxPrice) {
    return searchObject.maxPrice > testCar.precio;
  }
  return testCar;
}

function doorFilter(testCar) {
  if (searchObject.doors) {
    return searchObject.doors === testCar.puertas;
  }
  return testCar;
}

function transmisionFilter(testCar) {
  if (searchObject.transmision) {
    return searchObject.transmision === testCar.transmision;
  }
  return testCar;
}

function colorFilter(testCar) {
  if (searchObject.color) {
    return searchObject.color === testCar.color;
  }
  return testCar;
}


//misc functions
function yearDropdown() {
  for (let i = maxYear; i > minYear; i--) {
    let yearOption = document.createElement("option");
    yearOption.value = i;
    yearOption.textContent = i;
    yearSelector.appendChild(yearOption);
  }
}

function clearHTML() {
  while (resultTableSelector.children.length > 1) {
    resultTableSelector.removeChild(resultTableSelector.lastChild);
  }
  document.querySelector(".alerta.error")?.remove();
}

function noMatch() {
  clearHTML();
  const errorElement = document.createElement("div");
  errorElement.classList.add("alerta", "error");
  errorElement.textContent = "No hay resultados que coincidan con los criterios de busqueda"
  document.querySelector("div #resultado").appendChild(errorElement);
}
