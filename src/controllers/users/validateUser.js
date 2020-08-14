import knex from '../../database/config';


class ValidateUser{

    async validateUser(email){

        const email1 = await knex.select('email').from('users').where('email',email).first();

        if(email1 == null){
            return true;
        }else{
            return false;
        }
        
    }
}

export default ValidateUser;