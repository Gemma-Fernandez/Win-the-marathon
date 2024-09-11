//ELEMENTOS PRINCIPALES DEL DOM

const initScreenNode = document.querySelector("#init-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");

const startButtonNode = document.querySelector("#start-btn");
const endButtonNode= document.querySelector("#end-btn");
const onButtonNode= document.querySelector("#audioOn");
const offButtonNode= document.querySelector("#audioOff");

const gameBoxNode = document.querySelector("#game-box");

const numberVidasNode= document.querySelector("#numberVidas");


let winAudio= new Audio ("./audios/ganas-vida.wav");  //audio para cuando ganas vidas
let loseAudio= new Audio ("./audios/pierdes-vida.wav");  //para para cuando pierdes vidas
let soundMain= new Audio ("./audios/marathon-audio.wav")  //audio de fondo


//VARIABLES GLOBALES DEL JUEGO
let corredor = null;
let piedraArray= [];
const abajoMax= 350;
const arribaMax= 0;
let botellaArray=[];
let numberVidas= 2; //contador de vidas
let speedGlobal= 3;   //velocidad principal de todos los objetos
let carreteraArray= [];


let gameIntervalId= null;
let piedraIntervalId= null;


//FUNCIONES GLOBALES DEL JUEGO
function startGame() {
  initScreenNode.style.display = "none"; //cambiamos las pantallas
  gameScreenNode.style.display = "flex";

  corredor = new Corredor(); //añadimos todos los elementos iniciales al juego
     
  gameIntervalId= setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60)); //iniciamos el intervalo del juego, 60fps
  
   piedraIntervalId= setInterval(()=>{
    addPiedra();
  }, 2000)

  setInterval(()=>{
    addBotella();
  }, 20000)

  setInterval(()=>{
    speedGlobal += 0.7;
  }, 6000);

  setInterval(()=>{
    addCarretera();
  }, 600)
  
}

function gameLoop() {
  //funcion donde se ejecuta 60 veces por seg el intervalo principal
  carreteraArray.forEach((eachCarretera)=>{
    eachCarretera.automaticMovementCarr();
  })
  piedraArray.forEach((eachPiedra)=>{
    //piedraMovement(eachPiedra);
    eachPiedra.automaticMovement();
  })
  botellaArray.forEach((eachBotella)=>{
    eachBotella.automaticMovementBot();
  })
  checkedPiedraSalio();
  colisionesPiedras();
  checkedBotellaExit();
  colisionesBotellas(); 
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
  let randomPositionY= Math.floor(Math.random()*180)

   let newPiedra= new Piedra(randomPositionY, "pequeña", 1);
  piedraArray.push(newPiedra);
  console.log("piedra añadida")
  
  setTimeout(() => {   //piedraGrande saldrá un poco despues en la pantalla
    let piedraMasGrande= new Piedra(randomPositionY + 250, "grande", 1);
  piedraArray.push(piedraMasGrande);
  }, 3000);

  setTimeout(()=>{
    let donutRosa= new Piedra (randomPositionY + 100, "donut", 1);
  piedraArray.push(donutRosa)
  }, 9550); 

  setTimeout(()=>{
    let perroEnojado= new Piedra (randomPositionY + 150, "perro", 2);
  piedraArray.push(perroEnojado)
  }, 25000);
}

function addBotella(){
  let randomPositionBotella= Math.floor(Math.random()* 180)
  let newBotella= new Botella(randomPositionBotella, "unaVida", 1);
  botellaArray.push(newBotella);

  setTimeout(() => {   //botella que te da 2 vidas saldrá un poco despues en la pantalla
    let botellaMasVidas= new Botella (randomPositionBotella + 100, "dosVidas", 2);
    botellaArray.push(botellaMasVidas);
  }, 10000);
  
}

function addCarretera(){
  let newCarretera= new Carretera ();
  carreteraArray.push(newCarretera);
}

function checkedPiedraSalio(){
  if(piedraArray.length === 0){
    return //si el array esta vacio, nos se ejecuta
  }
  if((piedraArray[0].x + piedraArray[0].w) <=0){   //se eliminan las piedras cuando salen de la pantalla
    piedraArray[0].node.remove() //sacamos del DOM
    piedraArray.shift();
   
  }
}
function checkedBotellaExit(){
  if(botellaArray.length === 0){
    return
  }
  if((botellaArray[0].x + botellaArray[0].w)<=0){
    botellaArray[0].node.remove()
    botellaArray.shift();
  }
}

function colisionesPiedras(){
  piedraArray.forEach((eachPiedra, index)=>{
    if (
      corredor.x < eachPiedra.x + eachPiedra.w &&
      corredor.x + corredor.w > eachPiedra.x &&
      corredor.y < eachPiedra.y + eachPiedra.h &&
      corredor.y + corredor.h > eachPiedra.y
    ) { 
      eachPiedra.node.remove();
      piedraArray.splice(index, 1);  //eliminamos el objeto con el colisiona
    
      numberVidas-= eachPiedra.vidas;
      numberVidasNode.innerText=numberVidas;
      loseAudio.play();

      if(numberVidas ===0){
        gameOver();
      } 
    }
  });
}
function colisionesBotellas(){
  botellaArray.forEach((eachBotella, index)=>{
      if(
        corredor.x < eachBotella.x + eachBotella.w &&
      corredor.x + corredor.w > eachBotella.x &&
      corredor.y < eachBotella.y + eachBotella.h &&
      corredor.y + corredor.h > eachBotella.y
      ){
        eachBotella.node.remove();
        botellaArray.splice(index, 1)   //eliminamos la botella con la que colisiona

        numberVidas+= eachBotella.vidas;
        numberVidasNode.innerText= numberVidas;

        winAudio.play();
        
      }
  });
    
}

function gameOver(){
    clearInterval (gameIntervalId);
    clearInterval (piedraIntervalId);

    gameBoxNode.innerHTML= "";


    gameScreenNode.style.display="none"
    gameOverScreenNode.style.display= "flex";
}

function resetGame(){
  numberVidas=1;
  numberVidasNode.innerText= numberVidas;
  
  piedraArray=[]
  botellaArray=[]

  gameBoxNode.innerHTML= ""

  corredor= null;

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

endButtonNode.addEventListener("click", ()=>{
  gameOverScreenNode.style.display= "none";
  initScreenNode.style.display= "flex";

  resetGame();
} );

onButtonNode.addEventListener("click", ()=>{     //cuando pulso boton On el audio se activa
  soundMain.play();
});

offButtonNode.addEventListener("click", ()=>{   //cuando pulso boton Off el audio se pausa
  soundMain.pause();
})




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
