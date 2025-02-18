import { NextFunction, Request, Response } from 'express'
import { body, ValidationChain, validationResult } from 'express-validator'
import Joi from 'joi'
import { PostStatus } from '~/types/post.type'
import { ContentType } from '~/types/postContent.type'
import { EntityError } from '~/models/errors'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'

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

export const validate = (validations: RunnableValidationChains<ValidationChain>, schema: Joi.ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validations.run(req)
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const errorObjects = errors.mapped()
      const entityErrors = new EntityError({ errors: {} })
      for (const key in errorObjects) {
        const { msg } = errorObjects[key]
        entityErrors.errors[key] = msg
      }
      return next(entityErrors)
    }

    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      const errors = error.details.map((detail) => detail.message)
      return res.status(400).json({
        status: 400,
        message: 'Validation error',
        errors
      })
    }

    next()
  }
}

export { postSchema, updatePostSchema }
