/* eslint-disable */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
// import Debugger from './Debugger';
import browser from '../modules/browser';
import * as staticMaterials from '../modules/staticMaterial';
import colorCode from '../modules/colorCode';
import Ocean from './Ocean';
import Camera from './Camera';
import gsapTo from '../modules/gsap';

class Scene {
  constructor(htmlElement, textures, modelPath) {
    this.htmlElement = htmlElement;
    this.textures = textures;
    this.modelPath = modelPath;
    this.scene = new THREE.Scene();
    this.camera = new Camera(45, browser.width / browser.height, 0.05, 900);
    this.controls = new OrbitControls(this.camera, this.htmlElement);
    this.renderer = new THREE.WebGLRenderer({ canvas: htmlElement, antialias: true });
    this.textureLoader = new THREE.TextureLoader();
    this.dracoLoader = new DRACOLoader();
    this.gltfLoader = new GLTFLoader();
    this.clock = new THREE.Clock();
    this.ocean = Ocean.water();
    this.boat = null;
    this.points = [
      {
        position: new THREE.Vector3(3.0, 0, -9.5),
        outerElement: document.getElementById('outer-point-about'),
        innerElement: document.getElementById('inner-point-about')
      },
      {
        position: new THREE.Vector3(-3.0, 0, -9.5),
        outerElement: document.getElementById('outer-point-philosophy'),
        innerElement: document.getElementById('inner-point-philosophy')
      },
      {
        position: new THREE.Vector3(3.0, 0, -15.5),
        outerElement: document.getElementById('outer-point-works'),
        innerElement: document.getElementById('inner-point-works')
      },
      {
        position: new THREE.Vector3(-1.0, 0, -15.5),
        outerElement: document.getElementById('outer-point-contact'),
        innerElement: document.getElementById('inner-point-contact')
      },
      {
        position: new THREE.Vector3(0, 0, -18.5),
        outerElement: document.getElementById('outer-point-credit'),
        innerElement: document.getElementById('inner-point-credit')
      }
    ];
    this.raycaster = new THREE.Raycaster();
  }

  start() {
    this.#configureRenderer();
    this.#configureLoader();
    this.#configureControls();

    this.#addModel();
    this.#moveCamera();
    // this.#moveCameraOnPointClick();
    this.#moveCameraOnPanelNavigationClick();
    // this.#addDebugger();

    this.scene.background = new THREE.Color(colorCode.spindle);
    this.scene.add(this.ocean);
    this.scene.add(this.camera);

    this.#tick();
    this.#resize();
  }

  // #addDebugger() {
  //   const debugConsole = new Debugger();

  //   debugConsole.orbitControls(this.controls);
  //   debugConsole.camera(this.camera.position);
  //   debugConsole.ocean(this.ocean.material.uniforms, this.ocean.position);
  //   debugConsole.sky(this.scene.background);
  // }

  // #moveCameraOnPointClick() {
  //   this.points.forEach(point => {
  //     point.innerElement.addEventListener('click', event => {
  //       switch (event.target.id) {
  //         case 'inner-point-about':
  //           gsapTo(this.controls.target, 12.1, 0.0, -14.0, this.controls, 'controls');
  //           gsapTo(this.camera.position, -1.7, -0.8, -6.5, this.controls, 'camera');

  //           break;
  //         case 'inner-point-philosophy':
  //           gsapTo(this.controls.target, -11.3, 0.8, -4.2, this.controls, 'controls');
  //           gsapTo(this.camera.position, 2.3, -0.9, -11.7, this.controls, 'camera');

  //           break;
  //         case 'inner-point-works':
  //           gsapTo(this.controls.target, 7.7, 0.3, -19.0, this.controls, 'controls');
  //           gsapTo(this.camera.position, -0.9, -0.7, -13.6, this.controls, 'camera');

  //           break;
  //         case 'inner-point-contact':
  //           gsapTo(this.controls.target, -7.0, -0.7, -17.0, this.controls, 'controls');
  //           gsapTo(this.camera.position, 2.3, -0.7, -12.8, this.controls, 'camera');

  //           break;
  //         case 'inner-point-credit':
  //           gsapTo(this.controls.target, -6.5, -2.8, -21.5, this.controls, 'controls');
  //           gsapTo(this.camera.position, 5.8, -0.4, -31.0, this.controls, 'camera');

  //           break;
  //         default:
  //           gsapTo(this.controls.target, -1.6, -0.4, 2.1, this.controls, 'controls');
  //           gsapTo(this.camera.position, -5.7, -0.5, 11.5, this.controls, 'camera');

  //           break;
  //       }
  //     });
  //   });
  // }

  #moveCamera() {
    document.querySelectorAll('.nav-link').forEach(navLink => {
      navLink.addEventListener('click', event => {
        switch (event.target.id) {
          case 'nav-about-link':
            gsapTo(this.controls.target, 12.1, 0.0, -14.0, this.controls, 'controls');
            gsapTo(this.camera.position, -1.7, -0.8, -6.5, this.controls, 'camera');

            break;
          case 'nav-philosophy-link':
            gsapTo(this.controls.target, -11.3, 0.8, -4.2, this.controls, 'controls');
            gsapTo(this.camera.position, 2.3, -0.9, -11.7, this.controls, 'camera');

            break;
          case 'nav-works-link':
            gsapTo(this.controls.target, 7.7, 0.3, -19.0, this.controls, 'controls');
            gsapTo(this.camera.position, -0.9, -0.7, -13.6, this.controls, 'camera');

            break;
          case 'nav-contact-link':
            gsapTo(this.controls.target, -7.0, -0.7, -17.0, this.controls, 'controls');
            gsapTo(this.camera.position, 2.3, -0.7, -12.8, this.controls, 'camera');

            break;
          case 'nav-credit-link':
            gsapTo(this.controls.target, -6.5, -2.8, -21.5, this.controls, 'controls');
            gsapTo(this.camera.position, 5.8, -0.4, -31.0, this.controls, 'camera');

            break;
          default:
            gsapTo(this.controls.target, -1.6, -0.4, 2.1, this.controls, 'controls');
            gsapTo(this.camera.position, -5.7, -0.5, 11.5, this.controls, 'camera');

            break;
        }
      });
    });
  }

  #moveCameraOnPanelNavigationClick() {
    document.querySelectorAll('.navigation-icon').forEach(navigationIcon => {
      navigationIcon.addEventListener('click', event => {

        switch (event.target.id) {
          case 'previous-about':
            gsapTo(this.controls.target, 12.1, 0.0, -14.0, this.controls, 'controls');
            gsapTo(this.camera.position, -1.7, -0.8, -6.5, this.controls, 'camera');

            break;
          case 'next-philosophy':
          case 'previous-philosophy':
            gsapTo(this.controls.target, -11.3, 0.8, -4.2, this.controls, 'controls');
            gsapTo(this.camera.position, 2.3, -0.9, -11.7, this.controls, 'camera');

            break;
          case 'next-works':
          case 'previous-works':
            gsapTo(this.controls.target, 7.7, 0.3, -19.0, this.controls, 'controls');
            gsapTo(this.camera.position, -0.9, -0.7, -13.6, this.controls, 'camera');

            break;
          case 'next-contact':
          case 'previous-contact':
            gsapTo(this.controls.target, -7.0, -0.7, -17.0, this.controls, 'controls');
            gsapTo(this.camera.position, 2.3, -0.7, -12.8, this.controls, 'camera');

            break;
          case 'next-credit':
            gsapTo(this.controls.target, -6.5, -2.8, -21.5, this.controls, 'controls');
            gsapTo(this.camera.position, 5.8, -0.4, -31.0, this.controls, 'camera');

            break;
          default:
            gsapTo(this.controls.target, -1.6, -0.4, 2.1, this.controls, 'controls');
            gsapTo(this.camera.position, -5.7, -0.5, 11.5, this.controls, 'camera');

            break;
        }
      });
    });
  }

  // #togglePointDisplay() {
  //   this.points.forEach(point => {
  //     const screenPosition = point.position.clone();
  //     const intersects = this.raycaster.intersectObjects(this.scene.children, true);

  //     screenPosition.project(this.camera);
  //     this.raycaster.setFromCamera(screenPosition, this.camera);

  //     if (point.outerElement) {
  //       if (intersects.length === 0) {
  //         point.outerElement.classList.add('show');
  //       } else {
  //         const intersectionDistance = intersects[0].distance;
  //         const pointDistance = point.position.distanceTo(this.camera.position);

  //         if (intersectionDistance < pointDistance) {
  //           point.outerElement.classList.remove('show');
  //         } else {
  //           point.outerElement.classList.add('show');
  //         }
  //       }
  //     }

  //     const translateX = screenPosition.x * window.innerWidth * 0.5;
  //     const translateY = -screenPosition.y * window.innerHeight * 0.5;
  //     point.outerElement.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
  //   });
  // }

  #addModel() {
    this.gltfLoader.load(
      this.modelPath,
      gltf => {
        const meshes = gltf.scene.children;

        if (this.textures.length === 0) {
          this.scene.add(gltf.scene);
        } else {
          this.textures.forEach(texture => {
            const mesh = meshes.find(child => texture.fileName === child.name);

            if (mesh) this.#applyTexture(mesh, texture.imageUrl);
          });

          this.boat = meshes.find(child => child.name === 'boat');
          this.boat.position.y = Math.sin(Math.PI);

          this.#applyTexture(
            this.boat,
            this.textures.find(texture => texture.fileName === 'land_bridge').imageUrl
          );
          staticMaterials.default.forEach(nonTextureMaterial => {
            const mesh = meshes.find(child => nonTextureMaterial.fileName === child.name);

            mesh.material = nonTextureMaterial.material;
          });
          this.boat.position.y = -1.5;

          this.scene.add(gltf.scene);
        }
      }
    );
  }

  #applyTexture(mesh, imageUrl) {
    const loadedTexture = this.textureLoader.load(imageUrl);

    loadedTexture.flipY = false;
    loadedTexture.encoding = THREE.sRGBEncoding;

    mesh.material = new THREE.MeshBasicMaterial({ map: loadedTexture });
  }

  #configureRenderer() {
    this.renderer.setSize(browser.width, browser.height);
    this.renderer.setPixelRatio(browser.pixelRatio);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
  }

  #configureLoader() {
    this.dracoLoader.setDecoderPath(process.env.REACT_APP_DRACO_PATH);
    this.gltfLoader.setDRACOLoader(this.dracoLoader);
  }

  #configureControls() {
    this.controls.enableDamping = true;
    this.controls.enableZoom = false;

    this.controls.maxDistance = 15.6;
    this.controls.minDistance = 4.8;
    this.controls.minAzimuthAngle = -40;
    this.controls.maxAzimuthAngle = 40;
    this.controls.minPolarAngle = -40;
    this.controls.maxPolarAngle = 40;
    this.controls.target.set(-1.6, -0.4, 2.1);
    this.camera.position.set(-5.7, -0.5, 11.5);

    this.controls.update();
  }

  #tick() {
    this.ocean.material.uniforms.time.value += 1.0 / 300.0;

    if (this.boat) this.boat.position.y = 0.05 * Math.sin(this.clock.getElapsedTime()) - 1.5;

    this.controls.update();
    // this.#togglePointDisplay();

    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(this.#tick.bind(this));
  }

  #resize() {
    window.addEventListener('resize', () => {
      const browserWidth = window.innerWidth;
      const browserHeight = window.innerHeight;

      this.camera.aspect = browserWidth / browserHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(browserWidth, browserHeight);
      this.renderer.setPixelRatio(browser.pixelRatio);
    });
  }
}

export default Scene;
