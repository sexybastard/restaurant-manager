import React from 'react'
import './App.css';

const BlockButton = ({ onClick, label, style, children }) => {
  return (
    <div 
      className="block-button"
      style={style}
      onClick={onClick}>
      { children ? children : <label>{label}</label> }
    </div>
  )
}

export default BlockButton;