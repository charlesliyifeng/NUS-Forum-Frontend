import client from "./client";
import { Question } from "../../types/Question";

// input/output param types
type inputParams = {
    id: number;
    title: string;
    body: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    votes: number;
    answers: number;
    accepted: number;
    views: number;
    tags: string;
};

type outputParams = {
    title: string;
    body: string;
    author: string;
    votes: number;
    answers: number;
    accepted: number;
    views: number;
    tags: string;
};

// helper functions to serialize/deserialize questions
function serialize(t: Question): outputParams {
    const p: outputParams = {
        title: t.title,
        body: t.body,
        author: t.author,
        votes: t.votes,
        answers: t.answers,
        accepted: t.accepted ? 1 : 0,
        views: t.views,
        tags: t.tags.join(","),
    };

    return p;
}

function deserialize(params: inputParams): Question {
    const t: Question = {
        id: params.id,
        title: params.title,
        body: params.body,
        author: params.author,
        created_at: params.createdAt,
        updated_at: params.updatedAt,
        votes: params.votes,
        answers: params.answers,
        accepted: !!params.accepted,
        views: params.views,
        tags: params.tags.split(","),
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

// create
export const createQuestion = (t: Question) => {
    const params: outputParams = serialize(t);
    return client.post("/questions", params);
};

// update
export const updateQuestion = (id: number, t: Question) => {
    const params: outputParams = serialize(t);
    return client.put(`/questions/${id}`, params);
};

// delete
export const deleteQuestion = (id: number) => {
    return client.delete(`/questions/${id}`);
};
