const actions = document.getElementById("actions");
const output = document.getElementById("output");

const render = drawing => {
  output.innerHTML = drawing;
};

const triangle = () => {
  let drawing = "";
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < i + 1; j++) {
      drawing += "*";
    }

    drawing += "<br />";
  }

  render(drawing);
};

const piramid = () => {
  let drawing = "";
  for (let i = 0; i < 10; i++) {
    for (let x = 0; x < 10 - i; x++) {
      drawing += "&nbsp;";
    }

    for (let k = 0; k < i * 2 + 1; k++) {
      drawing += "*";
    }

    // for (let k = 0; k < i; k++) {
    //   drawing += "* ";
    // }

    drawing += "<br />";
  }

  render(drawing);
};

const reversePiramid = () => {
  let drawing = "";
  for (let i = 10; i >= 0; i--) {
    for (let x = 0; x < 10 - i; x++) {
      drawing += "&nbsp;";
    }

    for (let k = 0; k < i * 2 + 1; k++) {
      drawing += "*";
    }

    // for (let k = 0; k < i; k++) {
    //   drawing += "* ";
    // }

    drawing += "<br />";
  }

  render(drawing);
};

actions.addEventListener("click", event => {
  if (event.target.tagName === "BUTTON") {
    const action = event.target.name;

    switch (action) {
      case "triangle":
        triangle();
        break;
      case "piramid":
        piramid();
        break;
      case "reverse-piramid":
        reversePiramid();
        break;
      case "clear":
        render("");
        break;
      default:
        render("");
    }
  }
});
