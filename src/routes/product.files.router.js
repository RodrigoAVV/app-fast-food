import {Router} from 'express'
import ProductService from '../dao/product.file.dao.js'
const router = Router()

import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const folder='products.files'

const product = new ProductService()

router.get('/create', (req,res,next) => {
    try {
        res.render(`${folder}/create`)
    } catch (err) {
        next(err)
    }
})

router.get('/delete', (req,res,next) => {
    try {
        res.render(`${folder}/delete`)
    } catch (err) {
        next(err)
    }
})
//Revisado
router.get('/',async (req,res,next)=>{
    try {
        let user= {
            name:'María',
            role:'admin'
        }
        let data = []
        const { limit } = req.query
        if(limit){
            data = await product.getProductsLimit(limit)
            if(data.success){
                res.render(`${folder}/index`,{
                    data,
                    user                    
                })
            }else{
                res.render(`${folder}/index`,{
                    data                   
                })
            }
        }else{
            data = await product.getProducts()
            
            if(data.success){
                res.render(`${folder}/index`,{
                    data,
                    user                    
                })
            }else{
                res.render(`${folder}/index`,{data})
            }
        }
    } catch (err) {
        next('Se ha producido un error')
    }
})

router.get('/realtimeproducts',async (req,res,next) => {
   try{
        let data = await product.getProducts()
        const io = req.app.get('socketio')

        io.on('connection',socket => {
            socket.emit('data', data)
        })

        res.render(`${folder}/realTimeProducts`)
   }catch(err){
        next(err)
   }
})
//Probado
router.get('/:pid',async (req,res,next) => {
    try {
        const id = req.params.pid
        const data = await product.getProductById(id)
        if(!data.success){
            return res.status(400).json(data)
        }
        return res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})
//Revisado
router.post('/',async (req,res,next) => {
    try {
        const { body } = req
        const {title,description,price,thumbnail,code,stock} = body
        if(_.isNil(body) || !title || !description || !price  || !thumbnail || !code || !stock) return (res.status(400).json({success:false,message:'REQ ERROR (Body missing)'}))
        Object.assign(body,{
            id:uuidv4(),
            timestamps:Date.now()
        })
        const data = await product.addProduct(body)
        const products = await product.getProducts()
        
        const io = req.app.get('socketio')
        
        io.on('connection',socket => {
            socket.emit('data', products)
        })
        //res.render(`${folder}/realTimeProducts`)
        if(!data.success) return (res.status(500).json(data))
        return res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})
//Probado
router.put('/:id',async (req,res,next) => {
    try {
        const {id} = req.params
        const {body} = req
        if(_.isNil(id) || _.isNil(body)) return (res.status(400).json({success:false,message:'Req error'}))
        const {title,description,code,price,status,stock,category,thumbnails} = body
        if(!title || !description || !code || !price || !status || !stock || !category  || !thumbnails) return (res.status(400).json({success:false,message:'Faltan datos para actualizar este producto'}))
        const data = await product.updateProductById(id,body)
        if(!data.success) return (res.status(500).json(data))
        return res.status(200).send(data)
    } catch (err) {
        next(err)
    }
})
//Probado
router.delete('/:id',async (req,res,next) => {
    try {
        const {id} = req.params
        if(_.isNil(id)) return (res.status(400).json({success:false,message:'Req error'}))
        const data = await product.deleteProductById(id)
        if(!data.success) return (res.status(500).send({success:false,message:`Producto ${id} no  eliminado`}))
        return res.status(200).send({success:true,message:`Producto ${id} eliminado`})
    } catch (err) {
        next(err)
    }
})

router.delete('/',async (req,res,next) => {
    try {
        const {id} = req.query
        if(_.isNil(id)) return (res.status(400).json({success:false,message:'Req error'}))
        const data = await product.deleteProductById(id)
        if(!data.success) return (res.status(500).json(data))
        /*
        const io = req.app.get('socketio')

        io.on('connection',socket => {
            socket.emit('allProducts', data)
        })
        */
        return res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})


export default router 