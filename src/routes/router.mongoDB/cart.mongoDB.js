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
//Revisado
router.put('/:cid', async(req,res,next) => {
    try {
        const cid = req.params.cid
        if(isValidObjectId(cid)){
            const cart = await cartManager.search(cid)
            cart.products=[]
            cart.products.push({_id:'6463b97a6d23955b6a595227',quantity:3,product:'6463b97a6d23955b6a595227'})
            cart.products.push({_id:'64640a37d46d5822d3c0c374',quantity:2,product:'64640a37d46d5822d3c0c374'})
            const result = await cartManager.deleteProductCar(cid,cart)
            if(result){
                return res.send({success:true,message:result})
            }
        }
    } catch (err) {
        next(err)
    }
})
//Revisado agrega un id
router.put('/:cid/products/:pid', async(req,res,next) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const cant = req.query.cant
        if(isValidObjectId(cid) && isValidObjectId(pid) && cant){
            let cart = await cartManager.search(cid)

            let prodCant = cart.find(c => c._id == pid)//ok
            prodCant.quantity = parseInt(cant)
            
            const _id = cart._id

            cart = cart.filter(c=>c._id != pid)
            
            cart.push(prodCant)
            const products={products:cart}
            
           
            const result = await cartManager.deleteProductCar(cid,products)
            if(result){
                return res.send({success:true,message:result})
            }else{
                return res.send({success:false,message:'Error al actualizar la cantidad'})
            }
        }
    } catch (err) {
        next(err)
    }
})

router.delete('/:cid', async(req,res,next) => {
    try {
        const cid = req.params.cid
        
        if(isValidObjectId(cid)){
            let cart = await cartManager.search2(cid)
            cart.products=[]
            const result = await cartManager.deleteProductCar(cid,cart)
            if(result){
                return res.send({success:true,message:result})
            }else{
                return res.send({success:false,message:'Error al eliminar los productos'})
            }
        }
    } catch (err) {
        next(err)
    }
})
export default router