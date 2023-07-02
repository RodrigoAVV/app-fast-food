import {getToProducts as getToProductsService} from '../services/product.mongo.service.js'

const folder = 'products.mongo'

const getAllProducts = async(req,res) => {
    const { page = 1,limit = 5, sort = '', query = '' } = req.query
    const { docs,hasNextPage,nextPage,prevPage,hasPrevPage} = await getToProductsService(limit,page,sort,query)
    const products = docs
    const user = {
        name:'María',
        role:true
    }
    res.render(`${folder}/indexDoc`,{products,user,hasPrevPage,hasNextPage,nextPage,prevPage,userSession:req.session.user})
}

export {
    getAllProducts
}