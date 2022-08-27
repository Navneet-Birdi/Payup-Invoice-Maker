// DEFINE FIELDS
const loginBtn = document.getElementById("login-btn")
const userEl = document.getElementById("user")
const passwordEl = document.getElementById("password")
const contBtn = document.getElementById("continue")
 
// FUNCTION FOR POST METHOD TO /LOGIN
async function logIn(user, password) {
    
    if(user && password) {
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({"user": user, "password": password}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/invoice') // define endpoint
        }else {
            alert('Login failed')
        }
    }
}

// RUN LOGIN FUNCTION ON CLICK
$(loginBtn).click(function() {
    const user = $(userEl).val()
    const password = $(passwordEl).val()
  logIn(user, password)
})

// NAVIGATE TO LOGIN PAGE AFTER NEW ACCOUNT CREATED
$(contBtn).click(function() {
    document.location.replace('/')
})