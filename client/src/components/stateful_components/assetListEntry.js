import React, { Component } from 'react';
import Object3DAsset from '../pure_components/object3DAsset';
import Object3DScene from '../pure_components/object3DScene';

export default class AssetListEntry extends Component {
  constructor(props) {
    super(props);
    this.state= {
      toggleScene: false 
    };

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.setState({
      toggleScene: !this.state.toggleScene
    });
  }


  render() {
    let asset = this.props.asset;
    
    if (this.state.toggleScene) {
      return (
        <div>
          <Object3DScene 
            clickHandler={this.clickHandler}
            className="column is-half"
            objLink={asset.format[0].root.url}
            mtlLink={asset.format[0].resources[0].url}
          />
        </div>
      );
    } else {
      return (
        <Object3DAsset 
          className="column is-half"
          clickHandler={this.clickHandler}
          imgSRC={asset.thumbnail.url}
          name={asset.displayName}
          objLink={asset.format[0].root.url}
          mtlLink={asset.format[0].resources[0].url}
          key={asset._id}
          desc={asset.description}
          creator={asset.creator}
        />
      );
    }
  }
}
