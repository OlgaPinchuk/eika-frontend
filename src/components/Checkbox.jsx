//NPM Packages
import { useState } from "react";

export default function Checkbox(props) {
  const {
    name,
    disabled = false,
    initialIsChecked = false,
    className,
    onChanged,
  } = props;

  //State
  const [isChecked, setIsChecked] = useState(initialIsChecked);

  //Methods
  const onChange = ({ target: { checked } }) => {
    setIsChecked(checked);
    onChanged && onChanged(checked);
  };

  return (
    <input
      type="checkbox"
      name={name}
      disabled={disabled}
      checked={isChecked}
      className={`default ${className}`}
      onChange={onChange}
    />
  );
}
