import {Router} from 'express'

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
    userDocuments,
    documents
} from '../controllers/user.mongo.controller.js'

router.get('/',loginUser)

router.get('/create',createUser)

router.get('/reset',viewResetPassword)

router.get('/resetpassword/:token',resetPassord)

router.get('/github',gitHub)

router.get('/github-callback',githubCallback)

router.get('/documents',documents)

router.get('/failregister',failRegister)

router.get('/current',current)

router.get('/faillogin',failLogin)

router.get('/logout',logout)

router.post('/login',login)

router.post('/store',store)

router.post('/reset',reset)

router.post('/resetpass',resetPass)

router.post('/:uid/documents',userDocuments)

export default router