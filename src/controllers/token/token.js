
import jwt from 'jsonwebtoken';

class Token {


    genereteToken( params = {}){
       
        
        return jwt.sign(params,process.env.HASH_TOKEN,{
            expiresIn:process.env.TIME_TOKEN
        });
    }

    validateToken(request, response) {

        const authHeader = request.headers.authorization;
        if (!authHeader)
            return response.status(400).json({
                message: 'Token não informado'
            })

        const parts = authHeader.split(' ');

        if (!parts.length === 2)
            return res.status(400).json({
                message: false
            })

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme))
            return response.status(400).json({
                message: 'Token mal formatado'
            })

        jwt.verify(token, process.env.HASH_TOKEN, (err, decoded) => {

            if (err) return response.status(401).json({
                message: false
            });

            return response.status(200).json({message:true,data:decoded});
        });
        
    }

    refreshToken(request, response) {


        const token = request.body.token || request.query.token || ''
        jwt.verify(token, process.env.HASH_TOKEN, function (err, decoded) {
            if (err) {
                return response.status(400).json({
                    message: err
                })
            }
            let token = jwt.sign(params, process.env.HASH_TOKEN, {
                expiresIn: process.env.TIME_TOKEN
            })
            return response.status(200).send({
                valid: token
            })
        })
    }
}

export default Token;