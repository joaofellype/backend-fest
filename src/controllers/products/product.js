import knex from  '../../database/config';


class Product{

    async create(request, response){

        const {

                name,
                category_product,
                id_provider,
                price,
                description,
                capacity,
                status,
                address,
                images,
                itens,
                horary
        } = request.body;


        const arrayProduct = [];
        arrayProduct.push(request.body);
        arrayProduct.map(data=>{
            if(data.name==''){
                return response.status(400).json({
                    message:'Campo nome está vazio'
                })
            }
            if(data.price==''){
                return response.status(400).json({
                    message:'Campo preço está vazio'
                })
            }
        })
        const data = {
            name,
            category_product,
            id_provider,
            price,
            description,
            capacity,
            status,
            address,
            images,
            itens,
            horary
             
        }
        console.log(data)
        await knex('product')
             .insert(request.body)
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
                .join('provider','product.id_provider','=','provider.id')
             .where('id',id)
             .then(results => {
                 response.status(200).json(results);
             })
             .catch(error =>{
                 response.status(400).json(error);
             });
    }

    async index(request,response){


        await knex('product')
             .join('provider','product.id_provider','=','provider.id')
             .select('provider.name as NameProvider','product.name','product.price','product.itens','product.images','product.description','product.category_product','product.capacity','product.id')
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