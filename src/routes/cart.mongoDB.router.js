import {Router} from 'express'

import {authorization} from '../utils.js'


import{
    getCart,
    storeCart,
    editCart,
    editCartProductCant,
    deleteCart,
    deleteCartProductCant,
    generatePurchase
} from '../controllers/cart.mongo.controller.js'



const router = Router()


router.get('/create',storeCart)

router.get('/:cid',getCart)

router.delete('/:cid/products/:pid',deleteCartProductCant)

router.put('/:cid',editCart)

router.put('/:cid/products/:pid',editCartProductCant)

router.delete('/:cid',deleteCart)

router.post('/:pid',authorization('user'),storeCart)

router.get('/:cid/purchase',generatePurchase)

export default router