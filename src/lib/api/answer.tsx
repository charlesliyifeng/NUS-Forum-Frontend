import client from "./client";
import { Answer } from "../../types/Answer";
import loadHeader from "../helper/loadHeader";
import { serializeCreate, serializeUpdate } from "../serializers/AnswerSerializer";
import { deserializeAnswer, deserializeAnswerList } from "../serializers/AnswerDeserializer";

// get
export const getAnswerList = () => {
    const response = client.get("/answers?include=user&fields[user]=name");
    return response.then((res) => deserializeAnswerList(res.data)).catch((err) => console.error(err));
};

// detail
export const getAnswerDetail = (id: number) => {
    const response = client.get(`/answers/${id}?include=user&fields[user]=name`);
    return response.then((res) => deserializeAnswer(res.data)).catch((err) => console.error(err));
};

// get_answers
export const getAnswersOfQuestion = (questionID: number) => {
    // get all answers related to the question
    const response = client.get(`/questions/${questionID}/get_answers?include=user&fields[user]=name`);
    return response.then((res) => deserializeAnswerList(res.data)).catch((err) => console.error(err));
};

// create  (need token authentication)
export const createAnswer = (a: Answer) => {
    const header = loadHeader();
    const params = serializeCreate(a);
    return client.post("/answers", params, { headers: header });
};

// update  (need token authentication)
export const updateAnswer = (id: number, a: Answer) => {
    const header = loadHeader();
    const params = serializeUpdate(a);
    return client.put(`/answers/${id}`, params, { headers: header });
};

// toggle_accept  (need token authentication)
export const toggleAccept = (id: number) => {
    const header = loadHeader();
    console.log(header);
    // toggle the accept status of answer
    return client.put(`/answers/${id}/accept`, {}, { headers: header });
};

// delete  (need token authentication)
export const deleteAnswer = (id: number) => {
    const header = loadHeader();
    return client.delete(`/answers/${id}`, { headers: header });
};
