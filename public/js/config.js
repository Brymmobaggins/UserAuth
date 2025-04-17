/** @format */

// Basic configuration for validation and messages
export const messages = {
  success: {
    login: "Login successful",
    signup: "Sign up successful!",
    logout: "Logout successful",
  },
  error: {
    emptyFields: "Please fill all fields",
    emptyUsername: "Please enter a username and Password",
    invalidEmail: "Please enter a valid email address",
    shortPassword: "Password must be at least 6 characters long",
    invalidUsername:
      "Username can only contain letters, numbers, and underscores",
  },
};

export const validation = {
  emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  usernameRegex: /^[a-zA-Z0-9._%+-]+$/,
  passwordMinLength: 6,
};
