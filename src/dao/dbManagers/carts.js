import { cartModel } from "../models/carts.js"
export default class Cart{
    constructor(){
        console.log('car DB')
    }

    getAll = async () => {
        const carts = await cartModel.find()
        return carts.map(cart=> cart.toObject())
    }
}