import { useEffect, useRef } from 'react';
import Scene from './models/Scene';
import getEntries from './modules/contentful';

const Canvas = () => {
  const canvas = useRef();

  useEffect(() => {
    getEntries('texture').then(response => {
      new Scene(
        canvas.current,
        response.items.map(item => ({
          fileName: item.fields.fileName,
          imageUrl: item.fields.image.fields.file.url
        })),
        'scene.glb'
      ).start();
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <canvas ref={canvas} />
  );
};

export default Canvas;
