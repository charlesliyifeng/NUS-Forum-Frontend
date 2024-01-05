import client from "./client";
//import { User } from "../../types/User";

export interface createUserParams {
    name: string;
    email: string;
    password: string;
}

// get
export const getUser = (id: number) => {
    const response = client.get(`/users/${id}`);
    return response.then().catch();
};

// create
export const createUser = (params: createUserParams) => {
    return client.post("/users", { user: params });
};

// delete (need token authorization)
export const deleteUser = (id: number) => {
    return client.delete(`/users/${id}`);
};
