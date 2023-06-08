import passport from 'passport'
import GitHubStrategy from 'passport-github2'
import {userModel} from '../dao/models/users.js'


const initializePassport = () => {
    passport.use('github',new GitHubStrategy({
        clientID:'Iv1.8d60101a68e8bca3',
        clientSecret:'6c4fff7abebe0ac0c4f5314f28228855f3f2a726',
        callbackURL:'htpp://localhost:8081/session/github-callback',
        scope:['user:email']
    },async(accesToken,refreshToken,profile,done) => {
        try {
            const email = profile.emails[0].value
            const user = await userModel.findOne({email})
            if(!user){
                const newUser ={
                    name:profile._json.name,
                    firstname:'',
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

    passport.serializeUser((user,done) => {
        done(null,user._id)
    })

    passport.deserializeUser(async (id,done) => {
        const user = await userModel.findById(id)
        done(null,user)
    })
}
export default initializePassport