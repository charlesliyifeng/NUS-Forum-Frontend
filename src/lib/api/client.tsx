import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

const options = {
    ignoreHeaders: true,
};

const client = applyCaseMiddleware(
    axios.create({
        baseURL: "https://polar-island-74482-b8f5f81d2313.herokuapp.com/api/v1",
    }),
    options,
);

export default client;
