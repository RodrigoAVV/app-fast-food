import {Router} from 'express'
import Cart from '../../dao/dbManagers/carts.js'

const router = Router()
const cartManager = new Cart()

router.get('/', async(req,res,next) => {
    try {
        const carts = await cartManager.getAll()
        res.send({success:true,data:carts})
    } catch (err) {
        next(err)
    }
})

export default router