import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import  cors,{CorsOptions} from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec,{seaggerUIOptions} from './config/swagger'


//Conectar a base de datos 
export async function connectDB(){
    try {
        
        await db.authenticate()
        db.sync()
        //console.log(colors.bgGreen.white('Conexion exitosa a la bd'))

    } catch (error) {
        //console.log(error)
        console.log(colors.bgRed.white('Hubo un error a conectarse a la base de datos'))
    }
} 

connectDB()

//Instancia de express
const server = express()

//Permitir Conexiones desde el cliente
const corsOptions  : CorsOptions= {
    // El origin es la informacion de donde se pueden hacer las peticiones, en este caso el cliente y el callback es una funcion que se ejecuta despues de validar el origin, si el origin es valido se llama a callback con null y true, si no es valido se llama a callback con un error
    origin: function(origin, callback){

        // Aqui se valida el origin, si no existe el origin se permite el acceso, esto es util para herramientas como Postman o para acceder directamente desde el navegador, si el origin es igual al FRONTEND_URL se permite el acceso, si no se permite el acceso se devuelve un error
        if (!origin) {
            // Permite acceso directo desde navegador o herramientas como Postman
            return callback(null, true)
        }

        // console.log(origin)
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true)
        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

//Permitir Conexiones desde el cliente
server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products',router)
//Routing

// server.get('/api', (req,res)=>{
//     res.json({msg: 'Desde Api'}) 
// })

//Docs 
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,seaggerUIOptions))

export default server