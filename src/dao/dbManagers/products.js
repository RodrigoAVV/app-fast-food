import { isValidObjectId } from 'mongoose'
import { productModel } from '../models/products.js'
export default class Product{
    constructor(){
        console.log('user DB')
    }

    getAll = async () => {
        const products = await productModel.find()
        return products.map(product => product.toObject())
    }
    
    save = async (product) =>{
        const result = await productModel.create(product)
        return result
    }

    update = async (id,product) => {

        const result = await productModel.updateOne({_id:id},product)
        return result
    }

    delete = async (id) => {
        const result = await productModel.deleteOne({_id:id})
        return result
    }

    search = async(id) => {
        const result = await productModel.findOne({_id:id})
        return result
    }
}