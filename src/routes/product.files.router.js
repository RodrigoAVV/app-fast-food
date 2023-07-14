import {Router} from 'express'
const router = Router()

import {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    destroyProduct,
    storeProduct,
    searchProduct,
    editProduct

} from '../controllers/product.file.controller.js'

router.get('/',getAllProducts)

router.get('/create',createProduct)

router.post('/',storeProduct)

router.get('/delete',deleteProduct)

router.delete('/:id',destroyProduct)

//router.get('/realtimeproducts',realtimeproducts)

router.get('/update',updateProduct)

router.get('/:pid',searchProduct)

router.put('/:id',editProduct)

export default router 