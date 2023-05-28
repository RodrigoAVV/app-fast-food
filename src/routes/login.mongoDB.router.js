import {Router} from 'express'
import Product from '../dao/product.mongoDB.dao.js'

import { isValidObjectId, Types } from "mongoose";

const folder = 'products.mongo'

import _ from 'lodash';

const router = Router()

const productManager = new Product()