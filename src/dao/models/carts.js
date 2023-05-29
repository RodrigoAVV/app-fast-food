import mongoose from 'mongoose'
const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    id:String,
    products:{
        type:[
            {
                product:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'products'
                },
                quantity:{
                    type:Number,
                    required:true,
                    default:1
                }
            }
        ],
        default:[]
    }
})

cartSchema.pre('find',function(){
    this.populate('products.product')
})

cartSchema.pre('findOne',function(){
    this.populate('products.product')
})

export const cartModel = mongoose.model(cartCollection,cartSchema)                               