import { Question } from "../../types/Question";

// input/output param types
type outputCreateParams = {
    title: string;
    body: string;
    userId: number;
    views: number;
    tagList: string;
};

type outputUpdateParams = {
    title: string;
    body: string;
    tagList: string;
};

// helper functions to serialize questions
export function serializeCreate(t: Question): outputCreateParams {
    const p: outputCreateParams = {
        title: t.title,
        body: t.body,
        userId: t.author.id,
        views: t.views,
        tagList: t.tags.join(","),
    };

    return p;
}

export function serializeUpdate(t: Question): outputUpdateParams {
    const p: outputUpdateParams = {
        title: t.title,
        body: t.body,
        tagList: t.tags.join(","),
    };

    return p;
}
