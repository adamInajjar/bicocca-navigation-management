const express = require('express');
const bodyParser = require('body-parser');

//app è un gestore di richieste con le funzionalita di express
const app  = express();
const adminRoutes = require('./routes/admin.js');
const publicRoutes = require('./routes/public.js');
const path = require('path');


/*parser body  per ogni richiesta in arrivo viene eseguita il midlewareSS*/
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));

app.use(adminRoutes); 
app.use(publicRoutes);

app.use((req, res, next) =>{
    res.status(404).sendFile(path.join( __dirname, 'views', '404.html'));
});


app.listen(3000);