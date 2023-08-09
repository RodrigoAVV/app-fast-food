import {Router} from 'express'

import UserDTO from '../../dto/userDTO.js';
import nodemailer from 'nodemailer'
import UserModel from '../../dao/user.mongoDB.dao.js'
import userDTO from '../../dto/userDTO.js'
import { verifyToken,isValidPassword,createHash } from '../../utils.js';

const UserDAO = new UserModel()

import _ from 'lodash';
import { passportCall, generateToken, authToken } from '../../utils.js';

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
    res.send({success:true,message:'Usuario registrado'})
})

router.get('/failregister',async(req,res) => {
    res.send({success:false,message:'Error al registrar el usuario'})
})

router.post('/login',passport.authenticate('login',{failureRedirect:'faillogin'}) ,async(req,res) => {
    if(!req.user)
        return res.status(400).send({success:false,message:'Credenciales invalidas'})
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

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'rodrigo.vidal.vera@gmail.com',
        pass: 'lnsfmesdshimifut'
    }
})

//Al enviar el email buscar el usuario, genera el tocken y envia el email
router.post('/reset',async(req,res) => {
    const {email} = req.body
    const objUser = await UserDAO.getOneEmail(email)
    //const user = new UserDTO(objUser)
    const accessToken = generateToken(objUser)
    await transporter.sendMail({
        from: 'Fast food',
        to: objUser.email,
        subject: 'Reestablecer contraseña',
        html: "<p><a href='http://localhost:8081/api/users/resetpassword/"+accessToken+"'>Reestablecer contraseña</a></p>"
    })
    res.send({success:true,access_token:accessToken})
})

router.get('/current',authToken,(req,res) => {
    res.send({success:true,payload:req.user})
})

router.post('/resetpass',async(req,res) => {
    const body = req.body
    const tokenUser = verifyToken(body.token)
    if(tokenUser){
        if(body.pass1 != body.pass2)
            return res.send({success:false,message:'Las contraseñas deben ser iguales'})
        const user =  await UserDAO.getOneEmail(tokenUser.user.email)
        if(isValidPassword(user,body.pass1)){
            return res.send({success:false,message:'La contraseña deben ser diferente a la anterior'})
        }
        user.password = createHash(body.pass1)
        const result = UserDAO.update(user.email,user)
        if(result)
            return res.send({success:true,message:'Contraseña actualizada'})
    }else{
        return res.send({success:false,message:'Token ya fue utilizado o ha expirado'})
    }


    
    
    
})


export default router