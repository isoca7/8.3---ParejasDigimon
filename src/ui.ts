import {
  cartasBarajadas,
  tablero,
  Tablero,
  numeroIntentos,
  botonIniciarPartida,
  setNumeroIntentos,
} from "./modelo";

import {
  sePuedeVoltearLaCarta,
  asignarCartasVolteadas,
  sonPareja,
  esPartidaCompleta,
} from "./motor";

export const cambiarImagenCarta = (indice: number) => {
  const elementoImagen = document.getElementById(
    `img-${indice}`
  ) as HTMLImageElement;
  const contenedorCarta = document.getElementById(
    `${indice}`
  ) as HTMLDivElement;

  if (elementoImagen !== null && elementoImagen !== undefined) {
    elementoImagen.src = cartasBarajadas[indice].imagen;
    contenedorCarta.style.backgroundColor= "#2b2768;"
    contenedorCarta.style.transform= "rotateY(180deg)"
    contenedorCarta.style.transition= "all 0.5s linear"
  }
};

export const handleClickIniciarPartida = () => {
  const contenedorJuego = document.getElementById("juego");
  iniciarPartida(tablero);
  if (contenedorJuego !== null && contenedorJuego !== undefined) {
    contenedorJuego.classList.remove("hidden");
  }
  muestraNumeroDeIntentos();
};

export const iniciarPartida = (tablero: Tablero): void => {
  tablero.estadoPartida = "CeroCartasLevantadas";
  const contenedorBotones = document.getElementById("contenedor-botones");
  if (contenedorBotones !== null && contenedorBotones !== undefined) {
    contenedorBotones.removeChild(botonIniciarPartida);
  }
};
export const muestraNumeroDeIntentos = () => {
  const contenedorBotones = document.getElementById("contenedor-botones");
  if (contenedorBotones !== null && contenedorBotones !== undefined) {
    contenedorBotones.innerHTML = `<p>Numero de Intentos</p><p>${numeroIntentos}</p>`;
  }
};

export const taparCartas = (indiceA: number, indiceB: number) => {
  const elementoImagen1 = document.getElementById(`img-${indiceA}`);

  const elementoImagen2 = document.getElementById(`img-${indiceB}`);

  setTimeout(() => {
    if (
      elementoImagen1 !== null &&
      elementoImagen1 !== undefined &&
      elementoImagen2 !== null &&
      elementoImagen2 !== undefined &&
      elementoImagen1 instanceof HTMLImageElement &&
      elementoImagen2 instanceof HTMLImageElement
    ) {
      darleLaVueltaImagen(elementoImagen1, indiceA);
      darleLaVueltaImagen(elementoImagen2, indiceB);
    }
  }, 1000);
};
const darleLaVueltaImagen = (elementoImagen: HTMLImageElement, indice:number) => {
  const contenedorCarta = document.getElementById(
    `${indice}`
  ) as HTMLDivElement;
  if (elementoImagen !== null && elementoImagen !== undefined) {
    elementoImagen.src = "./src/img/digimon.png";
    contenedorCarta.style.backgroundColor= ""
    contenedorCarta.style.transform= ""
    contenedorCarta.style.transition= ""
  }
};

export const ganarPartida = () => {
  const contenedorMensajeVictoria = document.createElement("div");
  contenedorMensajeVictoria.classList.add("contenedor-mensaje-victoria");
  const mensajeVictoria = document.createElement("h1");
  mensajeVictoria.classList.add("mensaje-victoria");
  mensajeVictoria.textContent = "¡Felicidades has Ganado!";
  document.body.appendChild(contenedorMensajeVictoria);
  contenedorMensajeVictoria.appendChild(mensajeVictoria);
  const botonRestart = document.createElement("boton-reset");
  botonRestart.classList.add("boton");
  botonRestart.textContent = "RESTART";
  botonRestart.setAttribute("onclick", "location.reload()");
  contenedorMensajeVictoria.appendChild(botonRestart);
};
export const handleClickCartas = (indice: number) => {
  if (sePuedeVoltearLaCarta(tablero, indice)) {
    cambiarImagenCarta(indice);
    asignarCartasVolteadas(tablero, indice);
  }
  comprobarSiEsLaSegundaCarta();
  muestraNumeroDeIntentos();
};

const comprobarSiEsLaSegundaCarta = () => {
  const indiceA = tablero.indiceCartaVolteadaA;
  const indiceB = tablero.indiceCartaVolteadaB;
  if (indiceA !== undefined && indiceB !== undefined) {
    sonPareja(indiceA, indiceB)
      ? parejaEncontrada(tablero, indiceA, indiceB)
      : noHeEncontradoLaPareja(tablero, indiceA, indiceB);
  }
};

const noHeEncontradoLaPareja = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
) => {
  parejaNoEncontrada(tablero, indiceA, indiceB);
  taparCartas(indiceA, indiceB);
};
const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  tablero.estadoPartida = "CeroCartasLevantadas";
  if (esPartidaCompleta(tablero)) {
    ganarPartida();
  }
};

/*
      Aquí asumimos que no son pareja y las volvemos a poner boca abajo
    */
const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  tablero.estadoPartida = "CeroCartasLevantadas";
  setNumeroIntentos(numeroIntentos + 1);
};
