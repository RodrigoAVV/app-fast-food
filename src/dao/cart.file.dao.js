import fs from 'fs'
const path = './src/files/car.json'
const dirProducts = './src/files/product.json'
export default class CarService{
    constructor(){
        this.path = path
    }
    createCar = async() => {
        try {
            const cars = [{"cid":1,"products":[]}]
            await fs.promises.writeFile(path,JSON.stringify(cars,null,4),'utf-8')
            return{
                success:true,
                messaje:'Car created'
            }
        } catch (err) {
            console.error(err.messaje)
        }
    }

    addProductCar = async (cid,pid) => {
        try {
            const data1 = await fs.promises.readFile(path,'utf-8')
            const data2 = await fs.promises.readFile(dirProducts,'utf-8')

            const carts = JSON.parse(data1)
            const products = JSON.parse(data2)

            let flag = false

            const carObject = carts.find(c => c.cid == cid)
            const productObject = products.find(p => p.id == pid)
            if(carObject){
                let newCarts = carts.map(car => {
                    if(car.cid == cid){
                        car.products.map(p =>{
                            if(p.id == pid){
                                p.quantity++
                                flag = true
                            }
                        })
                    }
                    return car
                })
                if(!flag && productObject){
                    newCarts = carts.map(car => {
                        if(car.cid == cid){
                            car.products.push({"id":pid,"quantity":1})
                        }
                        return car
                    })
                }
                await fs.promises.writeFile(path,JSON.stringify(newCarts,null,4),'utf-8')
                return{
                    success:true,
                    mesagge:'Producto agregado'
                }
            }else{
                carts.push({"id":uuidv4(),"products":[]})
                await fs.promises.writeFile(path,JSON.stringify(newCarts,null,4),'utf-8')
                return{
                    success:true,
                    message:'Carrito creado'
                }
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    getCarById = async (cid) => {
        try {
            let carts = await fs.promises.readFile(path,'utf-8')
            const cartsObject = JSON.parse(carts)
            
            if(cartsObject.length === 0){
                return{
                    success:false,
                    message:'No hay productos disponibles en el carrito'
                }
            }
            const cartData = cartsObject.find(d => d.cid == cid)
            if(cartData){
                return{
                    success:true,
                    data:cartData
                }
            }else{
                return{
                    success:false,
                    mesagge:'No se encuentra este producto'
                }
            }
            
        } catch (err) {
            console.error(err.message)
        }
    }
}
