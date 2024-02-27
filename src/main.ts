import { botonIniciarPartida, cartasBarajadas  } from "./modelo";
import {  handleClickIniciarPartida  } from "./ui";
import {handleClickCartas   } from "./motor"

botonIniciarPartida.addEventListener('click', handleClickIniciarPartida)


const cargarJuego = () => {
  for (let i = 0; i <= cartasBarajadas.length; i++) {
    console.log(i);
    const carta = document.getElementById(`${i}`) as HTMLDivElement;
    console.log(carta);
    if (carta !== null && carta !== undefined) {
      carta.addEventListener("click", () => {
        handleClickCartas(i);
        
      });
    }
  }
};

document.addEventListener("DOMContentLoaded", cargarJuego);