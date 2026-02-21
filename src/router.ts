import {Router} from 'express'
import { createProduct, getProduct, getProductById, updateProduct } from './handlers/product'
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

updateProduct

)

router.patch('/',(req, res) => {

    res.json('Desde PATCH')

})

router.delete('/',(req, res) => {

    res.json('Desde DELETE')

})

export default router