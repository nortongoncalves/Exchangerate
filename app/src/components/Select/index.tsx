import React, {SelectHTMLAttributes, memo} from "react";
import './styles.css';

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  color?: string;
  borderColor?: string;
}

const Select: React.FC<IProps> = ({ color, borderColor, children, ...rest }) => {
  return (
    <select style={{color, borderColor: borderColor}} {...rest} >
      {children}
    </select>
  );
};

export default memo(Select);
