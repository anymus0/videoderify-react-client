import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./style/app.scss";

import HomePage from "./pages/HomePage";
import LibraryPage from "./pages/LibraryPage";
import UploadPage from "./pages/UploadPage";
import EpisodesPage from "./pages/EpisodesPage";

function App() {
  return (
    <div className="app">
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/library" element={<LibraryPage />}></Route>
          <Route path="/upload" element={<UploadPage />}></Route>
          <Route path="/episodes/:seriesId" element={<EpisodesPage />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
