import express from 'express'
import router from './router'
import db from './config/db'

//Conectar a base de datos
async function connectDB(){
    try {
        
        await db.authenticate()
        db.sync()
        console.log('Conexion exitosa a la bd')

    } catch (error) {
        console.log(error)
        console.log('Hubo un error a conectarse a la base de datos')
    }
}

connectDB()
const server = express()

server.use('/api/products',router)
//Routing

export default server