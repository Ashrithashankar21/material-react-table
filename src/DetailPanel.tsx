import React, { useState,useEffect } from "react";
import { Button } from "@mui/material";
import OtherDetailsTable from "./OtherDetailsTable.tsx"; // Import the updated table component
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/ext-language_tools";
import 'ace-builds/src-noconflict/theme-monokai';

function DetailPanel({ row, data, setData }) {
  const [code, setCode] = useState<string>(row.original.otherDetails.code); 
  const [isModified, setIsModified] = useState(false);

  const handleCodeChange = (newCode:string) => {
    console.log('event',newCode);

    setCode(newCode);
    setIsModified(true);

  };
 
  const handleSave = () => {
    console.log('data',data);
    const updatedData = data.map((item, index) => {
      console.log('index',index,row.id,item);
      if (index === parseInt(row.id)) {
        return {
          ...item,
          otherDetails: { ...item.otherDetails, code },
        };
      }
      return item;
    });
    console.log('updatedData',updatedData);
    setData(updatedData);
    setIsModified(false);
  };

  useEffect(() => {
    setIsModified(code !== row.original.otherDetails.code);
  }, [code, row.original.otherDetails.code]);


  const otherDetails = row.original.otherDetails;

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <OtherDetailsTable data={otherDetails} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "8px",
          width: "85%",
          gap: "8px",
        }}
      >
  
        <AceEditor
          mode="java"
          theme="monokai"
          value={code}
          onChange={handleCodeChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          width="100%"
        />
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          style={{ width: "fit-content" }}
          disabled={!isModified}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
 
export default DetailPanel;