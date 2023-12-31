export type Answer = {
    answerID: number;
    questionID: number;
    body: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    votes: number;
    accepted: boolean;
};

export const emptyAnswer: Answer = {
    answerID: -1,
    questionID: -1,
    body: "",
    author: "placeholder",
    createdAt: "",
    updatedAt: "",
    votes: 0,
    accepted: false,
};
