import { Comment } from "../../types/Comment";
import { newUser } from "../../types/User";

type CommentParams = {
    id: string;
    type: "comment";
    attributes: {
        createdAt: string;
        updatedAt: string;
        body: string;
        authorId: number;
        authorName: string;
    };
    relationships: {
        user: {
            data: {
                id: string;
                type: "user";
            };
        };
        commentable: {
            data: {
                id: string;
                type: string;
            };
        };
    };
};

function deserializeComment(params: CommentParams): Comment {
    const t: Comment = {
        commentID: +params.id,
        commentableID: +params.relationships.commentable.data.id,
        commentableType: params.relationships.commentable.data.type,
        body: params.attributes.body,
        author: newUser(params.attributes.authorId, params.attributes.authorName),
        createdAt: params.attributes.createdAt,
        updatedAt: params.attributes.updatedAt,
    };

    return t;
}

export default deserializeComment;
