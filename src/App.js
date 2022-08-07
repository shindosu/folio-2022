import './stylesheets/application.scss';
import './modules/prototypeMethods';
import Canvas from './Canvas';
import Panels from './components/panels/Panels';
import LoadingBar from './components/LoadingBar';

const App = () => (
  <>
    <LoadingBar />
    <Panels />
    <Canvas />
  </>
);

export default App;
