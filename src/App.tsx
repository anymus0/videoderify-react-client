import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./style/app.scss";

import HomePage from "./pages/HomePage";
import LibraryPage from "./pages/LibraryPage";
import UploadPage from "./pages/UploadPage";

function App() {
  return (
    <div className="app">
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-1 px-sm-2 px-0 bg-dark">
            <Navbar />
          </div>
          <div className="col py-3">
              <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/library" element={<LibraryPage />}></Route>
                <Route path="/upload" element={<UploadPage />}></Route>
              </Routes>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
