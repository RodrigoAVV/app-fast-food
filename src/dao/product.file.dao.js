import fs from 'fs'
const path = './src/files/product.json'

export default class Product{
    constructor(){
        this.path = path
    }

    getAll = async (limit) => {
        let data = await fs.promises.readFile(path,'utf-8')
        const productoFormat = JSON.parse(data)
        const min = Math.ceil(0)
        const max = Math.floor(productoFormat.length - 1)
        let products = []
        if(limit <= productoFormat.length){
            for(let i = 0 ; i < limit ; i++){
                let rand = Math.floor(Math.random() * (max - min + 1) + min)
                products.push(productoFormat[rand])
            }
        }
        return products
    }

    storeProduct = async (product) => {
        const data = await fs.promises.readFile(path,'utf-8')
        const products = JSON.parse(data)
        products.push(product)
        await fs.promises.writeFile(path,JSON.stringify(products,null,4),'utf-8')  
    } 
    
    productsLimit = async (limit) => {
        let data = await fs.promises.readFile(path,'utf-8')
        
        const productoFormat = JSON.parse(data)
        const min = Math.ceil(0)
        const max = Math.floor(productoFormat.length - 1)
        let products = []
        if(limit <= productoFormat.length){
            for(let i = 0 ; i < limit ; i++){
                let rand = Math.floor(Math.random() * (max - min + 1) + min)
                products.push(productoFormat[rand])
            }
            return {
                success: true,
                data:products
            }
        }
    }

    getProductById = async (id) => {
        let products = await fs.promises.readFile(path,'utf-8')
        const productsData = JSON.parse(products)
        const data = productsData.find(d => d.id === id)
        return data
    }

    async updateProductById(id,data){
        let products = await this.getProducts()
        if(products.length===0) return {success:false,message:'No hay productos disponibles'}
        //Product.data por lo que devuelve getProduct
        const newList = await products.data.map(product => {
            if(product.id == id){
                return {
                    title:data.title,
                    descripcion:data.descripcion,
                    code:data.code,
                    price:data.price,
                    status:data.status,
                    stock:data.sock,
                    category:data.category,
                    thumbnails:data.thumbnails,
                    timestamps:data.timestamps,
                    id
                }
            }
            return product
        })
        await fs.promises.writeFile(path, JSON.stringify(newList,null,2))
        return{
            success:true,
            data:`Producto ${id} actualizado`
        }
    }

    async deleteProductById(id){
        const products = await fs.promises.readFile(path)
        if(products.length===0){return {success:false,message:'No hay productos disponibles'}}
        const productsObject = JSON.parse(products)
        const total = productsObject.length
        const newProducts = productsObject.filter(product => product.id != id)
        const total2 = newProducts.length
        await fs.promises.writeFile(path, JSON.stringify(newProducts,null,2))
        if(total2 < total){
            return{
                success:true,
                data:`Producto ${id} eliminado`
            }
        }else{
            return{
                success:false,
                data:`Ocurrio un error al eliminar este producto ${id}`
            }
        }
    }
    async getAll(){
        const data = await fs.promises.readFile(path)
        const products = JSON.parse(data)
        return products
    }
}
