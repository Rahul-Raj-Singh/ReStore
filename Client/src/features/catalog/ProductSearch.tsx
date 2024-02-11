import { TextField, debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { ChangeEvent, useState } from "react";
import { setProductParam } from "./catalogSlice";

export default function ProductSearch() {
    const {searchTerm} = useAppSelector(x => x.catalog.productParams);
    const dispatch = useAppDispatch();

    const [text, setText] = useState(searchTerm);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setText(event.target.value);
        debounce(() => {
            dispatch(setProductParam({searchTerm: event.target.value}))
        }, 1000)();
    }

    return (
        <TextField
        value={text}
        onChange={handleChange}
        variant="outlined"
        label="Search Products"
        fullWidth
        autoComplete="off"
        />
    );
}
