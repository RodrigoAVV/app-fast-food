/*
import {
    loginUser as loginUserToUserServive
    storeProduct as storeToProductService,
    editProduct as editToProductService,
    deleteProduct as deleteToProductService,
    searchProduct as searchToProductService
} from '../services/user.mongo.service.js'

*/
import { verifyToken,
        isValidPassword,
        createHash,
        passportCall,
        generateToken,
        authToken } from '../../src/utils.js'
import passport from 'passport';
import _ from 'lodash';
import UserDTO from '../../src/dto/userDTO.js';
import UserModel from '../../src/dao/user.mongoDB.dao.js'
const UserDAO = new UserModel()
import nodemailer from 'nodemailer'

const folder = 'users.mongo'

import { isValidObjectId, Types } from "mongoose";

const loginUser = async(req,res) => {
    return res.render(`${folder}/index`,{layout:'mainLogin'})
}

const createUser = async(req,res) => {
    return res.render(`${folder}/create`,{layout:'mainLogin'})
}

const viewResetPassword = async(req,res) => {
    return res.render(`${folder}/reset`,{layout:'mainReset'})
}

const resetPassord = async(req,res) => {
    const token = req.params.token
    const tokenUser = verifyToken(token)
    if(tokenUser){
        res.render(`${folder}/newpassword`,{layout:'mainReset'})
    }else{
        res.redirect('/api/users/reset')
    }
}

const gitHub = async (req,res) => {
    return res.send({success:true,message:'Usuario registrado'})
}

const githubCallback = async (req,res) => {
    req.session.user = req.user,
    res.redirect('/api/products2')
}

const store = async(req,res) => {
    return res.send({success:true,message:'Usuario registrado'})
}

const failRegister = async(req,res) => {
    return res.send({success:false,message:'Error al registrar el usuario'})
}

const login = async(req,res) => {
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
    return res.cookie('cookieToken',token,{maxAge:60*60*1000,httpOnly:true}).send({success:true})
}

const current = (req,res) => {
    const userDTO = new UserDTO(req.user)
    return res.send({success:true,payload:userDTO})
}

const failLogin = async(req,res) => {
    return res.send({success:false,message:'Fallo el login'})
}

const logout = (req,res) => {
    req.session.destroy(err =>{
        if(err)
            return res.status(500).send({succes:false,message:'Error'})
        res.redirect('/api/users')
    })
}

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: 'rodrigo.vidal.vera@gmail.com',
        pass: 'nlvhsvqnmnxfckaw'
    }
})
//Al enviar el email buscar el usuario, genera el tocken y envia el email
const reset = async(req,res) =>{
    const {email} = req.body
    const objUser = await UserDAO.getOneEmail(email)
    if(!objUser) return res.send({success:false,message:'Este usuario no se encuentra registrado'})
    //const user = new UserDTO(objUser)
    const accessToken = generateToken(objUser)
    
    await transporter.sendMail({
        from: 'Fast food',
        to: objUser.email,
        subject: 'Reestablecer contraseña',
        html: "<p><a href='http://localhost:8081/api/users/resetpassword/"+accessToken+"'>Reestablecer contraseña</a></p>"
    })
    res.send({success:true,access_token:accessToken})
}

const resetPass = async(req,res) => {
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
}

const documents = async(req,res) => {
    return res.render(`${folder}/documents`)
}

const perfil = async(req,res) => {
    if(req.file){
        res.redirect('/api/products2')
    }
}

const premium = async(req,res) => {
    if(req.files.length === 3){
        const uid = req.body.uid
        const user = await UserDAO.getOneId(uid)
        const files = req.files
        files.forEach(function(data){
            user.documents.push({name:data.filename,reference:data.path})
        })
        const result = await UserDAO.updateSetDocuments(uid,user.documents)
        if(result)
            res.redirect('/api/products2')
    }else{
        return res.send({success:false,message:'No ha terminado de cargar sus documentos'})
    }
}

export {
    loginUser,
    createUser,
    viewResetPassword,
    resetPassord,
    gitHub,
    githubCallback,
    store,
    failRegister,
    login,
    current,
    failLogin,
    logout,
    reset,
    resetPass,
    documents,
    perfil,
    premium
}
