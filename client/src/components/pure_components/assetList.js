import React from 'react';
import AssetListEntry from '../stateful_components/assetListEntry';

const AssetList = (props) => {

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline is-mobile">
          {props.objectList.map((asset, idx) => <AssetListEntry key={idx} asset={asset} />)}
        </div>
      </div>
    </section>
  )
};


export default AssetList;