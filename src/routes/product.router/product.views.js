import {Router} from 'express'
import {getAllProducts} from '../../controllers/product.view.controller.js'

const folder = 'products.mongo'

const router = Router()

router.get('/',getAllProducts)

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