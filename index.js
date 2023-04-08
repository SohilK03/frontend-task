var tabButtons = document.querySelectorAll(
  ".pri-tabmenu-container .pri-tabmenu button"
);
var tabPanels = document.querySelectorAll(".pri-tabpanels  .pri-tabpanel");
//   console.log("Hello")
//   console.log(tabPanels);
//   console.log(tabButtons);
var sectabButtons = document.querySelectorAll(".sec-tab-container button");
var sectabPanels = document.querySelectorAll(".sec-tabpanel");
var cards = document.querySelectorAll(".card");
function showPanel(panelIndex, colorCode) {
  tabButtons.forEach(function (node) {
    node.style.color = "";
  });
  tabButtons[panelIndex].style.color = colorCode;

  tabPanels.forEach(function (node) {
    node.style.display = "none";
  });
  tabPanels[panelIndex].style.display = "block";
}

function showsecPanel(panelIndex) {
  sectabButtons.forEach(function (node) {
    node.style.border = "";
    node.style.fontWeight = "normal";
  });
  sectabButtons[panelIndex].style.border = "1px solid #d4d4d5";
  sectabButtons[panelIndex].style.fontWeight = "bold";
  sectabButtons[panelIndex].style.borderWidth = "1px 1px 0 1px";

  sectabPanels.forEach(function (node) {
    node.style.display = "none";
  });
  sectabPanels[panelIndex].style.display = "block";
}
const time_diff = (date_1, date_2) => {
  let beforeString = "";
  let afterString = "ago";
  let difference = date_1.getTime() - date_2.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  if (TotalDays < 0) {
    difference *= -1;
    TotalDays *= -1;
    beforeString = "in ";
    afterString = "";
  }
  if (TotalDays < 30) return beforeString + TotalDays + " days " + afterString;
  else if ((TotalDays > 30) & (TotalDays < 365)) {
    difference /= 1000 * 60 * 60 * 24 * 7 * 4;
    return beforeString + Math.round(difference, 0) + " months " + afterString;
  } else {
    difference /= 1000 * 60 * 60 * 24 * 7 * 4 * 12;
    return beforeString + Math.round(difference, 0) + " years " + afterString;
  }
};
function modifyCard() {
  cards.forEach(function (node) {
    var current_date = new Date();
    var start_date = new Date(node.attributes["start_date"].value);
    var due_date = new Date(node.attributes["due_date"].value);
    var progress = node.attributes["progress"].value;
    var due_span = node.querySelector(".due-span");
    var start_span = node.querySelector(".card-start span");
    var progress_bar = node.querySelector(".progress");
    var progress_text = node.querySelector(".progress-text");
    if (due_date < current_date & progress<100) {
      node.style.backgroundColor = "#ffebee";
      node.style.border = "2px solid red";
    }

    due_span.innerHTML = time_diff(current_date, due_date);
    start_span.innerHTML = time_diff(current_date, start_date);
    if (progress < 25) {
      progress_bar.style.backgroundColor = "red";
    } else if ((progress > 25) & (progress < 80))
      progress_bar.style.backgroundColor = "yellow";
    else if ((progress >= 80) & (progress < 100))
      progress_bar.style.backgroundColor = "blue";
    else if (progress == 100) progress_bar.style.backgroundColor = "green";
    progress_bar.style.width = `${progress}%`;
    progress_text.innerHTML = progress + "%";
  });
}
showPanel(0, "#E30464");
showsecPanel(0, "#E30464");
modifyCard();
