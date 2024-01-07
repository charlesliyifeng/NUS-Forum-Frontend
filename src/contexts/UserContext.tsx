import { User, newUser } from "../types/User";
import { createContext } from "react";

type Props = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
};

const init: Props = {
    user: newUser(),
    setUser: () => {},
};

const UserContext = createContext<Props>(init);

export default UserContext;
