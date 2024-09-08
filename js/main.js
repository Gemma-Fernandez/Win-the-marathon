//ELEMENTOS PRINCIPALES DEL DOM

const initScreenNode = document.querySelector("#init-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");

const startButtonNode = document.querySelector("#start-btn");

const gameBoxNode = document.querySelector("#game-box");

//VARIABLES GLOBALES DEL JUEGO
let corredor = null;
let piedraArray= [];
const abajoMax= 350;
const arribaMax= 0;


//FUNCIONES GLOBALES DEL JUEGO
function startGame() {
  initScreenNode.style.display = "none"; //cambiamos las pantallas
  gameScreenNode.style.display = "flex";

  corredor = new Corredor(); //añadimos todos los elementos iniciales al juego
   
  setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60)); //iniciamos el intervalo del juego, 60fps
  
   

  setInterval(()=>{
    addPiedra();
  }, 2000)
  
  
}

function gameLoop() {
  //funcion donde se ejecuta 60 veces por seg el intervalo principal
  piedraArray.forEach((eachPiedra)=>{
    //piedraMovement(eachPiedra);
    eachPiedra.automaticMovement();
  })
  
}
function corredorMovement(direction) {
  // console.log('Test Gemma2' +JSON.stringify(corredor));
  if (direction === "ArrowDown") {
    if (!esElLimiteCorredor(corredor.y, direction)) {
      corredor.y += corredor.speed;
      corredor.node.style.top = `${corredor.y}px`;
    }
  } else if (direction === "ArrowUp") {
    if(!esElLimiteCorredor(corredor.y, direction)){
      corredor.y -= corredor.speed;
      corredor.node.style.top = `${corredor.y}px`;
    }
  }
}
function esElLimiteCorredor(position, direction){
  if(direction === "ArrowDown" && position >= abajoMax){
    return true;
  }else if(direction === "ArrowUp" && position <= arribaMax){
    return true;
  }else{
    return false;
  }
}

function addPiedra(){
  if(piedraArray.length <= 10){
    let newPiedra= new Piedra();
  piedraArray.push(newPiedra);
  console.log("piedra añadida")
  }
  
}



//EVENT LISTENERS
startButtonNode.addEventListener("click", startGame); //cuando hacemos click en el boton, inicia el juego

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    corredorMovement(event.key);
  } else if (event.key === "ArrowUp") {
    corredorMovement(event.key);
  }
});



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
