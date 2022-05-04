import { useState } from "react";

type Props = {
  on: boolean,
  onStateChange?: (updatedState: boolean) => void
}
function Toggle (props: Props){
  const [on, setOn] = useState(props.on);
  
  function handleOnClick(){
    setOn(!on);
    if(props.onStateChange){
      props.onStateChange(!on);
    }
  }
  
  return <div data-testid='toggle' onClick={handleOnClick}>{on}</div>
}

export default Toggle;