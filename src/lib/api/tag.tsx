import client from "./client";

// get
export const getTagList = (q = "") => {
    const response = client.get(`/tags/index?q=${q}`);
    return response;
};
