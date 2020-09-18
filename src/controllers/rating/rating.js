import knex from '../../database/config';


class Rating  {


    async create(request,response){

        const {
            id_provider,
            rating,
            id_user
        } = request.body;
        request.body.map(e=>console.log(e));
        await knex('rating')
              .insert({id_provider,id_user,rating})
              .then(results =>{
                
                response.status(200).json({message:'Inserido com sucesso'});
              })
              .catch(error =>{
                  response.status(400).json(error)
              })
    }

    async index(request,response){

        await knex.select('*')
                  .from('rating')
                  .then(results =>{
                      response.status(200).json(results);
                  })
                  .catch(error =>{
                      response.status(400).json(error);
                  })
    }
    async show(request,response){

        const {
            id_provider
        }= request.params;

        await knex('rating')
              .avg('rating as avalicao')
              .where('id_provider',id_provider)
              .then(results => {
                  response.status(200).json(results);
              })
              .catch(error => {
                response.status(400).json(error);
              });
    }
}
export default Rating;