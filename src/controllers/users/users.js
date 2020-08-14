import  { v4 as uuid4 } from 'uuid';
import Hash from './security';
import moment from 'moment';
import Regex from './regex';
import ValidateUser from './validateUser';
import knex from '../../database/config';
const hash = new Hash();
const regex =  new Regex();
const validateUser = new ValidateUser();
class Users {

    async create(request,response){

        const { name,
                email,
                number,
                passwords,
                address,
                birthday,
                image_user
             } = request.body;

    

        if(regex.validateEmail(email) ==false){
            return response.status(400).json({message:'Email inválido'})
        }
        if(regex.validatePassword(passwords) ==false){
            return response.status(400).json({message:'Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-20.'})

        }
        const id = uuid4();   
        const password = hash.hashPassword(passwords);
        const data ={id,name,email,number,password,address,birthday,image_user};
        console.log(data)
         await knex('users')
                .insert(data).returning('*')
                .then(results => {
                    
                    response.status(200).json({message:'Usuário cadastrado com sucesso',results});
                }).catch(error =>{
                    console.log(error)
                    response.status(400).json({message:'Erro ao inserir usuário',error});
                })
    }

    async show(request,response){

        const { id } = request.params;
        console.log(id)
        await knex.select('name','address','email','number').from('users').where('id',id).then(results => {

            response.json(results);
        }).catch( error => {
            console.log(error)
            response.status(400).json(error);
        })
    }

    async update(request,response){

        const { id } = request.params;

        let {
            name,
            email,
            password,
            image_user,
            birthday

        } = request.body;

        const data ={  
            name,
            email,
            password,
            image_user,
            birthday
        };
        password = hash.hashPassword(password);
        await knex('users').where('id',id).update(data).then(results => {

            response.status(200).json({message:'Usuário atualizado com sucesso',results:results});
        }).catch(error => {

            response.status(400).json(error)
        })
    }

    async index(request,response){

        await knex.select('*')
                  .from('users')
                  .then(results =>{

                    let resultado = results.map(function(data){
                        
                        data.password = undefined;
                        return data;
                    });

                    response.status(200).json(resultado);
                  })
                  .catch(error => {
                      response.status(400).json(error);
                  })
    }
}

export default Users;