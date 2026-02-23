import {Router} from 'express'
import { createProduct, deleteProduct, getProduct, getProductById, updateAvailability, updateProduct } from './handlers/product'
import {body, param} from 'express-validator'
import { handleInputErros } from './middleware'

const router = Router()

router.get('/',

    handleInputErros,
    getProduct
 )

router.get('/:id',
    
    //Validacion
    param('id').isInt().withMessage('Id No Válido'),
    handleInputErros,
    getProductById
    
)

router.post('/',
    
    //Validacion
    body('name')
            .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    
    body('price')
            .isNumeric().withMessage('Valor no Válido')
            .notEmpty().withMessage('EL precio del producto no puede ir vacio')
            .custom((value)=> value > 0).withMessage('Precio no Válido'),

    handleInputErros,

    createProduct
)

router.put('/:id',

    param('id').isInt().withMessage('Id No Válido'),

    //Para el put actualizo todo el modelo en la bd

    //Validacion
    body('name')
            .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    
    body('price')
            .isNumeric().withMessage('Valor no Válido')
            .notEmpty().withMessage('EL precio del producto no puede ir vacio')
            .custom((value)=> value > 0).withMessage('Precio no Válido'),

    body('availability')
            .isBoolean().withMessage('Valor para disponibilidad no válido'),        

 handleInputErros,

updateProduct

)

router.patch('/:id',

    param('id').isInt().withMessage('Id No Válido'),

    handleInputErros,
    //Para el patch solo modifico 1 o algunos campos en especifico en la bd
    updateAvailability

)

router.delete('/:id', 

     param('id').isInt().withMessage('Id No Válido'),

    handleInputErros,

    deleteProduct

)

export default router