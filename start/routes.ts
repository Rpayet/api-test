/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import User from '#models/user'
import router from '@adonisjs/core/services/router'

router.group(() => {
  router.post("/auth/register", [AuthController, 'register'])
  router.post("/auth/login", [AuthController, 'login'])
}).prefix("/api/v1")

router.post('users/:id/tokens', async ({params, request}) => {
  const user = await User.findOrFail(params.id)
  const token = await User.accessTokens.create(
    user,
    ['*'], // All abilities (server:read, server:write, server:delete, server:create)
    {
      name: request.input('token_name'),
      expiresIn: '30 days',
    }
  )

  return token

})
