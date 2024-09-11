class Donut{
    constructor(positionY) {
        this.x = gameBoxNode.offsetWidth;
        this.y = positionY,
        this.h = 40,
        this.w = 55,
        this.speed= speedGlobal;
        /*this.vidas= vidas;*/

        this.node= document.createElement("img");  //añadimos el corredor al DOM
        this.node.src= "./images/donut.png";
        gameBoxNode.append(this.node);  //añadimos la corredora a la pantalla del juego


        this.node.style.width= `${this.w}px`;
        this.node.style.height= `${this.h}px`;
        this.node.style.position= "absolute";   //ajustamos el top y left
        this.node.style.top= `${this.y}px`;
        this.node.style.left= `${this.x}px`;

        this.node.style.zIndex="2";
    }
    automaticMovementD(){
        this.x -= speedGlobal;
        this.node.style.left = `${this.x}px`;
      }
}