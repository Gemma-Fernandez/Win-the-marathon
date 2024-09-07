//ELEMENTOS PRINCIPALES DEL DOM

const initScreenNode = document.querySelector("#init-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");

const startButtonNode = document.querySelector("#start-btn");

const gameBoxNode = document.querySelector("#game-box");

//VARIABLES GLOBALES DEL JUEGO

//FUNCIONES GLOBALES DEL JUEGO
function startGame() {
  initScreenNode.style.display = "none"; //cambiamos las pantallas
  gameScreenNode.style.display = "flex";

  let corredor= new Corredor();  //añadimos todos los elementos iniciales al juego

  setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60)); //iniciamos el intervalo del juego, 60fps
}

function gameLoop() {     //funcion donde se ejecuta 60 veces por seg el intervalo principal

}

//EVENT LISTENERS
startButtonNode.addEventListener("click", startGame); //cuando hacemos click en el boton, inicia el juego



// PLANIFICACION 

//Definir objetos
//colisiones
//atrapar objetos

//objetos aparecen
//objetos desaparacen

//movimiento del corredor
//movimiento de los objetos
//velocidad objetos
//game over

//aumento de vidas
//audio