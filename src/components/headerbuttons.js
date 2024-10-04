// src/HeaderButtons.js
import React from 'react';

function HeaderButtons({ selectedRole, onRoleChange }) {
  return (
    <header className="App-header">
      <button
        className={`header-button ${selectedRole === 'killer' ? 'active' : ''}`}
        onClick={() => onRoleChange('killer')}
      >
        Killer
      </button>
      <button
        className={`header-button ${selectedRole === 'survivor' ? 'active' : ''}`}
        onClick={() => onRoleChange('survivor')}
      >
        Survivor
      </button>
    </header>
  );
}

export default HeaderButtons;