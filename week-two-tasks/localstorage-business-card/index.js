const form = document.getElementById("form");
const dataKey = "businessCard";

const render = () => {
  const output = window.localStorage.getItem(dataKey);
  const outputFromHtml = document.getElementById("output-container");
  const outputContainer = outputFromHtml || document.createElement("div");
  const container = document.getElementById("container");

  outputContainer.id = "output-container";
  outputContainer.innerHTML = output;

  if (!outputFromHtml) {
    document.getElementById("container").appendChild(outputContainer);
  }
};

window.addEventListener("load", render);

form.addEventListener("submit", event => {
  event.preventDefault();

  const fields = event.target.querySelectorAll("input");
  let output = "";

  for (let i = 0; i < fields.length; i++) {
    const input = fields[i];
    output += `<p>${input.value}</p>`;
    input.value = "";
  }

  window.localStorage.setItem(dataKey, output);
  render();
});
