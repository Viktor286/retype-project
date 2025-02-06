import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeCharBubbleReported, setCharBubbleReported } from '../../model/redux/events';

const AnimatedBubble = ({ message, duration = 5000 }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    dispatch(setCharBubbleReported(message));

    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    setTimeout(() => {
      dispatch(removeCharBubbleReported(message));
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    visible && (
      <div className="char-bubble">
        {message}
        <span> / sec!</span>
      </div>
    )
  );
};

export default AnimatedBubble;
