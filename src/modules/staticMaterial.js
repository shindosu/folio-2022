import * as THREE from 'three';
import colorCode from './colorCode';

const whiteMaterial = new THREE.MeshBasicMaterial({ color: colorCode.white });
const dimLightMaterial = new THREE.MeshBasicMaterial({ color: colorCode.frenchGrey });

export default [
  {
    fileName: 'onibi_inner',
    material: new THREE.MeshBasicMaterial(
      { color: colorCode.morningGlory, transparent: true, opacity: 0.6 }
    )
  },
  {
    fileName: 'onibi_outer',
    material: new THREE.MeshBasicMaterial(
      { color: colorCode.panache, transparent: true, opacity: 0.6 }
    )
  },
  {
    fileName: 'ramen_stand_drizzle_face_mask',
    material: new THREE.MeshBasicMaterial(
      { color: colorCode.paynesGray, transparent: true, opacity: 0.6 }
    )
  },
  {
    fileName: 'ramen_stand_lights',
    material: new THREE.MeshBasicMaterial({ color: colorCode.celesta })
  },
  {
    fileName: 'building_lights',
    material: dimLightMaterial
  },
  {
    fileName: 'ground_lights',
    material: dimLightMaterial
  },
  {
    fileName: 'lantern_lights',
    material: dimLightMaterial
  },
  {
    fileName: 'tsuboyu_pole_lights',
    material: new THREE.MeshBasicMaterial({ color: colorCode.locust })
  },
  {
    fileName: 'angel_halo',
    material: whiteMaterial
  },
  {
    fileName: 'red_tabacco_light',
    material: new THREE.MeshBasicMaterial({ color: colorCode.cgRed })
  },
  {
    fileName: 'blue_tabacco_light',
    material: new THREE.MeshBasicMaterial({ color: colorCode.fadedBlue })
  },
  {
    fileName: 'drizzle_eyes',
    material: new THREE.MeshBasicMaterial({ color: colorCode.ultramarineBlue })
  },
  {
    fileName: 'gekko_eyes',
    material: whiteMaterial
  },
  {
    fileName: 'house_samidale_eyes',
    material: new THREE.MeshBasicMaterial({ color: colorCode.cgRed })
  },
  {
    fileName: 'house_samidale_2_eyes',
    material: new THREE.MeshBasicMaterial({ color: colorCode.mauve })
  },
  {
    fileName: 'kasa_eyes',
    material: new THREE.MeshBasicMaterial({ color: colorCode.lust })
  },
  {
    fileName: 'kurenai_inner_eyes',
    material: new THREE.MeshBasicMaterial({ color: colorCode.lusty })
  },
  {
    fileName: 'kurenai_outer_eyes',
    material: new THREE.MeshBasicMaterial({ color: colorCode.beautyBush })
  },
  {
    fileName: 'onsen_samidale_eyes',
    material: new THREE.MeshBasicMaterial({ color: colorCode.sail })
  },
  {
    fileName: 'shogun_eyes',
    material: new THREE.MeshBasicMaterial({ color: colorCode.twilight })
  }
];
