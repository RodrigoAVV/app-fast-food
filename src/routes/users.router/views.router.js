import {Router} from 'express'
import { authorization,verifyToken } from '../../utils.js';
import {getCantProducts} from '../../helpers.js'
import {
    getCart as getToCartService
} from '../../services/cart.mongo.service.js'
const folder = 'users.mongo'

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

router.get('/api/users/documents',async (req,res) => {
    const cart =  await getToCartService(req.session.user.cart)
    const cant =  await getCantProducts(cart.products)
    return res.render(`${folder}/documents`,{userSession:req.session.user,cant})
})

router.get('/api/users/viewPremium',async (req,res) => {
    const cart =  await getToCartService(req.session.user.cart)
    const cant =  await getCantProducts(cart.products)
    return res.render(`${folder}/premium`,{userSession:req.session.user,cant})
})

export default router