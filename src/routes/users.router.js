import {Router} from 'express'
import { authorization } from '../utils.js';
const router = Router()

import {
    loginUser,
    createUser,
    viewResetPassword,
    resetPassord
} from '../controllers/user.mongo.controller.js'

router.get('/',loginUser)

router.get('/create',createUser)

router.get('/reset',viewResetPassword)

router.get('/resetpassword/:token',resetPassord)

export default router