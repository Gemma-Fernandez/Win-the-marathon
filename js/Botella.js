class Botella{
    constructor(positiony){
        this.x= gameBoxNode.offsetWidth;
        this.y= positiony,
        this.h= 40,
        this.w= 20,
        this.speed= 4,

        this.node= document.createElement("img");  //añadimos la botella al DOM
        this.node.src= "./images/bebida-energetica.png";
        gameBoxNode.append(this.node);  //añadimos la botella a la pantalla del juego


        this.node.style.width= `${this.w}px`;
        this.node.style.height= `${this.h}px`;
        this.node.style.position= "absolute";   //ajustamos el top y left
        this.node.style.top= `${this.y}px`;
        this.node.style.left= `${this.x}px`;
    }

    automaticMovementBot(){
        this.x -= this.speed;
        this.node.style.left = `${this.x}px`;
      }
}