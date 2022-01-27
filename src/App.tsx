import React from "react";
import "./style/app.scss";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="app">
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-1 px-sm-2 px-0 bg-dark">
            <Navbar />
          </div>
          <div className="col py-3">Content area... outlet comes here</div>
        </div>
      </div>
    </div>
  );
}

export default App;
