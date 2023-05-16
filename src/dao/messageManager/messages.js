import { messageModel } from '../models/messages.js'
export default class Message{
    constructor(){
        console.log('message DB')
    }

    getAll = async () => {
        const messages = await messageModel.find()
        return messages.map(message => message.toObject())
    }

    save = async (message) =>{
        const result = await messageModel.create(message)
        return result
    }
    
}