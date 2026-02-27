// import request  from "supertest";
import server, {connectDB} from "../server";
import db from '../config/db'


// describe('GET /api', () => { 
    
//     it('should send back a jeson response', async ()=>{

//         const res = await request(server).get('/api')    

//         expect(res.status).toBe(200)
//         expect(res.headers['content-type']).toMatch(/json/)
//         expect(res.body.msg).toBe('Desde Api')

//         expect(res.status).not.toBe(404)
//         expect(res.body.msg).not.toBe('desde api')

//         // console.log(res.text.msg)
//         //console.log(res.body.msg)
//     })

//  })


    jest.mock('../config/db')

    describe('connectDB', () => { 
    
    it('should handle database connection error', async ()=>{

       jest.spyOn(db,'authenticate').mockRejectedValueOnce(new Error('Hubo un error a conectarse a la base de datos'))

       const consoleSpy = jest.spyOn(console,'log')
       await connectDB()

       expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Hubo un error a conectarse a la base de datos')
       )
    })

 })



// describe('Nuestri primer test', ()=>{
    
//     it('Debe revisar que 1 + 1 sean 2',()=>{

//         expect(1+1).toBe(2)

//     })

//     it('Debe revisar que 1 + 1 no sean 3',()=>{

//         expect(1+1).not.toBe(3)

//     })
// })

