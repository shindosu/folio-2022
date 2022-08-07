import './stylesheets/application.scss';
import './modules/prototypeMethods';
import Canvas from './Canvas';
import Panels from './components/panels/Panels';
import LoadingBar from './components/LoadingBar';
import NotReady from './components/NotReady';

const App = () => (['iPhone', 'Android', 'iPad'].some(term => window.navigator.userAgent.indexOf(term) >= 0) ? <NotReady /> : (
  <>
    <LoadingBar />
    <Panels />
    <Canvas />
  </>
));

export default App;
