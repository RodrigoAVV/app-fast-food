import {Router} from 'express'
import passport from 'passport';

import User from '../../dao/user.mongoDB.dao.js'

import _ from 'lodash';

const router = Router()

const userDao = new User()

router.get('github',passport.authenticate('github',{scope:['user.email']}),async (req,res) => {
    return res.send({success:true,message:'Usuario registrado'})
})

router.get('/github-callback',passport.authenticate('github',{failureRedirect:'/login'}),async (req,res)=>{
    req.session.user = req.user,
    res.redirect('/')
})

router.post('/store', async(req,res,next) => {
    try {
        const { body } = req
        const {name,firstname,lastname,run,email,pass,rol} = body
        console.log(name,firstname,lastname,run,email,pass,rol)
       if(_.isNil(body) || !name || !firstname || !lastname  || !run || !email || !pass || !rol)
            return (res.status(400).json({success:false,message:'Faltan datos por completar'}))
        let exists = await userDao.getOneRun(run)
        if(exists)
            return (res.status(400).json({success:false,message:'Este run ya se encuentra registrado'}))
        exists = await userDao.getOneEmail(email)
        if(exists)
            return (res.status(400).json({success:false,message:'Este email ya se encuentra registrado'}))
        const data = await userDao.save(body)
        if(data)
            return res.status(200).send({success:true,message:'Usuario agregado correctamente'})
        else
            return res.status(400).send({success:false,message:'Error al registrar usuario'})
    } catch (err) {
        next(err)
    }
})

router.post('/login', async(req,res,next) => {
    try {
        const { body } = req
        const {run,pass} = body
        console.log(run,pass)
        if(_.isNil(body) || !run || !pass)
            return (res.status(400).send({success:false,message:'Faltan datos por completar'}))
        const user = await userDao.login(run,pass)
        //console.log(user)
        if(!user)
            return (res.status(400).send({success:false,message:'Error en los datos ingresados'}))
        req.session.user = {
            name:`${user.name} ${user.firstname}`,
            run:user.run
        }
        //console.log(req.session.user)
        res.status(200).send({success:true,message:'Sesion creada'})
        //return res.rendirect('/api/products2')
    } catch (err) {
        next(err)
    }
})

router.get('/logout',(res,req) => {
    req.session.destroy(err =>{
    if(err) return res.status(500).send({succes:false,message:'Error'})
        res.redirect('/api/users/login')
    })
})
export default router