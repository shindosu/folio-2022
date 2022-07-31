import { PerspectiveCamera } from 'three';

class Camera extends PerspectiveCamera {
  static get positions() {
    return {
      home: { x: -5.7, y: -0.5, z: 11.5 },
      about: { x: -1.7, y: -0.8, z: -6.5 },
      philosophy: { x: 2.3, y: -0.9, z: -11.7 },
      works: { x: -0.9, y: -0.7, z: -13.6 },
      contact: { x: 2.3, y: -0.7, z: -12.8 },
      credits: { x: 5.8, y: -0.4, z: -31.0 }
    };
  }
}

export default Camera;
