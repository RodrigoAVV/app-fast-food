import mongoose from 'mongoose'
const userCollection = 'users'
import mongoosePaginate from 'mongoose-paginate-v2'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    run:{
        type:String,
        required:true,
        index:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:'user'
    },
    age:{
        type:Number,
        required:true
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'carts'
    }
})

userSchema.pre('find',function(){
    this.populate('cart')
})

userSchema.pre('findOne',function(){
    this.populate('cart')
})

userSchema.plugin(mongoosePaginate)
export const userModel = mongoose.model(userCollection,userSchema)