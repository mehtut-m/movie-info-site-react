import Swiper from 'swiper';

import './App.scss';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import RouteConfig from './routes/RouteConfig';

function App() {
  return (
    <>
      <Header />
      <RouteConfig />
      <Footer />
    </>
  );
}

export default App;
