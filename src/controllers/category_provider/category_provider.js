import knex from '../../database/config';

class Category_Provider{


    async index(request,response){

        await knex.select('id','name')
             .from('category_provider')
             .then(results =>{
                 response.status(200).json(results);
             })
             .catch(error =>{
                 response.status(400).json(error)
             })
    }
}

export default Category_Provider;