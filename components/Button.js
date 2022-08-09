import React from 'react';

export default function Button({ disabled = false, onClick, type, children }) {
  return (
    <div className='fbLoginBtnContainer'>
      <button disabled={disabled} type={type} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
