import Item from "./Item";
import React, { useRef } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Cancel } from "@mui/icons-material";

type TagProps = {
    data: string;
    handleDelete: (value: string) => void;
};

const Tag: React.FC<TagProps> = ({ data, handleDelete }) => {
    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                padding: "0.4rem",
                margin: "0 0.5rem 0 0",
                justifyContent: "center",
                alignContent: "center",
            }}
        >
            <Item sx={{ backgroundColor: "#ADDAE6" }}>
                <Stack direction="row" gap={1}>
                    <Typography fontSize={14}>{data}</Typography>
                    <Cancel fontSize="small" sx={{ cursor: "pointer" }} onClick={() => handleDelete(data)} />
                </Stack>
            </Item>
        </Box>
    );
};

type TagInputProps = {
    tags: string[];
    setTags: (tags: string[]) => void;
};

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
    const tagRef = useRef<HTMLInputElement>();

    // apply validation rules to new tags
    function validateTags(tag: string) {
        if (tag) {
            if (tags.length >= 5) {
                alert("enter no more than 5 tags");
                return false;
            } else if (tags.find((x) => x === tag)) {
                alert("no duplicate tags allowed");
                return false;
            }
            return true;
        }
        return false;
    }

    function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const inputElement = tagRef.current;
        if (inputElement && validateTags(inputElement.value)) {
            setTags([...tags, inputElement.value]);
            inputElement.value = "";
        }
    }

    function handleDelete(value: string) {
        const newtags = tags.filter((val) => val !== value);
        setTags(newtags);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={handleOnSubmit}>
                <TextField
                    fullWidth
                    id="tags"
                    autoComplete="off"
                    inputRef={tagRef}
                    size="medium"
                    sx={{ margin: "1rem 0" }}
                    margin="none"
                    placeholder={tags.length < 5 ? "Enter tags" : ""}
                    InputProps={{
                        startAdornment: (
                            <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
                                {tags.map((data: string, index: number) => {
                                    return <Tag data={data} handleDelete={handleDelete} key={index} />;
                                })}
                            </Box>
                        ),
                    }}
                />
            </form>
        </Box>
    );
};

export default TagInput;
