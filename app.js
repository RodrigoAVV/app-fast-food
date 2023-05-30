import express from 'express'
import mongoose  from 'mongoose'
import cartFilesRouter from './src/routes/cart.files.router.js'
import cartMongoDBRouter from './src/routes/cart.mongoDB.router.js'
import messageMongoDBRouter from './src/routes/message.mongoDB.router.js'
import productFilesRouter from './src/routes/product.files.router.js'
import productMongoDBRouter from './src/routes/product.mongoDB.router.js'
import userMongoDBRouter from './src/routes/user.mongoDB.router.js'

import errorMiddleware from './src/middlewares/errorMiddleware.js'
import handlebars from 'express-handlebars'
import __dirname from './src/utils.js'
import {Server} from 'socket.io'

import cookieParser from 'cookie-parser'
import session from 'express-session'
import FileStore from 'session-file-store'

const app = express()

//Primero las rutas despues el directorio publico
app.use(express.static(`${__dirname}/public`))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const fileStorage = FileStore(session)
app.use(cookieParser())

app.use(session({
    store:new fileStorage({path:'./src/sesions',ttl:100,retries:0}),
    secret:'secretUser',
    resave:false,
    saveUninitialized:false
}))

app.engine('handlebars',handlebars.engine())
app.set('views',`${__dirname}/views`)
app.set('view engine','handlebars')

app.use('/api/products2',productMongoDBRouter)
app.use('/api/cart2',cartMongoDBRouter)
app.use('/api/messages',messageMongoDBRouter)

app.use('/api/products',productFilesRouter)
app.use('/api/carts',cartFilesRouter)

app.use('/api/users',userMongoDBRouter)


app.use(errorMiddleware)

app.subscribe(cookieParser())


const server = app.listen(8081,()=>console.log('Listening on port 8081'))

try {
    await mongoose.connect('mongodb+srv://rodrigo:1cWz0gUv86AbcNd5@clusterfastfood.zvkhedb.mongodb.net/?retryWrites=true&w=majority')
} catch (err) {
    console.log(err)
}


const io = new Server(server)

app.set('socketio',io)