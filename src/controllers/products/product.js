import knex from  '../../database/config';


class Product{

    async create(request, response){

        const {

                name,
                id_category_product,
                id_provider,
                price,
                description,
                capacity,
                status,
                address,
                images,
                itens
        } = request.body;
        
        const data = {
            name,
            id_category_product,
            id_provider,
            price,
            description,
            capacity,
            status,
            address,
            images,
            itens
        }
        await knex('product')
             .insert(data)
             .returning('*')
             .then(results => {

            response.status(201).json({
                message:'Cadastrado com sucesso',
                results:results
            })


        })
        .catch(error => {
            console.log(error)
            response.status(400).json(error);
        })
    }

    async show(request,response){

        const {
            id
        } = request.params;

        await knex('products')
             .where('id',id)
             .then(results => {
                 response.status(200).json(results);
             })
             .catch(error =>{
                 response.status(400).json(error);
             });
    }

    async index(request,response){


        await knex.select('*')
             .from('product')
             .then(resullts =>{

                response.status(201).json(resullts);
             })
             .catch(error =>{
                 response.status(400).json(error);
             });
    }

    async update(request, response){

        const {
            id
        }  =  request.params;
        const data = request.body;


        await knex('product')
             .where('id',id)
             .update(data)
             .then(results =>{
                 response.status(200).json({

                    message:'Atualizado com sucesso'
                 });
             })
             .catch(error =>{
                response.status(400).json(error);
             })
    }
}


export default Product;