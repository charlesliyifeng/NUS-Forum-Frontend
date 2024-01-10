import BasicSelect from "../components/sub-components/BasicSelect";
import { Question } from "../types/Question";
import { getQuestionList } from "../lib/api/question";
import QuestionList from "../components/question/QuestionList";
import extractTags from "../lib/helper/extractTags";

import React, { useState, useEffect } from "react";
import { Link, useSearchParams, Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const SearchPage: React.FC = () => {
    /*
        Structure: 
        - Ask question and filter/order by
        - QuestionCards
        - page select
    */

    const ITEMS_PER_PAGE = 15;
    const BASE_URL = "/search";
    const navigate = useNavigate();
    // eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();
    // get params
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    const orderBy = searchParams.get("sort") || "Newest";
    const filterBy = searchParams.get("filter") || "None";
    const q = searchParams.get("q") || "";
    const [tags, query] = extractTags(q);
    const [questionsCount, setQuestionsCount] = useState(-1);
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        // fetch first page and count
        loadPage(currentPage);
    }, []);

    function loadPage(page: number) {
        getQuestionList(page, ITEMS_PER_PAGE, orderBy, filterBy, tags, query).then((data) => {
            if (data) {
                setQuestions(data.questions);
                setQuestionsCount(data.count);
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
                <Stack direction={"column"} spacing={1} width={"25%"}>
                    <Typography variant="h4" position="static">
                        Search Results
                    </Typography>
                    <Typography variant="subtitle1">{questionsCount} results</Typography>
                </Stack>
                <Stack direction={"row"} spacing={4} width={"50%"} justifyContent={"center"}>
                    <BasicSelect
                        placeholder={"Sort by"}
                        choices={["Newest", "Votes", "Answers", "Views"]}
                        defaultValue={orderBy}
                        onChange={(value) => {
                            navigate(BASE_URL + `?q=${q}&sort=${value}&filter=${filterBy}`);
                            navigate(0);
                        }}
                    />
                    <BasicSelect
                        placeholder={"Filter by"}
                        choices={["None", "Accepted", "Not Accepted", "No Answer"]}
                        defaultValue={filterBy}
                        onChange={(value) => {
                            navigate(BASE_URL + `?q=${q}&sort=${orderBy}&filter=${value}`);
                            navigate(0);
                        }}
                    />
                </Stack>
                <Box width={"25%"} justifyContent={"center"}>
                    <Button variant="contained" component={Link} to="/question/new">
                        Ask a Question
                    </Button>
                </Box>
            </Toolbar>
            <QuestionList
                questions={questions}
                pageCount={getPageCount(questionsCount, ITEMS_PER_PAGE)}
                currentPage={currentPage}
                url={BASE_URL + `?q=${q}&sort=${orderBy}&filter=${filterBy}`}
            />
        </Box>
    );
};

export default SearchPage;
