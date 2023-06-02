import {Router} from 'express'

const folder = 'users.mongo'

//import _ from 'lodash';

const router = Router()

const publicAccess = (req,res,next) => {
    if(req.session.user) return res.redirect('/api/products2')
    next()
}

const privateAccess = (req,res,next) => {
    if(!req.session.user) return res.redirect('api/users/login')
    next()
}

router.get('/',publicAccess,  (req,res) => {
    try {
        return res.render(`${folder}/index`,{layout:'mainLogin'})
    } catch (err) {
        next(err)
    }
})

router.get('/api/users/create', publicAccess, (req,res,next) => {
    try {
        return res.render(`${folder}/create`,{layout:'mainLogin'})
    } catch (err) {
        next(err)
    }
})

router.get('/api/users/logout',(res,req,next) => {
    try {
        req.session.destroy(err =>{
        if(err) return res.status(500).send({succes:false,message:'Error'})
        res.redirect('/api/users/login')
    })} catch (err) {
        next(err)
    } 
})
export default router