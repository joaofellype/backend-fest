import knex from '../../database/config';
import  { v4 as uuid4 } from 'uuid';
import Hash from '../users/security';
import Regex from '../users/regex';

const hash = new Hash();
const regex = new Regex();

class Services{

    async create(request,response){

        let  data = request.body;

        if(regex.validateEmail(data.email) ==false){
            return response.status(400).json({message:'Email inválido'})
        }
        if(regex.validatePassword(data.password) ==false){
            return response.status(400).json({message:'Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-20.'})

        }
        data.password = hash.hashPassword(data.password);
        data.id = uuid4();

        await knex('services')
                .insert(data)
                .then(results =>{

                    response.status(200).json({
                        message:'Cadastro com sucesso'
                    })
                })
                .catch(error =>{
                    response.status(400).json(error);
                })
        console.log(data)

    }
    async index(request,response){

        await knex.select('*')
                .from('services')
                .then(results =>{
                    response.status(200).json(results)
                })
                .catch(error =>{
                    response.status(400).json(error)
                })
    }
    async show(request,response){

        const {
            id 
        } = request.params
        await knex.select('*')
                .from('services')
                .where('id',id)
                .then(results =>{
                    response.status(200).json(results)
                })
                .catch(error =>{
                    response.status(400).json(error)
                })
    }
    async update(request,response){

         const {
             id
         } = request.params;

         await knex('services')
                .update(request.body)
                .where(id)
                .then(results =>{
                    response.status(200).json(results);
                })
                .catch(error =>{
                    response.status(400).json(error);

                });
    }
}

export default Services;