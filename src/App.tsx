import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./pages/Header";
// import Tab from "./pages/Tab";
import MasterMaintenance from "./components/mastermaintenance";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/master_maintenance" element={<MasterMaintenance />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
