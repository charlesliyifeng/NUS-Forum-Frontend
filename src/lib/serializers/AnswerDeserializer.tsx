/* eslint-disable @typescript-eslint/no-explicit-any */

import deserializeComment from "./CommentDeserializer";
import { Answer } from "../../types/Answer";
import { User } from "../../types/User";
import { Comment } from "../../types/Comment";

interface Dictionary<T> {
    [Key: number]: T;
}

type dataParams = {
    id: string;
    type: "answer";
    attributes: {
        body: string;
        votes: number;
        userVote: number;
        accepted: boolean;
        createdAt: string;
        updatedAt: string;
    };
    relationships: {
        question: {
            data: {
                id: string;
                type: "question";
            };
        };
        user: {
            data: {
                id: string;
                type: "user";
            } | null;
        };
        comments: any;
    };
};

// build authors and comments dict
function buildDicts(data: any[]): [Dictionary<User>, Dictionary<Comment>] {
    const authors: Dictionary<User> = {};
    const comments: Dictionary<Comment> = {};
    if (data) {
        data.forEach((item: any) => {
            if (item.type === "user") {
                authors[+item.id] = { id: +item.id, name: item.attributes.name };
            } else if (item.type === "comment") {
                comments[+item.id] = deserializeComment(item);
            }
        });
    }
    return [authors, comments];
}

function processData(data: dataParams, authors: Dictionary<User>, comments: Dictionary<Comment>): Answer {
    // look up username from authors dict
    const userData = data.relationships.user.data;
    const author: User = userData ? authors[+userData.id] : { id: 0, name: "deleted user" };

    // fill comment list
    const commentList: Comment[] = [];
    if (data.relationships.comments) {
        const commentData: any[] = data.relationships.comments.data;
        if (commentData) {
            commentData.forEach((params) => {
                const id: number = +params.id;
                commentList.push(comments[id]);
            });
        }
    }

    // create answer
    const t: Answer = {
        answerID: +data.id,
        questionID: +data.relationships.question.data.id,
        body: data.attributes.body,
        author: author,
        createdAt: data.attributes.createdAt,
        updatedAt: data.attributes.updatedAt,
        votes: data.attributes.votes,
        userVote: data.attributes.userVote,
        accepted: data.attributes.accepted,
        comments: commentList,
    };
    return t;
}

interface singleResponse {
    data: dataParams;
    included: any[];
}

export function deserializeAnswer(response: singleResponse): Answer {
    // build authors dict
    const [authors, comments] = buildDicts(response.included);

    // process main body
    const a = processData(response.data, authors, comments);

    return a;
}

interface listResponse {
    data: dataParams[];
    included: any[];
}

export function deserializeAnswerList(response: listResponse): Answer[] {
    const answers: Answer[] = [];

    // build authors dict
    const [authors, comments] = buildDicts(response.included);

    // process main body
    if (response.data) {
        response.data.forEach((data: dataParams) => {
            const a = processData(data, authors, comments);
            answers.push(a);
        });
    }

    return answers;
}
