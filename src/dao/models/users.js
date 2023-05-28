import mongoose from 'mongoose'
const userCollection = 'users'
import mongoosePaginate from 'mongoose-paginate-v2'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true
    },
    lastname1:{
        type:String,
        required:true
    },
    lastname2:{
        type:String,
        required:true
    },
    run:{
        type:String,
        required:true,
        index:true
    },
    email:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    }
})

userSchema.plugin(mongoosePaginate)
export const userModel = mongoose.model(userCollection,userSchema)