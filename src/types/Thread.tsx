type Thread = {
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

export default Thread;
