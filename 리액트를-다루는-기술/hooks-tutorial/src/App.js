import React, { useState } from "react";
import Counter from "./Counter";
import Info from "./Info";
import Average from "./Average";

const App = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Counter />
      <br /> <hr />
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? "Close" : "Open"}
      </button>
      {visible && <Info />}
      <br /> <hr />
      <Average />
    </div>
  );
};

export default App;
