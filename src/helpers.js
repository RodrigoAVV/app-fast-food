import { v4 as uuidv4 } from 'uuid'
export default class Ticket{
    productNoStock = async(products) => {
        const compra = products.filter(p => p.quantity > p.product.stock)
        return compra
    }

    generateTicket = async(products,user) => {
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

    updateCantProduct = async(products,productManager) => {
        let result = {}
        for(let i = 0 ; i < products.length ; i++){
            let product = await productManager.search(products[i].product._id)
            product.stock -= products[i].quantity
            result = await productManager.update(products[i].product._id,product)
        }
        return result
    }

    getProductsStock = async(products) => {
        const newProducts = products.filter(p => p.quantity <= p.product.stock)
        return newProducts
    }
    
    getIdProducts = async(products) => {
        const ids = []
        products.forEach(function(value){
            ids.push({id:value.product._id.toString()})
        })
        return ids
    }

    getCantProductCart = async(products) => {
        let cant
        products.forEach(function(value){
            cant += value.product.price
        })
        return cant
    }

    getCantProducts = async(products) => {
        let cant = 0
        products.forEach(function(value){
            cant += value.quantity
        })
        return cant
    }
}