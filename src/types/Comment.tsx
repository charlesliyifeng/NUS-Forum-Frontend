type Comment = {
    commentID: string;
    threadID: string;
    body: string;
    author: string;
    timestamp: Date;
    votes: number;
    accepted: boolean;
};

export default Comment;
