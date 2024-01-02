import { createContext } from "react";

type Props = {
    userID: number;
    setUserID: React.Dispatch<React.SetStateAction<number>>;
};

const init: Props = {
    userID: -1,
    setUserID: () => {},
};

const UserIdContext = createContext<Props>(init);

export default UserIdContext;
