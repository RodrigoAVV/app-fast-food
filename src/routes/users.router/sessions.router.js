import {Router} from 'express'

import UserDTO from '../../dto/userDTO.js';

import _ from 'lodash';
import { passportCall, generateToken, authorization } from '../../utils.js';

import passport from 'passport';

const router = Router()

router.get('/github',passport.authenticate('github',{scope:['user.email']}),async (req,res) => {
    console.log('github')
    res.send({success:true,message:'Usuario registrado'})
})

router.get('/github-callback',passport.authenticate('github',{failureRedirect:'/'}),async (req,res)=>{
    req.session.user = req.user,
    res.redirect('/api/products2')
})

router.post('/store',passport.authenticate('store',{failureRedirect:'failregister'}), async(req,res) => {
    req.session.user = {
        name: req.user.name,
        run: req.user.run
    }
    res.send({success:true,message:'Usuario registrado'})
})

router.get('/failregister',async(req,res) => {
    res.send({success:false,message:'Error al registrar el usuario'})
})

router.post('/login',passport.authenticate('login',{failureRedirect:'faillogin'}) ,async(req,res) => {
    if(!req.user)
        return res.status(400).send({success:false,message:'Credenciales invalidas'})
    //console.log(req.user)
    const token = generateToken(req.user)
    req.session.user = {
        name: req.user.name,
        run: req.user.run,
        cart:req.user.cart,
        id:req.user._id,
        email:req.user.email
    }
    res.cookie('cookieToken',token,{maxAge:60*60*1000,httpOnly:true}).send({success:true})
})

router.get('/current',passportCall('jwt'),passport.authenticate('jwt',{session:false}),(req,res) => {
    const userDTO = new UserDTO(req.user)
    res.send({success:true,payload:userDTO})
})

router.get('/faillogin',async(req,res)=>{
    res.send({success:false,message:'Fallo el login'})
})

router.get('/logout',(req,res) => {
    req.session.destroy(err =>{
        if(err)
            return res.status(500).send({succes:false,message:'Error'})
        res.redirect('/')
    })
})
export default router