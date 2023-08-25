import fetch from "node-fetch";

export async function fetchNFTMetadata(ipfsHash) {
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
      return error
    }
  }