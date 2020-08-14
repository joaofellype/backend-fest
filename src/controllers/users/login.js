
import Token from  './../token/token';
import knex from '../../database/config';
import Hash from './security';
const token = new Token();
const hash = new Hash();
class  Login {


    async loginUser(request, response){

        const {

            email,
            password
        } = request.body;

        const  user =  await knex.select('id','email','name','password', 'address', 'birthday','image_user')
                                 .from('users')
                                 .where('email',email)
                                 .first();
        
        if(user == null){
            return response.status(400).json({
                message :' Nenhum usuário foi encontrado'
            });

        }
        if(hash.comparePassword(password,user.password) == false){
            return response.status(400).json({
                message:'Senha incorreta'
            });
        }

        user.password =undefined;

        const jwt = token.genereteToken(user);

        response.status(200).json({

            message:'Login feito com sucesso',
            token:jwt
        });
    }
}

export default Login;