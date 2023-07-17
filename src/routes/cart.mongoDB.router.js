import {Router} from 'express'
import Cart from '../dao/cart.mongoDB.dao.js'
import Product from '../dao/product.mongoDB.dao.js'
import Ticket from '../dao/ticket.mongoDB.dao.js'
import { v4 as uuidv4 } from 'uuid'
import {authorization} from '../utils.js'

import { ObjectId } from 'mongoose';

import { isValidObjectId, Types } from "mongoose";

const router = Router()
const cartManager = new Cart()
const productManager = new Product()
const ticketManager = new Ticket()

const folder_ ='ticket.mongoDB'


const folder = 'carts.mongo'

router.get('/create', async(req,res,next) => {
    try {
        const products=[
            {}
        ]
        const result = await cartManager.createCart(products)
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
})

router.get('/', async(req,res,next) => {
    try {
        const carts = await cartManager.getAll()
        //console.log(carts)
        //res.render(`${folder}/index`,{success:true,data:carts})

        res.status(200).json({success:true,data:carts})
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

router.post('/:pid',authorization('user'), async(req,res,next) => {
    try {
        const pid = req.params.pid
        const cid = req.session.user.cart._id
        
        if(isValidObjectId(pid)){
            let cart = await cartManager.search(cid)
            let newProducts = []
            let result = false
            let product = cart.products.find(p=>p.product._id == pid)
            if(product){
                product.quantity += 1
                newProducts = [...cart.products]
                cart.products = newProducts
                result = await cartManager.updateOneCart(cid,cart)
            }else{
                cart.products.push({quantity:1,product:pid})
                result = await cartManager.updateOneCart(cid,cart)
            }
            if(result){
                //return res.send({success:true,message:'Producto agregado'})
                console.log('Producto agregado')
            }
        }
    } catch (err) {
        next(err)
    }
})

router.get('/:cid/purchase', async(req,res,next) => {
    try {
        const cid = req.params.cid
        const cart = await cartManager.search(cid)
        const {products} = cart
        let ticket = {}
        const compra = products.find(p => p.quantity > p.product.stock)
        if(!compra){
            ticket = await generateTicket(products,req)
        }else{
            const newProductsList = products.filter(p => p.quantity <= p.product.stock)
            ticket = await generateTicket(newProductsList,req)
        }
        res.render(`${folder_}/ticket`,{ticket,layout:'mainTicket'})
    } catch (err) {
        next(err)
    }

})

const generateTicket = async(products,req) => {
    let ticketData = {}
    let uuid = uuidv4()
    let amount = 0
    products.forEach(function(value){
        amount += value.quantity * value.product.price
    })

    ticketData.code = uuid
    ticketData.purchase_datetime = Date()
    ticketData.amount = amount
    ticketData.purchaser =  req.session.user.email

    const result = ticketManager.createTicket(ticketData)

    for(let i = 0 ; i < products.length ; i++){
        let product = await productManager.search(products[i].product._id)
        product.stock -= products[i].quantity
        let result = productManager.update(products[i].product._id,product)
    }
    return ticketData
}

export default router