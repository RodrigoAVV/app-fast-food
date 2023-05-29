import {Router} from 'express'
import Product from '../dao/product.mongoDB.dao.js'

import { isValidObjectId, Types } from "mongoose";

const folder = 'products.mongo'

import _ from 'lodash';

const router = Router()

const productManager = new Product()

router.get('/', async (req,res,next) => {
    try {
        const { page = 1,limit = 5, sort = '', query = '' } = req.query
        const { docs,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage } = await productManager.filter(limit,page,sort,query)
            console.log(docs)
            const products = docs
        const user= {
            name:'María',
            role:true
        }
        //console.log(products)
        
        res.render(`${folder}/indexDoc`,{products,user,hasPrevPage,hasNextPage,nextPage,prevPage})
        //return res.json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/create', async (req,res,next) => {
    try {
        res.render(`${folder}/create`)
    } catch (err) {
        next(err)
    }
})

router.get('/update', async (req,res,next) => {
    try {
        res.render(`${folder}/update`)
    } catch (err) {
        next(err)
    }
})

router.post('/store',async (req,res,next) => {
    try {
        const { body } = req
        const {title,description,price,thumbnail,code,stock} = body
        if(_.isNil(body) || !title || !description || !price  || !thumbnail || !code || !stock)
            return (res.status(400).json({success:false,message:'Faltan datos por completar'}))
        Object.assign(body,{
            timestamps:Date.now()
        })
        const data = await productManager.save(body)
        data ? res.status(200).send({success:true,message:'Producto agregado correctamente'}) :
            res.status(200).send({success:false,message:'Error al registrar este producto'})
    } catch (err) {
        next(err)
    }
})

router.put('/edit',async (req,res,next) => {
    try {
        const { body } = req
        const {id,title,description,price,thumbnail,code,stock} = body
        if(_.isNil(body) || !id || !title || !description || !price  || !thumbnail || !code || !stock)
            return (res.status(400).send({success:false,message:'REQ ERROR (Body missing)'}))
        if(isValidObjectId(id)){
            const obj = {title,description,price,thumbnail,code,stock,timestamps:Date.now()}
            const data = await productManager.update(id,obj)

            if(!data) return (res.status(500).send(data))
            return res.status(200).send({success:true,message:'Producto actualizado'})
        }
    } catch (err) {
        next(err)
    }
})

router.get('/destroy', async (req,res,next) => {
    try {
        res.render(`${folder}/destroy`)
    } catch (err) {
        next(err)
    }
})


router.delete('/delete',async (req,res,next) => {
    try {
        const {body} = req
        const {id} = body
        if(_.isNil(id)) return (res.status(400).json({success:false,message:'Req error'}))
        if(isValidObjectId(id)){
            const data = await productManager.delete(id)
            return data
        }else{
            return res.status(500).json({success:false,message:'ID de eliminación no es valido'})
        }
        
       
    } catch (err) {
        next(err)
    }
})

router.post('/id', async(req,res,next) => {
    try {
        const {body} = req
        const {id} = body
        console.log(id)
        if(_.isNil(id) || ! id) return (res.status(400).json({success:false,message:'Req error'}))
        if(isValidObjectId(id)){
            const data = await productManager.search(id)
            //console.log(data)
            data != null ? res.status(200).send({success:true,data}) :
                res.status(200).send({success:false,message:'No se encuentra este producto'})
        }else{
            return res.status(500).send({success:false,message:'ID de eliminación no es valido'})
        }
    } catch (err) {
        next(err)
    }
})
export default router