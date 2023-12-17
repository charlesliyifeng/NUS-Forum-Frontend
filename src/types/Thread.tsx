type Thread = {
    id: string;
    title: string;
    body: string;
    author: string;
    timestamp: Date;
    votes: number;
    answers: number;
    accepted: boolean;
    views: number;
};

export default Thread;
