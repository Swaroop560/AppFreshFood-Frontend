import React, { useState } from 'react'

const SwitchComponent = ({ checked, onChange }) => {

    const [isChecked, setIsChecked] = useState(checked);
    const handleToggle = () => {
        const newState = !isChecked;
        setIsChecked(newState);
        onChange(newState);
    };
  return (
      <div className="form-check form-switch">
         {/* <label className="form-check-label" for="flexSwitchCheckChecked">Checked switch checkbox input</label> */}
          <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"  checked={isChecked} onChange={handleToggle} />
          <label className="form-check-label" for="flexSwitchCheckChecked">Orders Accepted</label>
      </div>
    // <label className="switch">
    //   <input type="checkbox" checked={isChecked} onChange={handleToggle} />
    //   <span className="slider round"></span>
    // </label>
  )
}

export default SwitchComponent