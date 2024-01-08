import QuestionCard from "../../components/question/QuestionCard";
import BasicSelect from "../../components/sub-components/BasicSelect";
import { Question } from "../../types/Question";
import { getQuestionCount, getQuestionList } from "../../lib/api/question";

import React, { useState, useEffect } from "react";
import { Link, useSearchParams, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

// props for QuestionList
type Props = {
    isHome: boolean;
};

const QuestionList: React.FC<Props> = ({ isHome }) => {
    /*
        Structure: 
        - Ask question and filter/order by
        - QuestionCards
        - page select
    */

    const ITEMS_PER_PAGE = 15;
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    const [questionsCount, setQuestionsCount] = useState(-1);
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        // fetch first page
        loadPage(currentPage);
        // fetch page count
        loadQuestionsCount();
    }, []);

    async function loadQuestionsCount() {
        try {
            const response = await getQuestionCount();
            setQuestionsCount(response.data.count);
        } catch (error) {
            console.error(error);
        }
    }

    function loadPage(page: number) {
        getQuestionList(page, ITEMS_PER_PAGE).then((data) => {
            if (data) {
                setQuestions(data);
            }
        });
    }

    function getPageCount(itemsCount: number, itemsPerPage: number): number {
        return Math.ceil(itemsCount / itemsPerPage);
    }

    if (questionsCount === -1) {
        return <div></div>;
    } else if (getPageCount(questionsCount, ITEMS_PER_PAGE) < currentPage) {
        return <Navigate replace to="/404" />;
    }

    return (
        <Box className="centerBox" sx={{ flexGrow: 1, p: 3 }} top={80}>
            <Toolbar>
                <Stack direction={"column"} spacing={1}>
                    <Typography variant="h4" position="static">
                        {isHome ? "Top Questions" : "All Questions"}
                    </Typography>
                    {!isHome ? <Typography variant="subtitle1">{questionsCount} questions</Typography> : null}
                </Stack>
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
            <Box alignContent={"center"}>
                <Pagination
                    count={getPageCount(questionsCount, ITEMS_PER_PAGE)}
                    page={currentPage}
                    size="large"
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            reloadDocument
                            to={`/question${item.page === 1 ? "" : `?page=${item.page}`}`}
                            {...item}
                        />
                    )}
                />
            </Box>
        </Box>
    );
};

export default QuestionList;
