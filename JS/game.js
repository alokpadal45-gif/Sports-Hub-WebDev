var footballGoals = 0;
var footballAttempts = 0;
var directions = ["left", "center", "right"];

window.onload = function () {
  loadFootballHistory();
  loadCricketHistory();
};

function removeClasses(ids, classes) {
  ids.forEach(id => {
    document.getElementById(id).classList.remove(...classes);
  });
}

function shoot(playerDirection) {
  console.log("Player chose:", playerDirection); // added
  var goalkeeperDirection = directions[Math.floor(Math.random() * 3)];
  console.log("Goalkeeper chose:", goalkeeperDirection); // added

  footballAttempts++;

  removeClasses(
    ["net-left", "net-center", "net-right"],
    ["goal-flash", "save-flash"]
  );

  var gk = document.getElementById("goalkeeper");
  var move = { left: "-80px", right: "80px", center: "0px" };
  gk.style.transform = "translateX(" + move[goalkeeperDirection] + ")";

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
    resultBox.textContent = "SAVED!! The goalkeeper blocked it!";
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

  var resultBox = document.getElementById("football-result");
  resultBox.textContent = "";
  resultBox.className = "result-box";

  document.getElementById("goalkeeper").style.transform = "translateX(0px)";

  removeClasses(
    ["net-left", "net-center", "net-right"],
    ["goal-flash", "save-flash"]
  );
}

function saveFootballScore(goals, attempts) {
  var scores = JSON.parse(localStorage.getItem("footballScores")) || [];
  scores.push("Goals: " + goals + " / Attempts: " + attempts);
  scores = scores.slice(-5);
  localStorage.setItem("footballScores", JSON.stringify(scores));
  loadFootballHistory();
}

function loadFootballHistory() {
  var scores = JSON.parse(localStorage.getItem("footballScores")) || [];
  var list = document.getElementById("football-history");

  list.innerHTML = scores.length
    ? ""
    : "<li>No previous scores yet</li>";

  scores.forEach(score => {
    var li = document.createElement("li");
    li.textContent = score;
    list.appendChild(li);
  });
}

var cricketRuns = 0;
var cricketOut = false;

function playBall(playerNumber) {
  console.log("Player number:", playerNumber); // added

  var resultBox = document.getElementById("cricket-result");

  if (cricketOut) {
    resultBox.textContent = "You are OUT! Click New Innings to play again.";
    resultBox.className = "result-box out";
    return;
  }

  var computerNumber = Math.floor(Math.random() * 6) + 1;
  console.log("Computer number:", computerNumber); // added

  document.getElementById("player-num").textContent = playerNumber;
  document.getElementById("computer-num").textContent = computerNumber;

  if (playerNumber === computerNumber) {
    cricketOut = true;
    resultBox.textContent =
      "OUT! Both picked " + playerNumber + ". Final score: " + cricketRuns + " runs";
    resultBox.className = "result-box out";
    document.getElementById("cricket-status").textContent = "OUT";
    saveCricketScore(cricketRuns);
  } else {
    cricketRuns += playerNumber;
    resultBox.textContent =
      playerNumber + " run(s) scored! Computer chose " + computerNumber;
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

  var resultBox = document.getElementById("cricket-result");
  resultBox.textContent = "";
  resultBox.className = "result-box";
}

function saveCricketScore(runs) {
  var scores = JSON.parse(localStorage.getItem("cricketScores")) || [];
  scores.push("Score: " + runs + " runs");
  scores = scores.slice(-5);
  localStorage.setItem("cricketScores", JSON.stringify(scores));
  loadCricketHistory();
}

function loadCricketHistory() {
  var scores = JSON.parse(localStorage.getItem("cricketScores")) || [];
  var list = document.getElementById("cricket-history");

  list.innerHTML = scores.length
    ? ""
    : "<li>No previous scores yet</li>";

  scores.forEach(score => {
    var li = document.createElement("li");
    li.textContent = score;
    list.appendChild(li);
  });
}

function animateScore(elementId) {
  var el = document.getElementById(elementId);
  el.classList.add("bump");
  setTimeout(() => el.classList.remove("bump"), 300);
}