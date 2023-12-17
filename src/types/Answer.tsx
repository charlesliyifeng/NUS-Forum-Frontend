type Answer = {
    answerID: string;
    threadID: string;
    body: string;
    author: string;
    timestamp: Date;
    votes: number;
    accepted: boolean;
};

export default Answer;
