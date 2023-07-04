import express from 'express'
import mongoose  from 'mongoose'
import MongoStore from 'connect-mongo'
import cartFilesRouter from './src/routes/cart.files.router.js'
import cartMongoDBRouter from './src/routes/cart.mongoDB.router.js'
import messageMongoDBRouter from './src/routes/message.mongoDB.router.js'
import productFilesRouter from './src/routes/product.files.router.js'

import productMongoDBRouter from './src/routes/product.router.js'

import userViewRouter from './src/routes/users.router/views.router.js'
import userSessionRouter from './src/routes/users.router/sessions.router.js'

import errorMiddleware from './src/middlewares/errorMiddleware.js'
import handlebars from 'express-handlebars'
import __dirname from './src/utils.js'
import {Server} from 'socket.io'

import cookieParser from 'cookie-parser'
import session from 'express-session'
import FileStore from 'session-file-store'
import passport from 'passport'
import initializePassport from './src/config/passport.config.js'
import config from './src/config/config.js'

const app = express()
import './src/dao/dbConfig.js'


app.use(session({
    store:MongoStore.create({
        client:mongoose.connection.getClient(),
        ttl:3600
    }),
    secret:config.secret,
    resave:true,
    saveUninitialized:true
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Primero las rutas despues el directorio publico
app.use(express.static(`${__dirname}/public`))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const fileStorage = FileStore(session)
app.use(cookieParser())

app.engine('handlebars',handlebars.engine())
app.set('views',`${__dirname}/views`)
app.set('view engine','handlebars')

app.use('/api/products2',productMongoDBRouter)

app.use('/api/carts2',cartMongoDBRouter)
app.use('/api/messages',messageMongoDBRouter)

app.use('/api/products',productFilesRouter)
app.use('/api/carts',cartFilesRouter)

app.subscribe(cookieParser())
app.use('/',userViewRouter)
app.use('/api/users',userSessionRouter)
app.use(errorMiddleware)

const server = app.listen(config.port,()=>console.log('Listening on port 8081'))

const io = new Server(server)

app.set('socketio',io)