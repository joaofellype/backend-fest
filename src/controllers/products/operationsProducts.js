import knex from '../../database/config';


class OperationProducts{


   async searchProducts(request,response){

            const {
                search
            } = request.query;
        await knex('product')
             .join('provider','product.id_provider','=','provider.id')
             .select('product.name','product.price','product.address','product.description','product.capacity','provider.name')
             .where('product.name','ilike',`%${search}%`)
             .then(results => {

                response.status(200).json(results);
             })
             .catch(error => {
                 response.status(401).json(error    )
             })

    }
    async searchCategoryProduct(request,response){


        const {
            search
        } =  request.params;

        await knex()
    }
}

export default OperationProducts;