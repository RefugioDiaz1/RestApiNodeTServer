import {Sequelize}from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()

// const db  =new Sequelize('postgresql://rest_api_node_typescript_injv_user:inwMgOHNIxsMvxApyQS48CDmVVhXuAcM@dpg-d6cavlctgctc73d0org0-a.frankfurt-postgres.render.com/rest_api_node_typescript_injv',{

//     dialectOptions:{
//         ssl:{
//             require: false
//         }
//     }
// })

const db  =new Sequelize(process.env.DATABASE_URL!,{
    models: [__dirname + '/../models/**/*.ts']
})

export default db