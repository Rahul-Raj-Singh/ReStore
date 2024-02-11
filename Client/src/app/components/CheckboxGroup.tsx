import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";

type Props = {
    items: string[];
    checked: string[];
    onChange: (items: string[]) => void
}

export default function CheckboxGroup({items, checked, onChange}: Props) {
    const [checkedItems, setCheckedItems] = useState(checked);

    function handleCheckboxClick(value: string) {
        const isUncheck = checkedItems.includes(value);
        let newCheckedItems: string[];

        if (isUncheck)
            newCheckedItems = checkedItems.filter(x => x != value);
        else
            newCheckedItems = [...checkedItems, value]

        console.log("Test", value, newCheckedItems)

        setCheckedItems(newCheckedItems);
        onChange(newCheckedItems);
    }

    return (
        <FormGroup>
            {items.map(x => <FormControlLabel key={x} control={
            <Checkbox onClick={() => handleCheckboxClick(x)} checked={checkedItems.includes(x)}/>} label={x} />)}
        </FormGroup>
    )
}
