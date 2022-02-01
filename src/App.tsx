import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./style/app.scss";

import HomePage from "./pages/HomePage";
import LibraryPage from "./pages/LibraryPage";
import UploadPage from "./pages/UploadPage";
import EpisodesPage from './pages/EpisodesPage';


function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col py-3">
          
              <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/library" element={<LibraryPage />}></Route>
                <Route path="/upload" element={<UploadPage />}></Route>
                <Route path="/episodes/:seriesId" element={<EpisodesPage />}></Route>
              </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
