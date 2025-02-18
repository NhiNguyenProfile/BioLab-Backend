import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import { PostStatus } from '~/types/post.type'
import { ContentType } from '~/types/postContent.type'

const postContentSchema = Joi.object({
  content: Joi.string().required(),
  type: Joi.string()
    .valid(...Object.values(ContentType))
    .required()
})

const postCategorySchema = Joi.object({
  _id: Joi.string().hex().length(24).required(),
  post_category_name: Joi.string().required()
})

// Validation schema cho Post
const postSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.array().items(postCategorySchema).min(1).required(),
  user_id: Joi.string().hex().length(24).required(),
  status: Joi.string()
    .valid(...Object.values(PostStatus))
    .default(PostStatus.DRAFT),
  postContents: Joi.array().items(postContentSchema).min(1).required()
})

const updatePostSchema = Joi.object({
  title: Joi.string(),
  category: Joi.array().items(postCategorySchema).min(1),
  status: Joi.string().valid(...Object.values(PostStatus)),
  postContents: Joi.array().items(postContentSchema).min(1)
}).min(1)

export const validatePost = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = postSchema.validate(req.body, { abortEarly: false })

  if (error) {
    const errors = error.details.map((detail) => detail.message)
    res.status(400).json({
      status: 400,
      message: 'Validation error',
      errors
    })
    return
  }

  next()
}

export const validateUpdatePost = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = updatePostSchema.validate(req.body, { abortEarly: false })

  if (error) {
    const errors = error.details.map((detail) => detail.message)
    res.status(400).json({
      status: 400,
      message: 'Validation error',
      errors
    })
    return
  }

  next()
}
