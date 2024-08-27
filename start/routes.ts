/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import PostsController from '#controllers/posts_controller';

router.get("/welcome", () => {
  return "Welcome to the API!";
});

router.group(() => {
  router.post("/auth/register", [AuthController, 'register']).as('auth.register')
  router.post("/auth/login", [AuthController, 'login']).as('auth.login')
  router.delete("/auth/logout", [AuthController, 'logout']).as('auth.logout').use(middleware.auth())
  router.get("/auth/me", [AuthController, 'me']).as('auth.me')

  router.post("/post/create", [PostsController, 'create']).as('post.create')
  router.get("/post/:id", [PostsController, 'read']).as('post.read')
  router.post("/post/:id/update", [PostsController, 'update']).as('post.update')
  router.delete("/post/:id/delete", [PostsController, 'delete']).as('post.delete')
  router.get("/post/list", [PostsController, 'list']).as('post.list')

}).prefix("/api/v1")


