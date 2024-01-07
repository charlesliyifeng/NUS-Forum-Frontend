type Header = {
    auth_token: string;
};

function loadHeader(optional = false): Header {
    let token = localStorage.getItem("token");
    if (!token) {
        token = sessionStorage.getItem("token");
    }
    // if token not found
    if (token) {
        return { auth_token: token };
    } else {
        if (optional) {
            return { auth_token: "" };
        } else {
            throw new Error("missing token");
        }
    }
}

export default loadHeader;
