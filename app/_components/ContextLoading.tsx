import React, { FC } from "react";
import Spinner from "./Spinner";
type props = {
  show: boolean;
};

const ContextLoading: FC<props> = (props) => {
  return (
    <div
      className={`w-[100vw] h-[100vh] fixed top-0 left-0 flex justify-center items-center z-50 transition-all duration-200 ease-in-out backdrop-blur-sm ${
        props.show ? " visible pointer-events-none " : " invisible "
      }`}
    >
      <Spinner />
    </div>
  );
};
export default ContextLoading;
