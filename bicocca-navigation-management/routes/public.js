const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    //prima pagina
    res.send('<p>prima pagina log In<p>');
    next();
});


/* esporto i percorsi da utilizzare dove voglio */
module.exports = router;