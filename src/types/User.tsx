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

export type UserDetails = {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
};

export function newUserDetails(userID = -1, name = ""): UserDetails {
    const newUser: UserDetails = {
        id: userID,
        name: name,
        email: "",
        password: "",
        createdAt: "",
        updatedAt: "",
    };

    return newUser;
}
