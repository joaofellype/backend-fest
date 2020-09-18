import knex from '../../database/config';


class OperationsProviders{


    async initinal(request, response){

        const { page} = request.query;

        
        await knex.select('*')
                  .from('provider')
                  .limit(15)
                  .offset(page)
                  .then(results => {

                    response.status(200).json({ 
                        results: results,
                        page:page *2
                    });
                  })
                  .catch( error => {
                      response.status(401).json(error);
                  });
    }
    async providerCategory(request,response) {

        const  { category} = request.query;

        await knex.select('*')
                  .from('provider')
                  .where('type',category)
                  .then( results => {

                    response.status(200).json(results);
                  })
                  .catch(error => {
                      response.status(401).json(error);
                  });
    }

    async searchProvider(request,response) {

        const { search } = request.query;

        await knex('provider')
              .where('name','ilike',`%${search}%`)
              .then( results => {
                  response.status(200).json(results);
              }).catch( error => {
                  response.status(401).json(error);
              });
                 
    }

    async listProviderOrderRating(request,response){

        await knex('rating')
             .join('provider','rating.id_provider','=','provider.id')
             .select('provider.id','provider.name','number','cnpj','address','type')
             .avg('rating.rating as media')
             .where('provider.status',true)
             .orderBy('media','desc')
             .groupBy('rating.id_provider')
             .then(results => {
                 response.status(200).json(results);
             })
             .catch(error =>{
                 response.status(400).json(error)
             })
    }


    async aprovedProvider(request, response){

        const {
            id
        } = request.params;

        await knex('provider')
             .where('id',id)
             .update({
                 status:true
             })
             .then(results =>{
                 response.status(200).json({message:'Atualizado com sucesso'});
             })
             .catch(error =>{
                 response.status(400).json(error); 
             })
    }
    
    async login(request,response){
        const {
            email,
            password
        } = request.body;

        if(email=='' || password==""){
            return response.status(400).json({
                message:'Campos vazios'
            })
        }

        const  service =  await knex.select('id','email','name','password', 'cnpj', 'horary','image_user')
        .from('provider')
        .where('email',email)
        .first();

         
        if(service == null){
            return response.status(400).json({
                message :' Nenhum usuário foi encontrado'
            });

        }
        if(hash.comparePassword(password,service.password) == false){
            return response.status(400).json({
                message:'Senha incorreta'
            });
        }

        service.password =undefined;

        const jwt = token.genereteToken(service);

        response.status(200).json({

            message:'Login feito com sucesso',
            token:jwt
        });
    }


}

export default OperationsProviders;