import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import routeUser from './routes/routesUser';
import routeProduct from './routes/routesProduct';
import routeProvider from './routes/routerProvider';
import routeServices from './routes/routesService';
const port =3333;


const app = express();

app.use(express.json());
app.use(cors())
app.use(routeUser);
app.use(routeProduct);
app.use(routeProvider);
app.use(routeServices);

app.listen(port,()=>{

    console.log(`Rodando na porta ${port}`);
})


export default app;