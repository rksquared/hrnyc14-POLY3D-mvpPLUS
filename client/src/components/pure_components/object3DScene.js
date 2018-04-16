import React from 'react';
import * as THREE from 'three';

class Object3DScene extends React.Component {
  constructor(props) {
    super(props);

    this.sceneConstructor = this.sceneConstructor.bind(this);
  }



  sceneConstructor() {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, .1, 1000);

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);


    document.body.appendChild(renderer.domElement);

    let geometry = new THREE.BoxGeometry(.5, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 'blue' });
    let cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    let animate = function () {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.05;
      cube.rotation.y += 0.1;

      renderer.render(scene, camera);
    };

    animate();
  }

  render() {
    return (
      <div onClick={this.props.clickHandler}>
        <div >
          {this.sceneConstructor()}
        </div>
      </div>
    );
  }
}


export default Object3DScene;