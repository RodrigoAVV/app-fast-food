import {fileURLToPath} from 'url'
import {dirname} from 'path'
import multer from 'multer'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        const {fieldname} = file
        if(fieldname === 'fileProfile'){
            cb(null,`${__dirname}/public/img/users/profile`)
        }
        if(fieldname === 'docs'){
            cb(null,`${__dirname}/public/img/users/documents`)
        }
        if(fieldname == 'thumbnail'){
            cb(null,`${__dirname}/public/img/users/products`)
        }
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'_'+file.originalname)
    }
})

const uploader = multer({storage:storage})

export default uploader;
//class 41