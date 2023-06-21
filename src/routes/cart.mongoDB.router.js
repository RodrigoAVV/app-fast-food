import {Router} from 'express'
import Cart from '../dao/cart.mongoDB.dao.js'

import { isValidObjectId, Types } from "mongoose";

const router = Router()
const cartManager = new Cart()

const folder = 'carts.mongo'

router.get('/', async(req,res,next) => {
    try {
        const carts = await cartManager.getAll()
        //const {} = carts
        console.log(carts)
        res.render(`${folder}/index`,{success:true,data:carts})
    } catch (err) {
        next(err)
    }
})

router.get('/:cid', async(req,res,next) => {
    try {
        const cid = req.params.cid
        const cart = await cartManager.search(cid)
        const {products,user} = cart
        
        //res.send(JSON.stringify(products))
        res.render(`${folder}/cartDetail`,{products,user})
    } catch (err) {
        next(err)
    }
})

//Revisado
router.delete('/:cid/products/:pid', async(req,res,next) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        if(isValidObjectId(cid) && isValidObjectId(pid)){
            const cart = await cartManager.search(cid)
            for(let i = 0 ; i < cart.products.length ; i++){
                if(cart.products[i].product == pid){
                    cart.products.splice(i,1)
                    break
                }
            }
            const result = await cartManager.deleteProductCar(cid,cart)
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
            cart.products.push({quantity:3,product:'6463b97a6d23955b6a595227'})
            cart.products.push({quantity:2,product:'64640a37d46d5822d3c0c374'})
            const result = await cartManager.deleteProductCar(cid,cart)
            if(result){
                return res.send({success:true,message:result})
            }
        }
    } catch (err) {
        next(err)
    }
})
//Revisado
router.put('/:cid/products/:pid', async(req,res,next) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        const cant = req.query.cant
        if(isValidObjectId(cid) && isValidObjectId(pid) && cant){
            let cart = await cartManager.search(cid)
            for(let i = 0 ; i < cart.products.length ; i++){
                if(cart.products[i].product == pid){
                    cart.products[i].quantity = parseInt(cant)
                    break
                }
            }           
            const result = await cartManager.deleteProductCar(cid,cart)
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
//Revisado
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

router.post('/:pid', async(req,res,next) => {
    try {
        const pid = req.params.pid
        const cid = '6469b713bec8ea8ab16bf422'
        if(isValidObjectId(pid)){
            let cart = await cartManager.search(cid)
            cart.products.push({quantity:1,product:pid})
            const result = await cartManager.deleteProductCar(cid,cart)
            if(result){
                return res.send({success:true,message:'Producto agregado'})
            }else{
                return res.send({success:false,message:'Error al eliminar los productos'})
            }
        }
    } catch (err) {
        next(err)
    }
})
export default router