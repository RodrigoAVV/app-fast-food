/*
import {
    loginUser as loginUserToUserServive
    storeProduct as storeToProductService,
    editProduct as editToProductService,
    deleteProduct as deleteToProductService,
    searchProduct as searchToProductService
} from '../services/user.mongo.service.js'

*/
import {authorization} from '../utils.js'
import _ from 'lodash';

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

export {
    loginUser,
    createUser,
    viewResetPassword,
    resetPassord
}
