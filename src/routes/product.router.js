import {Router} from 'express'

import {
    getAllProducts,
    createProduct,
    updateProduct,
    destroyProduct,
    storeProduct,
    editProduct,
    deleteProduct,
    searchProduct
} from '../controllers/product.mongo.controller.js'
import toAsyncRouter from 'async-express-decorator'

const router = toAsyncRouter(Router())

import {authorization} from '../utils.js'

router.get('/',getAllProducts)

router.get('/create',authorization('admin'),createProduct)

router.get('/update',authorization('admin'),updateProduct)

router.get('/destroy',authorization('admin'),destroyProduct)

router.get('/:id',searchProduct)

router.post('/store',authorization('admin'),storeProduct)

router.put('/edit',authorization('admin'),editProduct)

router.delete('/delete',authorization('admin'),deleteProduct)

export default router