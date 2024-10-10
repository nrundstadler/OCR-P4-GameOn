// DOM button menu responsive
const menuMobileBtn = document.getElementById("btn_hamb");

// DOM Modal Elements
const modalbg = document.querySelector(".form-wrapper");
const modalBody = document.querySelector(".form-wrapper__content");
const modalBtn = document.querySelectorAll(".btn-signup");
const closeBtn = document.querySelector(".btn-close");

// DOM Form Elements
const formElements = {
  first: document.getElementById("first"),
  last: document.getElementById("last"),
  email: document.getElementById("email"),
  birthdate: document.getElementById("birthdate"),
  quantity: document.getElementById("quantity"),
  city: document.querySelectorAll("input[name=location]"),
  terms: document.getElementById("checkbox1"),
};

// List of error messages in French to display in the form
const errorMessages = {
  first: "Le prénom doit comporter au moins 2 caractères.",
  last: "Le nom doit comporter au moins 2 caractères.",
  email: "Veuillez entrer une adresse e-mail valide.",
  birthdate: "Veuillez entrer une date de naissance au format JJ/MM/AAAA.",
  quantity: "Veuillez entrer un nombre de tournois valide.",
  city: "Veuillez sélectionner une ville.",
  terms: "Vous devez lire et accepter les conditions d'utilisation.",
};

// Toggle navbar mobile
menuMobileBtn.addEventListener("click", () =>
  document.querySelector(".header-navbar__list").classList.toggle("header-navbar__list--visible")
);

// launch modal event
modalBtn.forEach(btn => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.classList.add("form-wrapper--visible");
  formElements.first.focus(); // Set the focus on the first form field
}

// close modal
function closeModal() {
  modalbg.classList.remove("form-wrapper--visible");
}

// Utility function to validate input length
function isValidLength(element, minLength = 1) {
  return element && typeof element.value === "string" && element.value.trim().length >= minLength;
}

// Utility function to validate email format
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.value);
}

// Utility function to validate date format DD/MM/YYYY and it's not in the future
function isValidDate(birthdate) {
  // Regex to match the format YYYY/MM/DD
  const datePattern = /^(19[0-9]{2}|20[0-9]{2}|21[0-9]{2})-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])$/;

  // Create a Date object directly from the 'YYYY-MM-DD' string
  if (!datePattern.test(birthdate.value)) {
    return false; // If the birthdate is invalid, return false
  }

  // Split the 'YYYY-MM-DD' string into an array of [year, month, day] and convert each part to a number
  const [year, month, day] = birthdate.value.split("-").map(Number);

  // Create a Date object directly from the 'YYYY-MM-DD' string
  const date = new Date(year, month - 1, day);

  // Get today date
  const today = new Date();

  return date < today;
}

// Utility function to validate quantity
function isValidQuantity(quantity) {
  const value = quantity.valueAsNumber;
  return Number.isInteger(value) && value >= 0 && value < 1000;
}

// Utility function to check if a radio button is selected
function isRadioSelected(radioElements) {
  // Checks if a radio button is selected by converting the NodeList to an array and using some()
  return Array.from(radioElements).some(radio => radio.checked);
}

// Function to create and display an error message for invalid form fields
function createErrorMessage(field, message) {
  // Create a paragraph element for the error message
  const errorMessage = document.createElement("p");
  errorMessage.className = "error-message";
  errorMessage.textContent = message;

  // Get the first element if field is a NodeList, otherwise use field
  const targetField = field instanceof NodeList ? field[0] : field;

  // Insert the class error div parent
  targetField.parentElement.classList.add("data-error");

  // Insert the paragraph after field
  targetField.parentElement.appendChild(errorMessage);
}

// Function to display a confirmation message after successful form submission
function showRegistrationSuccess() {
  modalBody.innerHTML = `<p class="reserve-confirm">Merci pour votre inscription</p>
  <input class="btn_submit--close btn" type="submit" value="Fermer">`;
  // Add listener new btn close & focus
  const closeButton = modalBody.querySelector(".btn_submit--close");
  closeButton.focus();
  closeButton.addEventListener("click", closeModal);
}

// Validation form function
function validateForm(event) {
  event.preventDefault(); // Prevents immediate submission of the form, to test the fields before

  // Remove all elements with the class "error-message" from the DOM
  document.querySelectorAll(".error-message").forEach(el => el.remove());
  // Remove the class "data-error" from all elements that have it
  document.querySelectorAll(".data-error").forEach(el => el.classList.remove("data-error"));

  // Define the fields and their validation rules
  const validations = [
    // Test first name length
    {
      field: "first",
      validationRule: () => isValidLength(formElements.first, 2),
    },
    // Test last name length
    {
      field: "last",
      validationRule: () => isValidLength(formElements.last, 2),
    },
    // Test email length + pattern
    {
      field: "email",
      validationRule: () => isValidLength(formElements.email, 6) && isValidEmail(formElements.email),
    },
    // Test birthdate length
    {
      field: "birthdate",
      validationRule: () => isValidLength(formElements.birthdate, 10) && isValidDate(formElements.birthdate),
    },
    // Test quantity length + integer > 0
    {
      field: "quantity",
      validationRule: () => isValidLength(formElements.quantity) && isValidQuantity(formElements.quantity),
    },
    // Test city (one radio checked)
    {
      field: "city",
      validationRule: () => isRadioSelected(formElements.city),
    },
    // Test terms (checkbox is checked)
    {
      field: "terms",
      validationRule: () => formElements.terms && formElements.terms.checked,
    },
  ];

  let valid = true;

  // Check each validation rule
  validations.forEach(({ field, validationRule }) => {
    // If the field is not valid, else show error
    if (!validationRule()) {
      createErrorMessage(formElements[field], errorMessages[field]);
      valid = false;
    }
  });

  // If the form is completely valid, display a success message
  if (valid) showRegistrationSuccess();
}

// Event listener for the form submission button
document.querySelector("form").addEventListener("submit", validateForm);
