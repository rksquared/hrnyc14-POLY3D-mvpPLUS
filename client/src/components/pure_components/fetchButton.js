import React from 'react';

const FetchButton = ({value, clickHandler, currentFilter}) => 
  (
      <li className={currentFilter === value ? 'is-active': ''}>
        <a id={value} onClick={clickHandler}>{value}</a>
      </li>
  );
  // <button>dummy</button>


export default FetchButton;