import { UserDetails } from "../../types/User";

type outputParams = {
    name: string;
    email: string;
    password: string;
};

// helper functions to serialize user details
export function serializeUser(t: UserDetails): outputParams {
    const p: outputParams = {
        name: t.name,
        email: t.email,
        password: t.password,
    };

    return p;
}
