class Botella{
    constructor(positiony, type, vidas){
        this.x= gameBoxNode.offsetWidth;
        this.y= positiony,
        this.h= 40,
        this.w= 20,
        this.speed= speedGlobal,
        this.vidas= vidas

        this.node= document.createElement("img");  //añadimos la botella al DOM
        if(type === "unaVida"){
            this.node.src= "./images/bebida-energetica.png";
        }else if( type === "dosVidas"){
            this.node.src= "./images/platano.png";
        }

               
        gameBoxNode.append(this.node);  //añadimos la botella a la pantalla del juego


        this.node.style.width= `${this.w}px`;
        this.node.style.height= `${this.h}px`;
        this.node.style.position= "absolute";   //ajustamos el top y left
        this.node.style.top= `${this.y}px`;
        this.node.style.left= `${this.x}px`;

        this.node.style.zIndex="2";

    }

    automaticMovementBot(){
        this.x -= speedGlobal;
        this.node.style.left = `${this.x}px`;
      }
}