import { v4 as uuidv4 } from 'uuid'
export default class Helper{
    static productNoStock = async(products) => {
        const compra = products.filter(p => p.quantity > p.product.stock)
        return compra
    }

    static generateTicket = async(products,user) => {
        let amount = 0
        products.forEach(function(value){
            amount += value.quantity * value.product.price
        })
        let ticketData = {}
        ticketData.code = uuidv4()
        ticketData.purchase_datetime = Date()
        ticketData.amount = amount
        ticketData.purchaser =  user
        return ticketData
    }

    static updateCantProduct = async(products,productManager) => {
        let result = {}
        for(let i = 0 ; i < products.length ; i++){
            let product = await productManager.search(products[i].product._id)
            product.stock -= products[i].quantity
            result = await productManager.update(products[i].product._id,product)
        }
        return result
    }

    static getProductsStock = async(products) => {
        const newProducts = products.filter(p => p.quantity <= p.product.stock)
        return newProducts
    }
    
    static getIdProducts = async(products) => {
        const ids = []
        products.forEach(function(value){
            ids.push({id:value.product._id.toString()})
        })
        return ids
    }

    static getCantProductCart = async(products) => {
        let cant
        products.forEach(function(value){
            cant += value.product.price
        })
        return cant
    }

    static getCantProducts = async(products) => {
        let cant = 0
        products.forEach(function(value){
            cant += value.quantity
        })
        return cant
    }
}