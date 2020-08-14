
module.exports= {
    async  up(knex){
        return knex.schema.createTable('sale',table=>{
            table.uuid('id').primary().notNullable();
            table.uuid('id_provider').notNullable().references('id').inTable('provider')
            table.integer('id_category_product').notNullable().references('id').inTable('category_product');
            table.decimal('price',10,2).notNullable(),
            table.string('description');
            table.string('capacity');
            table.boolean('status');
            table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
            table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
        })
    },
        async  down(knex){
        return knex.schema.dropTable('sale')
    }
}