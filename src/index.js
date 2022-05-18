const button = document.querySelector("#adviceBtn");
const quoteElement = document.querySelector("#adviceQuote");
const loader = document.querySelector("#loader");
const adviceCountElement = document.querySelector(".adviceCount");

let adviceCount = 1;

function showLoader() {
  loader.classList.remove("hide");
  quoteElement.classList.add("hide");
}
function hideLoader() {
  loader.classList.add("hide");
  quoteElement.classList.remove("hide");
}
function updateCounter() {
  adviceCountElement.textContent = adviceCount;
}

function getAdvice() {
  const url = "https://api.adviceslip.com/advice";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      adviceCount++;
      hideLoader();
      quoteElement.innerHTML = `"${data.slip.advice}"`;
    })
    .catch((error) => console.log(error));
}

function animateBtn() {
  button.classList.add("animate");
  setTimeout(function () {
    button.classList.remove("animate");
  }, 150);
}

window.addEventListener("DOMContentLoaded", () => {
  showLoader();
  getAdvice();
  updateCounter();
});

button.addEventListener("click", () => {
  button.setAttribute("disabled", "disabled");
  showLoader();
  animateBtn();
  getAdvice();
  updateCounter();
  setTimeout(() => {
    button.removeAttribute("disabled");
  }, 2000);
});
