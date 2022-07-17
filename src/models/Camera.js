import * as THREE from 'three';
import browser from '../modules/browser';

class Camera {
  static new() {
    const camera = new THREE.PerspectiveCamera(45, browser.width / browser.height, 0.05, 900);
    camera.position.set(-6.5, 0, 9.4);

    return camera;
  }
}

export default Camera;
