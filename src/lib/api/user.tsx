import client from "./client";
import { deserializeUser, deserializeUserDetails } from "../serializers/UserDeserializer";
import loadHeader from "../helper/loadHeader";
import { UserDetails } from "../../types/User";
import { serializeUser } from "../serializers/UserSerializer";

// get
export const getUser = (id: number) => {
    const response = client.get(`/users/${id}?fields[user]=name`);
    return response.then((res) => deserializeUser(res.data)).catch((err) => console.error(err));
};

// get (token authentication optional)
export const getUserDetails = (id: number) => {
    const header = loadHeader();
    const response = client.get(`/users/${id}?fields[user]=name,email,created_at,updated_at`, { headers: header });
    return response.then((res) => deserializeUserDetails(res.data)).catch((err) => console.error(err));
};

// create
export const createUser = (user: UserDetails) => {
    const params = serializeUser(user);
    return client.post("/users", { user: params });
};

// update (need token authorization)
export const updateUser = (id: number, user: UserDetails) => {
    const header = loadHeader();
    const params = serializeUser(user);
    return client.put(`/users/${id}`, { user: params }, { headers: header });
};

// delete (need token authorization)
export const deleteUser = (id: number) => {
    const header = loadHeader();
    return client.delete(`/users/${id}`, { headers: header });
};
