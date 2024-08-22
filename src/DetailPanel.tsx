import React, { useState,useEffect } from "react";
import { Button } from "@mui/material";
import OtherDetailsTable from "./OtherDetailsTable.tsx"; // Import the updated table component
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/ext-language_tools";
import 'ace-builds/src-noconflict/theme-monokai';

function DetailPanel({ rowId, data, setData }) {
  const row = data.find((_item, index) => index === parseInt(rowId));
  const [code, setCode] = useState<string>(row.otherDetails.code);
  const [isModified, setIsModified] = useState(false);
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setIsModified(true);
  };

  const handleSave = () => {
    const updatedData = data.map((item, index) => {
      if (index === parseInt(rowId)) {
        return {
          ...item,
          otherDetails: { ...item.otherDetails, code },
        };
      }
      return item;
    });
    setData(updatedData);
    setIsModified(false);
  };

  useEffect(() => {
    setIsModified(code !== row.otherDetails.code);
  }, [code, row.otherDetails.code]);

  const otherDetails = row.otherDetails;

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