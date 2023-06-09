import fs from 'fs'
const path = './src/files/product.json'
export default class ProductService{
    constructor(){
        this.path = path
    }
    //Revisado
    addProduct = async (product) => {
        let data = await fs.promises.readFile(path,'utf-8')
        if(data.length > 0){
            let products = JSON.parse(data)
            products.push(product)
            await fs.promises.writeFile(path,JSON.stringify(products,null,4),'utf-8')
            return {
                success:true,
                message:'Producto agregado exitosamente'
            }
        }
    } 
    //Revisado
    getProducts = async () => {
        let data = await fs.promises.readFile(path,'utf-8')
        if(data.length === 0){
            return {
                success:false,
                message:'Productos no disponibles'
            }
        }
        let productoFormat = JSON.parse(data)
        return {
            success:true,
            data:productoFormat
        }
    }
    //Revisado
    getProductsLimit = async (limit) => {
        let data = await fs.promises.readFile(path,'utf-8')
        if(data.length === 0){
            return {
                success:false,
                message:'Productos no disponibles'
            }
        }
        const productoFormat = JSON.parse(data)
        const min = Math.ceil(0)
        const max = Math.floor(productoFormat.length - 1)
        let products = []
        if(limit<= productoFormat.length){
            for(let i = 0 ; i < limit ; i++){
                let rand = Math.floor(Math.random() * (max - min + 1) + min)
                //console.log(rand)
                products.push(productoFormat[rand])
            }
            return {
                success: true,
                data:products
            }
        }else{
            return{
                success:false,
                message:'Limite supera cantidad de productos'
            }
        }
    }
    //Probado
    getProductById = async (id) => {
        let products = await fs.promises.readFile(path,'utf-8')
        if(products.length === 0){
            return{
                success:false,
                message:'No hay productos disponibles'
            }
        }
        const productsData = JSON.parse(products)
        const data = productsData.find(d => d.id === id)
        if(data){
            return{
                success:true,
                data:data
            }
        }else{
            return{
                success:false,
                mesagge:'No se encuentra este producto'
            }
        }
    }

    //Probado
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
}
