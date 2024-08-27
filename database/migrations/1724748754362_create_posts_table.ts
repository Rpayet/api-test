import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('slug').notNullable().unique()
      table.text('content').notNullable()
      table.text('summary').notNullable()
      table.string('picture').nullable()
      table.string('tags').nullable()
      table.integer('views').defaultTo(0)
      table.json('metadata').nullable()
      table.enum('status', ['draft', 'published', 'archived']).defaultTo('draft')
      table.integer('author_id').unsigned().references('users.id').onDelete('CASCADE')


      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}