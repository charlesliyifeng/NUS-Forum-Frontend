export function validatePassword(password: string): string[] {
    // return list of errors, returns empty list if password is valid
    const errors: string[] = [];
    const re = {
        upper: /[A-Z]/,
        digit: /[0-9]/,
        lower: /[a-z]/,
    };
    if (password.length < 8 || password.length > 24) {
        errors.push("password must contain at least 8-24 characters");
    }
    if (!re.lower.test(password)) {
        errors.push("password must contain at least 1 lowercase character");
    }
    if (!re.upper.test(password)) {
        errors.push("password must contain at least 1 uppercase character");
    }
    if (!re.digit.test(password)) {
        errors.push("password must contain at least 1 digit");
    }
    return errors;
}

export function validateEmail(email: string): boolean {
    if (/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(email)) {
        return true;
    }
    return false;
}
