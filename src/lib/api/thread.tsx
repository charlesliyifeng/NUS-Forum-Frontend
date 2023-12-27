import client from "./client";
import Thread from "../../types/Thread";

/*
    Note: 'Thread' in frontend is the same as 'Question' in backend.
    'Question' was used because 'Thread' is a reserved word in rails.
*/

// input/output param types
type inputParams = {
    id: number;
    title: string;
    body: string;
    author: string;
    created_at: string;
    updated_at: string;
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

// helper functions to serialize/deserialize threads
function serialize(t: Thread): outputParams {
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

function deserialize(params: inputParams): Thread {
    const t: Thread = {
        id: params.id,
        title: params.title,
        body: params.body,
        author: params.author,
        created_at: params.created_at,
        updated_at: params.updated_at,
        votes: params.votes,
        answers: params.answers,
        accepted: !!params.accepted,
        views: params.views,
        tags: params.tags.split(","),
    };

    return t;
}

function deserializeList(data: inputParams[]): Thread[] {
    const threads: Thread[] = [];
    data.forEach((params: inputParams) => {
        const t: Thread = deserialize(params);
        threads.push(t);
    });
    return threads;
}

// get
export const getThreadList = () => {
    const response = client.get("/questions");
    return response.then((res) => deserializeList(res.data)).catch((err) => console.error(err));
};

// detail
export const getThreadDetail = (id: number) => {
    const response = client.get(`/questions/${id}`);
    return response.then((res) => deserialize(res.data)).catch((err) => console.error(err));
};

// create
export const createThread = (t: Thread) => {
    const params: outputParams = serialize(t);
    return client.post("/questions", params);
};

// update
export const updateThread = (id: number, t: Thread) => {
    const params: outputParams = serialize(t);
    return client.put(`/questions/${id}`, params);
};

// delete
export const deleteThread = (id: number) => {
    return client.delete(`/questions/${id}`);
};
