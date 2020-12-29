import React, {SelectHTMLAttributes, useCallback, useState, memo} from "react";
import './styles.css';

const Select: React.FC<SelectHTMLAttributes<HTMLSelectElement>> = ({ children, ...rest }) => {
  const [color, setColor] = useState('#6d6d6d');

  const handleChange = useCallback(() => {
    setColor('#3f51b5');
  }, []);

  return (
    <select style={{color, borderColor: color}} {...rest} onChange={handleChange}>
      {children}
    </select>
  );
};

export default memo(Select);
