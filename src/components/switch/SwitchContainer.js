import React , { useState }from 'react'
import SwitchComponent from './SwitchComponent';

const SwitchContainer = ({handleOrdersSwitch}) => {
    const [isEnabled, setIsEnabled] = useState(false);

    const handleSwitchChange = (checked) => {
        setIsEnabled(checked);
        handleOrdersSwitch(checked)
      };
  return (
    <SwitchComponent checked={isEnabled} onChange={handleSwitchChange}/>
  )
}

export default SwitchContainer