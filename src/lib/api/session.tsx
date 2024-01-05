import client from "./client";
import loadHeader from "../helper/loadHeader";

export interface createSessionParams {
    email: string;
    password: string;
}

// get  (need token authentication)
export const getSession = () => {
    const header = loadHeader();
    return client.get("/sessions", { headers: header });
};

// create
export const createSession = (params: createSessionParams) => {
    return client.post("/sessions", params);
};

// delete  (need token authentication)
export const deleteSession = (id: number) => {
    const header = loadHeader();
    return client.delete(`/sessions/${id}`, { headers: header });
};
