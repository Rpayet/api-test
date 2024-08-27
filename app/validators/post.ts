import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createPost = vine.compile(
    vine.object({
        title: vine.string().maxLength(50),
        slug: vine.string().unique(async (db, value) => {
            const match = await db.from('posts').select('id').where('slug', value).first()
            return !match
        }),
        content: vine.string(),
        summary: vine.string(),
    })
)

export const updatePost = vine.compile(
    vine.object({
        title: vine.string().maxLength(50).optional(),
        slug: vine.string().unique(async (db, value) => {
            const match = await db.from('posts').select('id').where('slug', value).first()
            return !match
        }).optional(),
        content: vine.string().optional(),
        summary: vine.string().optional(),
    })
)