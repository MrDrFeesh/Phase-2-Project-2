// src/DisplayInfo.js
import React, { useState } from 'react';
import './displayinfo.css';

function DisplayInfo({ perks }) {
  const [hoveredPerk, setHoveredPerk] = useState(null);

  const handleMouseEnter = (perk) => {
    setHoveredPerk(perk);
  };

  const handleMouseLeave = () => {
    setHoveredPerk(null);
  };

  return (
    <div className="perk-slots">
      {perks.map((perk, index) => (
        <div
          key={index}
          className="perk-slot"
          onMouseEnter={() => handleMouseEnter(perk)}
          onMouseLeave={handleMouseLeave}
        >
          <img src={perk.image} alt={perk.name} />
          {hoveredPerk === perk && (
            <div className="perk-name">{perk.name}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DisplayInfo;