import { User, UserDetails } from "../../types/User";

type userParams = {
    id: string;
    type: "user";
    attributes: {
        name: string;
    };
    // eslint-disable-next-line
    relationships: any;
};

interface userResponse {
    data: userParams;
}

export function deserializeUser(response: userResponse): User {
    const user: User = {
        id: +response.data.id,
        name: response.data.attributes.name,
    };

    return user;
}

type userDetailsParams = {
    id: string;
    type: "user";
    attributes: {
        name: string;
        email: string;
        createdAt: string;
        updatedAt: string;
    };
    // eslint-disable-next-line
    relationships: any;
};

interface userDetailsResponse {
    data: userDetailsParams;
}

export function deserializeUserDetails(response: userDetailsResponse): UserDetails {
    const user: UserDetails = {
        id: +response.data.id,
        name: response.data.attributes.name,
        email: response.data.attributes.email,
        password: "",
        createdAt: response.data.attributes.createdAt,
        updatedAt: response.data.attributes.updatedAt,
    };

    return user;
}
