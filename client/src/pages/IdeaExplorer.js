import React, { useEffect, useState } from "react";
import { useNetwork, useContractRead, useContractReads } from "wagmi";
import { readContract, readContracts } from "@wagmi/core";
import "../styles/layoutstyle.css";
import { ideaMIntAddress, ideaMintABI } from "../constants/smartContract";
import fetch from "node-fetch";

export default function IdeaExplorer() {

    const [nftData, setNftData] = useState([]);

  const tokenSupply = useContractRead({
    address: ideaMIntAddress,
    abi: ideaMintABI,
    functionName: "totalSupply",
  });
  console.log("Token Suply:", Number(tokenSupply.data));

  async function fetchNFTs() {
    const NFTdataList = [];
    for (let index = 0; index < Number(tokenSupply.data); index++) {
      const data = await readContracts({
        contracts: [
          {
            address: ideaMIntAddress,
            abi: ideaMintABI,
            functionName: "tokenURI",
            args: [index + 1],
          },
          {
            address: ideaMIntAddress,
            abi: ideaMintABI,
            functionName: "ownerOf",
            args: [index + 1],
          },
        ],
      });

    //   console.log("NFT Data loop;", data);

      const metadata = await fetchNFTMetadata(data[0])
      console.log("Metadata again:", metadata)
      {metadata && NFTdataList.push({
        tokenID: [index+1],
        tokenURI: data[0],
        owner: data[1],
        nftname: metadata.name,
        nftdescription: metadata.description,
        nftimageURL: metadata.imageURL,
        nftattribute_AUTHOR: metadata.attributes[0].value,
        nftattribute_PROBLEM: metadata.attributes[1].value,
        nftattribute_SOLUTION: metadata.attributes[2].value,
        nftattribute_ACHIEVABILITY: metadata.attributes[3].value,
      })}
    }

    console.log("LIST OF NFTS:", NFTdataList)
    setNftData(NFTdataList);
  }


  async function fetchNFTMetadata(ipfsHash){
    
    const shortIPFS = ipfsHash.replace('ipfs://', '')
    // console.log('MetadataHash:',shortIPFS);
    try {
        const response = await fetch(`https://gateway.pinata.cloud/ipfs/${shortIPFS}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('Fetched data:', data);
        return data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  }

  return (
    <div className="main-content">
      <h1>Total idea💡 NFTs minted: {Number(tokenSupply.data)}</h1>

      <button className="home-button" onClick={fetchNFTs}>
        🔃
      </button>
    
      {nftData.length === 0 ? <div>
                <h2>Connect Wallet</h2>
                <h3>Supported testnets: xdc-testnet, polygon-mumbai</h3>
                <p>Refresh if still does not fetch NFT List</p>
            </div> :               
                <div className="card-layout">
                    {nftData.map((nft) => (
                        // <div key={}>{JSON.stringify(token)}</div>
                        <div key={nft.tokenID} className="nft-card" style={{wordWrap: 'break-word'}} >
                            <p>{nft.nftname}</p>
                            <img 
                                src={nft.nftimageURL}
                                alt={nft.nftname}
                                width={"90%"}
                            />
                            <h3>Token ID: {nft.tokenID}</h3>
                            <h4>Author: {nft.nftattribute_AUTHOR}</h4>
                            <p>Problem: {nft.nftattribute_PROBLEM}</p>
                            <p>Solution: {nft.nftattribute_SOLUTION}</p>
                            <p style={{width: '90%', }}>Token Owner: {nft.owner}</p>

                        </div>
                    ))}


                </div>
            }

    </div>
  );
}
