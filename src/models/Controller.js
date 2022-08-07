// import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsapTo from '../modules/gsap';

class Controller extends OrbitControls {
  constructor(camera, htmlElement) {
    super(camera, htmlElement);

    this.camera = camera;
  }

  static get positions() {
    return {
      home: { x: -1.6, y: -0.4, z: 2.1 },
      about: { x: 12.1, y: 0.0, z: -14.0 },
      philosophy: { x: -11.3, y: 0.8, z: -4.2 },
      works: { x: 7.7, y: 0.3, z: -19.0 },
      contact: { x: -7.0, y: -0.7, z: -17.0 },
      credits: { x: -6.5, y: -2.8, z: -21.5 }
    };
  }

  setDefaultPosition() {
    this.enableRotate = false;
    this.enablePan = false;
    this.enableDamping = false;
    this.screenSpacePanning = false;

    this.#setHomeConfig();
    this.target.set(...Object.values(this.constructor.positions.home));
    this.camera.position.set(...Object.values(this.camera.constructor.positions.home));

    // this.addEventListener('change', () => {
    //   const minPan = new THREE.Vector3(-1, 0, -15);
    //   const maxPan = new THREE.Vector3(1, 0, 0);
    //   this.target.clamp(minPan, maxPan);
    //   // _v.sub(controls.target);
    //   // camera.position.sub(_v);
    // });

    this.update();
  }

  moveCamera() {
    ['.nav-link', '.navigation-icon', '.icon-close'].forEach(className => {
      document.querySelectorAll(className).forEach(icon => {
        icon.addEventListener('click', () => {
          this.#setPosition(Array.from(icon.classList).last());
        });
      });
    });
  }

  #setPosition(name) {
    switch (name) {
      case 'about':
        this.#adjustConfig();

        gsapTo(this.target, ...Object.values(this.constructor.positions.about), this, 'controls');
        gsapTo(
          this.camera.position,
          ...Object.values(this.camera.constructor.positions.about),
          this,
          'camera'
        );

        break;
      case 'philosophy':
        this.#adjustConfig();

        gsapTo(
          this.target,
          ...Object.values(this.constructor.positions.philosophy),
          this,
          'controls'
        );
        gsapTo(
          this.camera.position,
          ...Object.values(this.camera.constructor.positions.philosophy),
          this,
          'camera'
        );

        break;
      case 'works':
        this.#adjustConfig();

        gsapTo(this.target, ...Object.values(this.constructor.positions.works), this, 'controls');
        gsapTo(
          this.camera.position,
          ...Object.values(this.camera.constructor.positions.works),
          this,
          'camera'
        );

        break;
      case 'contact':
        this.#adjustConfig();

        gsapTo(
          this.target,
          ...Object.values(this.constructor.positions.contact),
          this,
          'controls'
        );
        gsapTo(
          this.camera.position,
          ...Object.values(this.camera.constructor.positions.contact),
          this,
          'camera'
        );

        break;
      case 'credits':
        this.#adjustConfig();

        gsapTo(
          this.target,
          ...Object.values(this.constructor.positions.credits),
          this,
          'controls'
        );
        gsapTo(
          this.camera.position,
          ...Object.values(this.camera.constructor.positions.credits),
          this,
          'camera'
        );

        break;
      default:
        this.#setHomeConfig();

        gsapTo(this.target, ...Object.values(this.constructor.positions.home), this, 'controls');
        gsapTo(
          this.camera.position,
          ...Object.values(this.camera.constructor.positions.home),
          this,
          'camera',
          'home'
        );

        break;
    }
  }

  #adjustConfig() {
    this.maxDistance = 15.6;
    this.minDistance = 4.8;
    this.minAzimuthAngle = -40;
    this.maxAzimuthAngle = 40;
    this.minPolarAngle = -40;
    this.maxPolarAngle = 40;
  }

  #setHomeConfig() {
    this.maxDistance = 15.0;
    this.minDistance = 5.0;
    this.minAzimuthAngle = -40;
    this.maxAzimuthAngle = 40;
    this.minPolarAngle = -40;
    this.maxPolarAngle = 40;
  }
}

export default Controller;
