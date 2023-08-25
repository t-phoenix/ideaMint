import React, { useEffect, useState } from "react";
import { useNetwork } from 'wagmi'
import "../styles/layoutstyle.css";
import { useNavigate } from "react-router-dom";

export default function LearnScreen() {
    const navigate = useNavigate();
    return (
        <div className="main-content">
            <h1>Guide</h1>

            <div className="home-content">
                <h2>Transform your ground breaking ideas into tangible digital assets through the power of NFTs/ Non Fungible Tokens. </h2>

                <div style={{width: '100%'}}>
                <p>1. Connect your Wallet</p>
                <p>2. Upload Your Idea</p>
                <p>3. Customize Attributes</p>
                <p>4. Mint Your NFT</p>
                <p>5. Confirm and Pay</p>
                <p>6. Explore and Share</p>
                </div>
                <p>IdeaMint simplifies the process by guiding you through the steps of minting your unique ideas into NFTs, ensuring their immutability and provenance on the blockchain. </p>


                <div style={{ width: '100%', marginTop: '40px' }} onClick={()=>{navigate('/create')}}>
                    <button >MINT: IDEA NFT</button>
                </div>

            </div>

        </div>
    )
}