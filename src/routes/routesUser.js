import express  from "express";
import User from '../controllers/users/users';
import RedefirSenha from '../controllers/users/redefinirSenha';
import Login from '../controllers/users/login';

import Token from '../controllers/token/token';
import multer from 'multer';
import config from '../config/multer/multer'
const user = new User();
const token = new Token();
const login = new Login();
const redefinirSenha =  new RedefirSenha();
const upload = multer(config)
const route = express.Router();

//rotas get
route.get('/user/:id',user.show);
route.get('/user', user.index);
route.get('/validateUser',token.validateToken);

//rotas post
route.post('/user',user.create);
route.post('/login',login.loginUser);
route.post('/aprovedCod',redefinirSenha.aprovedCodig);

route.post('/redefinir',redefinirSenha.create);
route.post('/uploadUser',upload.single('image'),user.upload);

//rotas put
route.put('/user/:id',user.update);
route.put('/updateUserPassword',redefinirSenha.updatePassword);
export default route; 