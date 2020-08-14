import knex from 'knex'

import dotenv from 'dotenv';
dotenv.config();
const connection  = knex({
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port:process.env.DB_PORT
      }
})

export default connection;