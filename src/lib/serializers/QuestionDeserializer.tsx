/* eslint-disable @typescript-eslint/no-explicit-any */

import deserializeComment from "./CommentDeserializer";
import { Comment } from "../../types/Comment";
import { Question } from "../../types/Question";
import { User } from "../../types/User";

interface Dictionary<T> {
    [Key: number]: T;
}

type dataParams = {
    id: string;
    type: "question";
    attributes: {
        title: string;
        body: string;
        votes: number;
        userVote: number;
        views: number;
        tagList: string[];
        answersCount: number;
        accepted: boolean;
        createdAt: string;
        updatedAt: string;
    };
    relationships: {
        answers: any;
        comments: any;
        user: {
            data: {
                id: string;
                type: "user";
            } | null;
        };
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

function processData(data: dataParams, authors: Dictionary<User>, comments: Dictionary<Comment>): Question {
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

    // remove empty tags
    let tagArray: string[] = data.attributes.tagList;
    tagArray = tagArray.map((x) => x.trim());
    tagArray = tagArray.filter((x) => x);

    // create question
    const t: Question = {
        id: +data.id,
        title: data.attributes.title,
        body: data.attributes.body,
        author: author,
        createdAt: data.attributes.createdAt,
        updatedAt: data.attributes.updatedAt,
        votes: data.attributes.votes,
        userVote: data.attributes.userVote,
        answersCount: data.attributes.answersCount,
        accepted: data.attributes.accepted,
        views: data.attributes.views,
        tags: tagArray,
        comments: commentList,
    };
    return t;
}

interface singleResponse {
    data: dataParams;
    included: any[];
}

export function deserializeQuestion(response: singleResponse): Question {
    // build authors dict
    const [authors, comments] = buildDicts(response.included);

    // process main body
    const q = processData(response.data, authors, comments);

    return q;
}

type paginationInfo = {
    current: number;
    next: number;
    last: number;
    records: number;
};

interface listResponse {
    data: dataParams[];
    included: any[];
    meta: {
        pagination: paginationInfo;
    };
}

interface questionListReturn {
    questions: Question[];
    count: number;
}

export function deserializeQuestionList(response: listResponse): questionListReturn {
    const questions: Question[] = [];

    // build authors dict
    const [authors, comments] = buildDicts(response.included);

    // process main body
    if (response.data) {
        response.data.forEach((data: dataParams) => {
            const q = processData(data, authors, comments);
            questions.push(q);
        });
    }

    return { questions: questions, count: response.meta.pagination.records };
}
