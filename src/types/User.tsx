export type User = {
    id: number;
    name: string;
};

export function newUser(userID = -1, name = ""): User {
    const newUser: User = {
        id: userID,
        name: name,
    };

    return newUser;
}
