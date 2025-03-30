// 🏆 Admin Sets Winner
function setResult(color) {
    localStorage.setItem("adminWinner", color);
    alert(`✅ Winner Set: ${color.toUpperCase()}`);
}

// 📊 Update Bet Statistics in Admin Panel
function updateBetStats() {
    let bets = JSON.parse(localStorage.getItem("userBets")) || {};
    let redBets = bets["red"] || 0;
    let greenBets = bets["green"] || 0;
    
    document.getElementById("redBets").innerText = redBets;
    document.getElementById("greenBets").innerText = greenBets;
    document.getElementById("totalUsersBet").innerText = redBets + greenBets;
}

// ⏳ Auto Update Admin Stats Every 3 Seconds
setInterval(updateBetStats, 3000);
updateBetStats();
