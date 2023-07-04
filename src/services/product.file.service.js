import { PRODUCTSDAO } from '../dao/index.js'

const getAllProducts = async (limit,page,sort,query) => {
    const products = await PRODUCTSDAO.filter(limit,page,sort,query)
    return products
}

const storeProduct = async(body) => {
    const data = await PRODUCTSDAO.save(body)
    return data
}
const editProduct = async(id,obj) => {
    const data = await PRODUCTSDAO.update(id,obj)
    return data
}

const deleteProduct = async(id) => {
    const data = await PRODUCTSDAO.delete(id)
    return data
}
const searchProduct = async(id) => {
    const data = await PRODUCTSDAO.search(id)
    return data
}

export {
    getAllProducts,
    storeProduct,
    editProduct,
    deleteProduct,
    searchProduct
}