import { cartModel } from './models/carts.js'
export default class Cart{
    createCart = async (products) => {
        const result = await cartModel.create(products)
        return result
    }

    search = async(id) => {
        const result = await cartModel.findOne({_id:id})
        return result
    }  

    updateCart = async(id,newCart) => {
        const result = await cartModel.updateOne({_id:id},newCart)
        return result
    }

    delete = async (id) => {
        const result = await cartModel.delete({_id:id})
        return result
    }
}