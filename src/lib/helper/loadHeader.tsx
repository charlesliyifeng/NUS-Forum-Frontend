type Header = {
    auth_token: string;
};

function loadHeader(): Header {
    const token = sessionStorage.getItem("token");
    if (token) {
        return { auth_token: token };
    } else {
        throw new Error("missing token");
    }
}

export default loadHeader;
