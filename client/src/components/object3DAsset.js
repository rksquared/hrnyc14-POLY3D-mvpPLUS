import React from 'react';

const object3DAsset = ({imgSRC, name, objLink, mtlLink, desc, creator, key}) => {
  // console.log(`img ${JSON.stringify(img SRC)}`)
  return (
    <div key={key}>
      <img src={imgSRC} style={{minWidth: `40px`}}/>
      <div>Name: {name} | Creator: {creator} | Description: {desc}</div>
      <a href={objLink} download><button>Download the OBJ file</button></a>
      <a href={mtlLink} download><button>Download the MTL file</button></a>
    </div>
  );
}

export default object3DAsset;