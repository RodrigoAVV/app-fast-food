import { cartModel } from './models/carts.js'
export default class Cart{
    constructor(){
        console.log('car DB')
    }
    
    getAll = async () => {
        const carts = await cartModel.find().lean()
        return carts
    }

    create = async () => {
        const res = await cartModel.create()
        return res
    }

    search = async(id) => {
        const result = await cartModel.findOne({_id:id}).lean()
        return result
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