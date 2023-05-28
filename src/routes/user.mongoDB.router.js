import {Router} from 'express'
import User from '../dao/user.mongoDB.dao.js'

import { isValidObjectId, Types } from "mongoose";

const folder = 'users.mongo'

import _ from 'lodash';

const router = Router()

const userDao = new User()

router.get('/', async (req,res,next) => {
    try {
        return res.render(`${folder}/index`)
    } catch (err) {
        next(err)
    }
})

export default router