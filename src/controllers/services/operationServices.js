import knex from '../../database/config';
import Token from  './../token/token';
import Hash from '../users/security';

const token = new Token();
const hash = new Hash();
class OperationServices{

    async filter(request, response){

        const {
            type
        } = request.query;

        await knex('services')
             .where('type_service','ilike',`%${type}%`)
             .then(results =>{
                 response.status(200).json(results)
             })
             .catch(error => {
                 response.status(400).json(error)
             })
    }

    async login(request,response){

        const {
            email,
            password
        } = request.body;

        if(email=='' || password==""){
            return response.status(400).json({
                message:'Campos vazios'
            })
        }

        const  service =  await knex.select('id','email','name','password', 'price_service', 'availability','image_user')
        .from('services')
        .where('email',email)
        .first();

         
        if(service == null){
            return response.status(400).json({
                message :' Nenhum usuário foi encontrado'
            });

        }
        if(hash.comparePassword(password,service.password) == false){
            return response.status(400).json({
                message:'Senha incorreta'
            });
        }

        service.password =undefined;

        const jwt = token.genereteToken(service);

        response.status(200).json({

            message:'Login feito com sucesso',
            token:jwt
        });

    }
}

export default OperationServices;