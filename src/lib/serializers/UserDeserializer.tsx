import { User } from "../../types/User";

type userParams = {
    id: string;
    type: "user";
    attributes: {
        name: string;
    };
    // eslint-disable-next-line
    relationships: any;
};

interface singleResponse {
    data: userParams;
}

export function deserializeUser(response: singleResponse): User {
    const user: User = {
        id: +response.data.id,
        name: response.data.attributes.name,
    };

    return user;
}
