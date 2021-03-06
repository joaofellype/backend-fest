import express from 'express';
import multer from  'multer';
import Product from '../controllers/products/product';
import Category from '../controllers/category_product/category_product';

import OperationProduct from '../controllers/products/operationsProducts';
import config from  '../config/multer/multer';
const product = new Product();
const category = new Category();
const route = express.Router();
const upload = multer(config);
const operationProduct = new OperationProduct();

//ROUTES GET
route.get('/product',product.index);
route.get('/category',category.index);
route.get('/product/:id',product.show);
route.get('/searchProductName',operationProduct.searchProducts);
// route.get('/filter',operationProduct.filter);
route.get('/filterProducts',operationProduct.filterProducts);

//ROUTES POST
route.post('/product',product.create);
route.post('/uploads',upload.array('image',4),function(request,response){
    const paths = request.files.map(data =>`http://192.168.100.4:3333/uploads/${data.filename}`);
    response.status(200).json({paths:paths});
})

//ROUTES PUT
route.put('/product/:id',product.update);


export default route;