import './stylesheets/application.scss';
import Canvas from './Canvas';
import Panels from './components/panels/Panels';
import Navbar from './components/Navbar';

const App = () => (
  <>
    <Navbar />
    <Panels />
    <Canvas />
  </>

);

export default App;
