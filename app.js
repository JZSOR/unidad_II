const http = require('http');
const fs = require('fs');
// Importar el módulo express y path
const express = require('express');
const path = require('path');
// Generar el objeto principal
const app = express();
// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Middleware para manejar datos
app.use(express.urlencoded({extended: true}));
// Decoración
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

let datos = JSON.parse(fs.readFileSync('datos.json','utf8'));

// Primer petición GET
app.get('/', (req, res) => {
    res.render('index',{titulo:"Listado de Alumnos",listado:datos});
});


app.get('/practica01', (req, res) => {
    res.render('practica01');
})
app.post('/p01', (req, res) => {
    // Para recibir datos de un formulario
    const params = {
        numero : req.body.numero
    }
    res.render('practica01',params);
})

app.get('/practica02', (req, res) => {
    res.render('practica02', { valor: null, pinicial: null, plazos: null });
})
app.post('/cotizacion', (req, res) => {
    const { valor, pinicial, plazos } = req.body;
    const params = {
        valor: parseFloat(valor),
        pinicial: parseFloat(pinicial),
        plazos: parseInt(plazos)
    }
    res.render('practica02',params);
})


const puerto = 3000;

app.listen(puerto, () => {
    console.log("El puerto esta escuchando");

});