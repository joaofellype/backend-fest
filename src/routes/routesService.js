import express from 'express';

import Services from '../controllers/services/services';
import OperationServices from '../controllers/services/operationServices';
const services = new Services();
const operationServices = new OperationServices();
const router = express.Router();

router.get('/services',services.index);

router.get('/services/:id',services.show)

router.get('/filterServices',operationServices.filter)

router.post('/services',services.create);
router.post('/loginServices',operationServices.login);
router.put('/services/:id',services.update)
export default router;