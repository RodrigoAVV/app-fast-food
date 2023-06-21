import {Router} from 'express'
import { authorization } from '../../utils.js';
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

router.get('/api/users/create', authorization('user'),(req,res) => {
    return res.render(`${folder}/create`,{layout:'mainLogin'})
})


export default router