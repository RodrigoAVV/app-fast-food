import {Router} from 'express'
import { authorization,verifyToken } from '../../utils.js';
const folder = 'users.mongo'

//import _ from 'lodash';

const router = Router()
/*
const publicAccess = (req,res,next) => {
    if(req.session.user) return res.redirect('/api/products2')
    next()
}

const privateAccess = (req,res,next) => {
    if(!req.session.user) return res.redirect('api/users/login')
    next()
}
*/
router.get('/',  (req,res) => {
    return res.render(`${folder}/index`,{layout:'mainLogin'})
})

router.get('/api/users/create',(req,res) => {
    return res.render(`${folder}/create`,{layout:'mainLogin'})
})

router.get('/api/users/reset',(req,res) => {
   return res.render(`${folder}/reset`,{layout:'mainReset'})
})

router.get('/api/users/resetpassword/:token',(req,res) => {
    const token = req.params.token
    const tokenUser = verifyToken(token)
    if(tokenUser){
        res.render(`${folder}/newpassword`,{layout:'mainReset'})
    }else{
        res.redirect('/api/users/reset')
    }
})

export default router