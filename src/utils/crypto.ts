import { BinaryLike, pbkdf2Sync, randomBytes } from 'crypto'
import { config } from 'dotenv'
import { DIGEST, HASH_ITERATIONS, KEY_LENGTH, SALT_LENGTH } from '~/constants/hashPasswordConst'
config()

/**
 * Hash a password
 * @param password - The plain text password to hash
 * @returns The hashed password in the format `salt:hash`
 */
export function hashPassword(password: string): string {
  try {
    const hash = pbkdf2Sync(password, process.env.SALT as BinaryLike, HASH_ITERATIONS, KEY_LENGTH, DIGEST).toString(
      'hex'
    )
    return `${process.env.SALT}:${hash}`
  } catch (error) {
    console.error('Error hashing password:', error)
    throw new Error('Failed to hash password')
  }
}
