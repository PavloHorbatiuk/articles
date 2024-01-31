import React, { memo } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@mui/material";

interface IProps {
    sort: (value: string) => void;
}
const sortData: Array<string> = ["Title", "Newest"];

export const SortPanel = memo(function SortPanel({ sort }: IProps) {
    const [value, setValue] = React.useState<string>("");

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
    };

    const onSort = () => {
        sort(value);
    };

    return (
        <Box sx={{ maxWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Articles</InputLabel>
                <Select
                    labelId='Sort by'
                    value={value}
                    label='Sort by'
                    onChange={handleChange}
                >
                    {sortData.map((name, index) => (
                        <MenuItem key={index} value={name}>
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={onSort}>Sort by</Button>
        </Box>
    );
});
