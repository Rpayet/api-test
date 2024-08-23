import vine from '@vinejs/vine'

const password = vine.string().minLength(8).maxLength(30)

export const registerUser = vine.compile(
    vine.object({
        username: vine.string().minLength(6).maxLength(20).optional(),
        email: vine.string().email().normalizeEmail().unique(async (db, value) => {
            const match = await db.from('users').select('id').where('email', value).first()
            return !match
        }),
        password: vine.string().minLength(8).maxLength(30),
        picture: vine.string().optional()
    })
)

export const loginUser = vine.compile(
    vine.object({
        email: vine.string().email().normalizeEmail(),
        password,
    })
)