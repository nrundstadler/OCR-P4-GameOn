function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelectorAll(".close");

// DOM Form Elements
const formElements = {
  first: document.getElementById("first"),
  last: document.getElementById("last"),
  email: document.getElementById("email"),
  birthdate: document.getElementById("birthdate"),
  quantity: document.getElementById("quantity"),
  city: document.querySelectorAll("input[name=location]"),
  terms: document.getElementById("checkbox1"),
  submitBtn: document.querySelector(".btn-submit"),
};

const errorMessages = {
  first: "Le prénom doit comporter au moins 2 caractères.",
  last: "Le nom doit comporter au moins 2 caractères.",
  email: "Veuillez entrer une adresse e-mail valide.",
  birthdate: "Veuillez entrer une date de naissance au format JJ/MM/AAAA.",
  quantity: "Veuillez entrer un nombre de tournois valide.",
  city: "Veuillez sélectionner une ville.",
  terms: "Vous devez lire et accepter les conditions d'utilisation.",
};

// launch modal event
modalBtn.forEach(btn => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.forEach(btn => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal
function closeModal() {
  modalbg.style.display = "none";
}

// Utility function to validate input length
function isValidLength(element, minLength) {
  return element && typeof element.value === "string" && element.value.trim().length >= minLength;
}

// Utility function to validate email format
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.value);
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

// Validation form function
function validateForm(event) {
  event.preventDefault(); // Prevents immediate submission of the form, to test the fields before

  let valid = true;

  // Remove all elements with the class "error-message" from the DOM
  document.querySelectorAll(".error-message").forEach(el => el.remove());
  // Remove the class "data-error" from all elements that have it
  document.querySelectorAll(".data-error").forEach(el => el.classList.remove("data-error"));

  // Validate first name length
  if (!isValidLength(formElements.first, 2)) {
    createErrorMessage(formElements.first, errorMessages.first);
    valid = false;
  }

  // Validate last name length
  if (!isValidLength(formElements.last, 2)) {
    createErrorMessage(formElements.last, errorMessages.last);
    valid = false;
  }

  // Validate email
  if (!isValidLength(formElements.email, 6) || !isValidEmail(formElements.email)) {
    createErrorMessage(formElements.email, errorMessages.email);
    valid = false;
  }

  // Validate birthdate length
  if (!isValidLength(formElements.birthdate, 10)) {
    createErrorMessage(formElements.birthdate, errorMessages.birthdate);
    valid = false;
  }

  // Validate quantity (integer > 0)
  if (!isValidLength(formElements.quantity, 1) || !isValidQuantity(formElements.quantity)) {
    createErrorMessage(formElements.quantity, errorMessages.quantity);
    valid = false;
  }

  // Validate city (one radio checked)
  if (!isRadioSelected(formElements.city)) {
    createErrorMessage(formElements.city, errorMessages.city);
    valid = false;
  }

  // Validate terms (checkbox is checked)
  if (!formElements.terms || !formElements.terms.checked) {
    createErrorMessage(formElements.terms, errorMessages.terms);
    valid = false;
  }
}

// Event listener for the form submission button
formElements.submitBtn.addEventListener("click", validateForm);
