import React from "react";
import "./WrapperAuth.css";
function WrapperAuth({ children }) {
  return (
    <div className="entirebg">
      <div className="authCard">
        <div>{children}</div>
      </div>
    </div>
  );
}

export default WrapperAuth;
