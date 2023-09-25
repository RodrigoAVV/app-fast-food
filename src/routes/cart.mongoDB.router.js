import {Router} from 'express'
import {authorization} from '../utils.js'

import{
    getCart,
    storeCart,
    //editCart,
    editCartProductCant,
    deleteCart,
    deleteCartProductCant,
    generatePurchase
} from '../controllers/cart.mongo.controller.js'

const router = Router()

router.get('/create',storeCart)//ok

router.get('/:cid',getCart)//ok

router.get('/:cid/purchase',generatePurchase)//ok

router.delete('/:cid/products/:pid',deleteCartProductCant)//ok

//router.put('/:cid',editCart)

router.put('/:cid/products/:pid',editCartProductCant)//ok

router.delete('/:cid',deleteCart)//ok

router.post('/:pid',authorization('user'),storeCart)

export default router