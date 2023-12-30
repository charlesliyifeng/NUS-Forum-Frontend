import client from "./client";
import { Answer } from "../../types/Answer";

// input/output param types
type inputParams = {
    id: number;
    questionId: number;
    body: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    votes: number;
    accepted: number;
};

type outputParams = {
    body: string;
    author: string;
    votes: number;
    accepted: number;
    questionId: number;
};

// helper functions to serialize/deserialize questions
function serialize(t: Answer): outputParams {
    const p: outputParams = {
        body: t.body,
        author: t.author,
        votes: t.votes,
        accepted: t.accepted ? 1 : 0,
        questionId: t.questionID,
    };

    return p;
}

function deserialize(params: inputParams): Answer {
    const t: Answer = {
        answerID: params.id,
        questionID: params.questionId,
        body: params.body,
        author: params.author,
        createdAt: params.createdAt,
        updatedAt: params.updatedAt,
        votes: params.votes,
        accepted: !!params.accepted,
    };

    return t;
}

function deserializeList(data: inputParams[]): Answer[] {
    const answers: Answer[] = [];
    data.forEach((params: inputParams) => {
        const t: Answer = deserialize(params);
        answers.push(t);
    });
    return answers;
}

// get
export const getAnswerList = () => {
    const response = client.get("/answers");
    return response.then((res) => deserializeList(res.data)).catch((err) => console.error(err));
};

// detail
export const getAnswerDetail = (id: number) => {
    const response = client.get(`/answers/${id}`);
    return response.then((res) => deserialize(res.data)).catch((err) => console.error(err));
};

// get_answers
export const getAnswersOfQuestion = (questionID: number) => {
    const response = client.get(`/questions/${questionID}/get_answers`);
    return response.then((res) => deserializeList(res.data)).catch((err) => console.error(err));
};

// create
export const createAnswer = (a: Answer) => {
    const params: outputParams = serialize(a);
    return client.post("/answers", params);
};

// update
export const updateAnswer = (id: number, a: Answer) => {
    const params: outputParams = serialize(a);
    return client.put(`/answers/${id}`, params);
};

// delete
export const deleteAnswer = (id: number) => {
    return client.delete(`/answers/${id}`);
};
