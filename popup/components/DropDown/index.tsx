import { FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

type Item = {
  displayValue: string,
  value: string
};

type Props = {
  items: Item[],
  onChange: (selectedValue?: string) => void,
  noSelectionItem?: Item,
  value?: string
};

export default function DropDown({ items, onChange, noSelectionItem, value }: Props) {
  const [dropdownValue, setDropdownValue] = useState(value);

  function handleOnSelectionChange(e: SelectChangeEvent<string>) {
    setDropdownValue(e.target.value);
    if (e.target.value === noSelectionItem?.value) {
      onChange();
    }
    else {
      onChange(e.target.value);
    }
  }

  return (
    <FormControl fullWidth>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={dropdownValue}
        onChange={handleOnSelectionChange}
      >
        {items.map((item) => (
          <MenuItem
            key={item.value}
            value={item.value}
            data-testid={item.value}
          >
            {item.displayValue}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
