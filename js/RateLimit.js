/** @format */

import { config } from "./config.js";

class RateLimit {
  constructor() {
    this.maxAttempts = config.maxAttempts;
    this.lockoutDuration = config.lockoutDuration;
  }

  trackFailedAttempt(username) {
    const failedAttempts =
      JSON.parse(localStorage.getItem("failedAttempts")) || {};
    const userAttempts = failedAttempts[username] || {
      count: 0,
      lastAttempt: null,
    };

    userAttempts.count += 1;
    userAttempts.lastAttempt = Date.now();
    failedAttempts[username] = userAttempts;

    localStorage.setItem("failedAttempts", JSON.stringify(failedAttempts));
  }

  isLockedOut(username) {
    const failedAttempts =
      JSON.parse(localStorage.getItem("failedAttempts")) || {};
    const userAttempts = failedAttempts[username];

    if (userAttempts && userAttempts.count >= this.maxAttempts) {
      const timeSinceLastAttempt = Date.now() - userAttempts.lastAttempt;
      if (timeSinceLastAttempt < this.lockoutDuration) {
        const remainingTime = Math.ceil(
          (this.lockoutDuration - timeSinceLastAttempt) / 1000
        );
        return { locked: true, remainingTime };
      } else {
        // Reset the lockout after the duration
        this.resetAttempts(username);
      }
    }
    return { locked: false };
  }

  resetAttempts(username) {
    const failedAttempts =
      JSON.parse(localStorage.getItem("failedAttempts")) || {};
    delete failedAttempts[username];
    localStorage.setItem("failedAttempts", JSON.stringify(failedAttempts));
  }
}

export default RateLimit;
