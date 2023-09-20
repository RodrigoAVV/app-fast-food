import { userModel } from '../dao/models/users.js'

export default class User{
    getAll = async () => {
        const users = await userModel.find()
        return users.map(user => user.toObject())
    }
    getOneRun = async (run) => {
        const user = await userModel.findOne({run})
        return user
    }

    getOneId = async (uid) => {
        const user = await userModel.findOne({_id:uid})
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

    update = async (email,user) => {
        const result = await userModel.updateOne({email:email},user)
        return result
    }

    updateSet = async (email,date) => {
        const result = await userModel.updateOne({email:email}, { $set: {last_connection:date}})
        return result
    }

    updateSetDocuments = async (uid,documents) => {
        const result = await userModel.updateOne({_id:uid}, { $set: {documents:documents,role:'premium'}})
        return result
    }
}