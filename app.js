const express = require("express")
const cors = require("cors")
const morgan = require("morgan") 

// Variables & App
const app = express()
const port = 3001

app.use(cors())
//MIDDLEWARE, para recibir bodies de formato json
app.use(express.json({limit : "50mb"}))

// endpoint
app.set('title', 'Hi, The requested page is not available');

app.get('/*', (req, res) => {
    res.send(app.get('title'));
    console.log(app.get('title'));
})

// morgan se borra en fase de produccion
app.use(morgan("dev"))

//conexion
app.listen(port, ()=>{
    console.log(`Server corriendo en el puerto ${port}`)
})