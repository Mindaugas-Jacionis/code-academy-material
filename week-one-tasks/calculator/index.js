const actions = document.getElementById("actions");
const output = document.getElementById("output");

const numberOne = document.querySelector("#input input[name='number-one']");
const numberTwo = document.querySelector("#input input[name='number-two']");

const renderOutput = value => {
  output.textContent = value;
};

const clear = () => {
  numberOne.value = "";
  numberTwo.value = "";
  renderOutput("");
};

actions.addEventListener("click", event => {
  const actionName = event.target.name;

  switch (actionName) {
    case "sum":
      renderOutput(Number(numberOne.value) + Number(numberTwo.value));
      break;
    case "sub":
      renderOutput(numberOne.value - numberTwo.value);
      break;
    case "div":
      renderOutput(numberOne.value / numberTwo.value);
      break;
    case "mul":
      renderOutput(numberOne.value * numberTwo.value);
      break;
    case "mod":
      renderOutput(numberOne.value % numberTwo.value);
      break;
    case "clear":
      clear();
      break;
    default:
      clear();
  }
});
