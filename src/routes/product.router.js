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

router.get('/',getAllProducts)// ok

router.get('/create',/*authorization('admin'),*/createProduct)//ok

router.get('/update',/*authorization('admin'),*/updateProduct)

router.get('/destroy',/*authorization('admin'),*/destroyProduct)

router.get('/:id',searchProduct)//ok

router.post('/store',/*authorization('admin'),*/storeProduct)//ok

router.put('/:id',/*authorization('admin'),*/editProduct)//ok

router.delete('/:id',/*authorization('admin'),*/deleteProduct)//ok

export default router