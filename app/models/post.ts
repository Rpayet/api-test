import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column() 
  declare slug: string

  @column()
  declare content: string
  
  @column()
  declare summary: string

  @column()
  declare picture: string | null

  @column()
  declare tags: string

  @column()
  declare views: number

  @column()
  declare metadata: string

  @column()
  declare status: 'draft' | 'published' | 'archived'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare authorId: number

  @belongsTo(() => User)
  declare author: BelongsTo<typeof User>
}