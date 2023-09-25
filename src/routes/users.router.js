import {Router} from 'express'
import passport from 'passport';
import { passportCall } from '../utils.js';
import uploader from '../uploaders.js'

const router = Router()

import {
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
} from '../controllers/user.mongo.controller.js'

router.get('/',loginUser)

router.get('/create',createUser)

router.get('/reset',viewResetPassword)

router.get('/resetpassword/:token',resetPassord)

router.get('/github',passport.authenticate('github',{scope:['user.email']}),gitHub)

router.get('/github-callback',passport.authenticate('github',{failureRedirect:'/'}),githubCallback)

router.get('/documents',documents)

router.get('/failregister',failRegister)

router.get('/current',passportCall('jwt'),passport.authenticate('jwt',{session:false}),current)

router.get('/faillogin',failLogin)

router.get('/logout',logout)

router.post('/login',passport.authenticate('login',{failureRedirect:'faillogin'}),login)

router.post('/store',passport.authenticate('store',{failureRedirect:'failregister'}),store)

router.post('/reset',reset)

router.post('/resetpass',resetPass)

router.post('/perfil',uploader.single('fileProfile'),perfil)

router.post('/premium',uploader.array('docs', 3),premium)

export default router