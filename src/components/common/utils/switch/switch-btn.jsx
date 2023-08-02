import React, { useState } from 'react';
import './style.scss'; // Import the CSS file for styling

const SwitchButton = ({ value, onChange }) => {
  const [isOn, setIsOn] = useState(value)

  const handleToggle = () => {
    const newValue = !isOn
    
    setIsOn(newValue)
    onChange(newValue)
  };

  return (
    <div className={`switch-button ${isOn ? 'on' : 'off'}`} onClick={handleToggle}>
      <div className="slider">
        {isOn ? 'Agregar' : 'Restar'}
      </div>
    </div>
  );
};

export default SwitchButton