const Stanza = require('./modelRoom');
const path = require('path');
const rootDir = require('../util/path.js');
const ColorMap = require('../util/setColorRoom.js');

class ModelFloor {
    constructor(idPiano, room) {
        this.idPiano =idPiano;
        this.stanza = room;
    }

    showdata(){
        console.log( this.idPiano );
    }
    
    saveRoom(){
        const fs = require('fs');
        const fileName = path.join( rootDir, 'jsonfile', this.idPiano + '.json')
        let objPiano;
        let jsonfile;
        let cerca = false;
        if (fs.existsSync(fileName)) {
            jsonfile = fs.readFileSync(fileName);  
            objPiano = JSON.parse(jsonfile);
            console.log(objPiano);
        }else{
            console.log( this.idPiano);
            console.log("file non presente");
        }
         
        for (let i = 0; i < objPiano.stanze.length; i++) {
            if (objPiano.stanze[i].id == this.stanza.id) {
              cerca = true;
              objPiano.stanze[i].nome = this.stanza.nome || objPiano.stanze[i].nome;
              objPiano.stanze[i].tipologia = this.stanza.tipologia || objPiano.stanze[i].tipologia;
              objPiano.stanze[i].apertura = this.stanza.apertura || objPiano.stanze[i].apertura;
              objPiano.stanze[i].chiusura = this.stanza.chiusura || objPiano.stanze[i].chiusura;
              objPiano.stanze[i].viabilita = this.stanza.viabilita || objPiano.stanze[i].viabilita;
              objPiano.stanze[i].colore = this.stanza.colore || objPiano.stanze[i].colore;
            }
          }
        if(cerca == false){
            console.log('non trovata la stanza');
            objPiano.stanze.push(this.stanza);
        }
        fs.writeFileSync(fileName, JSON.stringify(objPiano));
    }
    
}
module.exports = ModelFloor;