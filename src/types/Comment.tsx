import { User, newUser } from "./User";

export type Comment = {
    commentID: number;
    commentableID: number;
    commentableType: string;
    body: string;
    author: User;
    createdAt: string;
    updatedAt: string;
};

export function newComment(author = -1, body = "", commentableID = -1, commentableType = ""): Comment {
    const newComment: Comment = {
        commentID: -1,
        commentableID: commentableID,
        commentableType: commentableType,
        body: body,
        author: newUser(author),
        createdAt: "",
        updatedAt: "",
    };

    return newComment;
}
