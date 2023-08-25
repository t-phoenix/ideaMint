// import { Token } from '@thirdweb-dev/sdk';
import React, { useEffect, useState } from 'react';
// import DisplayCards from '../components/DisplayCards';
// import { cards } from '../constants';
import '../styles/homestyle.css';
import { useNavigate } from 'react-router-dom';
import { useContractRead } from 'wagmi';
import { readContract } from '@wagmi/core'
import { ideaMIntAddress, ideaMintABI } from '../constants/smartContract';

export default function Home() {
    const navigate = useNavigate();
    const [tokenSupply, setTokenSupply] = useState(0);
    
    useEffect(()=>{
        fetchtokenSupply()
    },[])
    
    async function fetchtokenSupply(){
        const supply = await readContract({
            address: ideaMIntAddress,
            abi: ideaMintABI,
            functionName: 'totalSupply',
          })
          console.log("Idea Mint Contract have: ", Number(supply), " tokens");
        setTokenSupply(Number(supply))
    }


    return (
        <div className='main-content'>
            {/* <h1>Governance Kit </h1>
            <p>by Equistart DAO Suite</p> */}
            <div className='sub-content'>
                <h1 className='home-heading'>Hello BUIDLers !!</h1>
                <h2 className='home-subheading'>Welcome to the IDEA MINT</h2>
                
                <h3>Total IDEA's Minted: {tokenSupply}</h3>
                {/* <button className='home-button' onClick={fetchtokenSupply}>↩</button> */}

                <div>
                    <button className='home-button' onClick={() => { navigate('/guide') }}>Learn More</button>
                    <button className='home-button' onClick={() => { navigate('/explorer') }}>Explore NFTs</button>
                </div>
            </div>
            {/* <DisplayCards

                title="DApp Features"
                cards={cards}
            /> */}

        </div>
    );
};


