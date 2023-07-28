import CustomError from '../middlewares/errors/CustomError.js'
import EErrors from '../middlewares/errors/enums.js'
import {generateProductInfo} from '../middlewares/errors/info.js'
import Helper from '../helpers.js'
import logger from '../loggers/logger.js'
import {
    getAllProducts as getToProductsService,
    storeProduct as storeToProductService,
    editProduct as editToProductService,
    deleteProduct as deleteToProductService,
    searchProduct as searchToProductService
} from '../services/product.mongo.service.js'

import {
    getCart as getToCartService
} from '../services/cart.mongo.service.js'


import {authorization} from '../utils.js'


const folder = 'products.mongo'

import { isValidObjectId, Types } from "mongoose";

const getAllProducts = async(req,res) => {
    const { page = 1,limit = 5, sort = '', query = '' } = req.query
    const { docs,hasNextPage,nextPage,prevPage,hasPrevPage} = await getToProductsService(limit,page,sort,query)
    const products = docs
    const cart = await getToCartService(req.session.user.cart)
    const cant = await Helper.getCantProducts(cart.products)

    logger.fatal('Prueba fatal')
    logger.error('Prueba error')
    logger.warning('Prueba warning')
    logger.info('Prueba info')
    logger.http('Prueba http')
    logger.debug('Prueba debug')


    res.render(`${folder}/indexDoc`,
    {products,hasPrevPage,hasNextPage,nextPage,prevPage,userSession:req.session.user,cant})
}

const createProduct = async(req,res) => {
    res.render(`${folder}/create`)
}

const updateProduct = async(req,res) => {
    res.render(`${folder}/update`)
}

const destroyProduct = async(req,res) => {
    res.render(`${folder}/destroy`)
}

const storeProduct = async(req,res) => {
    const { body } = req
    const {title,description,price,thumbnail,code,stock} = body
    if(_.isNil(body) || !title || !description || !price  || !thumbnail || !code || !stock){
        throw CustomError.createError({
            name: 'ProductError',
            cause: generateProductInfo({title,description,price,thumbnail,code,stock}),
            message: 'Error al tratar de crear el usuario',
            code: EErrors.INVALID_TYPE_ERROR
        })
        //return (res.status(400).json({success:false,message:'Faltan datos por completar'}))

    }

    Object.assign(body,{
        timestamps:Date.now()
    })
    const data = await storeToProductService(body)
    data ? res.status(200).send({success:true,message:'Producto agregado correctamente'}) :
        res.status(200).send({success:false,message:'Error al registrar este producto'})
}

const editProduct = async(req,res) => {
    const { body } = req
    const {id,title,description,price,thumbnail,code,stock} = body
    if(_.isNil(body) || !id || !title || !description || !price  || !thumbnail || !code || !stock)
        return (res.status(400).send({success:false,message:'REQ ERROR (Body missing)'}))
    if(isValidObjectId(id)){
        const obj = {title,description,price,thumbnail,code,stock,timestamps:Date.now()}
        const data = await editToProductService(id,obj)

        if(!data) return (res.status(500).send(data))
        return res.status(200).send({success:true,message:'Producto actualizado'})
    }
}

const deleteProduct = async(req,res) => {
    const {body} = req
    const {id} = body
    if(_.isNil(id)) return (res.status(400).json({success:false,message:'Req error'}))
    if(isValidObjectId(id)){
        const data = await deleteToProductService(id)
        if(!data) return (res.status(500).send(data))
        return res.status(200).send({success:true,message:'Producto eliminado'})
    }else{
        return res.status(500).json({success:false,message:'ID de eliminación no es valido'})
    }
}

const searchProduct = async(req,res) => {
    const id = req.params.id
    if(_.isNil(id) || ! id) return (res.status(400).json({success:false,message:'Req error'}))
    if(isValidObjectId(id)){
        const data = await searchToProductService(id)
        data != null ? res.status(200).send({success:true,data}) :
            res.status(500).send({success:false,message:'No se encuentra este producto'})
    }else{
        return res.status(500).send({success:false,message:'ID de eliminación no es valido'})
    }
}
export {
    getAllProducts,
    createProduct,
    updateProduct,
    destroyProduct,
    storeProduct,
    editProduct,
    deleteProduct,
    searchProduct
}