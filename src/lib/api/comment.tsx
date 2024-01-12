import client from "./client";
import { Comment } from "../../types/Comment";
import loadHeader from "../helper/loadHeader";
import { serializeComment } from "../serializers/CommentSerializer";

// create  (need token authentication)
export const createComment = (a: Comment) => {
    const header = loadHeader();
    const params = serializeComment(a);
    return client.post("/comments", params, { headers: header });
};

// update  (need token authentication)
export const updateComment = (id: number, a: Comment) => {
    const header = loadHeader();
    const params = serializeComment(a);
    return client.put(`/comments/${id}`, params, { headers: header });
};

// delete  (need token authentication)
export const deleteComment = (id: number) => {
    const header = loadHeader();
    return client.delete(`/comments/${id}`, { headers: header });
};
