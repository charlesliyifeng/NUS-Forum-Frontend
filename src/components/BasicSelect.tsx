import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import { SelectChangeEvent } from "@mui/material/Select";

// from @mui/material/Select
type SelectChangeEvent<Value = string> =
    | (Event & { target: { value: Value; name: string } })
    | React.ChangeEvent<HTMLInputElement>;

type Props = {
    placeholder: string;
    choices: string[];
};

const BasicSelect: React.FC<Props> = ({ placeholder, choices }) => {
    const [value, setValue] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
    };

    return (
        <Box position={"relative"} left={200} sx={{ minWidth: 120, padding: 2 }}>
            <FormControl fullWidth>
                <InputLabel id="simple-select-label">{placeholder}</InputLabel>
                <Select id="simple-select" value={value} label={placeholder} onChange={handleChange}>
                    {choices.map((choice: string) => (
                        <MenuItem key={choice} value={choice}>
                            {choice}
                        </MenuItem>
                    ))}
                    ;
                </Select>
            </FormControl>
        </Box>
    );
};

export default BasicSelect;
