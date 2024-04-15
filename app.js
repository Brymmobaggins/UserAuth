
let form = document.querySelector("form")

form.addEventListener("submit", function (event) {
    event.preventDefault()
    createAccount()
})

let fullname = document.getElementById('name')
let email = document.getElementById('email')
let password = document.getElementById('password')



function createAccount() {
    let fullNameValue = fullname.value
    let emailValue = email.value
    let passwordValue = password.value

    if (fullNameValue && emailValue && passwordValue) {
        // create an object to save user credentials to local storage
        const credentials = {
            fullNameValue: fullNameValue,
            emailValue: emailValue,
            passwordValue: passwordValue

        }

        // save your key and value to local, convert JS object to JSON object using stringify method
        localStorage.setItem("userCredentials", JSON.stringify(credentials))

        // Hide form, show success message
        document.getElementById("signup-form").style.display = "none"
        document.getElementById("successMessage").style.display = "block"
    }

}

function showError() {
    let messageEl = document.querySelector("small")
    messageEl.innerText = "username is already taken"
    setTimeout(() => {
        messageEl.style.display = "none"
    }, 2000);
}



