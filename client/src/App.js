import React, { useEffect, useState } from "react";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useNetwork } from 'wagmi'
import Navbar from './components/Navbar';
import Sidebar from "./components/Sidebar";
import Home from './pages/Home.js';
import CreateScreen from './pages/CreateScreen';
import IdeaExplorer from "./pages/IdeaExplorer";
import CollectionScreen from "./pages/Collection";
import LearnScreen from "./pages/Learn";
// import TokenScreen from './pages/Token.js';

// import TxnScreen from './pages/TxnScreen';
// import DAOexplorer from './pages/DAOexplorer';
// import DAODetails from './pages/DAODetails';
// import CreateProposal from './pages/CreateProposal';
// import ProposalDetails from './pages/ProposalDetails';
// import DAOSettings from './pages/DAOSettings';
// import UseCases from './pages/UseCases';

// import {unconnect_Addr,polygonExplorer, optimismExplorer, thetaExplorer, Factory1_Addr, Factory2_Addr, Factory1_optimism, Factory2_optimism, Factory1_theta_testnet, Factory2_theta_testnet, Factory1_theta_mainnet, Factory2_theta_mainnet, thetamainnetexplorer } from "../src/constants/ContractAddress";



function App() {
  const { chain } = useNetwork();
  console.log("chain:", chain)



  return (
    <div className="App">
      {/* <Web3Button /> */}
      {/* <ConnectButton/> */}

      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>


      <div className="content">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explorer" element={<IdeaExplorer />} />
          <Route path="/create" element={<CreateScreen />} />
          <Route path="/collection" element={<CollectionScreen />} />
          <Route path="/learn" element={<LearnScreen />}/>
          
          
        </Routes>
      </div>

    </div>
  );
}

export default App;
