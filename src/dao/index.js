import mongoProductsDao from './product.mongoDB.dao.js'
import filesProductsDao from './product.file.dao.js'
import config from '../config/config.js'

const MongoProductsDao = new mongoProductsDao()
const FileProductsDao = new filesProductsDao()

export const PRODUCTSDAO = config.persistence === 'files' ? FileProductsDao : MongoProductsDao

//export const PRODUCTSDAO = MongoProductsDao