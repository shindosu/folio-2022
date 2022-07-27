import './stylesheets/application.scss';
import './modules/prototypeMethods';
import Canvas from './Canvas';
import Panels from './components/panels/Panels';

const App = () => (
  <>
    <Panels />
    <Canvas />
  </>
);

export default App;
