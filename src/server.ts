import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'

//Conectar a base de datos 
async function connectDB(){
    try {
        
        await db.authenticate()
        db.sync()
        console.log(colors.bgGreen.white('Conexion exitosa a la bd'))

    } catch (error) {
        //console.log(error)
        console.log(colors.bgRed.white('Hubo un error a conectarse a la base de datos'))
    }
} 

connectDB()

//Instancia de express
const server = express()

//Leer datos de formularios
server.use(express.json())

server.use('/api/products',router)
//Routing

export default server