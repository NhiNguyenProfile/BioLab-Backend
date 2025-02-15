import Joi from 'joi'
import { PostStatus } from '~/types/post.type'
import { ContentType } from '~/types/postContent.type'

// Validation schema cho PostContent
const postContentSchema = Joi.object({
  content: Joi.string().required(),
  type: Joi.string()
    .valid(...Object.values(ContentType))
    .required()
})

// Validation schema cho PostCategory
const postCategorySchema = Joi.object({
  _id: Joi.string().hex().length(24).required(), // Kiểm tra ObjectId hợp lệ
  post_category_name: Joi.string().required() // Kiểm tra tên category
})

// Validation schema cho Post
export const postSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.array()
    .items(postCategorySchema) // Sử dụng postCategorySchema để validate mỗi phần tử trong mảng
    .min(1)
    .required(),
  user_id: Joi.string().hex().length(24).required(), // Kiểm tra ObjectId hợp lệ
  status: Joi.string()
    .valid(...Object.values(PostStatus))
    .default(PostStatus.DRAFT),
  postContents: Joi.array().items(postContentSchema).min(1).required()
})

// Validation schema cho việc cập nhật Post
export const updatePostSchema = Joi.object({
  title: Joi.string(),
  category: Joi.array().items(postCategorySchema).min(1), // Sử dụng postCategorySchema để validate mỗi phần tử trong mảng
  status: Joi.string().valid(...Object.values(PostStatus)),
  postContents: Joi.array().items(postContentSchema).min(1)
}).min(1) // Đảm bảo ít nhất một trường được cập nhật
