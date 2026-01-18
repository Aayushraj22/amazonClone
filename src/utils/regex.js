/**
 * Email regex (RFC-like, practical)
 */
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Username rules:
 * - 3–20 characters
 * - lowercase letters, numbers
 * - dots & underscores allowed
 * - no consecutive dots/underscores
 * - cannot start or end with special char
 */
const usernameRegex = /^(?![._])(?!.*[._]{2})[a-z0-9._]{3,20}(?<![._])$/;

/**
 * Password rules:
 * - min 8 chars
 * - 1 uppercase
 * - 1 lowercase
 * - 1 number
 * - 1 special char
 */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


const mobileRegex = /^\+?[1-9]\d{1,14}$/


export { emailRegex, usernameRegex, passwordRegex, mobileRegex, }