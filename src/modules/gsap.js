import gsap from 'gsap';

const gsapTo = (target, x, y, z, controls, targetType, section = null) => {
  if (targetType === 'controls') controls.enabled = false;

  gsap.to(
    target,
    {
      x,
      y,
      z,
      duration: 1.0,
      ease: 'circ.easeInOut',
      onUpdate: () => {
        if (targetType === 'camera') controls.update();
      },
      onComplete: () => {
        if (section === 'home') controls.enabled = true;
      }
    }
  );
};

export default gsapTo;
