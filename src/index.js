import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import routeUser from './routes/routesUser';
import routeProduct from './routes/routProduct';
import routeProvider from './routes/routerProvider';
const port =3333;


const app = express();
app.use(express.json());
app.use(routeUser)
app.use(routeProduct)
app.use(routeProvider);

app.listen(port,()=>{

    console.log(`Rodando na porta ${port}`);
})


export default app;