import ProductService from '../services/product.file.service.js';

const getAllProducts = async(req,res) => {
    let user= {
        name:'María',
        role:'admin'
    }
    let data = []
    const { limit } = req.query
    if(limit){
        data = await product.getProductsLimit(limit)
        if(data.success){
            res.render(`${folder}/index`,{
                data,
                user                    
            })
        }else{
            res.render(`${folder}/index`,{
                data                   
            })
        }
    }else{
        data = await product.getProducts()
        
        if(data.success){
            res.render(`${folder}/index`,{
                data,
                user                    
            })
        }else{
            res.render(`${folder}/index`,{data})
        }
    }
}