import jwt from 'jsonwebtoken'

/**
 * Sign a JWT token
 * @param payload - The data to be encoded in the token
 * @param privateKey - The private key used for signing
 * @param options - Optional JWT signing options
 * @returns A promise that resolves to the signed token
 */
export function signToken({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  options
}: {
  payload: string | Buffer | object
  privateKey?: string
  options?: jwt.SignOptions
}): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options || {}, (error, token) => {
      if (error || !token) {
        console.error('Error signing token:', error)
        reject(new Error('Failed to sign token'))
        return
      }
      resolve(token as string)
    })
  })
}
