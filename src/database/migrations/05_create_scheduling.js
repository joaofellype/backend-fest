
module.exports= {
    async  up(knex){
        return knex.schema.createTable('scheduling',table=>{
            table.increments('id').primary().notNullable();
            table.date('date_initinal').notNullable();
            table.date('date_end').notNullable();
            table.integer('id_product').notNullable().references('id').inTable('product');
            table.uuid('id_provider').notNullable().references('id').inTable('provider');
            table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
            table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
        })
    },
        async  down(knex){
        return knex.schema.dropTable('scheduling')
    }
}   