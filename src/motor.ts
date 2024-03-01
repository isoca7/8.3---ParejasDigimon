/*
En el motor nos va a hacer falta un método para barajar cartas
*/
import {
  Tablero,
  tablero,
  Carta,
  numeroIntentos,
  setNumeroIntentos,
} from "./modelo";

const generarNumeroAleatorio = (indiceDelArray: number) =>
  Math.floor(Math.random() * (indiceDelArray + 1));

export const barajarCartas = (cartas: Carta[]): Carta[] => {
  const copiaCartas = [...cartas];
  for (let indice = copiaCartas.length - 1; indice > 0; indice--) {
    let indiceAleatorio = generarNumeroAleatorio(indice);
    [{ ...copiaCartas[indice] }, { ...copiaCartas[indiceAleatorio] }] = [
      copiaCartas[indiceAleatorio],
      copiaCartas[indice],
    ];
  }
  return copiaCartas;
};

/*
      Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
    */
function voltearPrimeraCarta(indice: number) {
  tablero.indiceCartaVolteadaA = indice;
  tablero.cartas[indice].estaVuelta = true;
  tablero.estadoPartida = "UnaCartaLevantada";
}
function voltearSegundaCarta(indice: number) {
  tablero.indiceCartaVolteadaB = indice;
  tablero.cartas[indice].estaVuelta = true;
  tablero.estadoPartida = "DosCartasLevantadas";
}

export const asignarCartasVolteadas = (tablero: Tablero, indice: number) => {
  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    voltearPrimeraCarta(indice);
  } else if (tablero.estadoPartida === "UnaCartaLevantada") {
    voltearSegundaCarta(indice);
  }
};

export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  if (
    tablero.cartas[indice].estaVuelta ||
    tablero.cartas[indice].encontrada ||
    tablero.estadoPartida === "DosCartasLevantadas" ||
    tablero.estadoPartida === "PartidaNoIniciada"
  ) {
    return false;
  }
  return true;
};

/*
      Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
    */

export const sonPareja = (indiceA: number, indiceB: number): boolean => {
  //...
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};

/*
      Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
    */
export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  tablero.estadoPartida = "CeroCartasLevantadas";
 
};

/*
      Aquí asumimos que no son pareja y las volvemos a poner boca abajo
    */
export const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
  setNumeroIntentos(numeroIntentos + 1);
};

/*
      Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
    */
export const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every((carta) => carta.encontrada === true);
};

