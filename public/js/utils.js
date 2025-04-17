/** @format */

// Simplified function to display messages
const message = document.querySelector("#message");
export function showMessage(msg, color) {

  if (!message) {
    console.error("Message container not found!");
    return;
  }

  message.textContent = msg;
  message.style.color = color;

  setTimeout(() => {
    message.textContent = "";
    message.style.color = "";
  }, 5000);
}
