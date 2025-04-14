


const logOutButton = document.getElementById('logout-button');
logOutButton.addEventListener('click', handleLogOut);

export function handleLogOut(){
  // Clear the "Remember Me" data
  localStorage.removeItem("rememberUser");

  // Redirect to login page
  window.location.replace("/login/login.html");
 
}