import client from "./client";
import { Question } from "../../types/Question";
import loadHeader from "../helper/loadHeader";

// input/output param types
type inputParams = {
    id: number;
    title: string;
    body: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    votes: number;
    answersCount: number;
    accepted: number;
    views: number;
    tags: string;
};

type outputCreateParams = {
    title: string;
    body: string;
    author: string;
    votes: number;
    answersCount: number;
    accepted: number;
    views: number;
    tags: string;
};

type outputUpdateParams = {
    title: string;
    body: string;
    author: string;
    tags: string;
};

// helper functions to serialize/deserialize questions
function serializeCreate(t: Question): outputCreateParams {
    const p: outputCreateParams = {
        title: t.title,
        body: t.body,
        author: t.author,
        votes: t.votes,
        answersCount: t.answers,
        accepted: t.accepted ? 1 : 0,
        views: t.views,
        tags: t.tags.join(","),
    };

    return p;
}

function serializeUpdate(t: Question): outputUpdateParams {
    const p: outputUpdateParams = {
        title: t.title,
        body: t.body,
        author: t.author,
        tags: t.tags.join(","),
    };

    return p;
}

function deserialize(params: inputParams): Question {
    // remove empty tags
    let tagArray = params.tags.split(",");
    tagArray = tagArray.filter((x) => x);

    const t: Question = {
        id: params.id,
        title: params.title,
        body: params.body,
        author: params.author,
        createdAt: params.createdAt,
        updatedAt: params.updatedAt,
        votes: params.votes,
        answers: params.answersCount,
        accepted: !!params.accepted,
        views: params.views,
        tags: tagArray,
    };

    return t;
}

function deserializeList(data: inputParams[]): Question[] {
    const questions: Question[] = [];
    data.forEach((params: inputParams) => {
        const t: Question = deserialize(params);
        questions.push(t);
    });
    return questions;
}

// get
export const getQuestionList = () => {
    const response = client.get("/questions");
    return response.then((res) => deserializeList(res.data)).catch((err) => console.error(err));
};

// detail
export const getQuestionDetail = (id: number) => {
    const response = client.get(`/questions/${id}`);
    return response.then((res) => deserialize(res.data)).catch((err) => console.error(err));
};

// create  (need token authentication)
export const createQuestion = (q: Question) => {
    const header = loadHeader();
    const params: outputCreateParams = serializeCreate(q);
    return client.post("/questions", params, { headers: header });
};

// update  (need token authentication)
export const updateQuestion = (id: number, q: Question) => {
    const header = loadHeader();
    const params: outputUpdateParams = serializeUpdate(q);
    return client.put(`/questions/${id}`, params, { headers: header });
};

// delete  (need token authentication)
export const deleteQuestion = (id: number) => {
    const header = loadHeader();
    return client.delete(`/questions/${id}`, { headers: header });
};
