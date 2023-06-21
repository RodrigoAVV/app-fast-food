import {Router} from 'express'
import Product from '../../dao/product.mongoDB.dao.js'

const folder = 'products.mongo'

const router = Router()

const productManager = new Product()

router.get('/', async (req,res,next) => {
    try {
        const { page = 1,limit = 5, sort = '', query = '' } = req.query
        const { docs,hasNextPage,nextPage,prevPage,hasPrevPage} = await productManager.filter(limit,page,sort,query)
        console.log(prevPage)
        const products = docs
        const user = {
            name:'María',
            role:true
        }
        res.render(`${folder}/indexDoc`,{products,user,hasPrevPage,hasNextPage,nextPage,prevPage,userSession:req.session.user})
        //return res.json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/create', async (req,res,next) => {
    try {
        res.render(`${folder}/create`)
    } catch (err) {
        next(err)
    }
})

router.get('/update', async (req,res,next) => {
    try {
        res.render(`${folder}/update`)
    } catch (err) {
        next(err)
    }
})

router.get('/destroy', async (req,res,next) => {
    try {
        res.render(`${folder}/destroy`)
    } catch (err) {
        next(err)
    }
})

export default router