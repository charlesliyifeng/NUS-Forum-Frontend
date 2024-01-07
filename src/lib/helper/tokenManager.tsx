export function signout() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
}

export function signin(token: string, remember = false) {
    if (remember) {
        localStorage.setItem("token", token);
    } else {
        sessionStorage.setItem("token", token);
    }
}
