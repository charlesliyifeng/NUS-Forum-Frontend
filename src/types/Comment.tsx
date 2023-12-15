type Comment = {
    commentID: string;
    threadID: string;
    body: string;
    author: string;
    timestamp: Date;
    votes: number;
};

export default Comment;
