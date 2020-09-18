import knex from '../../database/config';


class OperationProducts {


    async searchProducts(request, response) {

        const {
            search,

        } = request.query;
        await knex('product')
            .join('provider', 'product.id_provider', '=', 'provider.id')
            .select('product.name as nameProduct', 'product.price', 'product.itens', 'product.address', 'product.description', 'product.capacity', 'provider.name')
            .where('product.name', 'ilike', `%${search}%`).orWhere('product.itens', 'ilike', `%${search}%`)
            .then(results => {

                response.status(200).json(results);
            })
            .catch(error => {
                response.status(401).json(error)
            })

    }

    // async productOrderByPrice(request,response){

    //     const {offset,capacity,price}  = request.query;


    //     await knex('product')
    //          .join('provider','product.id_provider','=','provider.id')
    //          .select('product.name as nameProduct','product.price','product.itens','product.address','product.description','product.capacity','provider.name','product.id')
    //          .limit(15)
    //          .offset(offset)
    //          .orderBy([capacity =='capacity'?{column:capacity,order:"desc"}:null,price =='price'?{column:price ?'price':'',order:"desc"}:null])
    //          .then(results => {

    //             response.status(200).json({results,offset:offset+15});
    //          })
    //          .catch(error => {
    //              console.log(error)
    //              response.status(401).json(error    )
    //          })  
    // }
    async searchCategory(request, response) {

        const {
            id_category_product
        } = request.query;
        await knex('product')
            .join('category_product', 'product.id_category_product', '=', 'category_product.id')
            .select('product.name as nameProduct', 'category_product.name', 'product.price', 'product.itens', 'product.address', 'product.description', 'product.capacity', 'provider.name', 'product.id')
            .where('product.id_category_product', id_category_product)
            .then(results => {
                response.status(200).json(results)
            })
            .catch(error => {
                response.status(400).json(error)
            })

    }
    async filterLocal(request, response) {

        const {

            capacity,
            itens,
            price,
            horary
        } = request.query;
        let data = request.query;
        delete data.price;
        delete data.itens;
        console.log(data)
        if (price != undefined && itens != undefined) {
            console.log(price)
            return await knex('product')
                .where('itens', 'ilike', `%${itens}%`)
                .andWhere('price', '<=', price)
                .andWhere(data)
                .select('images', 'id', 'name', 'price', 'description', 'itens')
                .then(results => {
                    response.status(200).json(results);
                })
                .catch(error => {
                    console.log(error)
                    response.status(400).json(error);
                });
        } else {
            await knex('product')
                .where(request.query)
                .select('images', 'id', 'name', 'price', 'description', 'itens')
                .then(results => {
                    response.status(200).json(results);
                })
                .catch(error => {
                    console.log(error)
                    response.status(400).json(error);
                });
        }
    }
    async filterProducts(request, response) {

        const {
            horary
        } = request.query;
        const query = request.query;
        console.log(Array.isArray(query.category_product))
        if (Array.isArray(query.category_product) != false) {
            
            const product = await knex('product')
                .whereIn('category_product', query.category_product)
                .select('images', 'id', 'name', 'price', 'description', 'itens');
                if (horary != undefined) {

                    await knex('provider')
                        .where('horary', horary)
                        .then(results => {
                            response.status(200).json(results, product)
                        })
                        .catch(error => {
                            response.status(400).json(error)
                        });
                }
        }
        const product = await knex('product')
        .where('category_product', query.category_product)
        .select('images', 'id', 'name', 'price', 'description', 'itens');
        if (horary != undefined) {

            await knex('provider')
                .where('horary','ilike',`%${horary}%`)
                .then(providers => {
                   return response.status(200).json({providers,product})
                })
                .catch(error => {
                    response.status(400).json(error)
                });
        }else{
       return response.status(200).json(product)

        }
        
    }
}

export default OperationProducts;