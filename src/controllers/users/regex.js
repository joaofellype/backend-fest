

class Regex{


    validateEmail(email){

        const emailRegex = /\S+@\S+\.\S+/;

       return !email.match(emailRegex) ? false:true;

    }

    validatePassword(password){
        const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;

        return !password.match(passwordRegex ) ? false:true;

    }
}


export default Regex;