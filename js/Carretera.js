class Carretera{
    constructor(positionX){
        this.x= positionX;
        this.y= 217,
        this.h= 10,
        this.w= 95,
        this.speed= 4,

        this.node= document.createElement("img");  //añadimos al DOM
        this.node.src= "./images/rectangulo.png";
        gameBoxNode.append(this.node);  //añadimos a la pantalla del juego

        
        this.node.style.width= `${this.w}px`;
        this.node.style.height= `${this.h}px`;
        this.node.style.position= "absolute";   //ajustamos el top y left
        this.node.style.top= `${this.y}px`;
        this.node.style.left= `${this.x}px`;

        this.node.style.zIndex="1";
    }
    automaticMovementCarr(){
        this.x -= this.speed;
        this.node.style.left = `${this.x}px`;
      }
}