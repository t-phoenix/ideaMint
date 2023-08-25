import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useNetwork } from "wagmi";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home.js";
import CreateScreen from "./pages/CreateScreen";
import IdeaExplorer from "./pages/IdeaExplorer";
import CollectionScreen from "./pages/Collection";
import LearnScreen from "./pages/Learn";

function App() {
  const { chain } = useNetwork();
  console.log("chain:", chain);

  return (
    <div className="App">
      {/* <div className="sm:flex hidden mr-10 relative">
        
      </div> */}

      <Navbar />
      <div className="body">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explorer" element={<IdeaExplorer />} />
          <Route path="/create" element={<CreateScreen />} />
          <Route path="/collection" element={<CollectionScreen />} />
          <Route path="/guide" element={<LearnScreen />}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
