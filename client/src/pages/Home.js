// import { Token } from '@thirdweb-dev/sdk';
import React from 'react';
// import DisplayCards from '../components/DisplayCards';
// import { cards } from '../constants';
import '../styles/homestyle.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();


    return (
        <div className='main-content'>
            {/* <h1>Governance Kit </h1>
            <p>by Equistart DAO Suite</p> */}
            <div className='sub-content'>
                <h1 className='home-heading'>Hello HODLers !!</h1>
                <h2 className='home-subheading'>Welcome to the IDEA MINT</h2>
                <div>
                    <button className='home-button' onClick={() => { navigate('/create') }}>Create your DAO</button>
                    <button className='home-button' onClick={() => { navigate('/explorer') }}>Join a DAO</button>
                </div>
            </div>
            <div className='sub-content home-content'>
                <p>Transform your ground breaking ideas into tangible digital assets through the power of NFTs or Non Fungible Tokens. </p>

                <div style={{width: '100%'}}>
                <p>1. Connect your Wallet</p>
                <p>2. Upload Your Idea</p>
                <p>3. Customize Attributes</p>
                <p>4. Mint Your NFT</p>
                <p>5. Confirm and Pay</p>
                <p>6. Explore and Share</p>
                </div>
                <p>IdeaMint simplifies the process by guiding you through the steps of minting your unique concepts into NFTs, ensuring their immutability and provenance on the blockchain. </p>


                <div style={{ width: '100%', marginTop: '40px' }} onClick={()=>{navigate('/learn')}}>
                    <button >Learn More</button>
                </div>

            </div>

            {/* <DisplayCards

                title="DApp Features"
                cards={cards}
            /> */}

        </div>
    );
};


