// DEFINING ELEMENTS
const passwordEl1 = document.getElementById("password");
const emailEl = document.getElementById("email");
const confirmPasswordEl = document.getElementById("confirm-password");
const userEl1 = document.getElementById("username");
const addressEl = document.getElementById("address");
const form = document.getElementById("sign");
const signupBtn = document.getElementById("signup");

// DECLARE INPUT VARIABLES
  let userName = ''
  let userEmail = ''
  let userPassword = ''
  let confirmPwd = '' 
  let userAddress = ''

// LISTEN FOR SIGN UP BUTTON
$(signupBtn).click(function () {
  // grab data from inputs
 userName = $(userEl1).val();
 userEmail = $(emailEl).val();
 userPassword = $(passwordEl1).val();
 confirmPwd = $(confirmPasswordEl).val();
 userAddress = $(addressEl).val();

  //EMAIL VERIFICATION
  if (!isEmailValid(userEmail)) {
    alert("You must enter a valid email");
  } else 

  // PASSWORD VERIFICATION
  if (isPasswordSecure(userPassword)) {
    alert("Please enter a valid password");
  } else

  if (userPassword != confirmPwd) {
    alert("Passwords do not match");
  } else
  if(userPassword.length < 5 || userPassword.length > 20) {
    alert("Password needs to be between 5 & 20 characters")
  } else {

  signUp(userName, userEmail, userPassword, userAddress)

  }
});

// CHECK EMAIL IS VALID
const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

// CHECK PASSWORD IS VALID
const isPasswordSecure = (password) => {
  const re = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  return re.test(password);
};


// CREATE NEW USER
async function signUp(userName, userEmail, userPassword, userAddress) {
    if (userName && userEmail && userPassword && userAddress) {
      const response = await fetch("/newuser", {
        method: "POST",
        body: JSON.stringify({"name": userName , "email": userEmail, "password": userPassword , "address": userAddress }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/success");
      } else {
        alert("Failed to sign up.");
      }
    }
  }