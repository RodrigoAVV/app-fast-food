import { productModel } from '../dao/models/products.js'

export default class Product{
    constructor(){
        console.log('product mongo DAO')
    }

    getAll = async () => {
        const products = await productModel.find().lean()
        return products
    }
    
    save = async (product) =>{
        const result = await productModel.create(product)
        return result
    }

    update = async (id,product) => {
        const result = await productModel.updateOne({_id:id},product)
        return result
    }

    delete = async (id) => {
        const result = await productModel.deleteOne({_id:id})
        return result
    }

    search = async(id) => {
        const result = await productModel.findOne({_id:id})
        return result
    }
    
    filter = async(limit,page,sort,query) => {
        /*const products = await productModel.aggregate([
            {
                $match: {title:query}
            },
            {
                $sort: {price:sort}
            },
            {
                $limit:limit
            }
        ])*/
        let products = await productModel.paginate({/*title:query},{price:sort*/},{limit,page,lean:true})
        return products
    }
}