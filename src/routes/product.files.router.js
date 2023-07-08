import {Router} from 'express'
const router = Router()

import {
    getAllProducts,
    createProduct,
    deleteProduct,
    destroyQueryProduct,
    realtimeproducts,
    updateProduct,
    destroyProduct,
    storeProduct,
    editProduct,
    searchProduct

} from '../controllers/product.file.controller.js'

router.get('/',getAllProducts)

router.get('/create',createProduct)

router.get('/delete',deleteProduct)

router.get('/realtimeproducts',realtimeproducts)

router.get('/:pid',searchProduct)

router.post('/',storeProduct)

router.put('/:id',editProduct)

router.delete('/:id',destroyProduct)

router.delete('/',destroyQueryProduct)

router.get('/update',updateProduct)

export default router 