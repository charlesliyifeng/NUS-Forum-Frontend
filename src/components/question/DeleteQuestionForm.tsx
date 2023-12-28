//import Question from "../../types/Question";
import { deleteQuestion } from "../../lib/api/question";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const DeleteQuestionForm: React.FC = () => {
    function getQuestionID(): number {
        const { id } = useParams();
        if (id) {
            return +id;
        } else {
            return -1;
        }
    }

    // function to handle deletion of question
    const handleDelete = async (id: number) => {
        try {
            // Delete the question from API
            await deleteQuestion(id);
        } catch (error) {
            console.error(error);
        }
    };

    const navigate = useNavigate();
    const questionID: number = getQuestionID();

    function handleSubmit() {
        // update backend
        handleDelete(questionID);
        // back to questions
        navigate("/question");
    }

    return (
        <Box
            className="centerBox"
            sx={{ flexGrow: 1, p: 3, "& .MuiTextField-root": { m: 1, width: "100ch" } }}
            top={80}
        >
            <Typography variant="h4" padding={2}>
                Delete Question
            </Typography>

            <Typography display="block" padding={1}>
                Are you sure you want to delete this Question? <br />
                Warning: This process is not reversible!
            </Typography>

            <Box display={"flex"} flexDirection={"row"} padding={1}>
                <Box paddingRight={2}>
                    <Button variant="contained" onClick={handleSubmit} color="warning">
                        Delete
                    </Button>
                </Box>
                <Box>
                    <Button variant="outlined" component={Link} to=".." relative="path">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default DeleteQuestionForm;
