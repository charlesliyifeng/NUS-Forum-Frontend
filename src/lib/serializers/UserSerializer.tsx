import { UserDetails } from "../../types/User";

type outputUpdateParams = {
    name: string;
};

// helper functions to serialize user details
export function serializeUpdate(t: UserDetails): outputUpdateParams {
    const p: outputUpdateParams = {
        name: t.name,
    };

    return p;
}
