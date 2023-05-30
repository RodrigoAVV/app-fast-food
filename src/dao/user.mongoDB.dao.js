import { userModel } from '../dao/models/users.js'

export default class User{
    constructor(){
        console.log('user DB')
    }

    getAll = async () => {
        const users = await userModel.find()
        return users.map(user => user.toObject())
    }
    getOne = async (run) => {
        const user = await userModel.findOne({run})
        return user
    }
    save = async (user) =>{
        const result = await userModel.create(user)
        return result
    }
}