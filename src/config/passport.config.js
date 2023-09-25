import passport from 'passport'
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'
import {userModel} from '../dao/models/users.js'
import Cart from '../dao/cart.mongoDB.dao.js'
const cartManager = new Cart()
import { createHash,isValidPassword } from '../utils.js'
import jwt from 'passport-jwt'
import config from './config.js'

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const localStrategy = local.Strategy

const initializePassport = () => {
    passport.use('github',new GitHubStrategy({
        clientID:config.clientID,
        clientSecret:config.clientSecret,
        callbackURL:'htpp://localhost:8081/api/users/github-callback',
        scope:['user:email']
    },async(accesToken,refreshToken,profile,done) => {
        try {
            const email = profile.emails[0].value
            const user = await userModel.findOne({email})
            if(!user){
                const newUser ={
                    firstname:profile._json.name,
                    lastname:'',
                    run:'',
                    email,
                    pass:'',
                    type:'user'
                }
                const result = await userModel.create(newUser)
                done(null,result)
            }else{
                done(null,user)
            }
        } catch (err) {
            return done(err)
        }
    }))

    passport.use('store',new localStrategy({passReqToCallback:true, usernameField:'run'},async (req,username,password,done) => {
        const { body } = req
        const {name,firstname,lastname,run,email,age} = body
        try {
            const user = await userModel.findOne({run:username})
            if(user){
                return done(null,false)
            }
            const products=[
                {}
            ]
            const cart = await cartManager.createCart(products)
            const userData = {
                name,firstname,lastname,run,email,password:createHash(password),age,cart: { _id: cart[0]._id, products: [] }
            }
            const result = await userModel.create(userData)
            return done(null,result)
        } catch (err) {
            return done(`Error al obtener el usuario: ${err}`)
        }
    }))

    passport.use('login',new localStrategy({usernameField:'run'},async (run,password,done) => {
        try {
            const user = await userModel.findOne({run})
            if(!user){
                return done(null,false)
            }
            if(!isValidPassword(user,password))
                return done(null,false)
            return done(null,user)
        } catch (err) {
            return done(`Error al obtener el usuario: ${err}`)
        }
    }))

    const cookieExtractor = req => {
        let token = null
        if(req && req.cookies){
            token = req.cookies['cookieToken']
        }
        return token
    }

    passport.use('jwt',new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey:config.secretOrKey
    },async(jwt_payload,done) => {
        try {
            return done(null,jwt_payload.user)
        } catch (err) {
            return done(err)
        }
    }))

    passport.serializeUser((user,done) => {
        done(null,user._id)
    })

    passport.deserializeUser(async (id,done) => {
        const user = await userModel.findById(id)
        done(null,user)
    })

}
export default initializePassport