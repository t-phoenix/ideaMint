import React, { useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import "../styles/layoutstyle.css";
import FormField from "../components/FormField";
// Use the api keys by providing the strings directly
// Use the JWT key

export default function CreateScreen() {
  const [selectedImage, setSelectedImage] = useState(null);

  const [ideaForm, setIdeaForm] = useState({
    image: null,
    title: "",
    author: "",
    problem: "",
    solution: "",
    achievability: "",
    date: "",
    time: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setIdeaForm({ ...ideaForm, [fieldName]: e.target.value });
  };

  function mintIdea() {
    console.log("Minting NFT .... ", ideaForm.image, ideaForm.title);
  }

  function testCondition (){
    console.log("IMAGE URL", URL.createObjectURL(ideaForm.image));
  }

  return (
    <div className="main-content">
      <p>
        Mint your ideas into Non-Fingible Tokens(NFT) and tokenize your IP
        Rights into Digital Asset.{" "}
      </p>
      <form onSubmit={mintIdea} className="formStyle">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: "15px",
          }}
        >
          <div>
            <label>Upload Image: </label>
          <input
              style={{padding: 0, backgroundColor: '#040f0f', marginBlock: '12px'}}
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setIdeaForm({ ...ideaForm, ['image']: event.target.files[0] });
                // setSelectedImage(event.target.files[0]);
              }}
            />
            {ideaForm.image && (
              <div>
                <img
                  alt="not found"
                  width={"250px"}
                  src={URL.createObjectURL(ideaForm.image)}
                />
                <br />
                <button onClick={() => setIdeaForm({ ...ideaForm, ['image']: null})}>Remove</button>
              </div>
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
        <button type="submit" className="createButton">
          Mint Idea NFT
        </button>
      </form>

      <button onClick={testCondition} className="button">
        Test Button
      </button>
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
