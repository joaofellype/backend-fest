import knex from '../../database/config';


class Category_Product{

    async index(request,response){

        await knex.select('id','name')
                  .from('category_product')
                  .then(results =>{

                    response.status(200).json(results);
                  });
    }
}

export default Category_Product;