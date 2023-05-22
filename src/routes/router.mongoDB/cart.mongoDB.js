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

router.post('/', async(req,res,next) => {
    try {
        const { body } = req
        const {id} = body
        const newCart = {
            id:"45454",
            products:[
                {_id:'645e7a4dd8617300ce644577',quantity:2},
                {_id:'6463b97a6d23955b6a595227',quantity:1}
            ]
        }
        const respuesta = await cartManager.create(newCart)
        //const cart = cartManager.search('6469996f6792d01caa145e9a')
        //cart.products.push(id)
        return res.send({success:false,message:respuesta})
    } catch (err) {
        next(err)
    }
})
export default router