import { Comment } from "../../types/Comment";

type outputParams = {
    body: string;
    userId: number;
    commentableType: string;
    commentableId: number;
};

// helper functions to serialize comment details
export function serializeComment(t: Comment): outputParams {
    const p: outputParams = {
        body: t.body,
        userId: t.author.id,
        commentableType: t.commentableType,
        commentableId: t.commentableID,
    };

    return p;
}
