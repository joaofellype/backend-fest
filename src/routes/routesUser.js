import express  from "express";
import User from '../controllers/users/users';
import Login from '../controllers/users/login';
const user = new User();
const login = new Login();
const route = express.Router();


route.get('/user/:id',user.show);
route.get('/user',user.index);
route.post('/user',user.create);
route.put('/user/:id',user.update);
route.post('/login',login.loginUser);

export default route;