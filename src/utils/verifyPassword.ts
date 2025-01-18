import { pbkdf2Sync } from 'crypto'
import { DIGEST, HASH_ITERATIONS, KEY_LENGTH } from '~/constants/hashPasswordConst'

/**
 * Verify a password
 * @param password - The plain text password to verify
 * @param storedHash - The stored hashed password in the format `salt:hash`
 * @returns A boolean indicating if the password matches
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, originalHash] = storedHash.split(':')
    const hash = pbkdf2Sync(password, salt, HASH_ITERATIONS, KEY_LENGTH, DIGEST).toString('hex')
    return hash === originalHash
  } catch (error) {
    console.error('Error verifying password:', error)
    throw new Error('Failed to verify password')
  }
}
