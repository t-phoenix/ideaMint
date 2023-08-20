import React, { useState } from "react";
// import { Link, useNavigate } from 'react-router-dom';
// import logo from '../assets/logo.svg';
// import { ConnectWallet } from "@thirdweb-dev/react";
import { Web3Button } from "@web3modal/react";
import { useNetwork } from "wagmi";
import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const { chain } = useNetwork();
  const navigate = useNavigate()

  console.log("");
  return (
    <div className="navbar">
      <div className="title-container" onClick={()=>navigate('/')}>
        <h2 className="title">IDEA MINT</h2>
        <p className="icon-title">by EquiLabs</p>
      </div>
      <div className="web3buttonContainer">
        <Web3Button />
        {chain && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              
            }}
          >
            <div className="online"></div>
            <p style={{fontSize: '12px', padding: 0, margin: 0}}>{chain.name}</p>
          </div>
        )}
      </div>

      {/* <ConnectButton/> */}
    </div>
  );
}
