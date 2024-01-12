import { Answer } from "../../types/Answer";
import { toggleAccept } from "../../lib/api/answer";
import UserContext from "../../contexts/UserContext";

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// props for EditBar
// display each button conditionally
type Props = {
    subjectType: "question" | "answer" | "user";
    id: number;
    answer?: Answer;
    allowEdit?: boolean;
    allowDelete?: boolean;
    allowComment?: boolean;
    allowAccept?: boolean;
};

const EditBar: React.FC<Props> = (props) => {
    // eslint-disable-next-line
    const { user, setUser } = useContext(UserContext);
    const path: string = `../../${props.subjectType}/${props.id}`;
    const navigate = useNavigate();

    async function handleAccept() {
        try {
            // toggle accept status from API
            await toggleAccept(props.id, !props.answer!.accepted);
            // reload page
            navigate(0);
        } catch (error) {
            console.error(error);
        }
    }

    function handleComment() {
        // if not signed in
        if (user.id === -1) {
            alert("please sign in first");
            return;
        }

        navigate(`${path}/comment`);
    }

    return (
        <Box paddingTop={1}>
            <Stack direction="row">
                {props.allowEdit ? (
                    <Button variant="text" component={Link} to={`${path}/edit`} relative="path">
                        Edit
                    </Button>
                ) : null}
                {props.allowDelete ? (
                    <Button variant="text" component={Link} to={`${path}/delete`} relative="path">
                        Delete
                    </Button>
                ) : null}
                {props.allowAccept ? (
                    <Button variant="text" onClick={handleAccept}>
                        {props.answer!.accepted ? "Unaccept" : "Accept"}
                    </Button>
                ) : null}
                {props.allowComment ? (
                    <Button variant="text" onClick={handleComment}>
                        Comment
                    </Button>
                ) : null}
            </Stack>
        </Box>
    );
};

EditBar.defaultProps = {
    allowEdit: false,
    allowDelete: false,
    allowComment: false,
    allowAccept: false,
};

export default EditBar;
