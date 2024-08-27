import Post from '#models/post'
import { createPost, updatePost } from '#validators/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {

    public async create({ request }: HttpContext) {
        const data = await request.validateUsing(createPost)
        await Post.create(data)

        return { success : true }
    }

    public async read({ params }: HttpContext) {
        const post = await Post.find(params.id)

        if (!post) {
            return { success : false }
        }
        
        return post        
    }

    public async update({ params, request }: HttpContext) {
        const data = await request.validateUsing(updatePost)
        const post = await Post.find(params.id)

        if (!post) {
            return { success : false }
        }
        
        post?.merge(data)
        await post?.save()
        
        return { success : true }
    }

    public async delete({ params }: HttpContext) {
        const post = await Post.find(params.id)

        if (!post) {
            return { success : false }
        }
        
        await post?.delete()
        
        return { success : true }
    }

    public async list() {
        const posts = await Post.all()

        if (!posts) {
            return { success : false }
        }
        
        return posts
    }
}