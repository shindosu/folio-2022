import gsap from 'gsap';

const gsapTo = (target, x, y, z, controls, targetType) => {
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
        if (targetType === 'camera') controls.enabled = true;
      }
    }
  );
};

export default gsapTo;
