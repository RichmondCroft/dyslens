import { useEffect, useState } from "react";

type Props = {
  on: boolean,
  onStateChange?: (updatedState: boolean) => void
}
function Toggle(props: Props) {
  const [on, setOn] = useState(props.on);

  useEffect(() => { setOn(props.on) }, [props.on])

  function handleOnChange() {
    setOn(!on);
    if (props.onStateChange) {
      props.onStateChange(!on);
    }
  }

  return <input type='checkbox' checked={on} data-testid='toggle' onChange={handleOnChange} />
}

export default Toggle;