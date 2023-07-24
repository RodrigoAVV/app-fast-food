import {faker} from '@faker-js/faker'
import { v4 as uuidv4 } from 'uuid';
import {Router} from 'express'
const folder = 'products.faker'
const router = Router()

router.get('/mockingproducts',async(req,res) => {
    let products = []
    for(let i = 1 ; i <= 100 ; i++){
        let product = {
            _id:uuidv4(),
            title:faker.commerce.productName(),
            description:faker.commerce.productDescription(),
            price:faker.number.int({ min: 3500, max: 23600 }),
            thumbnail:faker.image.avatar(),
            code:faker.number.int({ min: 100, max: 1000}),
            stock:faker.number.int({ min: 10, max: 60 }),
            timestamps:faker.date.betweens({ from: '2020-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z', count: 1 })
        }
        products.push(product)
    }
    res.render(`${folder}/index`,{products})
})

export default router
