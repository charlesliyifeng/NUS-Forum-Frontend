import client from "./client";
import { deserializeUser } from "../serializers/UserDeserializer";
import loadHeader from "../helper/loadHeader";

export interface createUserParams {
    name: string;
    email: string;
    password: string;
}

// get (need token authorization)
export const getUser = (id: number) => {
    const header = loadHeader();
    const response = client.get(`/users/${id}?fields[user]=name`, { headers: header });
    return response.then((res) => deserializeUser(res.data)).catch((err) => console.error(err));
};

// create
export const createUser = (params: createUserParams) => {
    return client.post("/users", { user: params });
};

// delete (need token authorization)
export const deleteUser = (id: number) => {
    const header = loadHeader();
    return client.delete(`/users/${id}`, { headers: header });
};
