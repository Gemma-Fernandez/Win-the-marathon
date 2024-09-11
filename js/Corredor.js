class Corredor{
    constructor(){
        this.x= 50,
        this.y= 200,
        this.h= 80,
        this.w= 70,
        this.speed= 25,

        this.node= document.createElement("img");  //añadimos el corredor al DOM
        this.node.src= "./images/corredora.png";
        gameBoxNode.append(this.node);  //añadimos la corredora a la pantalla del juego


        this.node.style.width= `${this.w}px`;
        this.node.style.height= `${this.h}px`;
        this.node.style.position= "absolute";   //ajustamos el top y left
        this.node.style.top= `${this.y}px`;
        this.node.style.left= `${this.x}px`;

        this.node.style.zIndex="3";

    }

}