/** @format */

// Utility function to handle error or success messages
export function showMessage(msg, color) {
  const message = document.querySelector("#message");
  if (!message) return; // Exit if the message element is not found

  message.textContent = msg;
  message.style.color = color;
  message.style.fontSize = "0.875rem";
  message.style.lineHeight = "1.25rem";
  message.style.fontWeight = 500;

  setTimeout(() => {
    message.textContent = ""; // Clear the message
    message.style.color = ""; // Reset the color to default
  }, 5000); // Clear the message after 5 seconds
}
