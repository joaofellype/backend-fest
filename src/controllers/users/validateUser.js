import knex from '../../database/config';


class ValidateUser{

    async validateUser(email){

        const email1 = await knex.select('email').from('users').where('email',email).first();
        console.log(email1)
        if(email1 == null){
            return true;
        }else{
            return false;
        }
        
    }
    async validateUserNumber(number){

        const email1 = await knex.select('number').from('users').where('number',number).first();

        if(email1 == null){
            return true;
        }else{
            return false;
        }
        
    }
   
}

export default ValidateUser;