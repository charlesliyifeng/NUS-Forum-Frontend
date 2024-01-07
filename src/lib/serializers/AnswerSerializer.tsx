import { Answer } from "../../types/Answer";

// output param types
type outputCreateParams = {
    body: string;
    userId: number;
    accepted: number;
    questionId: number;
};

type outputUpdateParams = {
    body: string;
    questionId: number;
};

// helper functions to serialize answers
export function serializeCreate(t: Answer): outputCreateParams {
    const p: outputCreateParams = {
        body: t.body,
        userId: t.author.id,
        accepted: t.accepted ? 1 : 0,
        questionId: t.questionID,
    };

    return p;
}

export function serializeUpdate(t: Answer): outputUpdateParams {
    const p: outputUpdateParams = {
        body: t.body,
        questionId: t.questionID,
    };

    return p;
}
