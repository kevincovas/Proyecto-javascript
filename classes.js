
class Juego{
    constructor(jugadores){ //Al crear un juego le pasamos el numero de jugadores que van a jugar
        
        this.jugadores = jugadores; //Inicializamos el número de jugadores
        this.mazo = new Array(); //Creamos un array donde guardaremos lar cartas del mazo.
        this.manos = new Array(jugadores); //Creamos un array donde guardaremos las manos de los jugadores.
        this.colores = ["Azul", "Verde", "Rojo", "Amarillo"];
        this.cartasEspeciales = ["prohibido-tirar", "cambio-sentido", "cambio-color", "toma-dos", "toma-cuatro" ];
        this.tablero = new Array(); //Creamos un array donde guardaremos la ultima carta tirada
        this.jugadorActual = this.jugadorInicial(jugadores);
        this.sentidoJuego = "+";
    }

    comprobarJugadores(){ //Si el numero de jugadores es incorrecto habría de hacer un break y mandar un mensaje de error
        if (this.jugadores < 2){
            console.error("Número de jugadores insuficiente");
        }
        else if (this.jugadores >= 2 && this.jugadores <= 8){
            console.log("Número de jugadores correcto")
        }
        else{
            console.error("Demasiados jugadores, selecciona menos jugadores");
        }
    }
    crearManos (){
         
         for(let step = 0; step < this.manos.length; step++){ //Iterar jugadores y crear manos
            this.manos[step] = new Mano(); //Por cada jugador creamos una mano y la guardamos en el array.
            this.repartirCartasInicial(this.manos[step]); //Por cada mano de cada jugador hacemos el reparto inicial de cartas.
         }

        return this.manos;
    }

    repartirCartasInicial(mano){
        
        this.manoCarta = mano;
        
        for(let i=0; i<8; i++){ //Repartimos 8 cartas aleatorias por jugador
            let aleatorio = Math.floor(Math.random() * (this.mazo.length - 0)); //Creamos un número aleatorio  
            this.manoCarta.cartas.push(this.mazo[aleatorio]); //Introducimos la carta en el array de cartas de la mano
            this.mazo.splice(aleatorio,1);
        }
    }

    crearMazo(){
        
        for(let valor = 0; valor < 20;valor++){ //Creamos las cartas númericas(0-9) dos veces
            for(let color = 0; color < this.colores.length; color++){
                    let valorC = valor;
                    if(valor > 9){
                        valorC = valor%10;   
                    }
                    let cartamazo = new Carta(valorC,this.colores[color]);
                    this.mazo.push(cartamazo);   
            }
        }

        for(let valor =0; valor < 10;valor++){ //Creamos las cartas especiales dos veces
            for(let color = 0; color < this.colores.length; color++){
                let valorC = valor;
                if(valor > 4){
                    valorC = valor%5;   
                }
                
                let cartamazo = new Carta(this.cartasEspeciales[valorC],this.colores[color]);
                //let tipo = typeof(cartamazo);
                
                this.mazo.push(cartamazo);
                  
            }
        }
        return this.mazo;
     }

     mostrarCartasMazo(){
        //Recorremos el mazo y mostramos sus cartas
        console.log(`Tamaño de Mazo = ${this.mazo.length}`)
        for(let i=0; i<this.mazo.length;i++){
            console.log(`Mazo{Carta[${i}] = {${this.mazo[i].valor},${this.mazo[i].color}}}`);
        }
     }

     robarCartaMazo(jugador){
        let aleatorio = Math.floor(Math.random() * (this.mazo.length - 0)); //Creamos un número aleatorio  
        this.manos[jugador].cartas.push(this.mazo[aleatorio]); //Introducimos la carta en el array de cartas de la mano
        this.mazo.splice(aleatorio,1);
    }
    
     jugadorInicial(jugadores){
        let aleatorio = Math.floor(Math.random() * (this.jugadores - 0));

        return aleatorio;
     }
     

     comprobarJugadorActual(){
         if(this.sentidoJuego === "+"){
             this.jugadorActual = this.jugadorActual + 1;
            if(this.tablero[this.tablero.length - 1].valor === "prohibido-tirar"){
                this.jugadorActual = this.jugadorActual + 1;
                if(this.jugadorActual >= this.jugadores){
                    this.jugadorActual = this.jugadorActual % this.jugadores;
                }
            }else if(this.tablero[this.tablero.length - 1].valor === "cambio-sentido"){
                this.sentidoJuego = "-";
                this.jugadorActual = this.jugadorActual - 2;
                if(this.jugadorActual < 0 ){
                    this.jugadorActual = this.jugadorActual + this.jugadores;
                }
             }
             else{
                if(this.jugadorActual >= this.jugadores){
                    this.jugadorActual = this.jugadorActual % this.jugadores;
                }
             }
         } else{
            this.jugadorActual = this.jugadorActual - 1;
            if(this.tablero[this.tablero.length - 1].valor === "prohibido-tirar"){
                this.jugadorActual = this.jugadorActual - 1;
                if(this.jugadorActual < 0 ){
                    this.jugadorActual = this.jugadorActual + this.jugadores;
                }
            }else if(this.tablero[this.tablero.length - 1].valor === "cambio-sentido"){
                this.sentidoJuego = "+";
                this.jugadorActual = this.jugadorActual + 2;
                if(this.jugadorActual >= this.jugadores){
                    this.jugadorActual = this.jugadorActual % this.jugadores;
                }
             }
             else{
                if(this.jugadorActual < 0 ){
                    this.jugadorActual = this.jugadorActual + this.jugadores;  
                }
             }
         }
        return this.jugadorActual;
     }

     tirarCarta(jugador,carta){

        console.log(`Longitud mano jugador = ${this.manos[jugador].cartas.length}`);
        if(carta < this.manos[jugador].cartas.length){
            if((this.manos[jugador].cartas[carta].valor === this.tablero[this.tablero.length - 1].valor) || (this.manos[jugador].cartas[carta].color === this.tablero[this.tablero.length - 1].color)){
                this.tablero.push(this.manos[jugador].cartas[carta]);
                this.manos[jugador].cartas.splice(carta,1);
                console.log("Carta tirada correctamente!");
            }
            else{
                console.error("No puedes tirar esta carta!!")
            }
        }
        else{
            console.error("No tienes esta carta!!")
        }
        
    }

    cogerCartaMazo(jugador){
        let aleatorio = Math.floor(Math.random() * (this.mazo.length - 0));
    }

    inicializarTablero(){
        let aleatorio = Math.floor(Math.random() * (this.mazo.length - 0));
        this.tablero.push(this.mazo[aleatorio]);
        this.mazo.splice(aleatorio,1);
    }

    mostrarCartaTablero(){
        let ultimaCartaTablero = this.tablero.length - 1;
        console.log(`Carta Tablero = [Valor =  ${this.tablero[ultimaCartaTablero].valor}, Color = ${this.tablero[ultimaCartaTablero].color}]`);
    }

}

class Mano {
    constructor(){
        this.cartas = new Array();
    }
    calcularPuntuacionMano(){
        let puntuacion = 0;
        for(let i=0;i<this.cartas.length;i++){
            puntuacion += this.cartas[i].puntuacion;
            console.log(`Puntuacion carta[${i}] = ${this.cartas[i].puntuacion}`);
        }
        console.log(`Puntuación mano = ${puntuacion}`);
        return puntuacion;
    }

    mostrarCartasMano(){
        
        for(let j = 0; j<this.cartas.length;j++){
            console.log(`carta[${j}]=[Valor=${this.cartas[j].valor},Color=${this.cartas[j].color},Puntuacion=${this.cartas[j].puntuacion}]`);
        }
        
    }  
}

class Carta {
    constructor(valor,color){
        this.valor = valor;
        this.color = color;
        this.puntuacion = this.calcularPuntuacionCarta(this.valor);
        this.visibilidad = false;
    }
    calcularPuntuacionCarta (valor){
        if(this.valor >= 0 && this.valor <= 9 ){
            this.puntuacion = this.valor;
        }
        else if(this.valor === "prohibido-tirar" || this.valor === "toma-dos" || this.valor === "cambio-sentido"){
            this.puntuacion = 20;
        }
        else{
            this.puntuacion = 50;
        }
        return this.puntuacion
    }

}

module.exports = {
    Juego,
    Mano,
    Carta
};

