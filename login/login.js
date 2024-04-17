// console.log(alert())
const loginForm = document.querySelector('#login-form')
// console.log(loginForm)

loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    loginUser()
})

function loginUser() {
    const userName = document.querySelector("#username").value
    console.log(userName)

    if(userName){
        localStorage.setItem("username", userName)
    }

      


}