import React from 'react'
import "../styles/inputstyle.css";

const FormField = ({ labelName, placeholder, inputType, isTextArea, value, handleChange }) => {
  return (
    <label style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      {labelName && (
        <span>{labelName}: </span>
      )}
      {isTextArea ? (
        <textarea 
          required
          value={value}
          onChange={handleChange}
          type = {inputType}
          rows={5}
          placeholder={placeholder}
          className='biginputBox'
        //   className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        <input 
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          style={{margin: '5px'}}
          //className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[24px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  )
}

export default FormField