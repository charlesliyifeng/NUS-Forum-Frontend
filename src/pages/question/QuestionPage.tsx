import BasicSelect from "../../components/sub-components/BasicSelect";
import { Question } from "../../types/Question";
import { getQuestionCount, getQuestionList } from "../../lib/api/question";
import QuestionList from "../../components/question/QuestionList";

import React, { useState, useEffect } from "react";
import { Link, useSearchParams, Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// props for QuestionList
type Props = {
    isHome: boolean;
};

const QuestionPage: React.FC<Props> = ({ isHome }) => {
    /*
        Structure: 
        - Ask question and filter/order by
        - QuestionCards
        - page select
    */

    const ITEMS_PER_PAGE = 15;
    const BASE_URL = "/question";
    const navigate = useNavigate();
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();
    // get params
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    const orderBy = searchParams.get("sort") || "Newest";
    const filterBy = searchParams.get("filter") || "None";
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
            const response = await getQuestionCount(filterBy);
            setQuestionsCount(response.data.count);
        } catch (error) {
            console.error(error);
        }
    }

    function loadPage(page: number) {
        getQuestionList(page, ITEMS_PER_PAGE, orderBy, filterBy).then((data) => {
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
    } else if (getPageCount(questionsCount, ITEMS_PER_PAGE) < currentPage && questionsCount) {
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
                <BasicSelect
                    placeholder={"Sort by"}
                    choices={["Newest", "Votes", "Answers", "Views"]}
                    defaultValue={orderBy}
                    onChange={(value) => {
                        navigate(BASE_URL + `?sort=${value}&filter=${filterBy}`);
                        navigate(0);
                    }}
                />
                <BasicSelect
                    placeholder={"Filter by"}
                    choices={["None", "Accepted", "Not Accepted", "No Answer"]}
                    defaultValue={filterBy}
                    onChange={(value) => {
                        navigate(BASE_URL + `?sort=${orderBy}&filter=${value}`);
                        navigate(0);
                    }}
                />
                <Box paddingLeft={40}>
                    <Button variant="contained" component={Link} to="/question/new">
                        Ask a Question
                    </Button>
                </Box>
            </Toolbar>
            <QuestionList
                questions={questions}
                pageCount={getPageCount(questionsCount, ITEMS_PER_PAGE)}
                currentPage={currentPage}
                url={BASE_URL + `?sort=${orderBy}&filter=${filterBy}`}
            />
        </Box>
    );
};

export default QuestionPage;
