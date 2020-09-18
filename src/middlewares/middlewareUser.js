

function authentic(request,response,next){

    let authHeader =  request.headers.authorization;

    if (!authHeader) {

        return response.status(400).json({
            message: "Necessario fazer login."
        })


    }

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return response.status(401).send({
            error: 'Token error'
        });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return response.status(401).send({
            error: 'Token mal formatado'
        });

    jwt.verify(token, process.env.KEY_TOKEN, (err, decoded) => {
    
        if (err) 
                return response.status(401).send({error:'Sessão expirada'});
        req.user = decoded;
        return next();
    })
}