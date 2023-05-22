import { cartModel } from "../models/carts.js"
export default class Cart{
    constructor(){
        console.log('car DB')
    }

    getAll = async () => {
        const carts = await cartModel.find()
        return carts.map(cart=> cart.toObject())
    }

    save = async () => {

    }

    create = async (cart) => {
        const res = await cartModel.create(cart)
        return res
    }
}