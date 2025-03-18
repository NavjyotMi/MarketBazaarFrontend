import React from "react";
import signup from "../../assets/signup.png";

function WrapperAuth({ children }) {
  return (
    <div className="">
      <div className="flex flex-row justify-between ">
        <div className="py-20 px-30">
          <div>{children}</div>
        </div>
        <img src={signup} alt="" />
      </div>
    </div>
  );
}

export default WrapperAuth;
