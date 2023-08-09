const propiedadesJSON = [
  {
    name: "Casa de campo",
    description: "Un lugar ideal para descansar de la ciudad",
    src: "https://www.construyehogar.com/wp-content/uploads/2020/02/Dise%C3%B1o-casa-en-ladera.jpg",
    rooms: 2,
    m: 170,
  },
  {
    name: "Casa de playa",
    description: "Despierta tus días oyendo el oceano",
    src: "https://media.chvnoticias.cl/2018/12/casas-en-la-playa-en-yucatan-2712.jpg",
    rooms: 2,
    m: 130,
  },
  {
    name: "Casa en el centro",
    description: "Ten cerca de ti todo lo que necesitas",
    src: "https://fotos.perfil.com/2018/09/21/trim/950/534/nueva-york-09212018-366965.jpg",
    rooms: 1,
    m: 80,
  },
  {
    name: "Casa rodante",
    description: "Conviertete en un nómada del mundo sin salir de tu casa",
    src: "https://cdn.bioguia.com/embed/3d0fb0142790e6b90664042cbafcb1581427139/furgoneta.jpg",
    rooms: 1,
    m: 6,
  },
  {
    name: "Departamento",
    description: "Desde las alturas todo se ve mejor",
    src: "https://www.adondevivir.com/noticias/wp-content/uploads/2016/08/depto-1024x546.jpg",
    rooms: 3,
    m: 200,
  },
  {
    name: "Mansión",
    description: "Vive una vida lujosa en la mansión de tus sueños ",
    src: "https://resizer.glanacion.com/resizer/fhK-tSVag_8UGJjPMgWrspslPoU=/768x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/CUXVMXQE4JD5XIXX4X3PDZAVMY.jpg",
    rooms: 5,
    m: 500,
  },
];

const buscarButton = document.getElementById("buscar");
const propiedadesSection = document.getElementById("propiedadesSection");
const totalSpan = document.getElementById("totalSpan");
let totalResultados = 0;

const templatePropiedades = ({ name, description, src, rooms, m }) => {
  return `<div class="propiedad">
  <div class="img" style="background-image: url('${src}')"></div>
  <section>
      <h5>${name}</h5>
      <div class="d-flex justify-content-between">
          <p>Cuartos: ${rooms}</p>
          <p>Metros: ${m}</p>
      </div>
      <p class="my-3">${description}</p>
      <button class="btn btn-info ">Ver más</button>
  </section>
  </div>`;
};

const LimpiarPropiedades = () => (propiedadesSection.innerHTML = "");

const cargarPropiedades = (propiedades = propiedadesJSON) => {
  LimpiarPropiedades();
  totalSpan.textContent = propiedades.length;
  propiedades.forEach((propiedad) => {
    const propiedadTemplate = templatePropiedades(propiedad);
    propiedadesSection.innerHTML += propiedadTemplate;
  });
};

cargarPropiedades();

buscarButton.addEventListener("click", () => {
  const msMin = Number(document.getElementById("msMin").value);
  const msMax = Number(document.getElementById("msMax").value);
  const cuartos = Number(document.getElementById("cuartos").value);
  if (msMin <= 0 || msMax <= 0 || cuartos <= 0 || msMin > msMax) {
    alert("Faltan campos por llenar; Verificar que se usen valores validos.");
    return;
  }
  let resultadosFiltro = funcionFiltro(msMin, msMax, cuartos);
});

function funcionFiltro(msMin, msMax, cuartos) {
  const cantidadResultados = document.getElementById("totalSpan");
  LimpiarPropiedades();
  totalResultados = 0;
  propiedadesJSON.forEach(function (casa) {
    if (casa.m >= msMin && casa.m <= msMax && casa.rooms >= cuartos) {
      console.log(casa);
      totalResultados++; /* aca usaré un contador en vez de usar .length, para mostar una alternativa */
      cantidadResultados.textContent = totalResultados;
      propiedadTemplate = templatePropiedades(casa);
      propiedadesSection.innerHTML += propiedadTemplate;
    }
  });
  if (totalResultados == 0) {
    alert("No se han encontrado resultados.");
    cantidadResultados.textContent = totalResultados;
  }
}