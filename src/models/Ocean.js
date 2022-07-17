import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water';
import colorCode from '../modules/colorCode';

class Ocean {
  static water() {
    const water = new Water(
      new THREE.PlaneGeometry(10000, 10000),
      {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load('waternormals.jpeg', texture => {
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
        }),
        sunDirection: new THREE.Vector3(0, 10, 10),
        sunColor: colorCode.poloBlue,
        waterColor: colorCode.cloudBurst,
        distortionScale: 1.7
      }
    );

    water.position.y = -1.8;
    water.rotation.x = -Math.PI / 2;

    return water;
  }
}

export default Ocean;
