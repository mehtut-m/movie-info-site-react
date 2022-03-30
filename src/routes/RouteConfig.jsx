import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Detail from '../pages/detail/Detail';
import Catalog from '../pages/Catalog';

function RouteConfig() {
  return (
    <Routes>
      <Route path="/:category/search/:keyword" element={<Catalog />} />
      <Route path="/:category/:id" element={<Detail />} />
      <Route path="/:category/" element={<Catalog />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default RouteConfig;
