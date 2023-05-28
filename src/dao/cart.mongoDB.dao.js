import { cartModel } from './models/carts.js'
export default class Cart{
    constructor(){
        console.log('car DB')
    }
    
    getAll = async () => {
        const carts = await cartModel.find().lean()
        return carts
    }

    save = async () => {

    }

    create = async (cart) => {
        const res = await cartModel.create(cart)
        return res
    }

    search = async(id) => {
        const result = await cartModel.findOne({_id:id})
        const _id = result._id
        const data = result.products.map(product => product.toObject())
        data.push(_id)
        return data
    }

    search2 = async(id) => {
        const result = await cartModel.findOne({_id:id})
        return result
    }  

    deleteProductCar = async(id,newCart) => {
        const result = await cartModel.updateOne({_id:id},newCart)
        return result
    }

    delete = async (id) => {
        const result = await cartModel.delete({_id:id})
        return result
    }
}