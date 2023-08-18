import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import logo from '../assets/logo.svg';
// import { ConnectWallet } from "@thirdweb-dev/react";
import { Web3Button } from "@web3modal/react";
import { useNetwork } from 'wagmi'


export default function Navbar(){

    const { chain } = useNetwork()
    console.log("")
    return(
        <div className='navbar'>
            
            <div className='title-container'>
                <p></p>
                <h1 className='title'>IDEA MINT</h1>
                <p className='icon-title'>by EquiLabs</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '30%', justifyContent: 'space-around' }}>
                {chain && <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><div style={{backgroundColor: '#9bfb97', width: '10px', height:'10px', borderRadius: '10px', marginRight: '10px'}}></div> {chain.name}</div>}
                <Web3Button />

            </div>
            
            {/* <ConnectButton/> */}
        </div>
    )
}