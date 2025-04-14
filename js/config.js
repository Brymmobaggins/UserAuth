/** @format */

// Configuration settings for the application
export const config = {
  maxAttempts: 3, // Maximum allowed login attempts
  lockoutDuration: 5 * 60 * 1000, // Lockout duration in milliseconds (5 minutes)
  passwordMinLength: 6, // Minimum password length
};
