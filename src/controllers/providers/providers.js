
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
            id_category_provider,
            image_user,
            type,
            horary,
            operation
        } = request.body;

        if(regex.validateEmail(email) ==false){
            return response.status(400).json({message:'Email inválido'})
        }
        if(regex.validatePassword(passwords) ==false){
            return res.status(400).json({message:'Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-20.'})

        }

        const id = uuid4();   
        const password = hash.hashPassword(passwords);
        const data ={id,name,email,id_category_provider,operation,horary,number,password,address,type,cnpj,image_user,};

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


        await knex.select('id','name','email','number','cnpj','type','operation','image_user')
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
        await knex.select('name','adddress','image_user','number','type','cnpj')
                  .from('provider')
                  .where('id',id)
                  .then( results => {
                      response.status(200).json(results)
                  })
                  .catch( error => {
                      response.status(400).json(error);
                  })
    }
}

export default Provider;