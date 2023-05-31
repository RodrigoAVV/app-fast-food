import {Router} from 'express'
import User from '../dao/user.mongoDB.dao.js'

import { isValidObjectId, Types } from "mongoose";

const folder = 'users.mongo'

import _ from 'lodash';

const router = Router()

const userDao = new User()

router.get('/', async (req,res,next) => {
    try {
        return res.render(`${folder}/index`,{layout:'mainLogin'})
    } catch (err) {
        next(err)
    }
})

router.get('/create', async(req,res) => {
    try {
        return res.render(`${folder}/create`,{layout:'mainLogin'})
    } catch (err) {
        next(err)
    }
})

router.post('/store', async(req,res,next) => {
    try {
        const { body } = req
        const {name,lastname1,lastname2,run,email,pass} = body
        if(_.isNil(body) || !name || !lastname1 || !lastname2  || !run || !email || !pass)
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
        if(_.isNil(body) || !run || !pass)
            return (res.status(400).json({success:false,message:'Faltan datos por completar'}))
        const user = await userDao.login(run,pass)
        console.log(user)
        if(!user)
            return (res.status(400).json({success:false,message:'Error en los datos ingresados'}))
        req.session.user = {
            name:`${user.name} ${user.lastname1}`,
            run:user.run
        }
        return res.send({success:true,message:'Login success'})
    } catch (err) {
        next(err)
    }
})

router.get('/logout',async(res,req,next) => {
    req.session.destroy(err =>{
        if(err) return res.status(500).send({succes:false,message:'Error'})
        res.redirect('/')
    })
})
export default router