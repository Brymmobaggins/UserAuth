/** @format */
const message = document.querySelector("#message");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});






function handleLogOut(){
  // Clear the "Remember Me" data
  localStorage.removeItem("rememberUser");

  // Redirect to login page
  window.location.replace("/login/login.html");
 
}

// function to handle error messages
export function showMessage(msg, color) {
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
