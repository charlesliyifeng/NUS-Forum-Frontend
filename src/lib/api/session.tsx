import client from "./client";
import loadHeader from "../helper/loadHeader";

// get  (need token authentication)
export const getSession = () => {
    const header = loadHeader();
    return client.get("/sessions", { headers: header });
};

// create
export const createSession = (email: string, password: string) => {
    const params = {
        email: email,
        password: password,
    };
    return client.post("/sessions", params);
};

// delete  (need token authentication)
export const deleteSession = (id: number) => {
    const header = loadHeader();
    return client.delete(`/sessions/${id}`, { headers: header });
};
