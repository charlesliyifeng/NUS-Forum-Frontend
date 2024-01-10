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
    defaultValue: string;
    onChange: (value: string) => void;
};

const BasicSelect: React.FC<Props> = ({ placeholder, choices, defaultValue, onChange }) => {
    const [value, setValue] = React.useState(defaultValue);

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
        onChange(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
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
