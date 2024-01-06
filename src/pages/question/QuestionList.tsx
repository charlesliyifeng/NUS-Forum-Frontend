import QuestionCard from "../../components/question/QuestionCard";
import BasicSelect from "../../components/sub-components/BasicSelect";
import { Question } from "../../types/Question";
import { getQuestionList } from "../../lib/api/question";
import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

// props for QuestionList
type Props = {
    isHome: boolean;
};

const QuestionList: React.FC<Props> = ({ isHome }) => {
    /*
        Structure: 
        - Ask question and filter/order by
        - QuestionCards
    */

    const [questions, setQuestions] = useState<Question[]>([]);

    // Fetch the list of questions from the API when the component mounts
    useEffect(() => {
        getQuestionList().then((data) => {
            if (data) {
                setQuestions(data);
            }
        });
    }, []);

    return (
        <Box className="centerBox" sx={{ flexGrow: 1, p: 3 }} top={80}>
            <Toolbar>
                <Typography variant="h4" position="static">
                    {isHome ? "Top Questions" : "All Questions"}
                </Typography>
                <BasicSelect placeholder={"Sort by"} choices={["votes", "answers", "views"]} />
                <BasicSelect placeholder={"Filter by"} choices={["Accepted", "Not Accepted", "No Answer"]} />
                <Box position={"relative"} left={300}>
                    <Button variant="contained" component={Link} to="/question/new">
                        Ask a Question
                    </Button>
                </Box>
            </Toolbar>
            <Box>
                {questions.map((question: Question) => (
                    <QuestionCard question={question} key={question.id} />
                ))}
            </Box>
        </Box>
    );
};

export default QuestionList;
