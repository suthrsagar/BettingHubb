let timer = 30;
let interval;
let wallet = localStorage.getItem("wallet") ? parseInt(localStorage.getItem("wallet")) : 1000;
document.getElementById("walletAmount").innerText = wallet;

// 🔄 Start Timer
function startTimer() {
    interval = setInterval(() => {
        if (timer > 0) {
            timer--;
            document.getElementById("timer").innerText = timer;
        } else {
            clearInterval(interval);
            checkWinner();
        }
    }, 1000);
}
startTimer();

// 🎰 Place Bet Function (Now with Popup)
function placeBet(color) {
    let betAmount = parseInt(document.getElementById("betAmount").value);
    if (!betAmount || betAmount <= 0) {
        alert("🚫 Please enter a valid amount!");
        return;
    }
    
    if (betAmount > wallet) {
        alert("🚫 Not enough balance!");
        return;
    }

    wallet -= betAmount;
    localStorage.setItem("wallet", wallet);
    document.getElementById("walletAmount").innerText = wallet;

    let bets = JSON.parse(localStorage.getItem("userBets")) || {};
    bets[color] = (bets[color] || 0) + betAmount;
    localStorage.setItem("userBets", JSON.stringify(bets));

    let betList = document.getElementById("betList");
    let betMessage = document.createElement("li");
    betMessage.innerText = `✅ Bet: ₹${betAmount} on ${color.toUpperCase()}`;
    betMessage.classList.add("bet-animation");
    betList.appendChild(betMessage);

    showPopup("✅ Bet Placed Successfully!", "bet");
}

// 🏆 Check Winner (Admin Set or Auto Select)
function checkWinner() {
    let adminWinner = localStorage.getItem("adminWinner");
    let winner = adminWinner || (Math.random() > 0.5 ? "red" : "green");

    declareWinner(winner);
}

// 🏆 Declare Winner
function declareWinner(winningColor) {
    let bets = JSON.parse(localStorage.getItem("userBets")) || {};
    let payout = bets[winningColor] ? bets[winningColor] * 2 : 0;

    if (payout > 0) {
        wallet += payout;
        localStorage.setItem("wallet", wallet);
        document.getElementById("walletAmount").innerText = wallet;
        showPopup("🎉 You Win! ₹" + payout, "win");
    } else {
        showPopup("😢 You Lost!", "lose");
    }

    localStorage.setItem("userBets", JSON.stringify({}));
    localStorage.removeItem("adminWinner");
    timer = 30;
    startTimer();
}

// 🎉 Show Win/Loss Popup (Clickable)
function showPopup(message, type) {
    let popup = document.createElement("div");
    popup.innerText = message;
    popup.classList.add("popup", type);
    popup.onclick = () => popup.remove(); // ✅ Click to Remove Popup
    document.body.appendChild(popup);
    popup.style.display = "block";
}

// 🔒 Logout
function logout() {
    alert("🔒 Logged Out!");
    window.location.href = "index.html";
}
document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus();
});

function showSignup() {
    document.getElementById("signupForm").style.display = "block";
}

function checkLoginStatus() {
    let username = localStorage.getItem("username");
    if (username) {
        document.getElementById("authSection").style.display = "none";
        document.getElementById("dashboardSection").style.display = "block";
        document.getElementById("usernameDisplay").innerText = username;
    }
}

// 🔐 User Signup
function signup() {
    let newUsername = document.getElementById("newUsername").value;
    let newPassword = document.getElementById("newPassword").value;

    if (!newUsername || !newPassword) {
        alert("🚫 Please enter valid details!");
        return;
    }

    localStorage.setItem("username", newUsername);
    localStorage.setItem("password", newPassword);
    alert("✅ Signup successful! Now login.");
    document.getElementById("signupForm").style.display = "none";
}

// 🔑 User Login
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let storedUsername = localStorage.getItem("username");
    let storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
        localStorage.setItem("isLoggedIn", "true");
        checkLoginStatus();
    } else {
        alert("❌ Invalid Credentials!");
    }
}

// 🚪 Logout
function logout() {
    localStorage.removeItem("isLoggedIn");
    document.getElementById("authSection").style.display = "block";
    document.getElementById("dashboardSection").style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus();
    startTimer();
});

let betPlaced = false; // Flag to track if user has already placed a bet

function placeBet(color) {
    if (betPlaced) {
        alert("⚠️ You have already placed a bet for this round!"); 
        return;
    }

    let betAmount = document.getElementById("betAmount").value;
    if (!betAmount || betAmount <= 0) {
        alert("❌ Please enter a valid bet amount!");
        return;
    }

    // Show confirmation popup
    let confirmation = confirm(`✅ Bet Placed Successfully!\n\n🎲 Bet: ${color.toUpperCase()} \n💰 Amount: ₹${betAmount}`);
    if (confirmation) {
        betPlaced = true; // User has placed a bet, disable further bets
    }
}

// ✅ Timer Function (Runs every 30 sec)
function startTimer() {
    let timeLeft = 30;
    let timerElement = document.getElementById("timer");

    let countdown = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(countdown);
            betPlaced = false; // Reset bet permission after timer resets
            startTimer(); // Restart timer
        } else {
            timerElement.innerText = timeLeft;
            timeLeft--;
        }
    }, 1000);
}
