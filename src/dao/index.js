import mongoProductsDao from './product.mongoDB.dao.js'
import filesProductsDao from './product.file.dao.js'
import config from '../config/config.js'

import {Command} from 'commander'
const program = new Command()
program.requiredOption('--dao <dao>','persistencia de datos','files')
program.parse()

console.log('Options: ',program.opts())
console.log('Arguments: ',program.args)

const MongoProductsDao = new mongoProductsDao()
const FileProductsDao = new filesProductsDao()

//config.persistence = program.opts().dao

export const PRODUCTSDAO = config.persistence === 'files' ? FileProductsDao : MongoProductsDao

//Patrón Factory