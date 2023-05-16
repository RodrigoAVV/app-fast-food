import mongoose from 'mongoose'
const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        products:{
            type:Array,
            required:false,
            default:[]
        }
    }

})
export const cartModel = mongoose.model(cartCollection,cartSchema)