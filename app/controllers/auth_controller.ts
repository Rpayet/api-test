import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {

    public async register({request} : HttpContext ) {
        return request.all()
    }

    public async login() {
        return this.login.name
    }
}