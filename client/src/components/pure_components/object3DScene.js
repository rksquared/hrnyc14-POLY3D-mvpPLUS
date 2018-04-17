import React from 'react';
import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
import MTLLoader from 'three-mtl-loader';


OBJLoader(THREE);
// MTLLoader(THREE);


class Object3DScene extends React.Component {
  constructor(props) {
    super(props)

    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.animate = this.animate.bind(this)
  }

  componentDidMount() {

    const {objLink, mtlLink} = this.props;

    
    
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    
    const camera = new THREE.PerspectiveCamera( 60, width / height, 0.01, 100 );
    camera.position.set(5, 3, 5);
    camera.lookAt(0, 1.5, 0);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);

    scene.add(new THREE.GridHelper(10, 10));

    var ambient = new THREE.HemisphereLight(0xbbbbff, 0x886666, 0.75);
    ambient.position.set(-0.5, 0.75, -1);
    scene.add(ambient);

    var light = new THREE.DirectionalLight(0xffffff, 0.75);
    light.position.set(1, 0.75, 0.5);
    scene.add(light);
    const renderer = new THREE.WebGLRenderer({ antialias: true })


    var loader = new MTLLoader();
    loader.setCrossOrigin(true);
    loader.setMaterialOptions({ ignoreZeroRGBs: true });
    // loader.setTexturePath(path);
    loader.load(mtlLink, function (materials) {

      var loader = new THREE.OBJLoader();
      loader.setMaterials(materials);
      loader.load(objLink, function (object) {

        var box = new THREE.Box3();
        box.setFromObject(object);

        // re-center

        var center = box.getCenter();
        center.y = box.min.y;
        object.position.sub(center);

        // scale

        var scaler = new THREE.Group();
        scaler.add(object);
        scaler.scale.setScalar(6 / box.getSize().length());
        scene.add(scaler);

      });
    })


    renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer


    this.mount.appendChild(this.renderer.domElement)
    this.start()
  }

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate)
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId)
  }

  animate() {

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }

  render() {
    return (
      <div>
        <div
          style={{ width: '400px', height: '400px' }}
          ref={(mount) => { this.mount = mount }}
        />
        <div className="column is-narrow" onClick={this.props.clickHandler}>
          <button className="button is-rounded is-medium is-link"><span className="icon is-large" style={{ paddingRight: `10px` }}><i className="fas fa-arrow-down"></i></span>Back to AssetView!</button>
        </div>
      </div>
    )
  }

}

export default Object3DScene;