// show a message with a type of the input
function showMessage(input, message, type) {
	// get the small element and set the message
	const msg = input.parentNode.querySelector("div.invalid-feedback");
    console.log(msg);
	msg.innerText = message;
	// update the class for the input
    if (type) {
        // Valid
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        // Invalid
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }
	
	return type;
}

function showError(input, message) {
	return showMessage(input, message, false);
}

function showSuccess(input) {
	return showMessage(input, "", true);
}

function hasValue(input, message) {
	if (input.value.trim() === "") {
		return showError(input, message);
	}
	return showSuccess(input);
}



const form = document.getElementById("recipeForm");

const TITLE_REQUIRED = "Please enter your recipe title";

form.addEventListener("submit", function(event) {
    // stop form submission
    event.preventDefault();

    // validate form
    let titleInput = document.getElementById("recipeTitle");
    console.log(titleInput.value);
	let titleValid = hasValue(titleInput, TITLE_REQUIRED);
	// if valid, submit the form.
	if (titleValid) {
		alert("Demo only. No form was posted.");
	}


});