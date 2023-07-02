import mongoProductsDao from './product.mongoDB.dao.js'

const MongoProductsDao = new mongoProductsDao()

//export const PRODUCTSDAO = config.persistence === 'MEMORY' ? MemoryProductsDao : MongoProductsDao

export const PRODUCTSDAO = MongoProductsDao