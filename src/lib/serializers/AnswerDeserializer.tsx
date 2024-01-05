import { Answer } from "../../types/Answer";
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
    type: "answer";
    attributes: {
        body: string;
        votes: number;
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
            };
        };
    };
};

function buildUsers(data: userParams[]): Dictionary<User> {
    const authors: Dictionary<User> = {};
    if (data) {
        data.forEach((user: userParams) => {
            authors[+user.id] = { id: +user.id, name: user.attributes.name };
        });
    }
    return authors;
}

function processData(data: dataParams, authors: Dictionary<User>): Answer {
    // look up username from authors dict
    const author: User = authors[+data.relationships.user.data.id];

    // create answer
    const t: Answer = {
        answerID: +data.id,
        questionID: +data.relationships.question.data.id,
        body: data.attributes.body,
        author: author,
        createdAt: data.attributes.createdAt,
        updatedAt: data.attributes.updatedAt,
        votes: data.attributes.votes,
        accepted: data.attributes.accepted,
    };
    return t;
}

interface singleResponse {
    data: dataParams;
    included: userParams[];
}

export function deserializeAnswer(response: singleResponse): Answer {
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

export function deserializeAnswerList(response: listResponse): Answer[] {
    const answers: Answer[] = [];

    // build authors dict
    const authors = buildUsers(response.included);

    // process main body
    if (response.data) {
        response.data.forEach((data: dataParams) => {
            const a = processData(data, authors);
            answers.push(a);
        });
    }

    return answers;
}
