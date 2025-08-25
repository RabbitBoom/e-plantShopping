import { useEffect, useState } from "react";

function Cinput(props) {
  const { value, max, onChange, ...attrs } = props;
  const [val, setVal] = useState(value);
  useEffect(() => {
    setVal(value);
  }, [value]);
  const inputChange = (e) => {
    const currVal = e.target.value;
    const relVal = max && max < currVal ? max : currVal;
    setVal(relVal);
    onChange(relVal);
  };
  return <input value={val} {...attrs} onChange={inputChange} />;
}

export default Cinput;
