import {Router} from 'express'
import Product from '../../dao/dbManagers/products.js'

const folder = 'products.mongo'

import _ from 'lodash';
import { isValidObjectId } from 'mongoose';

const router = Router()

const productManager = new Product()

router.get('/', async (req,res,next) => {
    try {
        const data = await productManager.getAll()
        let user= {
            name:'María',
            role:'admin'
        }
        res.render(`${folder}/index`,{data,user})
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
        console.log(thumbnail)
        if(_.isNil(body) || !title || !description || !price  || !thumbnail || !code || !stock) return (res.status(400).json({success:false,message:'REQ ERROR (Body missing)'}))
        Object.assign(body,{
            timestamps:Date.now()
        })
        
        const data = await productManager.save(body)
        if(!data.success) return (res.status(500).json(data))
        return res.status(200).json({success:true,message:'Producto agregado'})
    } catch (err) {
        next(err)
    }
})

router.put('/edit',async (req,res,next) => {
    try {
        const { body } = req
        const {id,title,description,price,thumbnail,code,stock} = body
        if(_.isNil(body) || !id || !title || !description || !price  || !thumbnail || !code || !stock) return (res.status(400).json({success:false,message:'REQ ERROR (Body missing)'}))
        if(isValidObjectId(id)){
            const obj = {title,description,price,thumbnail,code,stock,timestamps:Date.now()}
            const data = await productManager.update(id,obj)
            if(!data) return (res.status(500).json(data))
            return res.status(200).json({success:true,message:'Producto actualizado'})
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
export default router