import {
    getAllProducts as getToProductsService,
    storeProduct as storeToProductService,
    editProduct as editToProductService,
    deleteProduct as deleteToProductService,
    searchProduct as searchToProductService,
    getAll as getAllToProductsSevice
} from '../services/product.file.service.js'

const folder='products.files'
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';


const getAllProducts = async(req,res) => {
    let user= {
        name:'María',
        role:'Admin'
    }
    let data = []
    const { limit } = req.query
    data = await getToProductsService(limit)
    res.render(`${folder}/index`,{data,user})
}

const createProduct = async(req,res) => {
    res.render(`${folder}/create`)
}

const storeProduct = async(req,res) => {
    const { body } = req
    const {title,description,price,thumbnail,code,stock} = body
    if(_.isNil(body) || !title || !description || !price  || !thumbnail || !code || !stock)
        return (res.status(400).json({success:false,message:'REQ ERROR (Body missing)'}))
    Object.assign(body,{
        id:uuidv4(),
        timestamps:Date.now()
    })
    const data = await storeToProductService(body)
    /*const products = await product.getProducts()
    
    const io = req.app.get('socketio')
    
    io.on('connection',socket => {
        socket.emit('data', products)
    })
    */
    //res.render(`${folder}/realTimeProducts`)
    if(data) res.status(200).json({success:true,message:'Producto registrado'})
}

const deleteProduct = async(req,res) => {
    res.render(`${folder}/delete`)
}

const updateProduct = async(req,res) => {
    res.render(`${folder}/update`)
}

const destroyProduct = async(req,res) => {
    const {id} = req.params
    if(_.isNil(id)) return (res.status(400).json({success:false,message:'Req error'}))
    const data = await deleteToProductService(id)
    data === true ? res.status(200).send({success:true,message:`Producto ${id} eliminado`}) : res.status(500).send({success:false,message:`Producto ${id} no  eliminado`})
     /*
    const io = req.app.get('socketio')

    io.on('connection',socket => {
        socket.emit('allProducts', data)
    })
    */
}

/*
const realtimeproducts = async(req,res) => {
    let data = await product.getProducts()
    const io = req.app.get('socketio')

    io.on('connection',socket => {
        socket.emit('data', data)
    })
    res.render(`${folder}/realTimeProducts`)
}
*/

const searchProduct = async(req,res) => {
    const id = req.params.pid
    const data = await searchToProductService(id)
    if(data) return res.status(200).json({success:true,data})
    return res.status(400).json({success:false,message:'Producto no encontrado'})
    
}

const editProduct = async(req,res) => {
    const {id} = req.params
    const {body} = req
    if(_.isNil(id) || _.isNil(body))
        return (res.status(400).json({success:false,message:'Req error'}))
    const {title,description,code,price,stock} = body
    if(!title || !description || !code || !price || !stock)
        return (res.status(400).json({success:false,message:'Faltan datos para actualizar este producto'}))
    const data = await editToProductService(id,body)
    if(data) return (res.status(200).json({success:true,message:'Producto actualizado'}))
    
}

export {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    destroyProduct,
    storeProduct,
    searchProduct,
    editProduct
}