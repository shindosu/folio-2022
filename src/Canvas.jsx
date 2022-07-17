import { useEffect, useRef } from 'react';
import client from './modules/contentful';
import Scene from './models/Scene';

const Canvas = () => {
  const canvas = useRef();

  useEffect(() => {
    client.getEntries({ content_type: 'texture' }).then(response => {
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
