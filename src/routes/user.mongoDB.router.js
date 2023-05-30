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
        console.log(`${name} ${lastname1} ${lastname2} ${run} ${email} ${pass}`)
        if(_.isNil(body) || !name || !lastname1 || !lastname2  || !run || !email || !pass)
            return (res.status(400).json({success:false,message:'Faltan datos por completar'}))
        const data = await userDao.save(body)
        data ? res.status(200).send({success:true,message:'Usuario agregado correctamente'}) :
            res.status(200).send({success:false,message:'Error al registrar usuario'})
    } catch (err) {
        next(err)
    }
})

export default router