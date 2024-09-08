class Piedra {
  constructor() {
    this.x = gameBoxNode.offsetWidth;
    this.y = 50,
    this.h = 40,
    this.w = 40,
    this.speed= 5;


    this.node = document.createElement("img");
    this.node.src = "./images/Piedra.png";
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
