var footballGoals = 0;
var footballAttempts = 0;
var directions = ["left", "center", "right"];

var cricketRuns = 0;
var cricketOut = false;

const FOOTBALL_KEY = "footballScores";
const CRICKET_KEY = "cricketScores";

function $(id) {
  return document.getElementById(id);
}

window.onload = function () {
  loadHistory(FOOTBALL_KEY, "football-history", "No previous scores yet");
  loadHistory(CRICKET_KEY, "cricket-history", "No previous scores yet");
};

function removeClasses(ids, classes) {
  ids.forEach(id => {
    $(id).classList.remove(...classes);
  });
}


function shoot(playerDirection) {
  var goalkeeperDirection = directions[Math.floor(Math.random() * directions.length)];

  footballAttempts++;

  removeClasses(
    ["net-left", "net-center", "net-right"],
    ["goal-flash", "save-flash"]
  );

  var gk = $("goalkeeper");
  var move = { left: "-80px", right: "80px", center: "0px" };
  gk.style.transform = "translateX(" + move[goalkeeperDirection] + ")";

  var resultBox = $("football-result");
  var netCell = $("net-" + playerDirection);

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

  updateFootballUI();
}

function updateFootballUI() {
  $("football-goals").textContent = footballGoals;
  $("football-attempts").textContent = footballAttempts;
}

function resetFootball() {
  if (footballAttempts > 0) {
    saveScore(FOOTBALL_KEY, footballGoals, footballAttempts, "Goals");
  }

  footballGoals = 0;
  footballAttempts = 0;

  updateFootballUI();

  var resultBox = $("football-result");
  resultBox.textContent = "";
  resultBox.className = "result-box";

  $("goalkeeper").style.transform = "translateX(0px)";

  removeClasses(
    ["net-left", "net-center", "net-right"],
    ["goal-flash", "save-flash"]
  );
}


function playBall(playerNumber) {
  var resultBox = $("cricket-result");

  if (cricketOut) {
    resultBox.textContent = "You are OUT! Click New Innings to play again.";
    resultBox.className = "result-box out";
    return;
  }

  var computerNumber = Math.floor(Math.random() * 6) + 1;

  $("player-num").textContent = playerNumber;
  $("computer-num").textContent = computerNumber;

  if (playerNumber === computerNumber) {
    cricketOut = true;
    resultBox.textContent =
      "OUT! Both picked " + playerNumber + ". Final score: " + cricketRuns + " runs";
    resultBox.className = "result-box out";

    $("cricket-status").textContent = "OUT";

    saveScore(CRICKET_KEY, cricketRuns, 0, "Score");
  } else {
    cricketRuns += playerNumber;
    resultBox.textContent =
      playerNumber + " run(s) scored! Computer chose " + computerNumber;
    resultBox.className = "result-box run";

    $("cricket-runs").textContent = cricketRuns;
    animateScore("cricket-runs");
  }
}

function resetCricket() {
  cricketRuns = 0;
  cricketOut = false;

  $("cricket-runs").textContent = 0;
  $("cricket-status").textContent = "Batting";
  $("player-num").textContent = "?";
  $("computer-num").textContent = "?";

  var resultBox = $("cricket-result");
  resultBox.textContent = "";
  resultBox.className = "result-box";
}


function saveScore(key, mainValue, extraValue, label) {
  var scores = JSON.parse(localStorage.getItem(key)) || [];
  scores.push(label + ": " + mainValue + (extraValue ? " / Attempts: " + extraValue : ""));
  scores = scores.slice(-5);
  localStorage.setItem(key, JSON.stringify(scores));

  if (key === FOOTBALL_KEY) loadHistory(FOOTBALL_KEY, "football-history", "No previous scores yet");
  if (key === CRICKET_KEY) loadHistory(CRICKET_KEY, "cricket-history", "No previous scores yet");
}

function loadHistory(key, elementId, emptyText) {
  var scores = JSON.parse(localStorage.getItem(key)) || [];
  var list = $(elementId);

  list.innerHTML = scores.length ? "" : "<li>" + emptyText + "</li>";

  scores.forEach(score => {
    var li = document.createElement("li");
    li.textContent = score;
    list.appendChild(li);
  });
}


function animateScore(elementId) {
  var el = $(elementId);
  el.classList.add("bump");
  setTimeout(() => el.classList.remove("bump"), 300);
}