import { Comment } from "./Comment";
import { User, newUser } from "./User";

export type Question = {
    id: number;
    title: string;
    body: string;
    author: User;
    createdAt: string;
    updatedAt: string;
    votes: number;
    userVote: number;
    answersCount: number;
    accepted: boolean;
    views: number;
    tags: string[];
    comments: Comment[];
};

export function newQuestion(author = -1, title = "", body = "", tags: string[] = []): Question {
    const question: Question = {
        id: -1,
        title: title,
        body: body,
        author: newUser(author),
        createdAt: "",
        updatedAt: "",
        votes: 0,
        userVote: 0,
        answersCount: 0,
        accepted: false,
        views: 0,
        tags: tags,
        comments: [],
    };

    return question;
}
