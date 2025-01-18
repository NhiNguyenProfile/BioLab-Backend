import { pbkdf2Sync, randomBytes } from 'crypto'
import { DIGEST, HASH_ITERATIONS, KEY_LENGTH, SALT_LENGTH } from '~/constants/hashPasswordConst'

/**
 * Hash a password
 * @param password - The plain text password to hash
 * @returns The hashed password in the format `salt:hash`
 */
export function hashPassword(password: string): string {
  try {
    const salt = randomBytes(SALT_LENGTH).toString('hex')
    const hash = pbkdf2Sync(password, salt, HASH_ITERATIONS, KEY_LENGTH, DIGEST).toString('hex')
    return `${salt}:${hash}`
  } catch (error) {
    console.error('Error hashing password:', error)
    throw new Error('Failed to hash password')
  }
}
