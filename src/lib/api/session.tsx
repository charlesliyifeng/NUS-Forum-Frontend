import client from "./client";

// get
export const getSession = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
        // if token exists
        console.log(token);
        return client.get("/sessions", { headers: { auth_token: token } });
    } else {
        throw new Error("missing token");
    }
};

// create
export const createSession = (email: string, password: string) => {
    const params = {
        email: email,
        password: password,
    };
    return client.post("/sessions", params);
};

// delete
export const deleteSession = (id: number) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        // if token exists
        return client.delete(`/sessions/${id}`, { headers: { auth_token: token } });
    } else {
        throw new Error("missing token");
    }
};
