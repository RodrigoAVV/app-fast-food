import {fileURLToPath} from 'url'
import {dirname} from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'

const PRIVATE_KEY ='CoderHouse39760'

export const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '1h' });
    return token;
}

export const authToken = (req, res, next) => {
    const authToken = req.headers.authorization
    
    if(!authToken) return res.status(401).send({error: 'Not authenticated'})

    const token = authToken.split(' ')[1]

    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({error: 'Not authorized'})
        req.user = credentials.user;
        next()
    })
}

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, PRIVATE_KEY)
        return decoded
      } catch(err) {
        // err
      }
}

export const passportCall = (strategy) => {
    return async(req,res,next) => {
        passport.authenticate(strategy,function(err,user,info){
            if(err) return next(err)
            if(!user){
                return res.status(401).send({error:info.messages?info.messages:info.toString()})
            }
            req.user = user
            next()
        })(req,res,next)
    }
}

export const authorization = (role) => {
    return async(req,res,next) => {
        if(!req.user) return res.status(401).send({success:false,message:'No autorizado'})
        if(req.user.role != role) return res.status(403).send({success:false,message:'No tiene permisos'})
        next()
    }
}

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10))
export const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname