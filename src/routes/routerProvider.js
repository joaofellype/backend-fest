import express from 'express';
import OperationsProviders from '../controllers/providers/operationsProvider';
import Provider from '../controllers/providers/providers';
import ResetPassword from '../controllers/providers/redefinirSenha';

const provider = new Provider();
const operationsProvider = new OperationsProviders();
const resetPassword = new ResetPassword(); 
const route = express.Router();


route.get('/provider',provider.index);
route.get('/provider/:id',provider.show);
route.post('/provider',provider.create);

route.post('/loginProvider',operationsProvider.login);
route.post('/sendPasswordProvider',resetPassword.create);
route.post('/aprovedCodProvider',resetPassword.aprovedCodig);


route.put('/restPasswordProvider',resetPassword.updatePassword);


export default route;