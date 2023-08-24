import React, { useEffect, useState } from "react";
import { useContractWrite, useNetwork, usePrepareContractWrite, useProvider, useAccount } from "wagmi";
import { prepareWriteContract, writeContract, prepareSendTransaction , sendTransaction } from "@wagmi/core";
import "../styles/layoutstyle.css";
import FormField from "../components/FormField";
// Use the api keys by providing the strings directly
// import axios from "axios";
import fetch from "node-fetch";
import FormData from "form-data";
import { ideaMIntAddress, ideaMintABI } from "../constants/smartContract";
import { ethers, getDefaultProvider } from "ethers";
const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmYmViNGI0OC0xM2E4LTRiNDQtYmNjYS03NGMxM2U5MDRhYWYiLCJlbWFpbCI6ImFiaGlqYWlwdXIyMDExQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJhMjYzMjI0ZjU2YTQzMjUzOTFlZCIsInNjb3BlZEtleVNlY3JldCI6ImRlZDk5MTUxZTNmMmE1M2FjNjMzNjdhOWQyMDY3NTVmNGU5OGQ4MmJjMmViM2IxNWVlNjM3ZjY1MTQyNjEzZTUiLCJpYXQiOjE2OTI1NTI0NDR9.DHVzx4RJOEuhdIxu1ggudKkGFigcP0_fHGmmk4CAaRM";
// Use the JWT key

export default function CreateScreen() {
  //   const [selectedImage, setSelectedImage] = useState(null);
  // const provider = useProvider();
  const account = useAccount();
  console.log("Current Wallet Account:", account);

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
    // console.log("File:", ideaForm.image, " Uploading ....");
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
  }

  async function uploadMetadata() {
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
  }

  async function mintNFT() {
    console.log("Minting NFT with MEtadata Hash:", resultData.metadataIpfsHash, ideaMIntAddress);
   
    const config = await prepareWriteContract({
      address: ideaMIntAddress,
      abi: ideaMintABI,
      functionName: "safeMint",
      args: [`ipfs://${resultData.metadataIpfsHash}`],
      overrides: {
        value: ethers.utils.parseEther('0.000000001'),
      },
    });

    try {
      const { hash } = await writeContract(config);
      console.log("NFT Minting Transaction Hash:", hash);
      setResultData({ ...resultData, ["mintTransaction"]: hash });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="main-content">
      <h2>MINT Your 💡 into NFT</h2>
      <p>
        Mint your ideas into Non-Fingible Tokens(NFT) and tokenize your IP
        Rights into Digital Asset.{" "}
      </p>
      <form className="formStyle">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: "15px",
          }}
        >
          {/* Image Input */}
          <div>
            <label>Upload Image: </label>

            {ideaForm.image && (
              <div>
                <img
                  alt="not found"
                  width={"60%"}
                  src={URL.createObjectURL(ideaForm.image)}
                />
                <br />
              </div>
            )}
            {ideaForm.image == null && (
              <input
                style={{
                  padding: 0,
                  backgroundColor: "#040f0f",
                  marginBlock: "12px",
                }}
                type="file"
                name="myImage"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  setIdeaForm({
                    ...ideaForm,
                    ["image"]: event.target.files[0],
                  });
                  // setSelectedImage(event.target.files[0]);
                }}
              />
            )}
            {ideaForm.image && (
              <button
                onClick={() => setIdeaForm({ ...ideaForm, ["image"]: null })}
              >
                Remove
              </button>
            )}
          </div>

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

      { resultData.imageIpfsHash && resultData.metadataIpfsHash && <button onClick={mintNFT} className="button">
          3. Mint 💡 NFT
        </button>
      }

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
    </div>
  );
}

// TODO:
// IDEA NFT Attributes
// 1. Date
// 2. Time
// 3. Author: Name/ ENS/ Address
// 4. Title:
// 5. Problem:
// 6. Solution
// 7. How to Achieve
// 8. Achievability(options): Low/ Medium/ High
// 9. Originality: my original/ build on xyz/ other

// OR

// Date
// Time
// Author: Name/ ENS/ Address
// Details: textbox
