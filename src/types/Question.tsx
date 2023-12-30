export type Question = {
    id: number;
    title: string;
    body: string;
    author: string;
    createdAt: string;
    updatedAt: string;
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
    createdAt: "",
    updatedAt: "",
    votes: 0,
    answers: 0,
    accepted: false,
    views: 0,
    tags: [],
};
