const controls = document.getElementById("controls");
let guestList = [];

const render = () => {
  const ol = document.getElementById("guests") || document.createElement("ol");
  ol.id = "guests";
  ol.innerHTML = null;

  guestList.forEach(guest => {
    const li = document.createElement("li");

    li.textContent = guest;
    ol.appendChild(li);
  });

  document.getElementById("container").appendChild(ol);
};

document.addEventListener("DOMContentLoaded", () => {
  const storageData = window.localStorage.getItem("guestList");
  guestList = JSON.parse(storageData) || [];
  render();
});

controls.addEventListener("click", event => {
  if (event.target.tagName === "BUTTON") {
    const inputValue = document.getElementById("guest-input").value;

    switch (event.target.name) {
      case "add-to-start":
        guestList.unshift(inputValue);
        break;
      case "add-to-end":
        guestList.push(inputValue);
        break;
      case "remove-from-start":
        guestList.shift();
        break;
      case "remove-from-end":
        guestList.pop();
        break;
      case "reverse":
        guestList.reverse();
        break;
      default:
        console.log("No such event");
    }

    window.localStorage.setItem("guestList", JSON.stringify(guestList));
    render();
  }
});
