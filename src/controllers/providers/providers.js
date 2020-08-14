
import knex from './../../database/config';
import  { v4 as uuid4 } from 'uuid';
import Regex from '../users/regex';
import Hash from '../users/security';
 
const regex = new Regex();
const hash = new Hash();


class Provider{

    async   create(request,response){

        const {
            name,
            email,
            number,
            passwords,
            cnpj,
            address,
            operation,
            image_user,
            type
        } = request.body;

        if(regex.validateEmail(email) ==false){
            return response.status(400).json({message:'Email inválido'})
        }
        if(regex.validatePassword(passwords) ==false){
            return res.status(400).json({message:'Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-20.'})

        }

        const id = uuid4();   
        const password = hash.hashPassword(passwords);
        const data ={id,name,email,number,password,address,type,cnpj,image_user,operation};

        await knex('provider')
             .insert(data)
             .then(results => {

                response.status(200).json({ 
                    message:'Cadastrado com sucesso'
                })
             })
             .catch(error => {
                 console.log(error)
                 response.status(400).json(
                     error
                 )
             })

    }
    async index(request,response){


        await knex.select('name','email','number','cnpj','type','operation','image_user')
                  .from('provider')
                  .then( results => {

                    response.status(200).json(results);
                  })
                  .catch( error => {
                      
                    response.status(400).json(error);
                  })

    }
    async show(request,response){

        const { id } = request.params;
        await knex.select('*')
                  .from('provider')
                  .where('id',id)
                  .then( results => {
                      response.status(200).json(results)
                  })
                  .catch( error => {
                      response.status(401).json(error);
                  })
    }
}

export default Provider;