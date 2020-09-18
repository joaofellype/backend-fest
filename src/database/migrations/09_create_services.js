
module.exports= {
    async  up(knex){
        return knex.schema.createTable('services',table=>{
            table.uuid('id').primary().notNullable();
            table.string('name').notNullable();
            table.string('email').unique().notNullable();
            table.string('number').notNullable().unique();
            table.string('password').notNullable();
            table.json('address');  
            table.string('type_service');
            table.decimal('price_service',10,2);
            table.string('description');
            table.string('availability');
            table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
            table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
            table.string('image_user');
        })
    },
        async  down(knex){
        return knex.schema.dropTable('services');
    }
}