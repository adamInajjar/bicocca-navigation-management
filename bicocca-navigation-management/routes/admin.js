const path = require('path');
const express = require('express');
const router = express.Router();
const app = express();

const Stanza = require('../model/modelRoom.js');
const Piano = require('../model/modelFloor.js');
const rootDir = require('../util/path.js');
const ColorMap = require('../util/setColorRoom.js');

router.use('/areaManagement', (req, res, next) => {
    res.sendFile(path.join( rootDir, 'views', 'areaManagement.html'));
   
});

/* restituisce il file json richiesto */
router.get('/api/jsonfile/dataPiano/:name', (req ,res, next) =>{
    //console.log(req);
    const name = req.params.name;
    console.log( __dirname);
    res.sendFile(`${name}.json`, { root: __dirname + '/../jsonfile'});
});


/*router.use('/gestioneMappe', (req, res, next) => {
    res.sendFile(path.join( rootDir, 'views', 'gestioneMappe.html'));
   
});

router.use('/gestioneEdifici',(req, res, next) => {
    res.sendFile(path.join( rootDir, 'views', 'gestioneEdifici.html'));

});*/
  

/*per il backend dove salvare i dati e le modifiche della mappa */
router.use('/salvaJson',(req, res, next) => {
   let colorRoom = new ColorMap(req.body.tipologia);
   let color = colorRoom.getColor();
   let setRoom = new Stanza(
      req.body.idArea, 
      req.body.nome, 
      req.body.tipologia,
      req.body.apertura,
      req.body.chiusura,
      req.body.viabilita,
      color
    );
    let setPiano = new Piano(req.body.idPiano, setRoom);
    console.log(req.body.apertura +"orario apertura");
    console.log(setRoom);
    setPiano.showdata();
    setPiano.saveRoom();
    next();
});


/* esporto i percorsi da utilizzare dove voglio */
module.exports = router;