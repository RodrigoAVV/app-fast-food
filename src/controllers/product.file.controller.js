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
        role:'admin'
    }
    let data = []
    const { limit } = req.query
    if(limit){
        data = await getToProductsService(limit)
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
        data = await getAllToProductsSevice()
        console.log(data)
        if(data.success){
            res.render(`${folder}/index`,{
                data,
                user                    
            })
        }else{
            res.render(`${folder}/index`,{data})
        }
    }
}

const createProduct = async(req,res) => {
    res.render(`${folder}/create`)
}

const deleteProduct = async(req,res) => {
    res.render(`${folder}/delete`)
}

const destroyQueryProduct = async(req,res) => {
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
}
const realtimeproducts = async(req,res) => {
    let data = await product.getProducts()
    const io = req.app.get('socketio')

    io.on('connection',socket => {
        socket.emit('data', data)
    })
    res.render(`${folder}/realTimeProducts`)
}

const updateProduct = async(req,res) => {
    res.render(`${folder}/update`)
}

const destroyProduct = async(req,res) => {
    const {id} = req.params
    if(_.isNil(id)) return (res.status(400).json({success:false,message:'Req error'}))
    const data = await product.deleteProductById(id)
    if(!data.success) return (res.status(500).send({success:false,message:`Producto ${id} no  eliminado`}))
    return res.status(200).send({success:true,message:`Producto ${id} eliminado`})
}

const storeProduct = async(req,res) => {
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
}

const editProduct = async(req,res) => {
    const {id} = req.params
    const {body} = req
    if(_.isNil(id) || _.isNil(body)) return (res.status(400).json({success:false,message:'Req error'}))
    const {title,description,code,price,status,stock,category,thumbnails} = body
    if(!title || !description || !code || !price || !status || !stock || !category  || !thumbnails) return (res.status(400).json({success:false,message:'Faltan datos para actualizar este producto'}))
    const data = await product.updateProductById(id,body)
    if(!data.success) return (res.status(500).json(data))
    return res.status(200).send(data)
}

const searchProduct = async(req,res) => {
    const id = req.params.pid
    const data = await product.getProductById(id)
    if(!data.success){
        return res.status(400).json(data)
    }
    return res.status(200).json(data)
}

const productsLimit = async(req,res) => {
    let data = await fs.promises.readFile(path,'utf-8')
        if(data.length === 0){
            return {
                success:false,
                message:'Productos no disponibles'
            }
        }
        const productoFormat = JSON.parse(data)
        const min = Math.ceil(0)
        const max = Math.floor(productoFormat.length - 1)
        let products = []
        if(limit<= productoFormat.length){
            for(let i = 0 ; i < limit ; i++){
                let rand = Math.floor(Math.random() * (max - min + 1) + min)
                //console.log(rand)
                products.push(productoFormat[rand])
            }
            return {
                success: true,
                data:products
            }
        }else{
            return{
                success:false,
                message:'Limite supera cantidad de productos'
            }
        }
}

export {
    getAllProducts,
    createProduct,
    deleteProduct,
    destroyQueryProduct,
    realtimeproducts,
    updateProduct,
    destroyProduct,
    storeProduct,
    editProduct,
    searchProduct,
    productsLimit
}