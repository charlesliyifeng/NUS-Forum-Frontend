export type Question = {
    id: number;
    title: string;
    body: string;
    author: string;
    created_at: string;
    updated_at: string;
    votes: number;
    answers: number;
    accepted: boolean;
    views: number;
    tags: string[];
};

export const emptyQuestion: Question = {
    id: -1,
    title: "",
    body: "",
    author: "",
    created_at: "",
    updated_at: "",
    votes: 0,
    answers: 0,
    accepted: false,
    views: 0,
    tags: [],
};
