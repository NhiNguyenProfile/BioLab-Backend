import { checkSchema } from 'express-validator'
import ErrorMessages from '~/constants/errorMessage'
import { PostStatus } from '~/types/post.type'
import { validate } from '~/validators/manuallyValiadate'

const createPostValidator = validate(
  checkSchema(
    {
      title: {
        notEmpty: {
          errorMessage: ErrorMessages.post.titleRequired
        },
        isString: {
          errorMessage: ErrorMessages.post.titleInvalid
        },
        trim: true
      },
      category: {
        isArray: {
          errorMessage: ErrorMessages.post.categoryInvalid
        },
        notEmpty: {
          errorMessage: ErrorMessages.post.categoryRequired
        }
      },
      status: {
        optional: true,
        isIn: {
          options: [Object.values(PostStatus)],
          errorMessage: ErrorMessages.post.statusInvalid
        }
      },
      post_contents: {
        notEmpty: {
          errorMessage: ErrorMessages.post.contentRequired
        },
        isString: {
          errorMessage: ErrorMessages.post.contentInvalid
        }
      },
      banner: {
        notEmpty: {
          errorMessage: ErrorMessages.post.bannerRequired
        },
        isURL: {
          errorMessage: ErrorMessages.post.bannerInvalid
        }
      }
    },
    ['body']
  )
)

const updatePostValidator = validate(
  checkSchema(
    {
      title: {
        optional: true,
        isString: {
          errorMessage: ErrorMessages.post.titleInvalid
        },
        trim: true
      },
      category: {
        optional: true,
        isArray: {
          errorMessage: ErrorMessages.post.categoryInvalid
        }
      },
      status: {
        optional: true,
        isIn: {
          options: [Object.values(PostStatus)],
          errorMessage: ErrorMessages.post.statusInvalid
        }
      },
      post_contents: {
        notEmpty: {
          errorMessage: ErrorMessages.post.contentRequired
        },
        isString: {
          errorMessage: ErrorMessages.post.contentInvalid
        }
      },
      banner: {
        notEmpty: {
          errorMessage: ErrorMessages.post.bannerRequired
        },
        isURL: {
          errorMessage: ErrorMessages.post.bannerInvalid
        }
      }
    },
    ['body']
  )
)

export { createPostValidator, updatePostValidator }
