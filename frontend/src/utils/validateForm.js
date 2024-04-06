const emailRegex = /^[^\s@]+@torontomu.ca$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

function validateEmail(email) {
  return emailRegex.test(email);
}

function validatePassword(password) {
  return passwordRegex.test(password);
}

/**
 * Validates the email and password for a form.
 * @param {string} email - The email to be validated.
 * @param {string} password - The password to be validated.
 * @returns {boolean} - Returns true if the email and password are valid, otherwise false.
 */
export default function validateForm(email, password) {
  if (!validateEmail(email)) {
    alert("Invalid email - Must be a TorontoMU email address");
    return false;
  }

  if (!validatePassword(password)) {
    alert(
      "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number"
    );
    return false;
  }

  return true;
}
