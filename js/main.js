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
let loseAudio= new Audio ("./audios/pierdes-vida.wav");  //audio para cuando pierdes vidas
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
let donutArray= [];


let gameIntervalId= null;
let piedraIntervalId= null;


//FUNCIONES GLOBALES DEL JUEGO
function startGame() {
  initScreenNode.style.display = "none"; //cambiamos las pantallas
  gameScreenNode.style.display = "flex";

  corredor = new Corredor(); //añado elementos iniciales al juego
  addInitialCarretera();
  
     
  gameIntervalId= setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60)); //iniciamos el intervalo del juego, 60fps
  
   piedraIntervalId= setInterval(()=>{
    addPiedra();
  }, 1500)

  setInterval(()=>{
    addDonut();
  }, 3075)

  setInterval(()=>{
    addBotella();
  }, 10575)

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
  donutArray.forEach((eachDonut)=>{
    eachDonut.automaticMovementD();
  })

  checkedElementExit(piedraArray);
  colisionesPiedras();
  checkedElementExit(botellaArray);
  colisionesBotellas(); 
  checkedElementExit(carreteraArray);
  colisionesDonut();
  checkedElementExit(donutArray);
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
  let randomPositionY= Math.floor(Math.random()*190)

   let newPiedra= new Piedra(randomPositionY, "pequeña", 1);
  piedraArray.push(newPiedra);
  console.log("piedra añadida")
  
  setTimeout(() => {   //piedraGrande saldrá un poco despues en la pantalla
    let piedraMasGrande= new Piedra(randomPositionY + 250, "grande", 1);
  piedraArray.push(piedraMasGrande);
  }, 3000);

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
  let newCarretera= new Carretera (gameBoxNode.offsetWidth);
  carreteraArray.push(newCarretera);

}
function addInitialCarretera(){
  let newCarretera1= new Carretera (-40);
  carreteraArray.push(newCarretera1);

  let carreteraDistanciaEntre= 45;
  let newCarretera2= new Carretera (newCarretera1.x + newCarretera1.w + carreteraDistanciaEntre);
  carreteraArray.push(newCarretera2);

  let newCarretera3= new Carretera (newCarretera2.x + newCarretera2.w+ carreteraDistanciaEntre);
  carreteraArray.push(newCarretera3);

  let newCarretera4= new Carretera (newCarretera3.x + newCarretera3.w+ carreteraDistanciaEntre);
  carreteraArray.push(newCarretera4);

  let newCarretera5= new Carretera (newCarretera4.x + newCarretera4.w+ carreteraDistanciaEntre);
  carreteraArray.push(newCarretera5);

  let newCarretera6= new Carretera (newCarretera5.x + newCarretera5.w+ carreteraDistanciaEntre);
  carreteraArray.push(newCarretera6);

}

function addDonut(){
  let randomPositionD= Math.floor(Math.random()*180)

  let newDonut= new Donut(randomPositionD+150);
  donutArray.push(newDonut);
}

function checkedElementExit(arr){
  if(arr.length === 0){
    return //si el array esta vacio, nos se ejecuta
  }
  if((arr[0].x + arr[0].w) <=0){   //se eliminan las piedras cuando salen de la pantalla
    arr[0].node.remove() //sacamos del DOM
    arr.shift();
   
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

      if(numberVidas <= 0){
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

function colisionesDonut(){
  donutArray.forEach((eachDonut, index)=>{
    if (
      corredor.x < eachDonut.x + eachDonut.w &&
      corredor.x + corredor.w > eachDonut.x &&
      corredor.y < eachDonut.y + eachDonut.h &&
      corredor.y + corredor.h > eachDonut.y
    ) { 
      eachDonut.node.remove();
      donutArray.splice(index, 1); 

      corredor.slowDown();
    }
  })  
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
startButtonNode.addEventListener("click", startGame); //cuando hago click en el boton, inicia el juego


window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    corredorMovement(event.key);
  } else if (event.key === "ArrowUp") {
    corredorMovement(event.key);
  }
});

endButtonNode.addEventListener("click", ()=>{     //boton para reiniciar el juego
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
