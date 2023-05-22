import mongoose from 'mongoose'
const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        index:true
    },
    description:{
        type: String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    thumbnail:{
        type:Array,
        required:true
    },
    code:{
        type:String,
        required:true,
        index:true
    },
    stock:{
        type:Number,
        required:true,
        default:[]
    },
    timestamps:{
        type:Number,
        required:true
    }
})
export const productModel = mongoose.model(productCollection,productSchema)