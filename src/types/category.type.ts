import { ObjectId } from 'mongodb'

interface CategoryType {
  _id: ObjectId
  category_name: string
}

export { CategoryType }
