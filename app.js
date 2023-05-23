import express from 'express'

import productRouter from './src/routes/router.files/product.router.js'
import carRouter from './src/routes/router.files/car.router.js'

import mongoose  from 'mongoose'

import productRouterMongoDB from './src/routes/router.mongoDB/product.mongoDB.js'
import cartRouterMongoDB from './src/routes/router.mongoDB/cart.mongoDB.js'
import messageRouterMongoDB from './src/routes/router.messaage/message.mongoDB.js'

import errorMiddleware from './src/middlewares/errorMiddleware.js'
import handlebars from 'express-handlebars'
import __dirname from './src/utils.js'
import {Server} from 'socket.io'

const app = express()

//Primero las rutas despues el directorio publico
app.use(express.static(`${__dirname}/public`))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.engine('handlebars',handlebars.engine())
app.set('views',`${__dirname}/views`)
app.set('view engine','handlebars')

app.use('/api/products2',productRouterMongoDB)
app.use('/api/cart2',cartRouterMongoDB)
app.use('/api/messages',messageRouterMongoDB)

app.use('/api/products',productRouter)
app.use('/api/carts',carRouter)


app.use(errorMiddleware)


const server = app.listen(8081,()=>console.log('Listening on port 8081'))

try {
    await mongoose.connect('mongodb+srv://rodrigo:1cWz0gUv86AbcNd5@clusterfastfood.zvkhedb.mongodb.net/?retryWrites=true&w=majority')
} catch (err) {
    console.log(err)
}


const io = new Server(server)

app.set('socketio',io)