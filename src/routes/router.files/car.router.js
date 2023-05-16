import {Router} from 'express'
import CartService from '../../dao/fileManagers/cart.service.js'
const router = Router()

import _ from 'lodash';


const cart= new CartService()

router.post('/',(req,res,next)=>{
    try {
        const data = cart.createCar()
        if(!data.success){
            return res.status(400).json(data)
        }
        return res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/:cid', async (req,res,next) => {
    try {
        const cid = req.params.cid
        const data = await cart.getCarById(cid)
        if(!data.success){
            return res.status(400).json(data)
        }
        return res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.post('/:cid/product/:pid',async (req,res,next) => {
    try {
        const {cid,pid} = req.params
        const data = await cart.addProductCar(cid,pid)
        if(!data.success){
            return res.status(400).json(data)
        }
        return res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})


export default router