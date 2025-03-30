function showSignup() {
    document.querySelector(".login-container").style.display = "none";
    document.querySelector(".signup-container").style.display = "block";
}

function showLogin() {
    document.querySelector(".signup-container").style.display = "none";
    document.querySelector(".login-container").style.display = "block";
}

// 📝 User Signup
function signup() {
    let newUsername = document.getElementById("newUsername").value;
    let newPassword = document.getElementById("newPassword").value;

    if (!newUsername || !newPassword) {
        alert("🚫 Please enter a valid username and password!");
        return;
    }

    localStorage.setItem("username", newUsername);
    localStorage.setItem("password", newPassword);
    alert("✅ Signup successful! Now login.");
    showLogin();
}

// 🔐
