import client from "./client";
//import { User } from "../../types/User";

// get
export const getUser = (id: number) => {
    const response = client.get(`/answers/${id}`);
    return response.then().catch();
};

// create
export const createUser = () => {
    const params = "";
    return client.post("/sessions", params);
};

// delete
export const deleteUser = (id: number) => {
    return client.delete(`/sessions/${id}`);
};
