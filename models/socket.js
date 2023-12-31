const BandList = require("./band-list");

class Sockets{

    constructor( io ){
        this.io = io;
        
        this.bandList = new BandList();
        
        this.socketEvents();
        
    }

    
    socketEvents(){

        // On connection
        this.io.on('connection', ( socket ) => { 
            
            console.log('Client connected');

            //Emitir al cliente conectado todas las bandas actulaes
            socket.emit('current-bands', this.bandList.getBands() );
            
            //Votar por la banda
            socket.on('votar-band', (id) =>{
                this.bandList.increaseVotes( id ); 
                this.io.emit('current-bands', this.bandList.getBands() );
            });
            
            //Borrar banda
            socket.on('borrar-band', (id) =>{
                this.bandList.removeBand( id ); 
                this.io.emit('current-bands', this.bandList.getBands() );
            });
            
            //Cambiar nombre de la banda
            socket.on('cambiar-nombre-band', ({ id, nombre }) =>{
                this.bandList.changeBandName( id, nombre ); 
                this.io.emit('current-bands', this.bandList.getBands() );
            });
            
            //Crear banda
            socket.on('crear-band', ({ nombre }) =>{
                this.bandList.addBand( nombre ); 
                this.io.emit('current-bands', this.bandList.getBands() );
            });
            
        });
    }
    
}



module.exports = Sockets;