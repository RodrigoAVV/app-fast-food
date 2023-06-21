import passport from 'passport'
import local from 'passport-local'
import GitHubStrategy from 'passport-github2'
import {userModel} from '../dao/models/users.js'
import { createHash,isValidPassword } from '../utils.js'

const localStrategy = local.Strategy

const initializePassport = () => {
    passport.use('github',new GitHubStrategy({
        clientID:'Iv1.8d60101a68e8bca3',
        clientSecret:'6c4fff7abebe0ac0c4f5314f28228855f3f2a726',
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
            const userData = {
                name,firstname,lastname,run,email,password:createHash(password),age
            }
            const result = await userModel.create(userData)
            return done(null,result)
        } catch (err) {
            console.log(err)
            return done(`Error al obtener el usuario: ${err}`)
        }
    }))

    passport.use('login',new localStrategy({usernameField:'run'},async (run,password,done) => {
        try {
            const user = await userModel.findOne({run})
            if(!user){
                console.log('user nomexiste')
                return done(null,false)
            }
            if(!isValidPassword(user,password))
                return done(null,false)
            return done(null,user)
        } catch (err) {
            return done(`Error al obtener el usuario: ${err}`)
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