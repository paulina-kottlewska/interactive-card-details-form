let inputs = document.querySelectorAll("input[type=text]");
let confirmBtn = document.querySelector(".submit-btn");
let continueBtn = document.querySelector(".continue");
let cardNumber = document.getElementById("card-number");

let confirmationMsg = document.querySelector(".submitted-msg");
let form = document.querySelector("form");

// Input IDs with the corresponding element's class names. 
let inputParagraphPairs = {
    "cardholder": "cardholder-name",
    "card-number": "card-number",
    "exp-date": "month",
    "year": "year",
    "cvc": "cvc-code"
}

// Input IDs with the correspoding error message elements.
let inputErrorMap = {
    "cardholder": document.querySelector(".error-input1"),
    "card-number": document.querySelector(".error-input2"),
    "exp-date": document.querySelector(".error-input3"),
    "year": document.querySelector(".error-input3"),
    "cvc": document.querySelector(".error-input4")
}

// List of input field IDs that should contain only digit values.
let digitFields = ["card-number", "exp-date", "year", "cvc"];

let correctInputLengths = {
    "card-number": 19, // with spaces
    "exp-date": 2,
    "year": 2,
    "cvc": 3
}

// Default card details
const defaultCardDetails = {
    name: "Jane Appleseed",
    number: "0000 0000 0000 0000",
    month: "00",
    year: "00",
    cvc: "000",
};

confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Clears any existing error messages 
    clearErrors(); 

    // If all inputs are valid, it displays the confirmation message and hides the form.
    if(validateInputs()) {
        confirmationMsg.classList.remove("hidden");
        form.classList.add("hidden");
    }
})

continueBtn.addEventListener("click", () => {
    // Hides the confirmation message, 
    confirmationMsg.classList.add("hidden");
    // Resets the card information to the default values
    resetCardDetails();
    // Displays the form
    form.classList.remove("hidden");
    // Clears the input fields
    inputs.forEach(input => input.value = "");
    // Clears any existing error messages.
    clearErrors();
})

// Updates the card preview whenever an input field value changes.
inputs.forEach(input => input.addEventListener("input", updateCardImg));

// Formats the card number whenever its value changes.
cardNumber.addEventListener('input', formatCardNumber)

function validateInputs() {
    let valid = true;

    for (let inputID in inputErrorMap) {
        let inputElement = document.querySelector("#" + inputID);
        
        // If an input field is empty it shows the error message
        if (inputElement.value === "") {
            showErrorMsg(inputElement, inputErrorMap[inputID], "Can't be blank")
            valid = false;
        }
        // If an input field that should contain only digits, contains non-digit characters, the error message is shown
        else if (digitFields.includes(inputID) && !onlyDigits(inputElement.value)) {
            showErrorMsg(inputElement, inputErrorMap[inputID], "Wrong format, numbers only")
            valid = false;
        }
        // If an input field does not have the correct length, the error message is shown
        else if(inputID in correctInputLengths && inputElement.value.length !== correctInputLengths[inputID]) {
            showErrorMsg(inputElement, inputErrorMap[inputID], "Wrong length, expected " + correctInputLengths[inputID])
            valid = false;
        }

        // Checks if the month is a valid number between 1 and 12
        if(inputID === "exp-date") {
            let month = parseInt(inputElement.value, 10);

            if(month < 1 || month > 12) {
                showErrorMsg(inputElement, inputErrorMap[inputID], "Invalid month");
                valid = false;
            }
        }
    }

    return valid;
}

// Checks if the input string contains only digits and spaces - to validate the inputs that require only digits
function onlyDigits(input) {
    let regex = /^[0-9 ]+$/;
    return regex.test(input);
}

// Displays the error message for a specific input field.
function showErrorMsg(inputElement, errorElement, message) {
    inputElement.classList.add("input-error");
    errorElement.innerText = message;
    errorElement.classList.remove("hidden");
}

// Clears all error messages.
function clearErrors() {
   for(let errorElement of Object.values(inputErrorMap)) {
        errorElement.innerText = "";
        errorElement.classList.add("hidden");
   }

   for(let input of inputs) {
        input.classList.remove("input-error");
   }
}

// Clears the error message for a specific input field.
function clearErrorForInput(inputID) {
    let inputElement = document.querySelector("#" + inputID);
    let errorElement = inputErrorMap[inputID];

    inputElement.classList.remove("input-error");
    errorElement.innerText = "";
    errorElement.classList.add("hidden");
}

// Updates the credit card preview based on the input field that is being updated.
function updateCardImg(event) {
    
    let pClass = inputParagraphPairs[event.target.id]
    if(pClass) {  
        let pElement = document.querySelector("." + pClass);
        pElement.innerText = event.target.value;
    }

    clearErrorForInput(event.target.id);
}

// Formats the card number by adding a space after every 4 characters.
function formatCardNumber(event) {

    // Removes all white spaces
    let inputValue = event.target.value.replace(/\s/g, '');

    // Adds space after every 4 characters
    inputValue = inputValue.replace(/(.{4})/g, '$1 ');

    event.target.value = inputValue.trim();
}

// Resets card details to the default values
function resetCardDetails() {
    let cardholderName = document.querySelector(".cardholder-name");
    let cardNumberDefault = document.querySelector(".card-number");
    let monthDefault = document.querySelector(".month");
    let yearDefault = document.querySelector(".year");
    let cvcCode = document.querySelector(".cvc-code");

    cardholderName.innerText = defaultCardDetails.name;
    cardNumberDefault.innerText = defaultCardDetails.number;
    monthDefault.innerText = defaultCardDetails.month;
    yearDefault.innerText = defaultCardDetails.year;
    cvcCode.innerText = defaultCardDetails.cvc;
}