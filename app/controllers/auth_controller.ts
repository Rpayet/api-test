import User from '#models/user'
import { loginUser, registerUser } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {

    public async register({ request } : HttpContext ) {
        const data = await request.validateUsing(registerUser)
        const user = await User.create(data)

        return User.accessTokens.create(user)
    }

    public async login({ request }: HttpContext) {
        const { email, password } = await request.validateUsing(loginUser)
        const user = await User.verifyCredentials(email, password)

        return User.accessTokens.create(user)
    }

    public async logout({ auth }:HttpContext) {
        const user = auth.user!
        await User.accessTokens.delete(user, user.currentAccessToken.identifier)

        return {message: 'success'}
    }

    async me({ auth }: HttpContext) {
        await auth.check()

        return {
            user: auth.user
        }
    }
}