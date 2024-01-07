import client from "./client";
import { deserializeUser, deserializeUserDetails } from "../serializers/UserDeserializer";
import loadHeader from "../helper/loadHeader";
import { UserDetails } from "../../types/User";
import { serializeUpdate } from "../serializers/UserSerializer";

export interface createUserParams {
    name: string;
    email: string;
    password: string;
}

// get
export const getUser = (id: number) => {
    const response = client.get(`/users/${id}?fields[user]=name`);
    return response.then((res) => deserializeUser(res.data)).catch((err) => console.error(err));
};

// get
export const getUserDetails = (id: number) => {
    const response = client.get(`/users/${id}?fields[user]=name,created_at,updated_at`);
    return response.then((res) => deserializeUserDetails(res.data)).catch((err) => console.error(err));
};

// create
export const createUser = (params: createUserParams) => {
    return client.post("/users", { user: params });
};

// update (need token authorization)
export const updateUser = (id: number, user: UserDetails) => {
    const header = loadHeader();
    const params = serializeUpdate(user);
    return client.put(`/users/${id}`, params, { headers: header });
};

// delete (need token authorization)
export const deleteUser = (id: number) => {
    const header = loadHeader();
    return client.delete(`/users/${id}`, { headers: header });
};
