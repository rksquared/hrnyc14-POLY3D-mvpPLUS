import React from 'react';

const object3DAsset = ({imgSRC, name, objLink, mtlLink, desc, creator, clickHandler}) => {
  // console.log(`img ${JSON.stringify(img SRC)}`)
  return (
    <div className="column is-half" >
      <div className="card" style={{ borderRadius: `4px` }}>
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={imgSRC} style={{ minWidth: `40px`, borderRadius: `4px` }} />
          </figure>
        </div>
        <div className="card-content">

          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img src={require('../../assets/avatar.png')} alt="My logo" style={{ minWidth: `40px` }} />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4" style={{ lineHeight: `48px` }}>{creator}</p>
            </div>

        </div>
          

          <div className="container content">
            <span style={{ fontWeight: `800` }}>Description: </span>{desc ? desc : 'No description provided.'}
            {/* <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> */}
            <div className="columns" style={{paddingTop: `8px`}}>
              <div className="column is-narrow">
                <a href={objLink} download><button className="button is-rounded is-small is-link"><span className="icon is-large" style={{paddingRight: `10px`}}><i className="fas fa-arrow-down" ></i></span>Download the OBJ file</button></a>
              </div>
              <div className="column is-narrow">
                <a href={mtlLink} download><button className="button is-rounded is-small is-link"><span className="icon is-large" style={{paddingRight: `10px`}}><i className="fas fa-arrow-down"></i></span>Download the MTL file</button></a>
              </div>
            </div>
            <div className="column is-narrow" onClick={clickHandler}>
              <button className="button is-rounded is-small is-link"><span className="icon is-large" style={{ paddingRight: `10px` }}><i className="fas fa-arrow-down"></i></span>View in 3D!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default object3DAsset;