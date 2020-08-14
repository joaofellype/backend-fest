import express from 'express';
import Provider from '../controllers/providers/providers';

const provider = new Provider();

const route = express.Router();


route.get('/provider',provider.index);
route.get('/provider/:id',provider.show);
route.post('/provider',provider.create);


export default route;