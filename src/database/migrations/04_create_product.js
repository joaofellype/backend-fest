
module.exports={
    async  up(knex){
        return knex.schema.createTable('product',table=>{
            table.increments('id').primary().notNullable();
            table.string('name').notNullable();
            table.integer('id_category_product').notNullable().references('id').inTable('category_product');
            table.uuid('id_provider').notNullable().references('id').inTable('provider');
            table.decimal('price',10,2).notNullable(),
            table.json('address');
            table.string('description');
            table.string('capacity');
            table.boolean('status');
            table.json('images');
            table.json('itens');
            table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
            table.timestamp('updated_at', { precision: 6 }).defaultTo(knex.fn.now(6));
        })
    },
        async  down(knex){
        return knex.schema.dropTable('product')
    }
}