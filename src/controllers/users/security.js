import bcrypt from 'bcrypt';

const salt =10;

class Security{

    hashPassword(password){

        const hash = bcrypt.hashSync(password,salt);

        return hash
    }

    comparePassword(password,hash){

        return bcrypt.compareSync(password,hash);
    }

}

export default Security;