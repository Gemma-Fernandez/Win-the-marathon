class Piedra {
  constructor(positionY, type) {
    this.x = gameBoxNode.offsetWidth;
    this.y = positionY,
    this.h = 35,
    this.w = 40,
    this.speed= 4;


    this.node = document.createElement("img");
    if(type === "pequeña"){
        this.node.src = "./images/Piedra.png";
    }else if( type === "grande"){
        this.node.src = "./images/piedra-grande.png";
    }else if(type === "botella"){
        this.node.src= "./images/botella_vacia.png";
    }
    
    gameBoxNode.append(this.node); //añadimos la piedra a la pantalla del juego

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute"; //ajustamos el top y left
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }
  automaticMovement(){
    this.x -= this.speed;
    this.node.style.left = `${this.x}px`;
  }
}
