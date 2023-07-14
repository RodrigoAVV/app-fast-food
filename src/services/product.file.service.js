import { PRODUCTSDAO } from '../dao/index.js'

const getAllProducts = async (limit) => {
    const res = await PRODUCTSDAO.filter(limit)
    return res
}

const storeProduct = async(body) => {
    const res = await PRODUCTSDAO.save(body)
    return res
}
const editProduct = async(id,obj) => {
    const res = await PRODUCTSDAO.update(id,obj)
    return res
}

const deleteProduct = async(id) => {
    const res = await PRODUCTSDAO.delete(id)
    return res
}
const searchProduct = async(id) => {
    const data = await PRODUCTSDAO.search(id)
    return data
}

const getAll = async() => {
    const products = await PRODUCTSDAO.getAll()
    return products
}

export {
    getAllProducts,
    storeProduct,
    editProduct,
    deleteProduct,
    searchProduct,
    getAll
}