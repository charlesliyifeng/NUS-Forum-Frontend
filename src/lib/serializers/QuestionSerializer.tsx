import { Question } from "../../types/Question";

// input/output param types
type outputCreateParams = {
    title: string;
    body: string;
    userId: number;
    votes: number;
    views: number;
    tags: string;
};

type outputUpdateParams = {
    title: string;
    body: string;
    tags: string;
};

// helper functions to serialize questions
export function serializeCreate(t: Question): outputCreateParams {
    const p: outputCreateParams = {
        title: t.title,
        body: t.body,
        userId: t.author.id,
        votes: t.votes,
        views: t.views,
        tags: t.tags.join(","),
    };

    return p;
}

export function serializeUpdate(t: Question): outputUpdateParams {
    const p: outputUpdateParams = {
        title: t.title,
        body: t.body,
        tags: t.tags.join(","),
    };

    return p;
}
