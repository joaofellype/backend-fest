import knex from '../../database/config';
import generete  from '../utils/generete_cod';
import Hash from '../users/security';
import emails from '../utils/smptemail';

const hash = new Hash();

class ResetPassword{

    async create(request, response){
        const{
            email
        } = request.body;

        const  now = new Date();
        now.setHours(now.getHours()+1);
        
        const user = await knex('provider')
                        .select('id','email','name')
                        .where('email',email)
                        .first()
        
        if(user == null){

            return response.status(400).json({message:'Nenhum usuário encontrado'});

        }
        const codigo = generete()
        const token = hash.hashPassword(codigo);
        const data ={expirestoken:now,token:token}
        await knex('provider').update(data)
                    .where('id',user.id)
                    .then(async results =>{

                        const params ={
                            from:process.env.USERNAME_MAIL,
                            subject:'Redefinição de Senha',
                            to:user.email,
                            text:codigo
                        }
                       await emails(params).then(results=>{
                           return response.status(200).json({
                               message:'Código enviado com sucesso'
                           })
                       }).catch(error =>{
                           console.log(error)
                           return response.status(400).json(error);
                       })
                    })
    }
    async aprovedCodig(request,response){

        const {
            codigo,
            email
        } = request.body;

        const user = await knex.select('id','expirestoken','token','email')
                            .from('provider')
                            .where('email',email)
                            .first();
        
        const now = new Date();

        if(user ==  null){
            return response.status  (400).json({
                message:'Usuário não encontrado'
            })
        }

        if(user.expirestoken < now){
            return response.status(400).json({
                message:'Codigo expirado, gere outro'
            });
        }
        const validate = hash.comparePassword(codigo,user.token);
        if(!validate){
            return response.status(400).json({
                message:'Código Incorreto'
            })
        }

        return response.status(200).json({email:user.email});
    }
    async updatePassword(request,response){

        const {
            email,
            passwords,
            confirmPassword
        } = request.body;

        if(passwords != confirmPassword){

            return response.status(400).json({
                message:'Senhas não são iguas'
            });
        }
        const user = await knex.select('id').from('provider').where('email',email).first();
        const data = {password:hash.hashPassword(passwords)};
        await  knex('user')
                    .update(data)
                    .where('id',user.id)
                    .then(results =>{
                        response.status(200).json({
                            message:'Senha Atualizada com sucesso'
                        })
                    })
                    .catch(error =>{
                        response.status(400).json(error)
                    })

    }
}
export default ResetPassword;