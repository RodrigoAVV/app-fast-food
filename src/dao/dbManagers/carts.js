import { cartModel } from "../models/carts.js"
export default class Cart{
    constructor(){
        console.log('car DB')
    }

    getAll = async (cid) => {
        const carts = await cartModel.find({_id:cid})
       console.log(carts[0])
    }

    save = async () => {

    }

    create = async (cart) => {
        const res = await cartModel.create(cart)
        return res
    }

    search = async(id) => {
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