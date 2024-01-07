import { User, newUser } from "./User";

export type Answer = {
    answerID: number;
    questionID: number;
    body: string;
    author: User;
    createdAt: string;
    updatedAt: string;
    votes: number;
    userVote: number;
    accepted: boolean;
};

export function newAnswer(author = -1, questionID = -1, body = ""): Answer {
    const ans: Answer = {
        answerID: -1,
        questionID: questionID,
        body: body,
        author: newUser(author),
        createdAt: "",
        updatedAt: "",
        votes: 0,
        userVote: 0,
        accepted: false,
    };
    return ans;
}
