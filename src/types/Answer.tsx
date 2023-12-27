type Answer = {
    answerID: string;
    questionID: string;
    body: string;
    author: string;
    timestamp: Date;
    votes: number;
    accepted: boolean;
};

export default Answer;
