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

const router = Router()

router.get('/',getAllProducts)

router.get('/create',createProduct)

router.get('/update',updateProduct)

router.get('/destroy',destroyProduct)

router.post('/store',storeProduct)

router.put('/edit',editProduct)

router.delete('/delete',deleteProduct)

router.post('/:id',searchProduct)

export default router