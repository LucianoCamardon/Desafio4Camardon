const express = require('express');
const handlebars= require('express-handlebars') //primer paso para añadir handlebars.. Luego de ejecutar "npm install express express-handlebars"
const { Server }= require('socket.io')  //primer paso para server socket.io
const router = require('./src/router');

const port = 8080;
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use(express.static(__dirname + '/public'))

app.engine('handlebars', handlebars.engine())  //segundo paso handlebars
app.set('views', __dirname + '/views') //tercer paso, acordarse de crear dichas carpetas y el archivo
app.set('view engine', 'handlebars') //esto es opcional, para no tener que estar colocando la extensión se declara el motor para las vistas 

router(app)

const httpServer = app.listen(port,()=>{  //acá añadí la const httpServer (Socket)
    console.log(`Server opened at port ${port}`)
})
const socketServer = new Server(httpServer)  //ultimo paso para server socket

socketServer.on('connection', socket=>{
    console.log('Hola desde socket.io')
})