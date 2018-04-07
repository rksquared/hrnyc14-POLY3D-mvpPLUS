import React from 'react';

const FetchButton = ({value, clickHandler}) => 
  (
      <li>
        <a id={value} onClick={clickHandler}>{value}</a>
      </li>
  );
  // <button>dummy</button>


export default FetchButton;