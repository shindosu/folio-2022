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

    cameraFolder.open();
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
}

export default Debugger;
