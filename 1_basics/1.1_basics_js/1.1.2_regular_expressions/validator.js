/**
 * Validation using regular expressions.
 * This class provides methods for validating email addresses, phone numbers, and passwords.
 */
export class Validator {
    /**
     * Validates an email address.
     * @param {string} email - The email address to be validated.
     * @returns {boolean} - True if the email is valid, false otherwise.
     */
    validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9-.+]{0,19}@[a-zA-Z0-9.!$%&’*+/=?^_-]{1,15}\.[a-zA-Z]{1,5}$/;
        return emailRegex.test(email);
    }
    /**
    * Validates a phone number.
    * @param {string} phoneNumber - The phone number to be validated.
    * @returns {boolean} - True if the phone number is valid, false otherwise.
    */
    validatePhoneNumber(phoneNumber) {
        const phoneRegex = /^([-\s]*\+[-\s]*3[-\s]*8[-\s]*|[-\s]*)?(\(?(\d[-\s]*){3}\)?)([-\s]*\d[-\s]*){7}$/;
        const maxLength = 25;
        if (phoneNumber.length > maxLength) {
            return false;
        }
        return phoneRegex.test(phoneNumber);
    }
    /**
     * Validates a password.
     * @param {string} password - The password to be validated.
     * @returns {boolean} - True if the password is valid, false otherwise.
     */
    validatePassword(password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[\w]{8,}$/;
        return passwordRegex.test(password);
    }
}