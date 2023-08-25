import React, { useEffect, useState } from "react";
import { useAccount, useContractRead, useNetwork } from "wagmi";
import { readContract } from "@wagmi/core";
import "../styles/layoutstyle.css";
import { ideaMIntAddress, ideaMintABI } from "../constants/smartContract";
import Loader from "../components/Loader";

export default function CollectionScreen() {
  const account = useAccount();
  console.log("User Account:", account.address)

  const [nftData, setNftData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    fetchNFTs()
  },[])

  const userBalance = useContractRead({
    address: ideaMIntAddress,
    abi: ideaMintABI,
    functionName: "balanceOf",
    args: [account.address],
  });
  console.log("User have ", Number(userBalance.data), " idea NFTs");
  const userNFTBalance = Number(userBalance.data);


  async function fetchNFTs() {
    setIsLoading(true);
    let NFTdataList = [];
    for (let index = 0; index < Number(userNFTBalance); index++) {
      const tokenId = await readContract({
        address: ideaMIntAddress,
        abi: ideaMintABI,
        functionName: "tokenOfOwnerByIndex",
        args: [account.address, index],
      });


      const tokenURI = await readContract({
        address: ideaMIntAddress,
        abi: ideaMintABI,
        functionName: "tokenURI",
        args: [tokenId],
      });

      const metadata = await fetchNFTMetadata(tokenURI);
      console.log("METADATA for tokenID: ", Number(tokenId), " with URI:", tokenURI , " is ", metadata);

      if (tokenId && tokenURI && metadata) {
        NFTdataList.push({
            tokenID: Number(tokenId),
            tokenURI: tokenURI,
            owner: account.address,
            nftname: metadata.name,
            nftdescription: metadata.description,
            nftimageURL: metadata.image,
            nftattribute_AUTHOR: metadata.attributes[0].value,
            nftattribute_PROBLEM: metadata.attributes[1].value,
            nftattribute_SOLUTION: metadata.attributes[2].value,
            nftattribute_ACHIEVABILITY: metadata.attributes[3].value,
          });
      }
    }

    setNftData(NFTdataList)
    setIsLoading(false);
  }

  
  async function fetchNFTMetadata(ipfsHash) {
    const shortIPFS = ipfsHash.replace("ipfs://", "");
    // console.log('MetadataHash:',shortIPFS);
    try {
      const response = await fetch(
        `https://gateway.pinata.cloud/ipfs/${shortIPFS}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  return (
    <div className="main-content">
      <h1>Your NFT Collection</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
        }}
      >
        <p>Your idea💡 NFTs minted: {userNFTBalance}</p>

        <button
          className="home-button"
          style={{ margin: "2px" }}
          onClick={fetchNFTs}
        >
           ⤵
        </button>
      </div>

      {isLoading ? <Loader /> : <div><p></p></div>}


      {nftData.length === 0 ? (
        <div>
          <h2>Connect Wallet</h2>
          <h3>Supported testnets: xdc-testnet, polygon-mumbai</h3>
          <p>Refresh if still does not fetch NFT List</p>
        </div>
      ) : (
        <div className="card-layout">
          {nftData.map((nft) => (
            // <div key={}>{JSON.stringify(token)}</div>
            <div
              key={nft.tokenID}
              className="nft-card"
              style={{ wordWrap: "break-word" }}
            >
              <p className="marginAdjustor">{nft.nftname}</p>
              <div style={{ width: "100%", height: '50%', justifyContent: 'center', alignItems: 'center', marginBlock: '1%' }}>
                <img src={nft.nftimageURL} alt={nft.nftname} width={"100%"} style={{ borderRadius: '10px'}}/>
              </div>
              <h3 className="marginAdjustor">Token ID: {nft.tokenID}</h3>
              <h4 className="marginAdjustor">Author: {nft.nftattribute_AUTHOR}</h4>
              <p className="marginAdjustor">Problem: {nft.nftattribute_PROBLEM}</p>
              <p className="marginAdjustor">Solution: {nft.nftattribute_SOLUTION}</p>
              <p style={{ width: "90%" }} className="marginAdjustor">Token Owner: {nft.owner}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
