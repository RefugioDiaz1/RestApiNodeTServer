import request  from "supertest";
import server from "../server";

describe('GET /api', () => { 
    
    it('should send back a jeson response', async ()=>{

        const res = await request(server).get('/api')    

        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.msg).toBe('Desde Api')

        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('desde api')

        // console.log(res.text.msg)
        //console.log(res.body.msg)
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

