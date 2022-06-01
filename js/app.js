const resultado = document.querySelector("#resultado");
const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");


const yearSelector = document.querySelector("#year");
const max = new Date().getFullYear();
const min = max - 12;


const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",

}

//events
document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos); //muestra los automoviles iniciales
  llenarSelect();
});

marca.addEventListener("change", e => {
  datosBusqueda.marca = e.target.value;
  filtrarAuto();
});

year.addEventListener("change", e => {
  datosBusqueda.year = parseInt(e.target.value);
  filtrarAuto();
});

minimo.addEventListener("change", e => {
  datosBusqueda.minimo = e.target.value;
  filtrarAuto();
});

maximo.addEventListener("change", e => {
  datosBusqueda.maximo = e.target.value;
  filtrarAuto();
});

puertas.addEventListener("change", e => {
  datosBusqueda.puertas = parseInt(e.target.value);
  filtrarAuto();
});

transmision.addEventListener("change", e => {
  datosBusqueda.transmision = e.target.value;
  filtrarAuto();
});

color.addEventListener("change", e => {
  datosBusqueda.color = e.target.value;
  filtrarAuto();
});


function mostrarAutos(autos) {
  limpiarHTML(); //elimina el HTML previo
  autos.forEach(auto => {
    const { marca, modelo, year, precio, puertas, color, transmision } = auto;
    const autoHTML = document.createElement("p");
    autoHTML.textContent = `${marca} ${modelo} - ${year} - ${precio} - ${puertas} - ${color} - ${transmision} `;
    resultado.appendChild(autoHTML);
  })
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function llenarSelect() {
  for (let i = max; i > min; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;
    yearSelector.appendChild(opcion);
  }
}

function filtrarAuto() {
  const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

  if (resultado.length) {
    mostrarAutos(resultado)
  } else {
    noResultado();
  }
}

function filtrarMarca(auto) {
  const { marca } = datosBusqueda;
  if (datosBusqueda.marca) {
    return auto.marca === marca;
  }
  return auto;
}

function filtrarYear(auto) {
  const { year } = datosBusqueda;
  if (datosBusqueda.year) {
    return auto.year === year;
  }
  return auto;
}

function filtrarMinimo(auto) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
}

function filtrarMaximo(auto) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
}

function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;
  if (datosBusqueda.puertas) {
    return auto.puertas === puertas;
  }
  return auto;
}

function filtrarTransmision(auto) {
  const { transmision } = datosBusqueda;
  if (datosBusqueda.transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  const { color } = datosBusqueda;
  if (datosBusqueda.color) {
    return auto.color === color;
  }
  return auto;
}

function noResultado() {
  limpiarHTML();
  const noResultado = document.createElement("div");
  noResultado.classList.add("alerta", "error");
  noResultado.textContent = "No hay resultados";
  resultado.appendChild(noResultado);
}