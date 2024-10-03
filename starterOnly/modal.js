function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close");

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

// launch modal event
modalBtn.forEach(btn => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.addEventListener("click", closeModal);

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

// Validation form function
function validateForm(event) {
  event.preventDefault(); // Prevents immediate submission of the form, to test the fields before

  let valid = true;

  // Validate first name length
  if (!isValidLength(formElements.first, 2)) valid = false;

  // Validate last name length
  if (!isValidLength(formElements.last, 2)) valid = false;

  // Validate email
  if (!isValidLength(formElements.email, 6) || !isValidEmail(formElements.email)) valid = false;

  // Validate birthdate length
  if (!isValidLength(formElements.birthdate, 10)) valid = false;

  // Validate quantity (integer > 0)
  if (!isValidLength(formElements.quantity, 1) || !isValidQuantity(formElements.quantity)) valid = false;

  // Validate city (one radio checked)
  if (!isRadioSelected(formElements.city)) valid = false;

  // Validate terms (checkbox is checked)
  if (!formElements.terms || !formElements.terms.checked) valid = false;

  console.log("valid ", valid);
}

// Event listener for the form submission button
formElements.submitBtn.addEventListener("click", validateForm);
