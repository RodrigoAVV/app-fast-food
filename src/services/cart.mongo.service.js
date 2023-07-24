import { CARTSDAO } from '../dao/index.js'

const createCart = async(products) => {
    const result = await CARTSDAO.createCart(products)
    return result
}

const getCart = async(cid) => {
    const result = await CARTSDAO.search(cid)
    return result
}

const updateCart = async(id,newCart) => {
    const result = await CARTSDAO.updateCart({_id:id},newCart)
    return result
    
}

export {
    createCart,
    getCart,
    updateCart
}