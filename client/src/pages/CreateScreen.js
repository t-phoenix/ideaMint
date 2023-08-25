import React, { useEffect, useState } from "react";
import img00 from '../assets/images/00.png'
import img01 from '../assets/images/01.png'
import img02 from '../assets/images/02.png'
import img03 from '../assets/images/03.png'
import img04 from '../assets/images/04.png'
import img05 from '../assets/images/05.png'
import img06 from '../assets/images/06.png'
import img07 from '../assets/images/07.png'
import img08 from '../assets/images/08.png'
import img09 from '../assets/images/09.png'
import img10 from '../assets/images/10.png'
import img11 from '../assets/images/11.png'
import img12 from '../assets/images/12.png'
import img13 from '../assets/images/13.png'
import img14 from '../assets/images/14.png'
import img15 from '../assets/images/15.png'
import img16 from '../assets/images/16.png'
import img17 from '../assets/images/16.png'
import img18 from '../assets/images/16.png'
import {useContractWrite,useNetwork,usePrepareContractWrite,useProvider,useAccount,} from "wagmi";
import {prepareWriteContract,writeContract,prepareSendTransaction,sendTransaction,} from "@wagmi/core";
import "../styles/layoutstyle.css";
import FormField from "../components/FormField";
import fetch from "node-fetch";
import FormData from "form-data";
import { ideaMIntAddress, ideaMintABI } from "../constants/smartContract";
import { ethers, getDefaultProvider } from "ethers";
import Loader from "../components/Loader";
// Use the JWT key for IPFS
const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmYmViNGI0OC0xM2E4LTRiNDQtYmNjYS03NGMxM2U5MDRhYWYiLCJlbWFpbCI6ImFiaGlqYWlwdXIyMDExQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJhMjYzMjI0ZjU2YTQzMjUzOTFlZCIsInNjb3BlZEtleVNlY3JldCI6ImRlZDk5MTUxZTNmMmE1M2FjNjMzNjdhOWQyMDY3NTVmNGU5OGQ4MmJjMmViM2IxNWVlNjM3ZjY1MTQyNjEzZTUiLCJpYXQiOjE2OTI1NTI0NDR9.DHVzx4RJOEuhdIxu1ggudKkGFigcP0_fHGmmk4CAaRM";
const images = [img00, img01, img02, img03, img04, img05, img06, img07, img08, img09, img10, img11, img12, img13, img14, img15, img16, img17, img18]


export default function CreateScreen() {
  var fr = new FileReader();
  const account = useAccount();
  console.log("FILE READER ----->", fr);
  const [isLoading, setIsLoading] = useState(false);

  const [ideaForm, setIdeaForm] = useState({
    image: null,
    title: "",
    description:
      "Idea Mint NFT: Transforming your groundbreaking ideas into tangible digital assets through the power of NFTs ",
    author: "",
    problem: "",
    solution: "",
    achievability: "",
    date: "",
    time: "",
  });

  const [resultData, setResultData] = useState({
    imageIpfsHash: "",
    metadataIpfsHash: "",
    mintTransaction: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setIdeaForm({ ...ideaForm, [fieldName]: e.target.value });
  };

  async function uploadImg() {
    setIsLoading(true);
    console.log("File:", ideaForm.image, " Uploading ...."   );
    const formData = new FormData();
    formData.append("file", ideaForm.image);

    const metadata = JSON.stringify({
      name: `${ideaForm.title}`,
    });
    formData.append("pinataMetadata", metadata);

    const options = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", options);
    try {
      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      console.log("File uploaded, CID:", resData);
      setResultData({ ...resultData, ["imageIpfsHash"]: resData.IpfsHash });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function uploadMetadata() {
    setIsLoading(true);
    const data = JSON.stringify({
      pinataContent: {
        name: `${ideaForm.title}`,
        description: `${ideaForm.description}`,
        image: `https://gateway.pinata.cloud/ipfs/${resultData.imageIpfsHash}`,
        attributes: [
          {
            trait_type: "author",
            value: `${ideaForm.author}`,
          },
          {
            trait_type: "problem",
            value: `${ideaForm.problem}`,
          },
          {
            trait_type: "solution",
            value: `${ideaForm.solution}`,
          },
          {
            trait_type: "achievability",
            value: `${ideaForm.achievability}`,
          },
        ],
      },
      pinataMetadata: {
        name: `${ideaForm.title}-metadata.json`,
      },
    });
    try {
      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
          },
          body: data,
        }
      );
      const resData = await res.json();
      console.log("JSON uploaded, CID:", resData);
      setResultData({ ...resultData, ["metadataIpfsHash"]: resData.IpfsHash });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  async function mintNFT() {
    setIsLoading(true);
    console.log(
      "Minting NFT with MEtadata Hash:",
      resultData.metadataIpfsHash,
      ideaMIntAddress
    );

    const config = await prepareWriteContract({
      address: ideaMIntAddress,
      abi: ideaMintABI,
      functionName: "safeMint",
      args: [`ipfs://${resultData.metadataIpfsHash}`],
      overrides: {
        value: ethers.utils.parseEther("0.000000001"),
      },
    });

    try {
      const { hash } = await writeContract(config);
      console.log("NFT Minting Transaction Hash:", hash);
      setResultData({ ...resultData, ["mintTransaction"]: hash });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() 
            * (max - min + 1)) + min;
};

  function selectRandomImage() {
    const number = randomNumberInRange(0,18);
    console.log("Image Number:", (images[number]))
    setIdeaForm({
      ...ideaForm,
      ["image"]: images[number],
    })

    
  }

  return (
    <div className="main-content">
      <h2>MINT Your 💡 into NFT</h2>
      <p>
        Mint your ideas into Non-Fingible Tokens(NFT) and tokenize your IP
        Rights into Digital Asset.{" "}
      </p>
      <form className="formStyle">
        <div className="inputContainer">
          {/*Section: NFT Image */}
          <div>
            <label>Upload Image: </label>

            {/* Image INput or from themes */}
            <input
              style={{
                padding: 0,
                backgroundColor: "#040f0f",
                marginBlock: "12px",
              }}
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(URL.createObjectURL(event.target.files[0]));
                setIdeaForm({
                  ...ideaForm,
                  ["image"]: event.target.files[0],
                });
                // setSelectedImage(event.target.files[0]);
              }}
            />
            <h2>OR</h2>
            <button onClick={selectRandomImage} disabled={true}>Select from theme</button>


            {/* Image View */}
            {ideaForm.image && (
              <div>
                <img
                  alt="not found"
                  width={"60%"}
                  src={URL.createObjectURL(ideaForm.image)}
                  style={{borderBlockWidth: '4px', borderBlockColor: 'cyan'}}
                />
                <br />
              </div>
            )}
          

            {ideaForm.image && (
              <button onClick={() => setIdeaForm({ ...ideaForm, ["image"]: null })}>
                Remove
              </button>
            )}
          </div>
          <div>
            <FormField
              labelName="Title"
              placeholder="idea name"
              inputType="text"
              value={ideaForm.title}
              handleChange={(e) => handleFormFieldChange("title", e)}
            />
            <FormField
              labelName="Author"
              placeholder="Name/ Address"
              inputType="text"
              value={ideaForm.author}
              handleChange={(e) => handleFormFieldChange("author", e)}
            />
            <FormField
              labelName="Problem"
              placeholder="describe"
              inputType="text"
              isTextArea={true}
              value={ideaForm.problem}
              handleChange={(e) => handleFormFieldChange("problem", e)}
            />

            <FormField
              labelName="Solution"
              placeholder="describe"
              inputType="text"
              isTextArea={true}
              value={ideaForm.solution}
              handleChange={(e) => handleFormFieldChange("solution", e)}
            />
            <FormField
              labelName="Achievabilty"
              placeholder="low/ medium/ high/ N.A."
              inputType="text"
              value={ideaForm.achievability}
              handleChange={(e) => handleFormFieldChange("achievability", e)}
            />
          </div>
        </div>
        {/* <button type="submit" className="createButton">
          Mint Idea NFT
        </button> */}
      </form>
      {resultData.imageIpfsHash == "" && (
        <button onClick={uploadImg} className="button">
          {" "}
          1. Upload Image
        </button>
      )}

      {resultData.imageIpfsHash && resultData.metadataIpfsHash === "" && (
        <button onClick={uploadMetadata} className="button">
          {" "}
          2. Upload Metadata
        </button>
      )}

      {resultData.imageIpfsHash && resultData.metadataIpfsHash && (
        <button onClick={mintNFT} className="button">
          3. Mint 💡 NFT
        </button>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <p></p>
        </div>
      )}

      <div>
        {resultData.imageIpfsHash && <p>Results:</p>}
        {resultData.imageIpfsHash && (
          <p>Image Ipfs Hash: {resultData.imageIpfsHash}</p>
        )}
        {resultData.metadataIpfsHash && (
          <p>Metadata Ipfs Hash: {resultData.metadataIpfsHash}</p>
        )}
        {resultData.mintTransaction && (
          <p>NFT mint Transaction: {resultData.mintTransaction}</p>
        )}
      </div>

      <p style={{ fontSize: "10px" }}>
        Warning: Do not test UI paths other than determined, it's fragile at
        frontend
      </p>
    </div>
  );
}
