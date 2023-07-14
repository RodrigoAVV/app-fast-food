import fs from 'fs'
const path = './src/files/product.json'

export default class Product{
    constructor(){
        this.path = path
    }

    filter = async (limit) => {
        let data = await fs.promises.readFile(path,'utf-8')
        const productoFormat = JSON.parse(data)
        const min = Math.ceil(0)
        const max = Math.floor(productoFormat.length - 1)
        let products = []
        if(limit && limit <= productoFormat.length){
            for(let i = 0 ; i < limit ; i++){
                let rand = Math.floor(Math.random() * (max - min + 1) + min)
                products.push(productoFormat[rand])
            }
            //console.log(products)
        }else{
            products = productoFormat
        }
        
        return products
    }

    save = async (product) => {
        const data = await fs.promises.readFile(path,'utf-8')
        const products = JSON.parse(data)
        products.push(product)
        await fs.promises.writeFile(path,JSON.stringify(products,null,4),'utf-8')
        return true
    } 

    search = async (id) => {
        let products = await fs.promises.readFile(path,'utf-8')
        const productsObj = JSON.parse(products)
        const data = productsObj.find(d => d.id === id)
        return data
    }

    async update(id,data){
        let products = await fs.promises.readFile(path,'utf-8')
        const productsObj = JSON.parse(products)
        const newList = await productsObj.map(product => {
            if(product.id == id){
                return {
                    title:data.title,
                    descripcion:data.description,
                    code:data.code,
                    price:data.price,
                    stock:data.stock,
                    thumbnail:{},
                    id,
                    timestamps:Date.now()
                }
            }
            return product
        })
        await fs.promises.writeFile(path, JSON.stringify(newList,null,2))
        return true
    }

    async delete(id){
        const products = await fs.promises.readFile(path)
        const productsObject = JSON.parse(products)
        const total = productsObject.length
        const newProducts = productsObject.filter(product => product.id != id)
        const total2 = newProducts.length
        await fs.promises.writeFile(path, JSON.stringify(newProducts,null,2))
        let res = false
        if(total2 < total){
            res = true
        }
        return res
    }
}
