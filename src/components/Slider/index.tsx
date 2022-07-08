import { useState } from "react";

type Props = {
  value: number,
  onChange: (value: number) => void
}

function Slider({ value, onChange }: Props) {

  const [stateValue, setStateValue] = useState(value);
  
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = parseInt(e.target.value) || 0;
    setStateValue(newValue)
    onChange(newValue);
  }

  return <div>
    <input type="number" data-testid="slider-input" value={stateValue} onChange={handleOnChange} />
  </div>
}

export default Slider;