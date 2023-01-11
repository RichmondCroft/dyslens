import { FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useState } from "react";

type Item = {
  displayValue?: string,
  value?: string
};

type Props = {
  items?: Item[],
  onChange: (selectedValue?: string) => void,
  noSelectionItem?: Item,
  defaultValue?: any,
  value: string,
  testId: string
};

export default function DropDown({ items, onChange, noSelectionItem, value, testId }: Props) {

  console.log('items', items)
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
    <FormControl fullWidth data-testid={`${testId}-form`}>
      <Select
        labelId={`${testId}-label`}
        id={testId}
        value={dropdownValue}
        onChange={handleOnSelectionChange}
        displayEmpty
      >
        {noSelectionItem && <MenuItem
          key='no-selection'
          value={noSelectionItem.value}
          data-testid='no-selection'
        >
          <em>{noSelectionItem.displayValue}</em>
        </MenuItem>}
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
