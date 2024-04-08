const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
//app.use(express.static('presentacion'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'presentacion'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/', require('./routes/router'));


app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});


