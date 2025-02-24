const ErrorMessages = {
  email: {
    invalid: 'The provided email address is not valid.',
    required: 'Email address is required.',
    exists: 'This email address is already registered.'
  },
  password: {
    required: 'Password is required.',
    minLength: 'Password must be at least 8 characters long.'
  },
  confirmPassword: {
    required: 'Confirm password is required.',
    minLength: 'Confirm password must be at least 8 characters long.'
  },
  refreshToken: {
    required: 'A refresh token is required.'
  },
  accessToken: {
    invalid: 'The access token provided is invalid.'
  },
  auth: {
    incorrectCredentials: 'Invalid email or password. Please try again.',
    unauthorized: 'You are not authorized to perform this action.'
  },
  product: {
    nameRequired: 'Product name is required.',
    nameInvalid: 'Product name must be a valid string.',
    noteRequired: 'Product note is required.',
    noteInvalid: 'Product note must be a valid string.',
    descriptionRequired: 'Product description is required.',
    descriptionInvalid: 'Product description must be a valid string.',
    categoryRequired: 'Product category is required.',
    categoryInvalid: 'Product category must be a valid array of category IDs.',
    categoryNotFound: 'One or more categories were not found.',
    brandRequired: 'Product brand is required.',
    brandInvalid: 'Product brand must be a valid array of brand IDs.',
    brandNotFound: 'One or more categories were not found.',
    imageRequired: 'Product images are required.',
    imageInvalid: 'Product images must be an array of valid URLs.',
    qaRequired: 'Product QA section is required.',
    qaInvalid: 'Product QA must be an array with valid question-answer pairs.',
    idRequired: 'Product ID is required.',
    notFound: 'Product not found.'
  },
  category: {
    nameRequired: 'Category name is required.',
    nameInvalid: 'Category name must be a valid string.',
    idRequired: 'Category ID is required.',
    notFound: 'Category not found.',
    exists: 'Category name already exists.',
    deleteFailed: 'Cannot delete category as it is associated with existing products.'
  },
  productDetail: {
    productIdRequired: 'Product ID is required.',
    productNotFound: 'The referenced product does not exist.',
    unitRequired: 'Unit is required.',
    unitInvalid: 'Unit must be a valid string.',
    priceRequired: 'Price is required.',
    priceInvalid: 'Price must be a valid number greater than or equal to 0.',
    stockRequired: 'Stock quantity is required.',
    stockInvalid: 'Stock quantity must be an integer greater than or equal to 0.',
    idRequired: 'Product detail ID is required.',
    notFound: 'Product detail not found.'
  },
  productRate: {
    userIdRequired: 'User ID is required.',
    userNotFound: 'User not found.',
    productIdRequired: 'Product ID is required.',
    productNotFound: 'Product not found.',
    contentInvalid: 'Review content must be a valid string.',
    rateRequired: 'Rating is required.',
    rateInvalid: 'Rating must be an integer between 1 and 5.',
    idRequired: 'Product rate ID is required.',
    notFound: 'Product rate not found.'
  },
  order: {
    customerNameRequired: 'Customer name is required.',
    customerNameInvalid: 'Customer name is invalid.',
    emailRequired: 'Email is required.',
    emailInvalid: 'Email must be a valid email address.',
    phoneRequired: 'Phone number is required.',
    phoneInvalid: 'Phone number must be a valid mobile number.',
    orderDateInvalid: 'Order date must be a valid date.',
    totalAmountRequired: 'Total amount is required.',
    totalAmountInvalid: 'Total amount must be a number greater than or equal to 0.',
    statusRequired: 'Order status is required.',
    statusInvalid: 'Invalid order status.',
    paymentStatusRequired: 'Payment status is required.',
    paymentStatusInvalid: 'Invalid payment status.',
    paymentMethodRequired: 'Payment method is required.',
    paymentMethodInvalid: 'Payment method is invalid.',
    addressInvalid: 'Address is invalid.',
    addressRequired: 'Address is required.',
    idRequired: 'Order ID is required.',
    notFound: 'Order not found.'
  },
  orderDetail: {
    orderIdRequired: 'Order ID is required.',
    orderNotFound: 'The referenced order does not exist.',
    productIdRequired: 'Product ID is required.',
    productNotFound: 'The referenced product does not exist.',
    quantityRequired: 'Quantity is required.',
    quantityInvalid: 'Quantity must be an integer greater than 0.',
    subtotalRequired: 'Subtotal is required.',
    subtotalInvalid: 'Subtotal must be a number greater than or equal to 0.',
    idRequired: 'Order detail ID is required.',
    notFound: 'Order detail not found.'
  },
  post: {
    titleRequired: 'Post title is required.',
    titleInvalid: 'Post title must be a valid string.',
    categoryRequired: 'Post category is required.',
    categoryInvalid: 'Post category must be a valid array of category IDs.',
    contentRequired: 'Post content is required.',
    contentInvalid: 'Post content must be a valid string.',
    statusInvalid: 'Post status is invalid.',
    notFound: 'Post not found.',
    bannerRequired: 'Post banner is required.',
    bannerInvalid: 'Post banner must be a valid URL.'
  },
  brand: {
    nameRequired: 'Brand name is required.',
    nameInvalid: 'Brand name must be a valid string.',
    idRequired: 'Brand ID is required.',
    notFound: 'Brand not found.',
    imageRequired: 'Brand image is required.',
    imageInvalid: 'Brand image must be a valid URL.'
  }
}

export default ErrorMessages
