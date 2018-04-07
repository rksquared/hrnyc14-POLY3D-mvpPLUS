import React from 'react';

const FetchButton = ({value, clickHandler}) => 
 ( <button value={value} onClick={clickHandler}>{value}</button>)
  // <button>dummy</button>


export default FetchButton;