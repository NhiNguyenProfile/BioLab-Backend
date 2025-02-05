import { ObjectId } from 'mongodb'

interface CategoryType {
  category_id: ObjectId
  category_name: string
}

export { CategoryType }
