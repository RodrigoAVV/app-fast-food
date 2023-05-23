import {Router} from 'express'
import Cart from '../../dao/dbManagers/carts.js'

import { isValidObjectId, Types } from "mongoose";

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

router.delete('/:cid/products/:pid', async(req,res,next) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        if(isValidObjectId(cid) && isValidObjectId(pid)){
            const cart = await cartManager.search(cid)
            const newProduct = cart.products.filter(item=>item._id != pid)
            const newCart = {_id:cart._id,products:[newProduct]}
            const result = await cartManager.deleteProductCar(cid,newCart)
            if(result){
                return res.send({success:true,message:result})
            }
        }
    } catch (err) {
        next(err)
    }
})

router.put('/:cid', async(req,res,next) => {
    try {
        const cid = req.params.cid
        if(isValidObjectId(cid)){
            const cart = await cartManager.search(cid)
            cart.products=[]
            cart.products.push({_id:'6463b97a6d23955b6a595227',quantity:3})
            cart.products.push({_id:'64640a37d46d5822d3c0c374',quantity:2})
            const result = await cartManager.deleteProductCar(cid,cart)
            if(result){
                return res.send({success:true,message:result})
            }
        }
    } catch (err) {
        next(err)
    }
})
export default router