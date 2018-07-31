const localStorageKey = "contacts";
let contacts = [];
let search = "";

const select = selector => document.querySelector(selector);
const createElement = (tag, properties) => {
  const element = document.createElement(tag);

  if (properties) {
    Object.entries(properties).forEach(keyValuePair => {
      element[keyValuePair[0]] = keyValuePair[1];
    });
  }

  return element;
};

const update = () => {
  window.localStorage.setItem(localStorageKey, JSON.stringify(contacts));
  render();
};

const render = () => {
  const contactsDiv = select("#contacts");
  contactsDiv.innerHTML = null;

  contacts
    .filter(contact => {
      return (
        contact.name.includes(search) ||
        contact.email.includes(search) ||
        contact.phone.includes(search)
      );
    })
    .forEach((contact, index) => {
      const fieldContainer = contact.isEditing ? "input" : "div";
      const container = createElement("div");
      const name = createElement(fieldContainer, {
        [contact.isEditing ? "value" : "textContent"]: contact.isEditing
          ? contact.name
          : `👫: ${contact.name}`
      });
      const email = createElement(fieldContainer, {
        [contact.isEditing ? "value" : "textContent"]: contact.isEditing
          ? contact.email
          : `📧: ${contact.email}`
      });
      const phone = createElement(fieldContainer, {
        [contact.isEditing ? "value" : "textContent"]: contact.isEditing
          ? contact.phone
          : `📞: ${contact.phone}`
      });
      const deleteButton = createElement("button", { textContent: "❌" });
      const editButton = createElement("button", {
        textContent: contact.isEditing ? "💾 Save" : "✏️ Edit"
      });
      const favorites = createElement("button", {
        textContent: contact.isFavorite ? "Remove 💔" : "Add ❤️"
      });

      container.appendChild(name);
      container.appendChild(phone);
      container.appendChild(email);
      container.appendChild(deleteButton);
      container.appendChild(editButton);
      container.appendChild(favorites);

      deleteButton.addEventListener("click", () => {
        contacts.splice(index, 1);
        update();
      });

      editButton.addEventListener("click", () => {
        if (contact.isEditing) {
          contacts[index].name = name.value;
          contacts[index].email = email.value;
          contacts[index].phone = phone.value;
        }

        contacts[index].isEditing = !contact.isEditing;
        update();
      });

      favorites.addEventListener("click", () => {
        contacts[index].isFavorite = !contact.isFavorite;
        update();
      });

      contactsDiv.appendChild(container);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  contacts = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
  render();
});

select('.search input[name="search"]').addEventListener("input", e => {
  search = e.target.value;
  render();
});

select('#new-contact button[name="add-contact"]').addEventListener(
  "click",
  e => {
    const newContact = {
      name: select('#new-contact input[name="name"]').value,
      email: select('#new-contact input[name="email"]').value,
      phone: select('#new-contact input[name="phone"]').value,
      isFavorite: false,
      isEditing: false
    };

    contacts.push(newContact);
    update();
  }
);
