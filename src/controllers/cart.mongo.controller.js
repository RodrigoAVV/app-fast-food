import Helper from '../helpers.js'
import Product from '../dao/product.mongoDB.dao.js'
import Ticket from '../dao/ticket.mongoDB.dao.js'
import nodemailer from 'nodemailer'
const productManager = new Product()
const ticketManager = new Ticket()
const folder_ ='ticket.mongoDB'

const folder = 'carts.mongo'
import {
    createCart as storeToCartService,
    getCart as getToCartService,
    updateCart as updateCartProducts
} from '../services/cart.mongo.service.js'

import _ from 'lodash';


import { isValidObjectId, Types } from "mongoose";

const createCart = async(req,res) => {
    const products=[
        {}
    ]
    const result = await storeToCartService(products)
    res.status(200).json(result)
}

const getCart = async(req,res) => {
    const cid = req.params.cid
    const cart = await getToCartService(cid)
    const {products,user} = cart
    //res.send(JSON.stringify(products))
    res.render(`${folder}/cartDetail`,{products,user})
}

const deleteCartProductCant = async(req,res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    if(isValidObjectId(cid) && isValidObjectId(pid)){
        const cart = await getToCartService(cid)
        for(let i = 0 ; i < cart.products.length ; i++){
            if(cart.products[i].product == pid){
                cart.products.splice(i,1)
                break
            }
        }
        const result = await updateOneCart(cid,cart)
        if(result){
            return res.send({success:true,message:result})
        }
    }
}

const editCart = async(req,res) => {
    const cid = req.params.cid
    if(isValidObjectId(cid)){
        const cart = await getToCartService(cid)
        cart.products=[]
        cart.products.push({quantity:3,product:'6463b97a6d23955b6a595227'})
        cart.products.push({quantity:2,product:'64640a37d46d5822d3c0c374'})
        const result = await updateOneCart(cid,cart)
        if(result){
            return res.send({success:true,message:result})
        }
    }
}

const editCartProductCant = async(req,res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const cant = req.query.cant
    if(isValidObjectId(cid) && isValidObjectId(pid) && cant){
        let cart = await getToCartService(cid)
        for(let i = 0 ; i < cart.products.length ; i++){
            if(cart.products[i].product == pid){
                cart.products[i].quantity = parseInt(cant)
                break
            }
        }           
        const result = await updateOneCart(cid,cart)
        if(result){
            return res.send({success:true,message:result})
        }else{
            return res.send({success:false,message:'Error al actualizar la cantidad'})
        }
    }
}

const deleteCart = async(req,res) => {
    const cid = req.params.cid
    if(isValidObjectId(cid)){
        let cart = await getToCartService(cid)
        cart.products=[]
        const result = await updateOneCart(cid,cart)
        if(result){
            return res.send({success:true,message:result})
        }else{
            return res.send({success:false,message:'Error al eliminar los productos'})
        }
    }
}

const storeCart = async(req,res) => {
    const pid = req.params.pid
    const cid = req.session.user.cart._id
    if(isValidObjectId(pid)){
        let cart = await getToCartService(cid)
        let newProducts = []
        let result = false
        let product = cart.products.find(p=>p.product._id == pid)
        if(product){
            product.quantity += 1
            newProducts = [...cart.products]
            cart.products = newProducts
            result = await updateCartProducts(cid,cart)
        }else{
            cart.products.push({quantity:1,product:pid})
            result = await updateCartProducts(cid,cart)
        }
        if(result){
            const cart = await getToCartService(cid)
            const {products} = cart
            const cant = await Helper.getCantProducts(products)
            return res.send({success:true,cant,message:'Producto agregado'})
        }
        
    }
}

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'rodrigo.vidal.vera@gmail.com',
        pass: 'lnsfmesdshimifut'
    }
})

const generatePurchase = async(req,res) => {
    const cid = req.params.cid
    const cart = await getToCartService(cid)
    const {products} = cart
    let ticket = {}
    let ids = []
    const user = req.session.user.email
    const productsNoStock = await Helper.productNoStock(products)//No hay productos en stock
    const productsInStock = await Helper.getProductsStock(products)

    const newCart = cart
    newCart.products = productsNoStock

    if(productsNoStock.length == 0){
        ticket = await Helper.generateTicket(productsInStock,user) 
        const result = await ticketManager.createTicket(ticket)
       if(result){
           const result2 = await Helper.updateCantProduct(productsInStock,productManager)
           const result3 = await updateCartProducts(newCart._id,newCart)
        }
    }else{
        ids = Helper.getIdProducts(productsNoStock)//id de productos sin stock
        ticket = await Helper.generateTicket(productsInStock,user)//Genera ticket con productos en stock
        await updateCartProducts(newCart._id,newCart)
    }
    await transporter.sendMail({
        from: 'Fast food',
        to: user,
        subject: 'Confirmación de pedido',
        html: '<div> <h2>Recibimos tu pedido</h2> </div>'
    })
    res.render(`${folder_}/ticket`,{ticket,ids,layout:'mainTicket'})
}

export{
    createCart,
    getCart,
    editCart,
    deleteCartProductCant,
    editCartProductCant,
    deleteCart,
    storeCart,
    generatePurchase
}