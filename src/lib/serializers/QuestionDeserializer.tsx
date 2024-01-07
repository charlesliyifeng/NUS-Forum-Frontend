import { Question } from "../../types/Question";
import { User } from "../../types/User";

interface Dictionary<T> {
    [Key: number]: T;
}

type userParams = {
    id: string;
    type: "user";
    attributes: {
        name: string;
    };
    // eslint-disable-next-line
    relationships: any;
};

type dataParams = {
    id: string;
    type: "question";
    attributes: {
        title: string;
        body: string;
        votes: number;
        views: number;
        tags: string;
        createdAt: string;
        updatedAt: string;
    };
    relationships: {
        // eslint-disable-next-line
        answers: any;
        user: {
            data: {
                id: string;
                type: "user";
            } | null;
        };
    };
    meta: {
        answersCount: number;
        accepted: boolean;
    };
};

// build authors dict
function buildUsers(data: userParams[]): Dictionary<User> {
    const authors: Dictionary<User> = {};
    if (data) {
        data.forEach((user: userParams) => {
            authors[+user.id] = { id: +user.id, name: user.attributes.name };
        });
    }
    return authors;
}

function processData(data: dataParams, authors: Dictionary<User>): Question {
    // look up username from authors dict
    const userdata = data.relationships.user.data;
    const author: User = userdata ? authors[+userdata.id] : { id: 0, name: "deleted user" };

    // remove empty tags
    let tagArray = data.attributes.tags.split(",");
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
        answersCount: data.meta.answersCount,
        accepted: data.meta.accepted,
        views: data.attributes.views,
        tags: tagArray,
    };
    //console.log(t);

    return t;
}

interface singleResponse {
    data: dataParams;
    included: userParams[];
}

export function deserializeQuestion(response: singleResponse): Question {
    // build authors dict
    const authors = buildUsers(response.included);

    // process main body
    const q = processData(response.data, authors);

    return q;
}

interface listResponse {
    data: dataParams[];
    included: userParams[];
}

export function deserializeQuestionList(response: listResponse): Question[] {
    const questions: Question[] = [];

    // build authors dict
    const authors = buildUsers(response.included);

    // process main body
    if (response.data) {
        response.data.forEach((data: dataParams) => {
            const q = processData(data, authors);
            questions.push(q);
        });
    }

    return questions;
}
