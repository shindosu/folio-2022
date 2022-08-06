import * as THREE from 'three';
import * as dat from 'lil-gui';
import colorCode from '../modules/colorCode';

class Debugger {
  constructor() {
    this.gui = new dat.GUI();
  }

  camera(cameraPosition) {
    const cameraFolder = this.gui.addFolder('Camera');

    cameraFolder.add(cameraPosition, 'x', -100, 100, 0.1);
    cameraFolder.add(cameraPosition, 'y', -100, 100, 0.1);
    cameraFolder.add(cameraPosition, 'z', -100, 100, 0.1);
    cameraFolder.open();
  }

  orbitControls(controls) {
    const controlsFolder = this.gui.addFolder('Controls');
    controlsFolder.add(controls.target, 'x').min(-50).max(50).step(0.1);
    controlsFolder.add(controls.target, 'y').min(-50).max(50).step(0.1);
    controlsFolder.add(controls.target, 'z').min(-50).max(50).step(0.1);
    controlsFolder.add(controls, 'maxDistance').min(-50).max(50).step(0.1)
      .name('maxDistance');
    controlsFolder.add(controls, 'minDistance').min(-20).max(20).step(0.1)
      .name('minDistance');
    controlsFolder.add(controls, 'minAzimuthAngle').min(-20).max(20).step(0.1)
      .name('minAzimuthAngle');
    controlsFolder.add(controls, 'maxAzimuthAngle').min(-20).max(20).step(0.1)
      .name('maxAzimuthAngle');
    controlsFolder.add(controls, 'minPolarAngle').min(-20).max(20).step(0.1)
      .name('minPolarAngle');
    controlsFolder.add(controls, 'maxPolarAngle').min(-20).max(20).step(0.1)
      .name('maxPolarAngle');
  }

  ocean(waterUniforms, oceanPosition) {
    this.gui.addColor({ color: colorCode.cloudBurst }, 'color').name('water Color').onChange(color => {
      waterUniforms.waterColor.value = new THREE.Color(color);
    });
    this.gui.addColor({ color: colorCode.poloBlue }, 'color').name('reflection Color').onChange(color => {
      waterUniforms.sunColor.value = new THREE.Color(color);
    });

    const waterPositionFolder = this.gui.addFolder('waterDirectionFolder');
    waterPositionFolder.add(oceanPosition, 'x', -2, 2, 0.1);
    waterPositionFolder.add(oceanPosition, 'y', -2, 2, 0.1);
    waterPositionFolder.add(oceanPosition, 'z', -2, 2, 0.1);

    const sunDirectionFolder = this.gui.addFolder('sunDirection');
    sunDirectionFolder.add(waterUniforms.sunDirection.value, 'y', -10, 10, 1);
    sunDirectionFolder.add(waterUniforms.sunDirection.value, 'z', -10, 10, 1);
    sunDirectionFolder.add(waterUniforms.sunDirection.value, 'x', -10, 10, 1);

    sunDirectionFolder.open();
  }

  sky(sceneBackground) {
    const skyFolder = this.gui.addFolder('Sky');

    skyFolder.addColor({ color: colorCode.spindle }, 'color').name('sky Color').onChange(color => {
      sceneBackground.set(new THREE.Color(color));
    });

    skyFolder.open();
  }

  smoke(uniforms) {
    const smokeFolder = this.gui.addFolder('Smoke');
    smokeFolder.add(uniforms.uTimeFrequency, 'value', 0.001, 10, 0.0001);
    smokeFolder.add(uniforms.uUvFrequency.value, 'x', 0.001, 20, 0.001);
    smokeFolder.add(uniforms.uUvFrequency.value, 'y', 0.001, 20, 0.001);
  }
}

export default Debugger;
