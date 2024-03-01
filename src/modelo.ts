import { barajarCartas } from "./motor"

export let numeroIntentos : number = 0
export const setNumeroIntentos = (valor : number) =>{
  numeroIntentos=valor
}

export interface Carta {
  idFoto: number // id del 1 al 6 para 12 cartas, así identificamos rápido si es un gatito ,un perrito...
  // el ID se repete 2 veces en el array de cartas (hay dos cartas de un perro, hay dos cartas de un gato)
  imagen: string // por comodidad repetimos la url de la imagen
  estaVuelta: boolean
  encontrada: boolean
}

interface InfoCarta {
  idFoto: number
  imagen: string
}

const infoCartas: InfoCarta[] = [
  /* Aquí ponemos seis cartas siguiendo la interfaz de InfoCarta */
  {
    idFoto: 1,
    imagen: './src/img/agumon.png',
  },
  {
    idFoto: 2,
    imagen: './src/img/angewomon.png',
  },
  {
    idFoto: 3,
    imagen: './src/img/devimon.jpg',
  },
  {
    idFoto: 4,
    imagen: './src/img/patamon.png',
  },
  {
    idFoto: 5,
    imagen: './src/img/tailmon.jpg',
  },
  {
    idFoto: 6,
    imagen: './src/img/gabumon.png',
  },
]
export const botonIniciarPartida = document.getElementById(
  'iniciar-partida'
) as HTMLButtonElement

export const botonReiniciarPartida = document.getElementById("boton-reset")

const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
  idFoto,
  imagen,
  estaVuelta: false,
  encontrada: false,
})

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
  /* Aquí crearemos un array de cartas a partir de un array de infoCartas
     y duplicaremos las cartas para que haya dos de cada tipo.
  */
  const cartasTransformadas = infoCartas.map((carta) =>
    crearCartaInicial(carta.idFoto, carta.imagen)
  )

  return [...cartasTransformadas, ...cartasTransformadas]
}

export let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas)

export let cartasBarajadas = barajarCartas(cartas)
/*
  Aquí definimos el tipo de estado de la partida, la idea es que cuando empiece la partida todas las cartas estén boca abajo y si se hacen click sobre ellas no se volteen.
  EstadoPartida = "PartidaNoIniciada", una vez que se pulse Iniciar partida el estado de la partida cambiaría a "CeroCartasLevantadas" y así sucesivamente.
*/

type EstadoPartida =
  | 'PartidaNoIniciada'
  | 'CeroCartasLevantadas'
  | 'UnaCartaLevantada'
  | 'DosCartasLevantadas'
  | 'PartidaCompleta'

export interface Tablero {
  cartas: Carta[]
  estadoPartida: EstadoPartida
  indiceCartaVolteadaA?: number
  indiceCartaVolteadaB?: number
}


const crearTableroInicial = (): Tablero => ({
  cartas: cartasBarajadas,
  estadoPartida: 'PartidaNoIniciada',
})

export let tablero: Tablero = crearTableroInicial()

