import { userModel } from '../dao/models/users.js'

export default class User{
    constructor(){
        console.log('user DB')
    }

    getAll = async () => {
        const users = await userModel.find()
        return users.map(user => user.toObject())
    }
    getOneRun = async (run) => {
        const user = await userModel.findOne({run})
        return user
    }
    getOneEmail = async (email) => {
        const user = await userModel.findOne({email})
        return user
    }
    save = async (user) =>{
        const result = await userModel.create(user)
        return result
    }
}