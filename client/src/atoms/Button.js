import React from 'react'

const Button = ({ bgColor, text, onClick, index, state }) => {
  return (
    <button state id={index} onClick={onClick} style={{ background: bgColor, width: 'fit-content', padding: '5px 15px', borderRadius: '8px', 
            display: 'flex', justifyContent: 'center', alignItems: 'center', outline: 'none', border: 'none', cursor: 'pointer',
            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px', opacity: `${state==="disabled" ? "0.2": "1"}` }}>
        <p id={index} style={{ fontSize: '14px', fontWeight: '400', color: 'white' }}>{text}</p>
    </button>
  )
}

export default Button