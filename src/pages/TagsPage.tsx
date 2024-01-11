import Tag from "../types/Tag";
import { getTagList } from "../lib/api/tag";
import { deserializeTagList } from "../lib/serializers/TagDeserializer";
import Item from "../components/sub-components/Item";

import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, TextField, Stack } from "@mui/material";

// Props for TagItem
type Props = {
    tag: Tag;
};
const TagItem: React.FC<Props> = ({ tag }) => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Box width={220}>
                    <Box display={"flex"}>
                        <Item sx={{ backgroundColor: "#777", color: "#fff" }}>{tag.name}</Item>
                    </Box>
                    <Typography variant="subtitle1">{tag.count} questions</Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

const TagsPage: React.FC = () => {
    const [tags, setTags] = useState<Tag[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        // get tags list from API
        loadTagList();
    }, []);

    async function loadTagList(q = "") {
        try {
            const response = await getTagList(q);
            setTags(deserializeTagList(response.data));
        } catch (error) {
            console.error(error);
        }
    }

    function partitionList(list: Tag[], partitionSize: number): Tag[][] {
        const partitions: Tag[][] = [];
        for (let i = 0; i < list.length; i += partitionSize) {
            const chunk = list.slice(i, i + partitionSize);
            partitions.push(chunk);
        }
        return partitions;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
        loadTagList(e.target.value);
    }

    const rows = partitionList(tags, 4);

    return (
        <Box className="centerBox" sx={{ flexGrow: 1, p: 3, "& .MuiTextField-root": { m: 1, width: "30ch" } }} top={80}>
            <Typography variant="h4" padding={2}>
                Tags
            </Typography>
            <Typography variant="body1" paddingLeft={2}>
                You can search for existing tags here.
            </Typography>
            <TextField onChange={handleChange} value={query} placeholder="Filter by tag name" autoComplete="off" />
            <Stack direction={"column"} spacing={1} padding={2}>
                {rows.map((row: Tag[], index) => (
                    <Stack direction={"row"} spacing={1} key={index}>
                        {row.map((tag: Tag) => (
                            <TagItem tag={tag} key={tag.name} />
                        ))}
                    </Stack>
                ))}
            </Stack>
        </Box>
    );
};

export default TagsPage;
