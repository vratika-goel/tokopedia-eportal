import React from "react";

import './spinner.scss';

const Spinner = () => {

  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export const MemoizedSpinner = React.memo(Spinner);
