import { useState, ChangeEvent } from "react";

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
  const [font, setFont] = useState(value);

  function handleTextChange(e: ChangeEvent<HTMLSelectElement>) {
    setFont(e.target.value);
    if (e.target.value === noSelectionItem?.value) {
      onChange()
    }
    else {
      onChange(e.target.value);
    }
  }

  return (
    <select
      value={font}
      onChange={handleTextChange}
      data-testid="drop-down"
    >
      {noSelectionItem &&
        <option
          key={noSelectionItem.value}
          value={noSelectionItem.value}
          data-testid={noSelectionItem.value}
        >
          {noSelectionItem.displayValue}
        </option>
      }
      {items.map((item) => (
        <option
          key={item.value}
          value={item.value}
          data-testid={item.value}
        >
          {item.displayValue}
        </option>
      ))}
    </select>
  );
}
