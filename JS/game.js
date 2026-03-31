var footballGoals = 0;
var footballAttempts = 0;
var directions = ["left", "center", "right"];

window.onload = function () {
  loadFootballHistory();
  loadCricketHistory();
};

function shoot(playerDirection) {
  var randomIndex = Math.floor(Math.random() * 3);
  var goalkeeperDirection = directions[randomIndex];

  footballAttempts++;

  document.getElementById("net-left").classList.remove("goal-flash", "save-flash");
  document.getElementById("net-center").classList.remove("goal-flash", "save-flash");
  document.getElementById("net-right").classList.remove("goal-flash", "save-flash");

  var gk = document.getElementById("goalkeeper");
  if (goalkeeperDirection === "left") {
    gk.style.transform = "translateX(-80px)";
  } else if (goalkeeperDirection === "right") {
    gk.style.transform = "translateX(80px)";
  } else {
    gk.style.transform = "translateX(0px)";
  }

  var resultBox = document.getElementById("football-result");
  var netCell = document.getElementById("net-" + playerDirection);

  if (playerDirection !== goalkeeperDirection) {
    footballGoals++;
    netCell.classList.add("goal-flash");
    resultBox.textContent = "GOAL! Great shot!";
    resultBox.className = "result-box goal";
    animateScore("football-goals");
  } else {
    netCell.classList.add("save-flash");
    resultBox.textContent = "SAVED! The goalkeeper blocked it!";
    resultBox.className = "result-box miss";
  }

  document.getElementById("football-goals").textContent = footballGoals;
  document.getElementById("football-attempts").textContent = footballAttempts;
}

function resetFootball() {
  if (footballAttempts > 0) {
    saveFootballScore(footballGoals, footballAttempts);
  }
  footballGoals = 0;
  footballAttempts = 0;
  document.getElementById("football-goals").textContent = 0;
  document.getElementById("football-attempts").textContent = 0;
  document.getElementById("football-result").textContent = "";
  document.getElementById("football-result").className = "result-box";
  document.getElementById("goalkeeper").style.transform = "translateX(0px)";
  document.getElementById("net-left").classList.remove("goal-flash", "save-flash");
  document.getElementById("net-center").classList.remove("goal-flash", "save-flash");
  document.getElementById("net-right").classList.remove("goal-flash", "save-flash");
}

function saveFootballScore(goals, attempts) {
  var scores = JSON.parse(localStorage.getItem("footballScores")) || [];
  scores.push("Goals: " + goals + " / Attempts: " + attempts);
  if (scores.length > 5) {
    scores = scores.slice(scores.length - 5);
  }
  localStorage.setItem("footballScores", JSON.stringify(scores));
  loadFootballHistory();
}

function loadFootballHistory() {
  var scores = JSON.parse(localStorage.getItem("footballScores")) || [];
  var list = document.getElementById("football-history");
  list.innerHTML = "";
  if (scores.length === 0) {
    list.innerHTML = "<li>No previous scores yet</li>";
    return;
  }
  for (var i = 0; i < scores.length; i++) {
    var li = document.createElement("li");
    li.textContent = scores[i];
    list.appendChild(li);
  }
}

var cricketRuns = 0;
var cricketOut = false;

function playBall(playerNumber) {
  if (cricketOut) {
    document.getElementById("cricket-result").textContent = "You are OUT! Click New Innings to play again.";
    document.getElementById("cricket-result").className = "result-box out";
    return;
  }

  var computerNumber = Math.floor(Math.random() * 6) + 1;

  document.getElementById("player-num").textContent = playerNumber;
  document.getElementById("computer-num").textContent = computerNumber;

  var resultBox = document.getElementById("cricket-result");

  if (playerNumber === computerNumber) {
    cricketOut = true;
    resultBox.textContent = "OUT! Both picked " + playerNumber + ". Final score: " + cricketRuns + " runs";
    resultBox.className = "result-box out";
    document.getElementById("cricket-status").textContent = "OUT";
    saveCricketScore(cricketRuns);
  } else {
    cricketRuns += playerNumber;
    resultBox.textContent = playerNumber + " run(s) scored! Computer chose " + computerNumber;
    resultBox.className = "result-box run";
    document.getElementById("cricket-runs").textContent = cricketRuns;
    animateScore("cricket-runs");
  }
}

function resetCricket() {
  cricketRuns = 0;
  cricketOut = false;
  document.getElementById("cricket-runs").textContent = 0;
  document.getElementById("cricket-status").textContent = "Batting";
  document.getElementById("player-num").textContent = "?";
  document.getElementById("computer-num").textContent = "?";
  document.getElementById("cricket-result").textContent = "";
  document.getElementById("cricket-result").className = "result-box";
}

function saveCricketScore(runs) {
  var scores = JSON.parse(localStorage.getItem("cricketScores")) || [];
  scores.push("Score: " + runs + " runs");
  if (scores.length > 5) {
    scores = scores.slice(scores.length - 5);
  }
  localStorage.setItem("cricketScores", JSON.stringify(scores));
  loadCricketHistory();
}

function loadCricketHistory() {
  var scores = JSON.parse(localStorage.getItem("cricketScores")) || [];
  var list = document.getElementById("cricket-history");
  list.innerHTML = "";
  if (scores.length === 0) {
    list.innerHTML = "<li>No previous scores yet</li>";
    return;
  }
  for (var i = 0; i < scores.length; i++) {
    var li = document.createElement("li");
    li.textContent = scores[i];
    list.appendChild(li);
  }
}

function animateScore(elementId) {
  var el = document.getElementById(elementId);
  el.classList.add("bump");
  setTimeout(function () {
    el.classList.remove("bump");
  }, 300);
}