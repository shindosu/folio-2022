import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
// import Debugger from './Debugger';
import browser from '../modules/browser';
import * as staticMaterials from '../modules/staticMaterial';
import colorCode from '../modules/colorCode';
import Ocean from './Ocean';
import Camera from './Camera';
import Controller from './Controller';
import smokeVertexShader from '../shaders/cigar_smoke/vertex.glsl';
import smokeFragmentShader from '../shaders/cigar_smoke/fragment.glsl';

class Scene {
  constructor(htmlElement, textures, modelPath) {
    this.htmlElement = htmlElement;
    this.textures = textures;
    this.modelPath = modelPath;
    this.scene = new THREE.Scene();
    this.camera = new Camera(45, browser.width / browser.height, 0.05, 900);
    this.controls = new Controller(this.camera, this.htmlElement);
    this.renderer = new THREE.WebGLRenderer({ canvas: htmlElement, antialias: true });
    this.textureLoader = new THREE.TextureLoader();
    this.dracoLoader = new DRACOLoader();
    this.gltfLoader = new GLTFLoader();
    this.clock = new THREE.Clock();
    this.ocean = Ocean.water();
    this.boat = null;
    this.smoke = null;
    // this.debugger = new Debugger();
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
    this.controls.setDefaultPosition();

    this.#addModel();
    this.controls.moveCamera();
    // this.#addDebugger();

    this.scene.background = new THREE.Color(colorCode.spindle);
    this.scene.add(this.ocean);
    this.scene.add(this.camera);

    this.#tick();
    this.#resize();
  }

  // #addDebugger() {
  //   this.debugger.orbitControls(this.controls);
  //   this.debugger.camera(this.camera.position);
  //   this.debugger.ocean(this.ocean.material.uniforms, this.ocean.position);
  //   this.debugger.sky(this.scene.background);
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

          const smokeMaterial = new THREE.ShaderMaterial({
            vertexShader: smokeVertexShader,
            fragmentShader: smokeFragmentShader,
            transparent: true,
            depthWrite: false,
            uniforms: {
              uTime: { value: 0 },
              uTimeFrequency: { value: 2.0 },
              uUvFrequency: { value: new THREE.Vector2(1.81, 5) },
              uColor: { value: new THREE.Color(colorCode.frenchGrey) }
            }
          });
          smokeMaterial.side = THREE.DoubleSide;

          this.smoke = meshes.find(child => child.name === 'fake_smoke');
          this.smoke.material = smokeMaterial;

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

  #tick() {
    const elapsedTime = this.clock.getElapsedTime();

    this.ocean.material.uniforms.time.value += 1.0 / 300.0;
    if (this.smoke) {
      this.smoke.material.uniforms.uTime.value = elapsedTime;
    }
    if (this.boat) this.boat.position.y = 0.05 * Math.sin(elapsedTime) - 1.5;
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
