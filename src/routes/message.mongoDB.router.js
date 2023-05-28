import {Router} from 'express'
import Message from '../dao/message.dao.js'

const folder = 'messages.mongo'

const router = Router()

const messageManager = new Message()
let messages = []

router.get('/',(req,res,next) => {
    try {
        const io = req.app.get('socketio')
        io.on('connection',socket => {
            console.log('new client conected')
            socket.on('message', data => {
                messages.push(data)
                io.emit('logs',messages)
                guardar(messages)
            })
        })
        
        res.render(`${folder}/index`)
    } catch (err) {
        next(err)
    }
})
const guardar = async(data) => {
    const result = await messageManager.save(data)
}
export default router