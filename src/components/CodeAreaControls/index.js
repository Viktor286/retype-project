import React from 'react';
import { toggleTypingMode } from '../../model/redux/userSettings';
import { useDispatch } from 'react-redux';
import { fontSizeIncrease, fontSizeDecrease } from '../../model/redux/userSettings';
import './index.css';

export default function CodeAreaControls() {
  const dispatch = useDispatch();

  const onFontDecrease = () => {
    dispatch(fontSizeDecrease());
  };
  const onFontIncrease = () => {
    dispatch(fontSizeIncrease());
  };
  return (
    <div className="top-bar">
      {/* temporary make as a non-button to keep away from keyboard enter functionality */}
      <div
        className="toggle-typing-mode"
        onClick={(e) => {
          dispatch(toggleTypingMode());
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 64V448C362 448 448 362 448 256C448 149.1 362 64 256 64z" />
        </svg>
      </div>
      {/* temporary make font-controls here, not tabbable, as an experimental feature */}
      <div className="font-controls">
        <button className="font-decrease" onClick={onFontDecrease} tabIndex="-1">
          A-
        </button>
        <button className="font-increase" onClick={onFontIncrease} tabIndex="-1">
          A+
        </button>
      </div>
    </div>
  );
}
