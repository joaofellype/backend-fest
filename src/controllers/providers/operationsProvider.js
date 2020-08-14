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



}

export default OperationsProviders;