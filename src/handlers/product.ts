import {Request, Response} from 'express'
import Product from '../models/Productos.models'
import {check, validationResult } from 'express-validator'

export const getProduct= async (req, res) => {

    try {

        const products = await Product.findAll({
            order: [
                ['id','DESC']
            ],
            // attributes: {
            //     exclude: ['createdAt','updatedAt']
            // }
        })
        res.json({data: products})

        res.json('Desde GET')
    } catch (error) {
        console.log(error)
    }
    

}


export const getProductById= async (req, res) => {

    try {
        
        const {id} = req.params
        const product = await Product.findByPk(id)
        if (!product) {
            return res.status(404).json({
                error: 'Producto no Encontrado'
            })
        }
        res.json({data:product})

    } catch (error) {
        console.log(error)
    }
    

}


export const createProduct =async (req : Request, res: Response) => {
 
    //Validacion  --> se puede hacer aqui o en el router, se usa check con asincronia y body sin asincrono
    // await check('name')
    //         .notEmpty().withMessage('El nombre del producto no puede ir vacio')
    //         .run(req)
    
    // await check('price')
    //         .isNumeric().withMessage('Valor no Válido')
    //         .notEmpty().withMessage('EL precio del producto no puede ir vacio')
    //         .custom((value)=> value > 0).withMessage('Precio no Válido')
    //         .run(req)

    // let errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({errors: errors.array()})
    // }

    try {
        const product =await Product.create(req.body)
        res.status(201).json({data: product})
    } catch (error) {
        console.log(error)
    }
    
}  


export const updateProduct= async (req: Request, res: Response) => {

    try {
        
        const {id} = req.params
        const product = await Product.findByPk(id)
        if (!product) {
            return res.status(404).json({
                error: 'Producto no Encontrado'
            })
        }

        //Actualizar

        //La desventaja es que si solo le paso 1 parametro me trunca los demas y si uso update pues me actualiza lo que le pase
        // product.name = req.body.name
        // product.price = req.body.price
        // product.availability = req.body.availability
        
        await product.update(req.body)
        await product.save()

        res.json({data:product})

    } catch (error) {
        console.log(error)
    }
    
}

export const updateAvailability= async (req: Request, res: Response) => {

    try {
        
        const {id} = req.params
        const product = await Product.findByPk(id)
        if (!product) {
            return res.status(404).json({
                error: 'Producto no Encontrado'
            })
        }
        
        //await product.update(req.body)
        product.availability = !product.dataValues.availability
        await product.save()

        //Leo los valores que voy guardando
        //console.log(product.dataValues.availability)

        res.json({data:product})

    } catch (error) {
        console.log(error)
    }
    
}


export const deleteProduct= async (req: Request, res: Response) => {

    try {
        
        const {id} = req.params
        const product = await Product.findByPk(id)
        if (!product) {
            return res.status(404).json({
                error: 'Producto no Encontrado'
            })
        }
        
        await product.destroy()

        res.json({data: 'Producto Eliminado'})

    } catch (error) {
        console.log(error)
    }
    
}

