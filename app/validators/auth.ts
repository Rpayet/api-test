import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import i18nManager from '@adonisjs/i18n/services/main'

const i18n = i18nManager.locale('fr')
const password = vine.string().minLength(8).maxLength(30)
const messages = {
    confirmed: 'The password fields does not match',
    regex: 'The password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
}

vine.messagesProvider = new SimpleMessagesProvider(messages)

export const registerUser = vine.compile(
    vine.object({
        username: vine.string().minLength(6).maxLength(20).unique(async (db, value) => {
            const match = await db.from('users').select('id').where('username', value).first()
            return !match
        }),
        email: vine.string().email().normalizeEmail().unique(async (db, value) => {
            const match = await db.from('users').select('id').where('email', value).first()
            return !match
        }),
        password: vine.string().minLength(8).maxLength(30).confirmed().regex(
            /[a-z]/).regex(/[A-Z]/).regex(/[0-9]/).regex(/[^a-zA-Z0-9]/),
        picture: vine.string().optional()
    })
)

export const loginUser = vine.compile(
    vine.object({
        email: vine.string().email().normalizeEmail(),
        password,
    })
)