import { PRODUCTSDAO } from '../dao/index.js'
const getToProducts = async (limit,page,sort,query) => {
    const products = await PRODUCTSDAO.filter(limit,page,sort,query)
    return products
}

export {
    getToProducts
}