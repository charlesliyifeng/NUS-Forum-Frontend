import QuestionCard from "./QuestionCard";
import { Question } from "../../types/Question";

import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

// props for QuestionList
type Props = {
    questions: Question[];
    pageCount: number;
    currentPage: number;
    url: string;
};

const QuestionList: React.FC<Props> = ({ questions, pageCount, currentPage, url }) => {
    if (questions.length === 0) {
        return (
            <Typography variant="h5" display={"flex"} justifyContent={"center"} p={20}>
                No questions found.
            </Typography>
        );
    }

    return (
        <Box paddingTop={5}>
            <Box>
                {questions.map((question: Question) => (
                    <QuestionCard question={question} key={question.id} />
                ))}
            </Box>
            <Box>
                <Pagination
                    count={pageCount}
                    page={currentPage}
                    size="large"
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            reloadDocument
                            to={url + (item.page === 1 ? "" : `&page=${item.page}`)}
                            {...item}
                        />
                    )}
                />
            </Box>
        </Box>
    );
};

export default QuestionList;
